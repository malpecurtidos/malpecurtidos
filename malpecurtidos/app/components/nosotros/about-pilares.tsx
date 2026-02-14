export function AboutPilares() {
  const pilares = [
    {
      id: "01",
      title: "Tendencias Actuales",
      description: "Ingenieros y diseñadores en constante búsqueda de las últimas tendencias globales en colores y acabados.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 8h16M4 16h16M8 5v6M16 13v6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: "02",
      title: "Productos de Calidad",
      description: "Productos respaldados por la mejor calidad y un compromiso inquebrantable con la mejora continua.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: "03",
      title: "Atención Personal",
      description: "Eres importante para nosotros. Estamos listos para atenderte de manera personal y profesional.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8z" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M17 11l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: "04",
      title: "Liderazgo Comercial",
      description: "La experiencia y profesionalización de nuestros servicios nos ha posicionado como líderes del mercado.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="3"/>
          <circle cx="19" cy="5" r="2"/>
          <circle cx="5" cy="19" r="2"/>
          <circle cx="19" cy="19" r="2"/>
          <circle cx="5" cy="5" r="2"/>
          <path d="M17.5 6.5l-3.5 3.5M6.5 17.5l3.5-3.5M17.5 17.5l-3.5-3.5M6.5 6.5l3.5 3.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
  ];

  return (
    <section className="bg-[#FAF8F5] py-24 md:py-32 px-4 md:px-8 relative overflow-hidden">
      <div className="max-w-[80%] mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6">
          <div className="max-w-2xl">
            <div className="inline-block px-4 py-1.5 bg-[#4A3728]/10 rounded-full mb-6">
              <span className="text-[#4A3728] text-xs font-bold tracking-[0.2em] uppercase">Nuestros Pilares</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight">
              Por qué somos la <br />
              <span className="text-[#4A3728]">mejor opción</span>
            </h2>
          </div>
          <p className="text-gray-500 max-w-sm text-lg leading-relaxed border-l-2 border-[#4A3728]/20 pl-6 hidden md:block">
            Nuestra base se construye sobre la excelencia y el compromiso con cada detalle.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pilares.map((pilar, idx) => (
            <div 
              key={idx} 
              className="group relative bg-white p-8 md:p-10 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
            >
              {/* Pillar Number - Background Decoration */}
              <span className="absolute -top-0 right-2 text-8xl font-black text-gray-50 group-hover:text-[#4A3728]/5 transition-colors duration-500 pointer-events-none select-none">
                {pilar.id}
              </span>

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-[#4A3728] flex items-center justify-center mb-8 shadow-lg shadow-[#4A3728]/20">
                  <div className="w-7 h-7 text-white">
                    {pilar.icon}
                  </div>
                </div>

                <h4 className="text-xl font-bold text-gray-900 mb-4 tracking-tight group-hover:text-[#4A3728] transition-colors duration-300">
                  {pilar.title}
                </h4>
                
                <p className="text-gray-500 text-sm leading-relaxed">
                  {pilar.description}
                </p>
                
                {/* Decorative Line that grows on hover */}
                <div className="mt-8 h-1 w-10 bg-[#4A3728]/20 rounded-full overflow-hidden">
                  <div className="h-full w-full bg-[#4A3728] -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-in-out"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

