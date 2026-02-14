import { showroomProducts, categoryLabels } from "~/data/showroomData";
import { ShowroomCard } from "./ShowroomCard";

export function ShowroomGrid() {
  // Group products by category
  const productsByCategory = showroomProducts.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, typeof showroomProducts>);

  // Custom descriptions for each category
  const categoryDescriptions: Record<string, string> = {
    calzado: "Explora nuestra selección de calzado premium, desde botas western artesanales hasta sneakers urbanos, diseñados para resaltar la calidad de nuestras pieles.",
    marroquineria: "Accesorios que definen distinción. Visualiza la elegancia y textura de nuestras pieles aplicadas en bolsos y portafolios de alta gama."
  };

  // Ensure consistent order
  const categoryOrder = ["calzado", "marroquineria"];

  return (
    <section className="bg-white py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-[85%] mx-auto">
        <div className="space-y-32">
          {categoryOrder.map((categoryKey) => {
            const products = productsByCategory[categoryKey];
            if (!products || products.length === 0) return null;

            return (
              <div key={categoryKey} className="relative">
                {/* Category Header */}
                <div className="flex flex-col items-center text-center mb-16 relative z-10">
                  <span className="text-[#967D59] text-xs font-bold uppercase tracking-[0.2em] mb-3">
                    Showroom Destacado
                  </span>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#1A1816] mb-6">
                    {categoryLabels[categoryKey]}
                  </h2>
                  <div className="w-px h-16 bg-gradient-to-b from-[#4A3728] to-transparent mb-6"></div>
                  <p className="text-gray-500 font-sans text-lg md:text-xl max-w-2xl leading-relaxed">
                    {categoryDescriptions[categoryKey] || "Productos destacados"}
                  </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                  {products.map((product) => (
                    <ShowroomCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action Footer in Grid */}
        <div className="mt-32 text-center bg-[#F5F2ED] rounded-3xl p-12 md:p-20 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-semibold text-[#1A1816] mb-6">
              ¿Tienes un diseño en mente?
            </h3>
            <p className="text-gray-600 mb-8 font-sans text-lg">
              Podemos desarrollar la piel perfecta para tu próxima colección. Contáctanos para recibir asesoría personalizada.
            </p>
            <a
              href="/contacto"
              className="inline-block bg-[#1A1816] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#4A3728] transition-colors duration-300 uppercase tracking-wider text-sm"
            >
              Contactar a Ventas
            </a>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-[#967D59]/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#4A3728]/5 rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>
      </div>
    </section>
  );
}

