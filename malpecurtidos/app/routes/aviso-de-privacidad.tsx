import type { Route } from "./+types/aviso-de-privacidad";
import { Link } from "react-router";
import { LegalPageLayout } from "~/components/legal/LegalPageLayout";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Aviso de Privacidad | MALPE Curtidos" },
    {
      name: "description",
      content:
        "Consulta el aviso de privacidad de MALPE Curtidos sobre el uso de datos enviados en formularios de contacto, muestras, showroom y ficha técnica.",
    },
  ];
}

export default function AvisoDePrivacidad() {
  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Aviso de Privacidad"
      updatedAt="12 de marzo de 2026"
    >
      <section>
        <h2>Responsable</h2>
        <p>
          Curtidos Malpe es responsable del tratamiento de los datos personales que las personas usuarias
          proporcionan a través de este sitio web.
        </p>
      </section>

      <section>
        <h2>Datos que recopilamos</h2>
        <p>Podemos recopilar los datos que la persona usuaria capture voluntariamente en los formularios del sitio, incluyendo:</p>
        <ul>
          <li>Nombre</li>
          <li>Correo electrónico</li>
          <li>Teléfono o WhatsApp</li>
          <li>Empresa</li>
          <li>Mensaje o comentarios adicionales</li>
          <li>Productos, variantes, grosores o selecciones realizadas en catálogo y showroom</li>
        </ul>
      </section>

      <section>
        <h2>Finalidades del tratamiento</h2>
        <p>Los datos se utilizan exclusivamente para actividades comerciales y de atención derivadas del sitio web, tales como:</p>
        <ul>
          <li>Responder solicitudes de contacto</li>
          <li>Atender solicitudes de muestras</li>
          <li>Dar seguimiento a solicitudes de ficha técnica</li>
          <li>Atender consultas realizadas desde el showroom</li>
          <li>Establecer comunicación comercial relacionada con los productos de interés</li>
          <li>Dar seguimiento operativo y comercial a las solicitudes enviadas por la persona usuaria</li>
        </ul>
      </section>

      <section>
        <h2>Transferencia y almacenamiento</h2>
        <p>
          La información enviada a través del sitio se procesa mediante la infraestructura de hospedaje del
          proyecto y servicios de correo transaccional necesarios para hacer llegar las solicitudes al equipo
          comercial de Curtidos Malpe.
        </p>
        <p>
          Curtidos Malpe no vende los datos personales capturados en este sitio. Los datos solo se comparten
          con proveedores tecnológicos necesarios para operar el sitio y el envío de correos relacionados con
          las solicitudes recibidas.
        </p>
      </section>

      <section>
        <h2>Conservacion de datos</h2>
        <p>
          Los datos se conservaran durante el tiempo razonablemente necesario para atender la solicitud,
          mantener seguimiento comercial, cumplir obligaciones legales aplicables o proteger intereses legítimos
          del negocio.
        </p>
      </section>

      <section>
        <h2>Seguridad</h2>
        <p>
          Este sitio incorpora medidas técnicas y organizativas razonables para reducir riesgos de acceso no
          autorizado, abuso de formularios y exposición indebida de la información enviada por las personas
          usuarias.
        </p>
      </section>

      <section>
        <h2>Derechos de acceso, rectificación y eliminación</h2>
        <p>
          La persona titular puede solicitar acceso, corrección o eliminación de sus datos, asi como realizar
          consultas relacionadas con su tratamiento, escribiendo a{" "}
          <a className="text-white underline hover:text-[#967D59]" href="mailto:ventas@malpe.com.mx">
            ventas@malpe.com.mx
          </a>
          .
        </p>
      </section>

      <section>
        <h2>Consentimiento</h2>
        <p>
          Al enviar un formulario dentro del sitio, la persona usuaria manifiesta que los datos proporcionados
          son propios o cuenta con autorización para compartirlos, y acepta su tratamiento conforme a este
          aviso de privacidad.
        </p>
      </section>

      <section>
        <h2>Cambios al aviso</h2>
        <p>
          Curtidos Malpe puede actualizar este aviso de privacidad en cualquier momento. Cualquier cambio se
          publicará en esta misma página.
        </p>
      </section>

      <section>
        <h2>Documento relacionado</h2>
        <p>
          Para conocer las reglas de uso del sitio, consulta también los{" "}
          <Link className="text-white underline hover:text-[#967D59]" to="/terminos-y-condiciones">
            Términos y Condiciones
          </Link>
          .
        </p>
      </section>
    </LegalPageLayout>
  );
}
