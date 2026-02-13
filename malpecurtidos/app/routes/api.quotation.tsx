import type { ActionFunctionArgs } from "react-router";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  // Anti-spam check (honeypot)
  const gotcha = formData.get("_gotcha");
  if (gotcha) {
    // Silently fail for bots
    return { success: true };
  }

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const company = formData.get("company") as string;
  const message = formData.get("message") as string;
  const itemsJson = formData.get("items") as string;
  const privacy = formData.get("privacy");

  if (!privacy) {
    return { error: "Debes aceptar la política de privacidad" };
  }

  let items = [];
  try {
    items = JSON.parse(itemsJson);
  } catch (e) {
    return { error: "Error procesando los productos" };
  }

  // Construct email body
  const itemsList = items.map((item: any) =>
    `- ${item.productName} (${item.variantName})\n  Grosor: ${item.thickness}\n  Notas: ${item.notes || "N/A"}`
  ).join("\n\n");

  const emailContent = `
Nueva Solicitud de Muestras

Cliente: ${name}
Empresa: ${company || "Particular"}
Email: ${email}
Teléfono: ${phone}

Mensaje:
${message}

Productos Solicitados (Muestras):
------------------------
${itemsList}
------------------------
  `;

  console.log("=== NEW SAMPLE REQUEST ===");
  console.log(emailContent);

  // Example integration with Resend (if API key exists)
  if (process.env.RESEND_API_KEY) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "Solicitudes MALPE <onboarding@resend.dev>", // Update with verified domain
          to: ["ventas@malpe.com.mx"], // Update with real email
          subject: `Solicitud de Muestras: ${name} - ${company}`,
          text: emailContent,
        }),
      });

      if (!res.ok) {
        console.error("Failed to send email via Resend", await res.text());
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }

  // Simulate network delay if dev
  if (!process.env.RESEND_API_KEY) {
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  return { success: true };
}
