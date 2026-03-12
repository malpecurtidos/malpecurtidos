import crypto from "node:crypto";
import { createCookie, data } from "react-router";

const DEFAULT_SALES_EMAIL = "ventas@malpe.com.mx";
const MAX_CONTENT_LENGTH = 50_000;
const MIN_FORM_FILL_MS = 1500;
const MAX_FORM_AGE_MS = 1000 * 60 * 60 * 8;
const RATE_LIMIT_WINDOW_MS = 1000 * 60 * 15;
const RATE_LIMIT_MAX_REQUESTS = 8;

type CsrfCookiePayload = {
  token: string;
  issuedAt: number;
};

type RateLimitEntry = {
  hits: number[];
};

type FormErrorResult = {
  ok: false;
  response: ReturnType<typeof data> | Response;
};

type FormSuccessResult = {
  ok: true;
  formData: FormData;
};

type SecureFormOptions = {
  routeKey: string;
};

type InternalEmailPayload = {
  subject: string;
  replyTo: string;
  text: string;
};

declare global {
  // eslint-disable-next-line no-var
  var __malpeRateLimitStore: Map<string, RateLimitEntry> | undefined;
}

const isProduction = process.env.NODE_ENV === "production";

const csrfCookie = createCookie("__malpe_form", {
  httpOnly: true,
  sameSite: "lax",
  secure: isProduction,
  path: "/",
  maxAge: MAX_FORM_AGE_MS / 1000,
  secrets: [getFormSecret()],
});

function getFormSecret() {
  if (process.env.FORM_SECRET) {
    return process.env.FORM_SECRET;
  }

  if (isProduction) {
    throw new Error("FORM_SECRET is required in production.");
  }

  return "dev-only-form-secret-change-me";
}

function getRateLimitStore() {
  if (!globalThis.__malpeRateLimitStore) {
    globalThis.__malpeRateLimitStore = new Map<string, RateLimitEntry>();
  }

  return globalThis.__malpeRateLimitStore;
}

function timingSafeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

function getExpectedOrigin(request: Request) {
  const requestUrl = new URL(request.url);
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const forwardedHost = request.headers.get("x-forwarded-host");
  const host = forwardedHost ?? request.headers.get("host") ?? requestUrl.host;
  const protocol = forwardedProto ?? requestUrl.protocol.replace(":", "");

  return `${protocol}://${host}`;
}

function getRequestIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() ?? "unknown";
  }

  return request.headers.get("x-real-ip") ?? "unknown";
}

function escapeLines(value: string) {
  return value.replace(/\r\n/g, "\n").trim();
}

function normalizeWhitespace(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function rateLimitByIpAndRoute(request: Request, routeKey: string) {
  const store = getRateLimitStore();
  const ip = getRequestIp(request);
  const key = `${routeKey}:${ip}`;
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const entry = store.get(key) ?? { hits: [] };

  entry.hits = entry.hits.filter((timestamp) => timestamp > windowStart);

  if (entry.hits.length >= RATE_LIMIT_MAX_REQUESTS) {
    store.set(key, entry);
    const retryAfterSeconds = Math.ceil((entry.hits[0] + RATE_LIMIT_WINDOW_MS - now) / 1000);

    return {
      ok: false,
      retryAfterSeconds,
    } as const;
  }

  entry.hits.push(now);
  store.set(key, entry);

  return { ok: true } as const;
}

function createMethodNotAllowedResponse() {
  const headers = buildApiHeaders({ Allow: "POST" });
  return data(
    { success: false, error: "Metodo no permitido." },
    { status: 405, headers },
  );
}

export function createErrorResponse(message: string, status = 400, extraHeaders?: HeadersInit) {
  return data(
    { success: false, error: message },
    { status, headers: buildApiHeaders(extraHeaders) },
  );
}

async function parseCsrfCookie(request: Request) {
  const cookieHeader = request.headers.get("Cookie");
  return (await csrfCookie.parse(cookieHeader)) as CsrfCookiePayload | null;
}

async function verifyRequestOrigin(request: Request) {
  const expectedOrigin = getExpectedOrigin(request);
  const originHeader = request.headers.get("Origin");
  const refererHeader = request.headers.get("Referer");
  const source = originHeader ?? refererHeader;

  if (!source) {
    return createErrorResponse("No pudimos verificar el origen de la solicitud.", 403);
  }

  try {
    const sourceOrigin = new URL(source).origin;
    if (sourceOrigin !== expectedOrigin) {
      return createErrorResponse("Origen de solicitud inválido.", 403);
    }
  } catch {
    return createErrorResponse("Origen de solicitud inválido.", 403);
  }

  return null;
}

function verifyContentLength(request: Request) {
  const contentLengthHeader = request.headers.get("content-length");
  if (!contentLengthHeader) {
    return null;
  }

  const contentLength = Number.parseInt(contentLengthHeader, 10);
  if (!Number.isFinite(contentLength) || contentLength > MAX_CONTENT_LENGTH) {
    return createErrorResponse("La solicitud excede el tamaño permitido.", 413);
  }

  return null;
}

function verifyTiming(formData: FormData, csrfPayload: CsrfCookiePayload) {
  const submittedAtRaw = parseFormField(formData, "submittedAt");
  const submittedAt = Number.parseInt(submittedAtRaw, 10);

  if (!Number.isFinite(submittedAt) || submittedAt !== csrfPayload.issuedAt) {
    return createErrorResponse("No pudimos validar el formulario. Recarga la página e intenta de nuevo.", 403);
  }

  const age = Date.now() - submittedAt;
  if (age < MIN_FORM_FILL_MS) {
    return createErrorResponse("Espera un momento antes de enviar el formulario.", 429);
  }

  if (age > MAX_FORM_AGE_MS) {
    return createErrorResponse("Tu formulario expiró. Recarga la página e intenta de nuevo.", 403);
  }

  return null;
}

function verifyHoneypot(formData: FormData) {
  if (parseFormField(formData, "_gotcha")) {
    return createErrorResponse("No pudimos procesar tu solicitud.", 400);
  }

  return null;
}

function verifyCsrf(formData: FormData, csrfPayload: CsrfCookiePayload) {
  const csrfToken = parseFormField(formData, "csrfToken");
  if (!csrfToken || !timingSafeEqual(csrfToken, csrfPayload.token)) {
    return createErrorResponse("No pudimos validar el formulario. Recarga la página e intenta de nuevo.", 403);
  }

  return null;
}

export async function getFormSecurityState(request: Request) {
  const existing = await parseCsrfCookie(request);
  if (existing?.token && Number.isFinite(existing.issuedAt)) {
    return {
      csrfToken: existing.token,
      submittedAt: String(existing.issuedAt),
      headers: new Headers(),
    };
  }

  const payload: CsrfCookiePayload = {
    token: crypto.randomBytes(32).toString("hex"),
    issuedAt: Date.now(),
  };

  const headers = new Headers();
  headers.append("Set-Cookie", await csrfCookie.serialize(payload));

  return {
    csrfToken: payload.token,
    submittedAt: String(payload.issuedAt),
    headers,
  };
}

export async function validateSecureFormRequest(
  request: Request,
  options: SecureFormOptions,
): Promise<FormSuccessResult | FormErrorResult> {
  if (request.method !== "POST") {
    return { ok: false, response: createMethodNotAllowedResponse() };
  }

  const originError = await verifyRequestOrigin(request);
  if (originError) {
    return { ok: false, response: originError };
  }

  const sizeError = verifyContentLength(request);
  if (sizeError) {
    return { ok: false, response: sizeError };
  }

  const rateLimit = rateLimitByIpAndRoute(request, options.routeKey);
  if (!rateLimit.ok) {
    return {
      ok: false,
      response: createErrorResponse("Has enviado demasiadas solicitudes. Intenta mas tarde.", 429, {
        "Retry-After": String(rateLimit.retryAfterSeconds),
      }),
    };
  }

  const formData = await request.formData();
  const csrfPayload = await parseCsrfCookie(request);
  if (!csrfPayload?.token) {
    return {
      ok: false,
      response: createErrorResponse("No pudimos validar el formulario. Recarga la página e intenta de nuevo.", 403),
    };
  }

  const honeypotError = verifyHoneypot(formData);
  if (honeypotError) {
    return { ok: false, response: honeypotError };
  }

  const csrfError = verifyCsrf(formData, csrfPayload);
  if (csrfError) {
    return { ok: false, response: csrfError };
  }

  const timingError = verifyTiming(formData, csrfPayload);
  if (timingError) {
    return { ok: false, response: timingError };
  }

  return { ok: true, formData };
}

export function parseFormField(formData: FormData, fieldName: string) {
  const value = formData.get(fieldName);
  return typeof value === "string" ? value.trim() : "";
}

export function parseTextareaField(formData: FormData, fieldName: string) {
  const value = parseFormField(formData, fieldName);
  return escapeLines(value);
}

export function validateRequired(value: string, fieldLabel: string) {
  if (!value) {
    return `${fieldLabel} es obligatorio.`;
  }

  return null;
}

export function validateLength(value: string, fieldLabel: string, min: number, max: number) {
  if (!value) {
    return null;
  }

  if (value.length < min || value.length > max) {
    return `${fieldLabel} debe tener entre ${min} y ${max} caracteres.`;
  }

  return null;
}

export function validateEmail(value: string) {
  if (!value) {
    return "Email es obligatorio.";
  }

  const normalized = value.toLowerCase();
  const emailPattern = /^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/i;
  if (!emailPattern.test(normalized)) {
    return "Ingresa un email válido.";
  }

  return null;
}

export function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

export function validatePhone(value: string) {
  if (!value) {
    return "Teléfono es obligatorio.";
  }

  const phonePattern = /^[0-9+\-().\s]{7,25}$/;
  if (!phonePattern.test(value)) {
    return "Ingresa un teléfono válido.";
  }

  return null;
}

export function validateCheckbox(formData: FormData, fieldName: string, message: string) {
  return formData.get(fieldName) ? null : message;
}

export function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function buildApiHeaders(extraHeaders?: HeadersInit) {
  const headers = new Headers(extraHeaders);
  headers.set("Cache-Control", "no-store, max-age=0");
  headers.set("Pragma", "no-cache");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Permissions-Policy", "geolocation=(), microphone=(), camera=()");
  return headers;
}

export function buildDocumentHeaders(loaderHeaders?: HeadersInit) {
  const headers = new Headers(loaderHeaders);
  const scriptSrc = isProduction
    ? "script-src 'self' 'unsafe-inline'"
    : "script-src 'self' 'unsafe-inline' 'unsafe-eval'";

  const csp = [
    "default-src 'self'",
    scriptSrc,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: blob: https:",
    "connect-src 'self' https://*.sanity.io https://cdn.sanity.io",
    "frame-src 'self' https://www.google.com https://maps.google.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    ...(isProduction ? ["upgrade-insecure-requests"] : []),
  ].join("; ");

  headers.set("Content-Security-Policy", csp);
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Frame-Options", "DENY");
  headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  headers.set("Cross-Origin-Opener-Policy", "same-origin");
  headers.set("Cross-Origin-Resource-Policy", "same-origin");
  headers.set("Vary", "Cookie");

  if (isProduction) {
    headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  }

  return headers;
}

export function createSuccessResponse(extraHeaders?: HeadersInit) {
  return data(
    { success: true },
    { headers: buildApiHeaders(extraHeaders) },
  );
}

export function validateFields(errors: Array<string | null>) {
  return errors.find(Boolean) ?? null;
}

export function buildKeyValueBlock(entries: Array<[string, string]>) {
  return entries
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");
}

export function formatMultilineText(value: string) {
  const normalized = normalizeWhitespace(value);
  return normalized || "N/A";
}

export async function sendInternalEmail(payload: InternalEmailPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const salesEmail = process.env.SALES_EMAIL || DEFAULT_SALES_EMAIL;

  if (!apiKey || !fromEmail) {
    throw new Error("Email service is not configured.");
  }

  const htmlBody = escapeHtml(payload.text).replace(/\n/g, "<br />");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [salesEmail],
      reply_to: payload.replyTo,
      subject: payload.subject,
      text: payload.text,
      html: `<div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:#111827">${htmlBody}</div>`,
    }),
  });

  if (!response.ok) {
    throw new Error("Resend request failed.");
  }
}

export function createServerErrorResponse() {
  return createErrorResponse("No pudimos procesar tu solicitud. Intenta de nuevo en unos minutos.", 500);
}

export function methodNotAllowedLoader() {
  return createMethodNotAllowedResponse();
}

export function normalizeOptionalText(value: string) {
  return value ? value.trim() : "";
}

export function normalizeName(value: string) {
  return normalizeWhitespace(value);
}
