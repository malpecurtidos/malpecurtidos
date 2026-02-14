import { useState, useEffect } from "react";
import { Button } from "../../ui/button";
import { Link } from "react-router";

const heroSlides = [
  {
    smallTitle: "Excelencia artesanal",
    title: "Pieles que inspiran calidad.",
    description: "Curtiduría artesanal con tradición y excelencia. Transformamos pieles en productos de máxima calidad con procesos tradicionales y técnicas modernas.",
  },
  {
    smallTitle: "Maestría en cada detalle",
    title: "Arte en cada proceso.",
    description: "Cada pieza de cuero es tratada con dedicación y cuidado. Nuestro proceso de curtido garantiza durabilidad, suavidad y resistencia excepcionales.",
  },
  {
    smallTitle: "Herencia y futuro",
    title: "Tradición que perdura.",
    description: "Años de experiencia en el arte del curtido. Ofrecemos cueros de primera calidad para la industria del calzado, marroquinería y más.",
  },
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000); // Cambia cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <main className="h-screen bg-black text-white overflow-hidden">
        <section className="relative min-h-screen pt-16 md:pt-20 overflow-hidden">
          {/* Image Carousel Background */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            {heroSlides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
              >
                <img
                  src={`/home-imgs/hero/hero-${index + 1}.webp`}
                  alt={`Hero slide ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/30"></div>
          </div>

          {/* Content */}
          <div className="relative max-w-[90%] mx-auto z-10 flex flex-col lg:flex-row items-center lg:items-end justify-center lg:justify-between px-4 md:px-8 py-12 md:py-20 min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-80px)] gap-12 lg:gap-12">
            {/* Left Content - Texto grande con crossfade */}
            <div className="lg:flex-1 grid lg:items-start justify-center lg:justify-start order-2 lg:order-1 w-full lg:w-auto">
              {heroSlides.map((slide, index) => {
                // Palabras a destacar en cada título
                const highlightedWords = ["inspiran", "arte", "tradición"];
                const words = slide.title.split(" ");

                return (
                  <h1
                    key={index}
                    style={{ gridArea: "1/1/2/2" }}
                    className={`text-7xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold leading-none tracking-tighter text-white text-center sm:text-left lg:text-left transition-all duration-1000 ease-in-out ${index === currentSlide
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                      }`}
                  >
                    {words.map((word, i, arr) => {
                      const cleanWord = word.toLowerCase().replace(/[.,;:!?]/g, "");
                      const shouldHighlight = highlightedWords.some(hw => cleanWord.includes(hw.toLowerCase()));
                      return (
                        <span key={i}>
                          {shouldHighlight ? (
                            <span className="text-[#967D59] italic">{word}</span>
                          ) : (
                            word
                          )}
                          {i < arr.length - 1 && <br />}
                        </span>
                      );
                    })}
                  </h1>
                );
              })}
            </div>

            {/* Right Content - Descripción y botones con crossfade */}
            <div className="lg:flex-1 max-w-md w-full lg:w-auto order-3 lg:order-2 flex flex-col justify-start lg:justify-end items-center lg:items-end mb-8 lg:mb-12">
              <div className="grid mb-6 md:mb-8 w-full text-center sm:text-left lg:text-right">
                {heroSlides.map((slide, index) => (
                  <div
                    key={index}
                    style={{ gridArea: "1/1/2/2" }}
                    className={`transition-all duration-1000 ease-in-out ${index === currentSlide
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                      }`}
                  >
                    <h2 className="text-[#967D59] text-xs md:text-sm font-semibold uppercase tracking-wider mb-2">
                      {slide.smallTitle}
                    </h2>
                    <p className="text-gray-200 leading-relaxed text-sm md:text-base">
                      {slide.description}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center sm:justify-start lg:justify-end">
                <Link to="/productos">
                  <Button variant="glassmorphism">
                    Explorar Catálogo
                  </Button>
                </Link>
                <Link to="/showroom">
                  <Button variant="secondary">
                    Descubre más
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide
                  ? "w-8 bg-[#4A3728]"
                  : "w-2 bg-white/50 hover:bg-white/75"
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

