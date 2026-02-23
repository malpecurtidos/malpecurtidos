import React, { useEffect, useMemo, useState } from "react";
import { ProductCard } from "./ProductCard";
import { ProductFilters, type ProductFilterState } from "./ProductFilters";
import { Pagination } from "./Pagination";
import { products, PRODUCT_FILTER_OPTIONS } from "~/data/productsData";
import { Button } from "~/ui/button";

const ITEMS_PER_PAGE = 12;

export function ProductGrid() {
  const [filters, setFilters] = useState<ProductFilterState>({
    thickness: [],
    articleType: [],
    style: [],
    gloss: [],
    grainType: [],
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (filters.thickness.length > 0) {
      result = result.filter((p) => filters.thickness.includes(p.thickness));
    }

    if (filters.articleType.length > 0) {
      result = result.filter((p) => filters.articleType.includes(p.articleType));
    }

    if (filters.style.length > 0) {
      result = result.filter((p) => filters.style.includes(p.style));
    }

    if (filters.gloss.length > 0) {
      result = result.filter((p) => filters.gloss.includes(p.gloss));
    }

    if (filters.grainType.length > 0) {
      result = result.filter((p) => filters.grainType.includes(p.grainType));
    }

    result.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return a.name.localeCompare(b.name);
    });

    return result;
  }, [filters]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const activeFilterCount = useMemo(
    () => Object.values(filters).reduce((count, values) => count + values.length, 0),
    [filters]
  );

  useEffect(() => {
    if (!isMobileFiltersOpen) {
      document.body.style.overflow = "";
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileFiltersOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isMobileFiltersOpen]);

  const clearFilters = () => {
    setFilters({ thickness: [], articleType: [], style: [], gloss: [], grainType: [] });
    setCurrentPage(1);
  };

  const updateFilters: React.Dispatch<React.SetStateAction<ProductFilterState>> = (value) => {
    setFilters(value);
    setCurrentPage(1);
  };

  return (
    <section className="bg-[#121111] py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-[85%] mx-auto">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:hidden flex justify-between items-center mb-8 pb-6 border-b border-zinc-800">
            <Button
              variant="outline"
              onClick={() => setIsMobileFiltersOpen(true)}
              className="flex items-center gap-2 font-sans border-zinc-700 text-white hover:bg-zinc-800 hover:border-[#967D59] hover:text-[#967D59]"
              aria-expanded={isMobileFiltersOpen}
              aria-controls="mobile-product-filters"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
              </svg>
              Filtros {activeFilterCount > 0 ? `(${activeFilterCount})` : ""}
            </Button>
            <span className="text-sm text-white font-sans font-semibold">{filteredProducts.length} productos</span>
          </div>

          <aside className="hidden lg:block lg:w-1/4">
            <ProductFilters
              filters={filters}
              setFilters={updateFilters}
              clearFilters={clearFilters}
              options={PRODUCT_FILTER_OPTIONS}
            />
          </aside>

          <div className="lg:w-3/4">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
              <p className="text-white hidden md:block font-sans text-sm">
                Mostrando <span className="font-semibold text-white">{currentProducts.length}</span> de <span className="font-semibold text-white">{filteredProducts.length}</span> productos encontrados
              </p>
            </div>

            {currentProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {currentProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-zinc-900 rounded-xl border-2 border-dashed border-zinc-800">
                <p className="text-xl text-white mb-4 font-sans">No se encontraron productos</p>
                <Button onClick={clearFilters} variant="outline" className="text-[#967D59] border-[#967D59] hover:bg-[#967D59] hover:text-white">
                  Limpiar filtros
                </Button>
              </div>
            )}

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-50 lg:hidden ${isMobileFiltersOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!isMobileFiltersOpen}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity ${isMobileFiltersOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setIsMobileFiltersOpen(false)}
          aria-label="Cerrar filtros"
        />

        <aside
          id="mobile-product-filters"
          className={`absolute left-0 top-0 h-full w-[86%] max-w-sm bg-[#121111] border-r border-zinc-800 shadow-2xl transition-transform duration-300 ease-out ${
            isMobileFiltersOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Filtros de productos"
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between px-4 py-4 border-b border-zinc-800">
              <p className="text-sm font-semibold uppercase tracking-wider text-white">Refinar búsqueda</p>
              <button
                type="button"
                className="text-zinc-400 hover:text-white transition-colors"
                onClick={() => setIsMobileFiltersOpen(false)}
                aria-label="Cerrar filtros"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 pb-24">
              <ProductFilters
                filters={filters}
                setFilters={updateFilters}
                clearFilters={clearFilters}
                options={PRODUCT_FILTER_OPTIONS}
                className="bg-transparent border-none shadow-none rounded-none p-0"
              />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-zinc-800 bg-[#121111]/95 backdrop-blur-sm">
              <Button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="w-full bg-[#4A3728] hover:bg-[#967D59] text-white"
              >
                Ver {filteredProducts.length} resultados
              </Button>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
