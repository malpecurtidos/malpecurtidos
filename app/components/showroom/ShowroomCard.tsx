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
      className="group relative overflow-hidden rounded-xl aspect-[4/5] md:aspect-[4/5] cursor-pointer"
    >
      {/* Image Container */}
      <div className="absolute inset-0 w-full h-full bg-gray-300 flex items-center justify-center overflow-hidden">
        <img
          src={mainImage}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      </div>

      {/* Text Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10">
        {/* Category Badge */}
        <p className="text-sm md:text-base font-sans font-semibold text-[#D4AF37] uppercase tracking-wider mb-2">
          {product.category}
        </p>

        {/* Product Name */}
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight mb-3">
          {product.name}
        </h3>

        {/* Collections info */}
        <div className="flex flex-col gap-1 mb-4">
          <div className="flex -space-x-2 mb-2">
            {previewColors.map((option, idx) => (
              <div
                key={idx}
                className="w-5 h-5 rounded-full border-2 border-white/80 shadow-sm"
                style={{ backgroundColor: option.colorHex }}
              />
            ))}
            {totalOptions > 4 && (
              <div className="w-5 h-5 rounded-full border-2 border-white/80 bg-white/20 flex items-center justify-center text-[8px] font-bold text-white">
                +{totalOptions - 4}
              </div>
            )}
          </div>
          <p className="text-xs text-white/80 font-sans">
            Colecciones: <span className="text-white font-semibold">{product.collections.map(c => c.name).join(" + ")}</span>
          </p>
        </div>

        {/* CTA Link */}
        <div className="pt-2 border-t border-white/20">
          <span className="text-sm font-semibold text-white uppercase tracking-wider group-hover:text-[#D4AF37] transition-colors">
            Ver Aplicaciones →
          </span>
        </div>
      </div>
    </Link>
  );
}
