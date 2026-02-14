export function ContactHero() {
  return (
    <section className="relative h-[40vh] min-h-[500px] w-full overflow-hidden flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="/home-imgs/hero/hero-2.webp"
          alt="Contacto MALPE"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0f0f0f]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
          Hablemos de <span className="text-[#967D59]">Calidad</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed">
          Estamos aquí para responder tus dudas y ayudarte a encontrar la piel perfecta para tus proyectos.
        </p>
      </div>
    </section>
  );
}

