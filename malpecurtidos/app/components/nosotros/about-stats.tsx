import { Link } from "react-router";

export function AboutStats() {
  return (
    <section className="bg-[#0A0A0A] py-20 md:py-32 px-4 md:px-8 overflow-hidden">
      <div className="max-w-[80%] mx-auto">
        <div className="grid lg:grid-cols-2 gap-24 lg:gap-24 items-center">
          {/* Left - Image and Floating Stats Card */}
          <div className="relative order-2 lg:order-1 pt-12 lg:pt-0">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-2xl">
              <img
                src="/about-imgs/stats.webp"
                alt="Estadísticas de Malpe Curtidos"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>

            {/* Stats Card - Floating style like the reference image */}
            <div className="absolute -bottom-16 -right-4 md:-right-10 bg-[#121212]/95 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-xl shadow-2xl max-w-[280px] md:max-w-[320px] z-20">
              <div className="mb-6">
                <span className="text-[#4A3728] text-xs font-bold tracking-[0.2em] uppercase">Stats</span>
                <div className="h-[1px] w-full bg-white/10 mt-2"></div>
              </div>

              <div className="space-y-6 md:space-y-8">
                {/* 1500+ Diseños - Tag Icon */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#4A3728]" stroke="currentColor" strokeWidth="1.5">
                      <path d="M7 7H7.01M13.4142 4.58579L20.4142 11.5858C21.1953 12.3668 21.1953 13.6332 20.4142 14.4142L14.4142 20.4142C13.6332 21.1953 12.3668 21.1953 11.5858 20.4142L4.58579 13.4142C3.99309 12.8215 3.66016 12.0176 3.66016 11.1799V5.66016C3.66016 4.55559 4.55559 3.66016 5.66016 3.66016H11.1799C12.0176 3.66016 12.8215 3.99309 13.4142 4.58579Z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-bold text-white mb-0.5">1500+</div>
                    <div className="text-[10px] text-gray-400 uppercase tracking-wider leading-tight">
                      Diseños exclusivos
                    </div>
                  </div>
                </div>

                {/* 250+ Clientes - User Icon */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#4A3728]" stroke="currentColor" strokeWidth="1.5">
                      <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-bold text-white mb-0.5">250+</div>
                    <div className="text-[10px] text-gray-400 uppercase tracking-wider leading-tight">
                      Clientes satisfechos
                    </div>
                  </div>
                </div>

                {/* 10+ Reconocimientos - Award Icon */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#4A3728]" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 15L8.5 13L9 17L6 20L10 20.5L12 24L14 20.5L18 20L15 17L15.5 13L12 15Z" fill="currentColor" fillOpacity="0.2" />
                      <path d="M12 15L8.5 13L9 17L6 20L10 20.5L12 24L14 20.5L18 20L15 17L15.5 13L12 15Z" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-bold text-[#4A3728] mb-0.5">10+</div>
                    <div className="text-[10px] text-gray-400 uppercase tracking-wider leading-tight">
                      Reconocimientos
                    </div>
                  </div>
                </div>

                {/* 50+ Eventos - Star Icon */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#4A3728]" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-bold text-white mb-0.5">50+</div>
                    <div className="text-[10px] text-gray-400 uppercase tracking-wider leading-tight">
                      Eventos internacionales
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content inspired by reference */}
          <div className="order-1 lg:order-2 space-y-10">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-1 h-8 bg-[#4A3728]"></div>
                <span className="text-[#4A3728] text-xs md:text-sm font-bold tracking-[0.3em] uppercase">Nuestra Trayectoria</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Pasión por la <br />
                <span className="text-[#4A3728]">Piel Perfecta</span>
              </h2>
            </div>

            <p className="text-gray-400 text-lg md:text-xl font-light italic leading-relaxed">
              "Somos una empresa líder en la proveeduría de cuero, comprometidos con la excelencia artesanal y la innovación tecnológica para ofrecer productos de la más alta calidad."
            </p>

            <div className="grid md:grid-cols-2 gap-8 pt-4">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-[1px] bg-[#4A3728]"></div>
                  <h3 className="text-white font-bold tracking-widest uppercase text-sm">Misión</h3>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Proveer a la industria de la moda y tapicería con pieles de calidad superior, manteniendo procesos sustentables y vanguardistas.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-[1px] bg-[#4A3728]"></div>
                  <h3 className="text-white font-bold tracking-widest uppercase text-sm">Visión</h3>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Ser el referente global en curtidos de lujo, reconocidos por nuestra innovación constante y compromiso con el medio ambiente.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <Link
                to="/productos"
                className="inline-block px-6 py-3 font-bold text-sm md:text-base transition-all duration-300 cursor-pointer rounded-xl shadow-lg bg-[#4A3728] text-white hover:bg-[#6B4423] hover:scale-105 hover:shadow-xl hover:shadow-[#4A3728]/50 active:scale-100 tracking-wider"
              >
                Conoce nuestros productos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

