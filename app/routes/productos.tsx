import type { Route } from "./+types/productos";
import { ProductGrid } from "~/components/productos/ProductGrid";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Catálogo de Productos | MALPE Curtidos" },
    { name: "description", content: "Explora nuestra colección de pieles y cueros premium para calzado, marroquinería y tapicería." },
  ];
}

export default function Productos() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-black">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="/home-imgs/hero/hero-2.webp"
            alt="Catálogo de productos MALPE"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-[85%] mx-auto px-4 md:px-8 py-20 text-center">
          {/* Subtitle */}
          <p className="text-sm md:text-base font-semibold uppercase tracking-wider text-[#D4AF37] mb-6 md:mb-8">
            CATÁLOGO PREMIUM
          </p>
          
          {/* Main Title */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold text-white leading-tight mb-6 md:mb-8">
            Productos de <span className="text-[#8B5A2B] italic">Calidad Superior</span>
          </h1>
          
          {/* Description */}
          <p className="text-base md:text-lg lg:text-xl text-[#D3D3D3] font-sans leading-relaxed mb-10 md:mb-12 max-w-3xl mx-auto">
            Selecciona los materiales ideales para tu próximo proyecto y solicita una cotización personalizada sin compromiso.
          </p>
        </div>
      </section>

      <ProductGrid />
    </div>
  );
}
