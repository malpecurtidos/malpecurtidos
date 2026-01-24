import React from "react";
import { Button } from "~/ui/button";

interface FilterState {
  category: string[];
  finish: string[];
  thickness: string[];
}

interface ProductFiltersProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  clearFilters: () => void;
  availableCategories: string[];
  availableFinishes: string[];
  availableThicknesses: string[];
}

export function ProductFilters({
  filters,
  setFilters,
  clearFilters,
  availableCategories,
  availableFinishes,
  availableThicknesses,
}: ProductFiltersProps) {
  const handleCheckboxChange = (
    section: keyof FilterState,
    value: string
  ) => {
    setFilters((prev) => {
      const current = prev[section];
      const updated = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
      return { ...prev, [section]: updated };
    });
  };

  return (
    <div className="space-y-8 bg-white backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 shadow-lg">
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-black uppercase tracking-wider">Filtros</h3>
        <button
          onClick={clearFilters}
          className="text-xs text-black hover:text-[#D4AF37] uppercase tracking-wider font-semibold transition-colors"
        >
          Limpiar Todo
        </button>
      </div>

      {/* Categories */}
      <div className="space-y-4">
        <h4 className="text-xs font-semibold text-black uppercase tracking-wider">Mercado</h4>
        <div className="space-y-3">
          {availableCategories.map((category) => (
            <label key={category} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.category.includes(category)}
                onChange={() => handleCheckboxChange("category", category)}
                className="w-4 h-4 rounded border-gray-300 text-[#8B5A2B] focus:ring-[#8B5A2B] focus:ring-2"
              />
              <span className="text-sm text-black group-hover:text-[#8B5A2B] transition-colors capitalize font-sans">
                {category.replace("-", " ")}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Finishes */}
      <div className="space-y-4">
        <h4 className="text-xs font-semibold text-black uppercase tracking-wider">Curtido / Acabado</h4>
        <div className="space-y-3">
          {availableFinishes.map((finish) => (
            <label key={finish} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.finish.includes(finish)}
                onChange={() => handleCheckboxChange("finish", finish)}
                className="w-4 h-4 rounded border-gray-300 text-[#8B5A2B] focus:ring-[#8B5A2B] focus:ring-2"
              />
              <span className="text-sm text-black group-hover:text-[#8B5A2B] transition-colors capitalize font-sans">
                {finish.replace("-", " ")}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Thickness */}
      <div className="space-y-4">
        <h4 className="text-xs font-semibold text-black uppercase tracking-wider">Grosor (mm)</h4>
        <div className="space-y-3">
          {availableThicknesses.map((thickness) => (
            <label key={thickness} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.thickness.includes(thickness)}
                onChange={() => handleCheckboxChange("thickness", thickness)}
                className="w-4 h-4 rounded border-gray-300 text-[#8B5A2B] focus:ring-[#8B5A2B] focus:ring-2"
              />
              <span className="text-sm text-gray-700 group-hover:text-[#8B5A2B] transition-colors font-sans">
                {thickness}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
