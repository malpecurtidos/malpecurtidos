import type { Route } from "./+types/terminos-y-condiciones";
import { Link } from "react-router";
import { LegalPageLayout } from "~/components/legal/LegalPageLayout";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Términos y Condiciones | MALPE Curtidos" },
    {
      name: "description",
      content:
        "Consulta los términos y condiciones de uso del sitio web de MALPE Curtidos y del envío de solicitudes comerciales a través de sus formularios.",
    },
  ];
}

export default function TerminosYCondiciones() {
  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Términos y Condiciones"
      updatedAt="12 de marzo de 2026"
    >
      <section>
        <h2>Objeto</h2>
        <p>
          Estos términos regulan el acceso y uso del sitio web de MALPE Curtidos, así como el envío de
          solicitudes de contacto, muestras, ficha técnica y consultas relacionadas con productos.
        </p>
      </section>

      <section>
        <h2>Uso permitido</h2>
        <p>La persona usuaria se obliga a utilizar este sitio de manera licita y conforme a su finalidad comercial e informativa.</p>
        <ul>
          <li>No debe enviar información falsa, engañosa o no autorizada</li>
          <li>No debe intentar vulnerar la seguridad del sitio o interferir con su funcionamiento</li>
          <li>No debe usar los formularios para spam, automatización abusiva o fines ilegales</li>
        </ul>
      </section>

      <section>
        <h2>Solicitudes enviadas por formularios</h2>
        <p>
          El envío de un formulario no garantiza la aceptación comercial de una solicitud, la disponibilidad
          inmediata de muestras, ni la entrega automática de información técnica.
        </p>
        <p>
          En particular, las fichas técnicas y el seguimiento comercial son atendidos manualmente por el equipo
          de ventas de MALPE Curtidos.
        </p>
      </section>

      <section>
        <h2>Información del catálogo y showroom</h2>
        <p>
          Las imágenes, descripciones, variantes, aplicaciones y referencias del sitio tienen fines informativos
          y comerciales. Pueden cambiar sin previo aviso y no constituyen por sí mismas una oferta vinculante.
        </p>
      </section>

      <section>
        <h2>Propiedad intelectual</h2>
        <p>
          Los contenidos del sitio, incluyendo textos, imágenes, marcas, logotipos, elementos visuales y
          estructura del sitio, son propiedad de MALPE Curtidos o se utilizan con autorización correspondiente.
          No pueden reproducirse, distribuirse o explotarse sin autorizacion previa.
        </p>
      </section>

      <section>
        <h2>Limitación de responsabilidad</h2>
        <p>
          MALPE Curtidos realiza esfuerzos razonables para mantener el sitio disponible y actualizado, pero no
          garantiza que el servicio esté libre de errores, interrupciones o variaciones temporales en contenido,
          disponibilidad o funcionamiento.
        </p>
      </section>

      <section>
        <h2>Protección de datos</h2>
        <p>
          El tratamiento de datos personales se rige por el{" "}
          <Link className="text-white underline hover:text-[#967D59]" to="/aviso-de-privacidad">
            Aviso de Privacidad
          </Link>
          .
        </p>
      </section>

      <section>
        <h2>Modificaciones</h2>
        <p>
          MALPE Curtidos puede modificar estos términos y condiciones en cualquier momento. Las versiones
          vigentes se publicarán en esta misma página.
        </p>
      </section>

      <section>
        <h2>Contacto</h2>
        <p>
          Para dudas relacionadas con el sitio o con estos términos, puedes escribir a{" "}
          <a className="text-white underline hover:text-[#967D59]" href="mailto:ventas@malpe.com.mx">
            ventas@malpe.com.mx
          </a>
          .
        </p>
      </section>
    </LegalPageLayout>
  );
}
