import { Link } from "react-router";
import type { ShowroomProduct } from "~/data/showroomData";

interface ShowroomCardProps {
  product: ShowroomProduct;
}

export function ShowroomCard({ product }: ShowroomCardProps) {
  // Use first skin option of first collection as main image
  const firstCollection = product.collections[0];
  const mainImage = product.defaultImage || firstCollection?.options[0]?.productImage || "/placeholder.jpg";

  // Calculate total options for display
  const totalOptions = product.collections.reduce((acc, col) => acc + col.options.length, 0);

  // Get a preview of colors (mix of both collections)
  const previewColors = product.collections.flatMap(c => c.options).slice(0, 4);

  return (
    <Link
      to={`/showroom/${product.id}`}
      className="group block"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#F5F2ED] mb-6 shadow-sm group-hover:shadow-xl transition-all duration-500">
        <img
          src={mainImage}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-103 transition-transform duration-700"
          loading="lazy"
        />
      </div>

      {/* Content Below */}
      <div className="px-1">
        {/* Category Badge */}
        <p className="text-xs font-sans font-bold text-[#967D59] uppercase tracking-[0.2em] mb-2">
          {product.category}
        </p>

        {/* Product Name */}
        <h3 className="text-2xl md:text-3xl font-semibold text-[#1A1816] leading-tight mb-4 group-hover:text-[#967D59] transition-colors">
          {product.name}
        </h3>

        {/* Collections info */}
        <div className="flex flex-col gap-3 mb-6">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-1.5">
              {previewColors.map((option, idx) => (
                <div
                  key={idx}
                  className="w-5 h-5 rounded-full border border-white shadow-sm ring-1 ring-black/5"
                  style={{ backgroundColor: option.colorHex }}
                />
              ))}
              {totalOptions > 4 && (
                <div className="w-5 h-5 rounded-full border border-white bg-gray-100 flex items-center justify-center text-[8px] font-bold text-gray-500 ring-1 ring-black/5">
                  +{totalOptions - 4}
                </div>
              )}
            </div>
            <p className="text-xs text-gray-400 font-sans uppercase tracking-widest">
              Gama de Colores
            </p>
          </div>
          <p className="text-xs text-gray-600 font-sans border-l-2 border-[#967D59] pl-3 py-0.5">
            Colecciones: <span className="text-[#1A1816] font-semibold">{product.collections.map(c => c.name).join(" + ")}</span>
          </p>
        </div>

        {/* CTA Link */}
        <div className="pt-2 border-t border-gray-100">
          <span className="text-sm font-bold text-[#1A1816] uppercase tracking-widest group-hover:text-[#4A3728] transition-colors inline-flex items-center gap-2">
            Ver Aplicaciones <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}

