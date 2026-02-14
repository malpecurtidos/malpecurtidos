import { Link } from "react-router";

const cards = [
  {
    id: "eventos",
    label: "INTERNACIONAL",
    title: "Eventos",
    link: "/eventos",
    image: "/home-imgs/cards/eventos.webp",
  },
  {
    id: "productos",
    label: "PRODUCTOS",
    title: "Productos",
    link: "/productos",
    image: "/home-imgs/cards/productos.webp",
  },
  {
    id: "showroom",
    label: "INNOVACIÓN",
    title: "Showroom",
    link: "/showroom",
    image: "/showroom-imgs/bota_dama/bota_dama.webp",
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
                <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                {/* Dark gradient overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              </div>

              {/* Text Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                {card.label && (
                  <p className="text-sm md:text-base font-sans font-semibold text-[#967D59] uppercase tracking-wider mb-2">
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

