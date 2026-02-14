import { Button } from "~/ui/button";

export function Cta2() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/home-imgs/cta-classic/cta-classic.webp"
          alt="Malpe leather craftsmanship"
          className="w-full h-full object-cover"
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center space-y-8">
          {/* Heading */}
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              ¿Necesitas una cotización?
            </h2>
            <p className="text-lg md:text-xl text-white max-w-2xl mx-auto leading-relaxed">
              Obtén una cotización personalizada y descubre cómo podemos llevar tu visión a la realidad con nuestras pieles de calidad excepcional.
            </p>
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 pt-4">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-[#FFFFFF]/10 flex items-center justify-center border border-[#4A3728]/20">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-white"
                >
                  <path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 17L12 22L22 17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12L12 17L22 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-white text-sm md:text-base">
                Respuesta Rápida
              </h3>
              <p className="text-white text-xs md:text-sm text-center">
                Cotización en 24 horas
              </p>
            </div>

            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-[#FFFFFF]/10 flex items-center justify-center border border-[#4A3728]/20">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-white"
                >
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 6V12L16 14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-white text-sm md:text-base">
                Sin Compromiso
              </h3>
              <p className="text-white text-xs md:text-sm text-center">
                Consulta gratuita
              </p>
            </div>

            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-[#FFFFFF]/10 flex items-center justify-center border border-[#4A3728]/20">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-white"
                >
                  <path
                    d="M9 11L12 14L22 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-white text-sm md:text-base">
                Personalizado
              </h3>
              <p className="text-white text-xs md:text-sm text-center">
                Soluciones a tu medida
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-6">
            <Button
              variant="primary"
              className="hover:scale-110 hover:shadow-2xl hover:shadow-[#4A3728]/30 text-base md:text-lg px-8 py-4 tracking-wide"
            >
              Solicitar Cotización Gratuita
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

