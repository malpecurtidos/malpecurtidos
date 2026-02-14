import React from "react";
import { Button } from "~/ui/button";

interface FilterState {
  category: string[];
}

interface ShowroomFiltersProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  clearFilters: () => void;
  availableCategories: string[];
}

export function ShowroomFilters({
  filters,
  setFilters,
  clearFilters,
  availableCategories,
}: ShowroomFiltersProps) {
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
          className="text-xs text-black hover:text-[#967D59] uppercase tracking-wider font-semibold transition-colors"
        >
          Limpiar Todo
        </button>
      </div>

      {/* Categories */}
      <div className="space-y-4">
        <h4 className="text-xs font-semibold text-black uppercase tracking-wider">Categoría</h4>
        <div className="space-y-3">
          {availableCategories.map((category) => (
            <label key={category} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.category.includes(category)}
                onChange={() => handleCheckboxChange("category", category)}
                className="w-4 h-4 rounded border-gray-300 text-[#4A3728] focus:ring-[#4A3728] focus:ring-2"
              />
              <span className="text-sm text-black group-hover:text-[#4A3728] transition-colors capitalize font-sans">
                {category.replace("-", " ")}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

