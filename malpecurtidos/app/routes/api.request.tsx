import type { ActionFunctionArgs } from "react-router";

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();

    // Anti-spam check (honeypot)
    const gotcha = formData.get("_gotcha");
    if (gotcha) {
        return { success: true };
    }

    const type = formData.get("type") as string; // "sample" or "tech_sheet"
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const company = formData.get("company") as string;
    const message = formData.get("message") as string;

    // Product details
    const productId = formData.get("productId") as string;
    const productName = formData.get("productName") as string;
    const variantName = formData.get("variantName") as string;
    const thickness = formData.get("thickness") as string;
    const sku = formData.get("sku") as string;

    const privacy = formData.get("privacy");

    if (!privacy) {
        return { error: "Debes aceptar la política de privacidad" };
    }

    const subjectPrefix = type === "sample" ? "Solicitud de Muestra" : "Solicitud de Ficha Técnica";

    const emailContent = `
Nueva ${subjectPrefix}

Detalles del Cliente:
--------------------
Nombre: ${name}
Empresa: ${company || "N/A"}
Email: ${email}
Teléfono: ${phone}

Producto de Interés:
-------------------
Producto: ${productName}
SKU: ${sku}
Variante: ${variantName}
Grosor: ${thickness}

Mensaje Adicional:
-----------------
${message || "Ninguno"}
  `;

    console.log(`=== NEW ${type.toUpperCase()} REQUEST ===`);
    console.log(emailContent);

    // Email sending logic
    if (process.env.RESEND_API_KEY) {
        try {
            const res = await fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
                },
                body: JSON.stringify({
                    from: "Solicitudes MALPE <onboarding@resend.dev>",
                    to: ["ventas@malpe.com.mx"],
                    subject: `${subjectPrefix}: ${name} - ${company || "Particular"}`,
                    text: emailContent,
                }),
            });

            if (!res.ok) {
                console.error("Failed to send email via Resend", await res.text());
            }
        } catch (error) {
            console.error("Error sending email:", error);
        }
    } else {
        // Simulate delay for dev
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    return { success: true };
}

