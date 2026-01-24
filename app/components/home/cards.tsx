import { Link } from "react-router";

const cards = [
  {
    id: "eventos",
    label: "INTERNACIONAL",
    title: "Eventos",
    link: "/eventos",
  },
  {
    id: "productos",
    label: "CATÁLOGO",
    title: "Productos",
    link: "/catálogo",
  },
  {
    id: "novedades",
    label: "INNOVACIÓN",
    title: "Novedades",
    link: "/tendencias",
  },
];

export function Cards() {
  return (
    <section className="bg-white py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-[85%] mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-4 leading-tight">
            Nuestra Actividad
          </h2>
          <p className="text-lg md:text-xl text-gray-700 font-sans">
            Explora lo último en el mundo Malpe
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {cards.map((card) => (
            <Link
              key={card.id}
              to={card.link}
              className="group relative overflow-hidden rounded-xl aspect-[4/5] md:aspect-[3/4] cursor-pointer"
            >
              {/* Image Container */}
              <div className="absolute inset-0 w-full h-full bg-gray-300 flex items-center justify-center">
                <svg className="w-20 h-20 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {/* Dark gradient overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              </div>

              {/* Text Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                {card.label && (
                  <p className="text-sm md:text-base font-sans font-semibold text-[#D4AF37] uppercase tracking-wider mb-2">
                    {card.label}
                  </p>
                )}
                <h3 className="text-4xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight">
                  {card.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
