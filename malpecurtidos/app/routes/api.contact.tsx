import type { ActionFunctionArgs } from "react-router";
import {
  createErrorResponse,
  createServerErrorResponse,
  createSuccessResponse,
  methodNotAllowedLoader,
  normalizeEmail,
  normalizeName,
  normalizeOptionalText,
  parseFormField,
  parseTextareaField,
  sendInternalEmail,
  validateEmail,
  validateFields,
  validateLength,
  validatePhone,
  validateRequired,
  validateSecureFormRequest,
} from "~/lib/form-security.server";

const SUBJECT_LABELS: Record<string, string> = {
  ventas: "Ventas / Cotización",
  informacion: "Información general",
  proveedores: "Proveedores",
  otro: "Otro",
};

export function loader() {
  return methodNotAllowedLoader();
}

export async function action({ request }: ActionFunctionArgs) {
  const secureRequest = await validateSecureFormRequest(request, { routeKey: "contact-request" });
  if (!secureRequest.ok) {
    return secureRequest.response;
  }

  const { formData } = secureRequest;
  const rawName = parseFormField(formData, "name");
  const rawEmail = parseFormField(formData, "email");
  const phone = parseFormField(formData, "phone");
  const company = parseFormField(formData, "company");
  const subject = parseFormField(formData, "subject");
  const message = parseTextareaField(formData, "message");

  const name = normalizeName(rawName);
  const email = normalizeEmail(rawEmail);
  const normalizedCompany = normalizeOptionalText(company);

  const validationError = validateFields([
    validateRequired(name, "Nombre"),
    validateLength(name, "Nombre", 2, 120),
    validateEmail(email),
    validateLength(email, "Email", 6, 160),
    validatePhone(phone),
    validateLength(normalizedCompany, "Empresa", 0, 120),
    SUBJECT_LABELS[subject] ? null : "Selecciona un asunto válido.",
    validateRequired(message, "Mensaje"),
    validateLength(message, "Mensaje", 10, 2000),
  ]);

  if (validationError) {
    return createErrorResponse(validationError, 400);
  }

  try {
    const emailContent = [
      "Nuevo mensaje de contacto",
      "",
      "Datos del cliente",
      "-----------------",
      `Nombre: ${name}`,
      `Empresa: ${normalizedCompany || "N/A"}`,
      `Email: ${email}`,
      `Teléfono: ${phone}`,
      `Asunto: ${SUBJECT_LABELS[subject]}`,
      "",
      "Mensaje",
      "-------",
      message,
    ].join("\n");

    await sendInternalEmail({
      subject: `Contacto web: ${SUBJECT_LABELS[subject]} - ${name}`,
      replyTo: email,
      text: emailContent,
    });

    return createSuccessResponse();
  } catch {
    return createServerErrorResponse();
  }
}
