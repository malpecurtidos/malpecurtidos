import React from "react";
import { Button } from "~/ui/button";

interface FilterState {
  category: string[];
  tags: string[];
  featured: boolean | null; // null = todos, true = solo destacados, false = solo no destacados
}

interface ShowroomFiltersProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  clearFilters: () => void;
  availableCategories: string[];
  availableTags: string[];
}

export function ShowroomFilters({
  filters,
  setFilters,
  clearFilters,
  availableCategories,
  availableTags,
}: ShowroomFiltersProps) {
  const handleCheckboxChange = (
    section: keyof FilterState,
    value: string | boolean | null
  ) => {
    if (section === "featured") {
      setFilters((prev) => ({
        ...prev,
        featured: prev.featured === value ? null : (value as boolean),
      }));
    } else {
      setFilters((prev) => {
        const current = prev[section] as string[];
        const updated = current.includes(value as string)
          ? current.filter((item) => item !== value)
          : [...current, value as string];
        return { ...prev, [section]: updated };
      });
    }
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
        <h4 className="text-xs font-semibold text-black uppercase tracking-wider">Categoría</h4>
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

      {/* Tags */}
      {availableTags.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-xs font-semibold text-black uppercase tracking-wider">Características</h4>
          <div className="space-y-3">
            {availableTags.map((tag) => (
              <label key={tag} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.tags.includes(tag)}
                  onChange={() => handleCheckboxChange("tags", tag)}
                  className="w-4 h-4 rounded border-gray-300 text-[#8B5A2B] focus:ring-[#8B5A2B] focus:ring-2"
                />
                <span className="text-sm text-black group-hover:text-[#8B5A2B] transition-colors capitalize font-sans">
                  {tag.replace("-", " ")}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Featured */}
      <div className="space-y-4">
        <h4 className="text-xs font-semibold text-black uppercase tracking-wider">Destacados</h4>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={filters.featured === true}
              onChange={() => handleCheckboxChange("featured", true)}
              className="w-4 h-4 rounded border-gray-300 text-[#8B5A2B] focus:ring-[#8B5A2B] focus:ring-2"
            />
            <span className="text-sm text-black group-hover:text-[#8B5A2B] transition-colors font-sans">
              Solo Destacados
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
