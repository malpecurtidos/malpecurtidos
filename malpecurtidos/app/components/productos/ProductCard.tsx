import { Link } from "react-router";
import type { Product } from "~/data/productsData";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  // Use the first variant's image as the main image
  const mainImage = product.variants[0]?.images[0] || "/placeholder.jpg";

  return (
    <Link
      to={`/productos/${product.id}`}
      className="group relative overflow-hidden rounded-xl aspect-[4/5] md:aspect-[3/4] cursor-pointer"
    >
      {/* Image Container */}
      <div className="absolute inset-0 w-full h-full bg-gray-300 flex items-center justify-center overflow-hidden">
        <img
          src={mainImage}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        {/* Dark gradient overlay at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121111]/80 via-[#121111]/40 to-transparent"></div>
      </div>

      {/* Text Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10">
        {/* Category Label */}
        <p className="text-sm md:text-base font-sans font-semibold text-[#967D59] uppercase tracking-wider mb-2">
          {product.category.replace("-", " ")}
        </p>

        {/* Product Name */}
        <h3 className="text-2xl md:text-2xl lg:text-2xl font-semibold text-white leading-tight mb-3">
          {product.name}
        </h3>

        {/* Variants and Finish */}
        <div className="flex items-center gap-3 mb-3">
          <div className="flex -space-x-2">
            {product.variants.slice(0, 4).map((variant) => (
              <div
                key={variant.id}
                className="w-5 h-5 rounded-full border-2 border-white/80 shadow-sm"
                style={{ backgroundColor: variant.colorHex }}
                title={variant.name}
              />
            ))}
            {product.variants.length > 4 && (
              <div className="w-5 h-5 rounded-full border-2 border-white/80 bg-white/20 flex items-center justify-center text-[8px] font-bold text-white">
                +{product.variants.length - 4}
              </div>
            )}
          </div>
          <span className="text-xs text-white/70 font-sans">
            {product.variants.length} colores • {product.finish}
          </span>
        </div>

        {/* CTA Link */}
        <div className="pt-2 border-t border-white/20">
          <span className="text-sm font-semibold text-white uppercase tracking-wider group-hover:text-[#967D59] transition-colors">
            Ver Detalles →
          </span>
        </div>
      </div>
    </Link>
  );
}

