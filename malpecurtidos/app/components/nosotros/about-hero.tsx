import { Button } from "~/ui/button";

export function AboutHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/about-imgs/about-hero.webp"
          alt="Hero de Malpe Curtidos"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[85%] mx-auto px-4 md:px-8 py-20 text-center">
        {/* Subtitle */}
        <p className="text-sm md:text-base font-semibold uppercase tracking-wider text-[#D3D3D3] mb-6 md:mb-6">
          EXCELENCIA EN CURTIDOS
        </p>

        {/* Main Title */}
        <h1 className="max-w-4xl text-5xl md:text-6xl lg:text-7xl font-semibold text-white leading-tight mb-6 md:mb-6">
          Forjando el carácter de la piel desde 1995
        </h1>

        {/* Description */}
        <p className="text-base md:text-lg lg:text-xl text-[#D3D3D3] font-sans leading-relaxed mb-10 md:mb-10 max-w-3xl mx-auto">
          Somos líderes en proveeduría de cuero en Latinoamérica, combinando tradición artesanal con innovación tecnológica.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            variant="primary"
            className="uppercase tracking-wider px-8 py-4 text-sm md:text-base bg-[#6A4B3F] hover:bg-[#5A3B2F]"
          >
            NUESTRA HISTORIA
          </Button>
          <Button
            variant="secondary"
            className="uppercase tracking-wider px-8 py-4 text-sm md:text-base"
          >
            CONOCE MÁS
          </Button>
        </div>
      </div>
    </section>
  );
}

