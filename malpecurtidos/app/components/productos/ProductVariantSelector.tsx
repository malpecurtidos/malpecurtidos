import React from "react";
import type { ProductVariant } from "~/data/productsData";

interface ProductVariantSelectorProps {
  variants: ProductVariant[];
  selectedVariant: ProductVariant;
  onSelectVariant: (variant: ProductVariant) => void;
}

export function ProductVariantSelector({
  variants,
  selectedVariant,
  onSelectVariant,
}: ProductVariantSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-black">
        Color: <span className="font-bold text-black">{selectedVariant.name}</span>
      </label>
      <div className="flex flex-wrap gap-3">
        {variants.map((variant) => (
          <button
            key={variant.id}
            onClick={() => onSelectVariant(variant)}
            className={`w-10 h-10 rounded-full border-2 transition-all duration-200 relative group focus:outline-none ${
              selectedVariant.id === variant.id
                ? "border-[#4A3728] ring-2 ring-[#4A3728]/20 scale-110"
                : "border-gray-200 hover:scale-105"
            }`}
            style={{ backgroundColor: variant.colorHex }}
            title={variant.name}
            aria-label={`Select color ${variant.name}`}
          >
            {selectedVariant.id === variant.id && (
              <span className="absolute inset-0 flex items-center justify-center text-white drop-shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
            )}
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-[#1A1816] text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
              {variant.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

