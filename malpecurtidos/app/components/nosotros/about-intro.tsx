export function AboutIntro() {
  return (
    <section className="bg-[#FAF8F5] py-16 md:py-24 lg:py-32 px-4 md:px-8">
      <div className="max-w-[80%] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Image with diagonal solid container behind */}
          <div className="relative py-8 px-4">
            {/* Diagonal solid container behind */}
            <div 
              className="absolute top-0 left-0 w-[85%] h-[95%] bg-[#4A3728]/20 rounded-lg"
              style={{ transform: "rotate(-3deg)" }}
            ></div>
            
            {/* Main image container */}
            <div className="relative rounded-lg overflow-hidden shadow-2xl border-4 border-white aspect-[4/5]">
              <img
                src="/about-imgs/intro.webp"
                alt="Introducción de Malpe Curtidos"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-6 md:space-y-8">
            {/* Title */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 leading-tight">
              Más que una tenería, somos{" "}
              <span className="text-[#4A3728]">artesanos de la innovación.</span>
            </h2>

            {/* Paragraphs */}
            <div className="space-y-5 text-gray-600 leading-relaxed">
              <p className="text-base md:text-lg">
                En Malpe, estamos comprometidos en ofrecer pieles excepcionales mediante procesos innovadores, apoyados en un equipo comprometido y altamente capacitado.
              </p>
              <p className="text-base md:text-lg">
                Por más de 25 años, la calidad de nuestros productos es el reflejo de la dedicación con la que trabajamos cada día, asegurando a nuestros clientes la mejor materia prima para sus proyectos de tapicería y calzado.
              </p>
            </div>

            {/* Features */}
            <div className="flex flex-col sm:flex-row gap-8 pt-4">
              {/* Calidad Certificada */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#4A3728]/10 flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-[#4A3728]"
                  >
                    <path
                      d="M9 12L11 14L15 10M12 3L13.9101 4.87147L16.5 4.20577L17.2184 6.78155L19.7942 7.5L19.1285 10.0899L21 12L19.1285 13.9101L19.7942 16.5L17.2184 17.2184L16.5 19.7942L13.9101 19.1285L12 21L10.0899 19.1285L7.5 19.7942L6.78155 17.2184L4.20577 16.5L4.87147 13.9101L3 12L4.87147 10.0899L4.20577 7.5L6.78155 6.78155L7.5 4.20577L10.0899 4.87147L12 3Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Calidad Certificada</h3>
                  <p className="text-sm text-gray-500">Estándares internacionales ISO.</p>
                </div>
              </div>

              {/* Alcance Global */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#4A3728]/10 flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-[#4A3728]"
                  >
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                    <path
                      d="M12 3C12 3 8 6 8 12C8 18 12 21 12 21"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M12 3C12 3 16 6 16 12C16 18 12 21 12 21"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Alcance Global</h3>
                  <p className="text-sm text-gray-500">Exportando a más de 15 países.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

