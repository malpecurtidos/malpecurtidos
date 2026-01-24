import { useState, useEffect } from "react";

const testimonials = [
  {
    quote:
      "Trabajar con Malpe ha llevado a nuestra empresa al siguiente nivel que deseábamos hace tiempo. La consistencia en el color es inigualable.",
    company: "CARIBU",
    role: "GERENCIA DE VENTAS",
    initial: "C",
  },
  {
    quote:
      "Requeríamos desde hace tiempo una piel muy particular que sólo Malpe nos la pudo desarrollar con exactitud y entrega a tiempo.",
    company: "LOBO SOLO",
    role: "DIRECCIÓN DE COMPRAS",
    initial: "L",
  },
  {
    quote:
      "Llevamos más de 5 años trabajando con Malpe y seguramente duraremos muchos más. La atención al cliente es excelente.",
    company: "SANTINI",
    role: "ÁREA DE DISEÑO",
    initial: "S",
  },
  {
    quote:
      "La calidad de los cueros de Malpe supera todas nuestras expectativas. Cada lote mantiene estándares excepcionales que nos permiten crear productos premium.",
    company: "CHRISTIAN GALLERY",
    role: "DIRECCIÓN GENERAL",
    initial: "C",
  },
  {
    quote:
      "Malpe no solo nos provee cuero, nos brinda soluciones. Su equipo técnico siempre está disponible para asesorarnos en nuestros proyectos más complejos.",
    company: "ARTESANOS DEL CUERO",
    role: "GERENCIA DE PRODUCCIÓN",
    initial: "A",
  },
  {
    quote:
      "La puntualidad en las entregas y la flexibilidad para adaptarse a nuestros pedidos especiales hacen de Malpe nuestro proveedor preferido desde hace años.",
    company: "MARROQUINERÍA FINA",
    role: "DIRECCIÓN DE OPERACIONES",
    initial: "M",
  },
  {
    quote:
      "El acabado y la textura de las pieles que recibimos de Malpe son perfectos para nuestras colecciones de lujo. Nuestros clientes siempre quedan impresionados.",
    company: "CUERO PREMIUM",
    role: "ÁREA DE CALIDAD",
    initial: "C",
  },
  {
    quote:
      "Trabajar con Malpe ha sido una experiencia excepcional. Su compromiso con la sostenibilidad y la calidad nos alinea perfectamente con nuestros valores corporativos.",
    company: "ECO LEATHER",
    role: "GERENCIA DE SUSTENTABILIDAD",
    initial: "E",
  },
  {
    quote:
      "La variedad de colores y texturas que ofrece Malpe nos permite ser creativos en nuestros diseños. Es el socio perfecto para nuestra marca innovadora.",
    company: "DESIGN LEATHER",
    role: "DIRECCIÓN CREATIVA",
    initial: "D",
  },
];

const brandLogos = [
  { name: "SANTINI", style: "font-bold tracking-[0.3em]" },
  { name: "CARIBU", style: "font-bold tracking-[0.2em]" },
  { name: "Lobo Solo", style: "font-serif italic tracking-wide" },
  { name: "CHRISTIAN GALLERY", style: "font-light tracking-[0.25em]" },
];

export function Testimonials() {
  // Calculate number of sets (3 testimonials per set)
  const testimonialsPerSet = 3;
  const totalSets = Math.ceil(testimonials.length / testimonialsPerSet);
  const [activeSetIndex, setActiveSetIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSetIndex((prev) => (prev + 1) % totalSets);
    }, 6000);

    return () => clearInterval(interval);
  }, [totalSets]);

  const handleIndicatorClick = (setIndex: number) => {
    if (setIndex !== activeSetIndex) {
      setActiveSetIndex(setIndex);
    }
  };

  // Get the starting index for the current set
  const getSetStartIndex = (setIndex: number) => {
    return setIndex * testimonialsPerSet;
  };

  return (
    <section className="bg-[#121212] py-20 md:py-28 overflow-hidden">
      <div className="max-w-[85%] mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#D4AF37] text-xs md:text-sm font-semibold uppercase tracking-[0.3em] mb-4 block">
            Testimonios
          </span>
          <h2 className="font-semibold text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Somos la mejor opción.
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            Nuestra misión es ser el mejor proveedor de pieles de cuero,
            cumpliendo con los estándares más altos de calidad y servicio.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 relative">
          {/* Render 3 card positions, each with all possible testimonials overlaid */}
          {[0, 1, 2].map((position) => {
            const setStartIndex = getSetStartIndex(activeSetIndex);
            const testimonialIndexInSet = setStartIndex + position;
            
            return (
              <div key={position} className="relative min-h-[280px]">
                {/* Overlay all testimonials for this position */}
                {testimonials.map((testimonial, testimonialIndex) => {
                  // Calculate which testimonial should be visible at this position
                  const isVisible = testimonialIndex === testimonialIndexInSet && testimonialIndex < testimonials.length;
                  const isCenter = position === 1;

                  return (
                    <div
                      key={testimonialIndex}
                      className={`absolute inset-0 p-8 rounded-2xl transition-all duration-1000 ease-in-out ${
                        isCenter
                          ? "bg-[#2a2520] border border-[#8B5A2B]/30"
                          : "bg-[#1a1917] border border-white/5"
                      } ${
                        isVisible
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-8 pointer-events-none"
                      }`}
                    >
                      {/* Quote */}
                      <blockquote className="mb-8">
                        <p className="text-gray-300 text-sm md:text-base leading-relaxed italic">
                          "{testimonial.quote}"
                        </p>
                      </blockquote>

                      {/* Author */}
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-500 ${
                            isCenter
                              ? "bg-[#8B5A2B] text-white"
                              : "bg-[#2a2520] text-gray-300 border border-white/10"
                          }`}
                        >
                          {testimonial.initial}
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-sm tracking-wide">
                            {testimonial.company}
                          </h4>
                          <p className="text-gray-500 text-xs uppercase tracking-wider">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>

                      {/* Decorative corner */}
                      <div className="absolute top-6 right-6 text-[#8B5A2B]/20 text-6xl font-serif leading-none">
                        "
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center gap-2 mb-16">
          {Array.from({ length: totalSets }).map((_, setIndex) => (
            <button
              key={setIndex}
              onClick={() => handleIndicatorClick(setIndex)}
              className={`h-2 rounded-full transition-all duration-300 ${
                setIndex === activeSetIndex
                  ? "w-8 bg-[#8B5A2B]"
                  : "w-2 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to testimonial set ${setIndex + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Logo Marquee */}
      <div className="relative border-t border-b border-white/5 py-10 overflow-hidden">
        {/* Gradient overlays for seamless effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#121212] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#121212] to-transparent z-10 pointer-events-none"></div>

        {/* Marquee container */}
        <div className="flex animate-marquee">
          {/* First set of logos */}
          {[...Array(4)].map((_, setIndex) => (
            <div key={setIndex} className="flex shrink-0">
              {brandLogos.map((brand, index) => (
                <div
                  key={`${setIndex}-${index}`}
                  className="flex items-center justify-center px-12 md:px-20"
                >
                  <span
                    className={`text-gray-500 hover:text-[#8B5A2B] transition-colors duration-300 text-lg md:text-xl whitespace-nowrap ${brand.style}`}
                  >
                    {brand.name}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* CSS for animations */}
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-25%);
          }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
