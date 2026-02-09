export function Features() {
  const features = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="currentColor"
            fillOpacity="0.1"
          />
          <path
            d="M9 12L11 14L15 10"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Calidad Superior",
      description:
        "Compromiso inquebrantable con la excelencia en cada proceso",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 6V12L16 14"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 2H15"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 22H15"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 9V15"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M22 9V15"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Innovación Constante",
      description:
        "Tecnología de punta y métodos vanguardistas",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Equipo Experto",
      description:
        "Personal altamente capacitado y comprometido",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 12L11 15L16 9"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Confiabilidad",
      description:
        "Entrega consistente y servicio excepcional",
    },
  ];

  return (
    <section className="bg-[#F9F7F2] py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-[85%] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Section - Text Content */}
          <div className="space-y-6">
            <div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-4 leading-tight">
                Innovación y Tradición
              </h2>
              <div className="flex flex-col">
                <h3 className="text-2xl md:text-3xl font-semibold text-[#8B5A2B] mb-2">
                  Nuestra Empresa
                </h3>
                <div className="w-16 h-0.5 bg-[#8B5A2B]"></div>
              </div>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p className="text-base md:text-lg">
                Estamos comprometidos en ofrecer pieles excepcionales mediante
                procesos innovadores, apoyados en un equipo comprometido y
                altamente capacitado.
              </p>
              <p className="text-base md:text-lg">
                Por más de 25 años, la calidad de nuestros productos es el
                reflejo de la dedicación con la que trabajamos cada día,
                asegurando a nuestros clientes la mejor materia prima para sus
                proyectos de tapicería y calzado.
              </p>
            </div>
          </div>

          {/* Right Section - Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-[#8B5A2B]/10 flex items-center justify-center mb-4 text-[#8B5A2B]">
                  <div className="w-8 h-8">{feature.icon}</div>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
