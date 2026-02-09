import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "Trabajar con Malpe ha llevado a nuestra empresa al siguiente nivel que deseábamos hace tiempo. La consistencia en el color es inigualable.",
    company: "CARIBU",
    role: "GERENCIA DE VENTAS",
    logo: "/logos/testimonials-logos/caribu.png",
  },
  {
    quote:
      "Requeríamos desde hace tiempo una piel muy particular que sólo Malpe nos la pudo desarrollar con exactitud y entrega a tiempo.",
    company: "LOBO SOLO",
    role: "DIRECCIÓN DE COMPRAS",
    logo: "/logos/testimonials-logos/lobo_solo.png",
  },
  {
    quote:
      "Llevamos más de 5 años trabajando con Malpe y seguramente duraremos muchos más. La atención al cliente es excelente.",
    company: "SANTINI",
    role: "ÁREA DE DISEÑO",
    logo: "/logos/testimonials-logos/santini.png",
  },
];

const brandLogos = [
  { name: "Ariat", path: "/logos/logomarquee/ariat.png" },
  { name: "Boot Barn", path: "/logos/logomarquee/boot_barn.png" },
  { name: "Christian Gallery", path: "/logos/logomarquee/christian_gallery.png" },
  { name: "Llompart", path: "/logos/logomarquee/llompart.png" },
  { name: "Lobo Solo", path: "/logos/logomarquee/lobo_solo.png" },
  { name: "Magnus Leather Company", path: "/logos/logomarquee/magnus_leather_company.png" },
  { name: "Portland Leather Goods", path: "/logos/logomarquee/portland_leather_goods.png" },
  { name: "Steve Madden", path: "/logos/logomarquee/steve_madden.png" },
  { name: "Caribu", path: "/logos/logomarquee/caribu.png" },
];

// Marquee helper components
const TranslateWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ translateX: "0%" }}
      animate={{ translateX: "-100%" }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      className="flex gap-8 md:gap-12 px-4 md:px-6 min-w-max"
    >
      {children}
    </motion.div>
  );
};

const LogoItems = ({ logos }: { logos: typeof brandLogos }) => (
  <div className="flex gap-8 md:gap-12">
    {logos.map((logo) => (
      <div key={logo.name} className="flex items-center">
        <img
          src={logo.path}
          alt={logo.name}
          className="h-8 md:h-12 w-auto object-contain opacity-50 grayscale brightness-[2.5] hover:grayscale-0 hover:opacity-100 hover:brightness-100 transition-all duration-500"
        />
      </div>
    ))}
  </div>
);

export function Testimonials() {
  // Calculate number of sets (3 testimonials per set)
  const testimonialsPerSet = 3;
  const totalSets = Math.ceil(testimonials.length / testimonialsPerSet);
  const [activeSetIndex, setActiveSetIndex] = useState(0);

  useEffect(() => {
    if (totalSets <= 1) return;
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
                      className={`absolute inset-0 p-8 rounded-2xl transition-all duration-1000 ease-in-out bg-[#1a1917] border border-white/5 ${isVisible
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
                          className="w-12 h-12 rounded-full flex items-center justify-center bg-[#2a2520] border border-white/10 overflow-hidden"
                        >
                          <img
                            src={testimonial.logo}
                            alt={testimonial.company}
                            className="w-full h-full object-contain p-2"
                          />
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
        {totalSets > 1 && (
          <div className="flex justify-center gap-2 mb-16">
            {Array.from({ length: totalSets }).map((_, setIndex) => (
              <button
                key={setIndex}
                onClick={() => handleIndicatorClick(setIndex)}
                className={`h-2 rounded-full transition-all duration-300 ${setIndex === activeSetIndex
                  ? "w-8 bg-[#8B5A2B]"
                  : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                aria-label={`Go to testimonial set ${setIndex + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Logo Marquee */}
      <div className="relative border-t border-b border-white/5 py-10 overflow-hidden">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#121212] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#121212] to-transparent z-10 pointer-events-none"></div>

        {/* Marquee container with framer-motion */}
        <div className="flex w-full overflow-hidden">
          <TranslateWrapper>
            <LogoItems logos={brandLogos} />
          </TranslateWrapper>
          <TranslateWrapper>
            <LogoItems logos={brandLogos} />
          </TranslateWrapper>
          <TranslateWrapper>
            <LogoItems logos={brandLogos} />
          </TranslateWrapper>
        </div>
      </div>
    </section>
  );
}
