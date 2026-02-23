import React from "react";

export interface ProductFilterState {
  thickness: string[];
  articleType: string[];
  style: string[];
  gloss: string[];
  grainType: string[];
}

interface ProductFiltersProps {
  filters: ProductFilterState;
  setFilters: React.Dispatch<React.SetStateAction<ProductFilterState>>;
  clearFilters: () => void;
  options: {
    thickness: readonly string[];
    articleType: readonly string[];
    style: readonly string[];
    gloss: readonly string[];
    grainType: readonly string[];
  };
  className?: string;
}

export function ProductFilters({
  filters,
  setFilters,
  clearFilters,
  options,
  className = "",
}: ProductFiltersProps) {
  const handleCheckboxChange = (section: keyof ProductFilterState, value: string) => {
    setFilters((prev) => {
      const current = prev[section];
      const updated = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
      return { ...prev, [section]: updated };
    });
  };

  const renderFilterSection = (
    title: string,
    section: keyof ProductFilterState,
    values: readonly string[]
  ) => (
    <div className="space-y-4">
      <h4 className="text-xs font-semibold text-white uppercase tracking-wider">{title}</h4>
      <div className="space-y-3">
        {values.map((value) => (
          <label key={value} className="flex items-center gap-3 cursor-pointer group select-none">
            <div className="relative flex items-center justify-center w-5 h-5 rounded border border-zinc-700 bg-black group-hover:border-[#967D59] transition-all">
              <input
                type="checkbox"
                className="peer appearance-none w-full h-full absolute inset-0 cursor-pointer"
                checked={filters[section].includes(value)}
                onChange={() => handleCheckboxChange(section, value)}
              />
              {filters[section].includes(value) && (
                <div className="w-2.5 h-2.5 bg-[#967D59] rounded-sm shadow-[0_0_10px_rgba(150,125,89,0.5)] pointer-events-none" />
              )}
            </div>
            <span
              className={`text-sm transition-colors font-sans ${
                filters[section].includes(value)
                  ? "text-white font-medium"
                  : "text-gray-400 group-hover:text-gray-300"
              }`}
            >
              {value}
            </span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div
      className={`space-y-8 bg-zinc-900 backdrop-blur-sm rounded-xl p-6 border border-zinc-800 shadow-lg ${className}`}
    >
      <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
        <h3 className="text-lg font-semibold text-white uppercase tracking-wider">Filtros</h3>
        <button
          onClick={clearFilters}
          className="text-xs text-gray-400 hover:text-[#967D59] uppercase tracking-wider font-semibold transition-colors"
        >
          Limpiar Todo
        </button>
      </div>

      {renderFilterSection("Espesor", "thickness", options.thickness)}
      {renderFilterSection("Tipo de Artículo", "articleType", options.articleType)}
      {renderFilterSection("Estilo", "style", options.style)}
      {renderFilterSection("Brillo", "gloss", options.gloss)}
      {renderFilterSection("Tipo de Flor", "grainType", options.grainType)}
    </div>
  );
}
