import type { Route } from "./+types/showroom";
import { ShowroomGrid } from "~/components/showroom/ShowroomGrid";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Showroom Virtual | MALPE Curtidos" },
    { name: "description", content: "Visualiza productos ejemplo fabricados con nuestras pieles premium. Muestrario interactivo B2B para empresas fabricantes." },
  ];
}

export default function Showroom() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-black">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="/home-imgs/hero/hero-2.webp"
            alt="Showroom MALPE"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-[85%] mx-auto px-4 md:px-8 py-20 text-center">
          {/* Subtitle */}
          <p className="text-sm md:text-base font-semibold uppercase tracking-wider text-[#D4AF37] mb-6 md:mb-8">
            SHOWROOM VIRTUAL B2B
          </p>
          
          {/* Main Title */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold text-white leading-tight mb-6 md:mb-8">
            Visualiza <span className="text-[#8B5A2B] italic">Tus Productos</span> con Nuestras Pieles
          </h1>
          
          {/* Description */}
          <p className="text-base md:text-lg lg:text-xl text-[#D3D3D3] font-sans leading-relaxed mb-10 md:mb-12 max-w-3xl mx-auto">
            Explora productos ejemplo fabricados con pieles MALPE. Cambia entre diferentes pieles para ver cómo quedaría tu producto y contáctanos para discutir tu proyecto.
          </p>
        </div>
      </section>

      {/* Grid con categorías */}
      <ShowroomGrid />
    </div>
  );
}
