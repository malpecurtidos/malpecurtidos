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
  validateCheckbox,
  validateEmail,
  validateFields,
  validateLength,
  validatePhone,
  validateRequired,
  validateSecureFormRequest,
} from "~/lib/form-security.server";

export function loader() {
  return methodNotAllowedLoader();
}

export async function action({ request }: ActionFunctionArgs) {
  const secureRequest = await validateSecureFormRequest(request, { routeKey: "showroom-request" });
  if (!secureRequest.ok) {
    return secureRequest.response;
  }

  const { formData } = secureRequest;
  const rawName = parseFormField(formData, "name");
  const rawEmail = parseFormField(formData, "email");
  const phone = parseFormField(formData, "phone");
  const company = parseFormField(formData, "company");
  const message = parseTextareaField(formData, "message");
  const productName = parseFormField(formData, "productName");
  const productCategory = parseFormField(formData, "productCategory");
  const skinName = parseFormField(formData, "skinName");
  const skinVariant = parseFormField(formData, "skinVariant");
  const skinId = parseFormField(formData, "skinId");
  const variantId = parseFormField(formData, "variantId");

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
    validateLength(message, "Mensaje", 0, 2000),
    validateRequired(productName, "Producto"),
    validateLength(productName, "Producto", 2, 120),
    validateRequired(productCategory, "Categoría"),
    validateLength(productCategory, "Categoría", 2, 80),
    validateRequired(skinName, "Piel"),
    validateLength(skinName, "Piel", 2, 120),
    validateRequired(skinVariant, "Variante"),
    validateLength(skinVariant, "Variante", 1, 120),
    validateRequired(skinId, "ID de piel"),
    validateLength(skinId, "ID de piel", 2, 120),
    validateRequired(variantId, "ID de variante"),
    validateLength(variantId, "ID de variante", 2, 120),
    validateCheckbox(formData, "privacy", "Debes aceptar la política de privacidad."),
  ]);

  if (validationError) {
    return createErrorResponse(validationError, 400);
  }

  try {
    const emailContent = [
      "Nueva solicitud desde showroom",
      "",
      "Datos del cliente",
      "-----------------",
      `Nombre: ${name}`,
      `Empresa: ${normalizedCompany || "N/A"}`,
      `Email: ${email}`,
      `Teléfono: ${phone}`,
      "",
      "Selección de showroom",
      "---------------------",
      `Producto ejemplo: ${productName}`,
      `Categoría: ${productCategory}`,
      `Piel: ${skinName}`,
      `Variante: ${skinVariant}`,
      `ID piel: ${skinId}`,
      `ID variante: ${variantId}`,
      "",
      "Mensaje",
      "-------",
      message || "N/A",
    ].join("\n");

    await sendInternalEmail({
      subject: `Solicitud showroom: ${productName} - ${name}`,
      replyTo: email,
      text: emailContent,
    });

    return createSuccessResponse();
  } catch {
    return createServerErrorResponse();
  }
}
