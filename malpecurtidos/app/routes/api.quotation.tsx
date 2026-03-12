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

type QuotationItemPayload = {
  productId: string;
  productName: string;
  variantId: string;
  variantName: string;
  thickness: string;
  sku: string;
  notes?: string;
};

const MAX_QUOTATION_ITEMS = 12;

export function loader() {
  return methodNotAllowedLoader();
}

function isValidQuotationItem(item: unknown): item is QuotationItemPayload {
  if (!item || typeof item !== "object") {
    return false;
  }

  const candidate = item as Record<string, unknown>;
  return [
    candidate.productId,
    candidate.productName,
    candidate.variantId,
    candidate.variantName,
    candidate.thickness,
    candidate.sku,
  ].every((value) => typeof value === "string" && value.trim().length > 0);
}

export async function action({ request }: ActionFunctionArgs) {
  const secureRequest = await validateSecureFormRequest(request, { routeKey: "quotation-request" });
  if (!secureRequest.ok) {
    return secureRequest.response;
  }

  const { formData } = secureRequest;
  const rawName = parseFormField(formData, "name");
  const rawEmail = parseFormField(formData, "email");
  const phone = parseFormField(formData, "phone");
  const company = parseFormField(formData, "company");
  const message = parseTextareaField(formData, "message");
  const itemsJson = parseFormField(formData, "items");

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
    validateRequired(itemsJson, "Productos"),
    validateCheckbox(formData, "privacy", "Debes aceptar la política de privacidad."),
  ]);

  if (validationError) {
    return createErrorResponse(validationError, 400);
  }

  let items: QuotationItemPayload[] = [];
  try {
    const parsed = JSON.parse(itemsJson) as unknown;
    if (!Array.isArray(parsed) || parsed.length === 0 || parsed.length > MAX_QUOTATION_ITEMS) {
      return createErrorResponse("La selección de muestras es inválida.", 400);
    }

    if (!parsed.every(isValidQuotationItem)) {
      return createErrorResponse("La selección de muestras es inválida.", 400);
    }

    items = parsed.map((item) => ({
      ...item,
      notes: typeof item.notes === "string" ? item.notes.trim().slice(0, 500) : "",
    }));
  } catch {
    return createErrorResponse("No pudimos procesar los productos seleccionados.", 400);
  }

  try {
    const itemsList = items
      .map((item, index) =>
        [
          `${index + 1}. ${item.productName}`,
          `   ID producto: ${item.productId}`,
          `   Variante: ${item.variantName}`,
          `   ID variante: ${item.variantId}`,
          `   SKU: ${item.sku}`,
          `   Grosor: ${item.thickness}`,
          `   Notas: ${item.notes || "N/A"}`,
        ].join("\n"),
      )
      .join("\n\n");

    const emailContent = [
      "Nueva solicitud de muestras",
      "",
      "Datos del cliente",
      "-----------------",
      `Nombre: ${name}`,
      `Empresa: ${normalizedCompany || "N/A"}`,
      `Email: ${email}`,
      `Teléfono: ${phone}`,
      "",
      "Mensaje",
      "-------",
      message || "N/A",
      "",
      "Productos solicitados",
      "---------------------",
      itemsList,
    ].join("\n");

    await sendInternalEmail({
      subject: `Solicitud de muestras: ${name} - ${items.length} productos`,
      replyTo: email,
      text: emailContent,
    });

    return createSuccessResponse();
  } catch {
    return createServerErrorResponse();
  }
}
