import { ContactHero } from "~/components/contacto/ContactHero";
import { ContactInfo } from "~/components/contacto/ContactInfo";
import { ContactForm } from "~/components/contacto/ContactForm";
import type { Route } from "./+types/contacto";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Contacto | MALPE Curtidos" },
    { name: "description", content: "Ponte en contacto con MALPE. Estamos listos para atender tus necesidades de piel y curtidos." },
  ];
}

export default function Contacto() {
  return (
    <div className="bg-[#0f0f0f] min-h-screen">
      <ContactHero />

      <div className="container mx-auto px-4 -mt-20 relative z-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>

      {/* Map Section */}
      <div className="h-[450px] w-full bg-[#1a1a1a] border-t border-white/10 relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3722.518683525287!2d-101.6669869249625!3d21.09186648057375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842b970868725d2d%3A0x6b7724213031070!2sBlvd.%20Hermanos%20Aldama%204208%2C%20Cd%20Industrial%2C%2037490%20Le%C3%B3n%2C%20Gto.!5e0!3m2!1ses!2smx!4v1709664585123!5m2!1ses!2smx"
          width="100%"
          height="100%"
          style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ubicación MALPE"
        ></iframe>
      </div>
    </div>
  );
}
