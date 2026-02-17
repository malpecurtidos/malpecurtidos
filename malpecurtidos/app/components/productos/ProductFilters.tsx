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
    <div className="space-y-8 bg-zinc-900 backdrop-blur-sm rounded-xl p-6 border border-zinc-800 shadow-lg">
      <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
        <h3 className="text-lg font-semibold text-white uppercase tracking-wider">Filtros</h3>
        <button
          onClick={clearFilters}
          className="text-xs text-gray-400 hover:text-[#967D59] uppercase tracking-wider font-semibold transition-colors"
        >
          Limpiar Todo
        </button>
      </div>

      {/* Categories */}
      <div className="space-y-4">
        <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Mercado</h4>
        <div className="space-y-3">
          {availableCategories.map((category) => (
            <label key={category} className="flex items-center gap-3 cursor-pointer group select-none">
              <div className="relative flex items-center justify-center w-5 h-5 rounded border border-zinc-700 bg-black group-hover:border-[#967D59] transition-all">
                <input
                  type="checkbox"
                  className="peer appearance-none w-full h-full absolute inset-0 cursor-pointer"
                  checked={filters.category.includes(category)}
                  onChange={() => handleCheckboxChange("category", category)}
                />
                {filters.category.includes(category) && (
                  <div className="w-2.5 h-2.5 bg-[#967D59] rounded-sm shadow-[0_0_10px_rgba(150,125,89,0.5)] pointer-events-none" />
                )}
              </div>
              <span className={`text-sm transition-colors capitalize font-sans ${filters.category.includes(category) ? "text-white font-medium" : "text-gray-400 group-hover:text-gray-300"}`}>
                {category.replace("-", " ")}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Finishes */}
      <div className="space-y-4">
        <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Curtido / Acabado</h4>
        <div className="space-y-3">
          {availableFinishes.map((finish) => (
            <label key={finish} className="flex items-center gap-3 cursor-pointer group select-none">
              <div className="relative flex items-center justify-center w-5 h-5 rounded border border-zinc-700 bg-black group-hover:border-[#967D59] transition-all">
                <input
                  type="checkbox"
                  className="peer appearance-none w-full h-full absolute inset-0 cursor-pointer"
                  checked={filters.finish.includes(finish)}
                  onChange={() => handleCheckboxChange("finish", finish)}
                />
                {filters.finish.includes(finish) && (
                  <div className="w-2.5 h-2.5 bg-[#967D59] rounded-sm shadow-[0_0_10px_rgba(150,125,89,0.5)] pointer-events-none" />
                )}
              </div>
              <span className={`text-sm transition-colors capitalize font-sans ${filters.finish.includes(finish) ? "text-white font-medium" : "text-gray-400 group-hover:text-gray-300"}`}>
                {finish.replace("-", " ")}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Thickness */}
      <div className="space-y-4">
        <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Grosor (mm)</h4>
        <div className="space-y-3">
          {availableThicknesses.map((thickness) => (
            <label key={thickness} className="flex items-center gap-3 cursor-pointer group select-none">
              <div className="relative flex items-center justify-center w-5 h-5 rounded border border-zinc-700 bg-black group-hover:border-[#967D59] transition-all">
                <input
                  type="checkbox"
                  className="peer appearance-none w-full h-full absolute inset-0 cursor-pointer"
                  checked={filters.thickness.includes(thickness)}
                  onChange={() => handleCheckboxChange("thickness", thickness)}
                />
                {filters.thickness.includes(thickness) && (
                  <div className="w-2.5 h-2.5 bg-[#967D59] rounded-sm shadow-[0_0_10px_rgba(150,125,89,0.5)] pointer-events-none" />
                )}
              </div>
              <span className={`text-sm transition-colors font-sans ${filters.thickness.includes(thickness) ? "text-white font-medium" : "text-gray-400 group-hover:text-gray-300"}`}>
                {thickness}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

