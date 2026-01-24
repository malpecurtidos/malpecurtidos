import React, { useState, useMemo } from "react";
import { showroomProducts, categoryLabels } from "~/data/showroomData";
import { ShowroomCard } from "./ShowroomCard";
import { ShowroomFilters } from "./ShowroomFilters";
import { Pagination } from "~/components/productos/Pagination";
import { Button } from "~/ui/button";

const ITEMS_PER_PAGE = 12;

export function ShowroomGrid() {
  const [filters, setFilters] = useState({
    category: [] as string[],
    tags: [] as string[],
    featured: null as boolean | null,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Derive available options for filters
  const availableCategories = Array.from(new Set(showroomProducts.map((p) => p.category)));
  const availableTags = Array.from(
    new Set(showroomProducts.flatMap((p) => p.tags))
  ).sort();

  // Filter Logic
  const filteredProducts = useMemo(() => {
    let result = [...showroomProducts];

    // Filter by category
    if (filters.category.length > 0) {
      result = result.filter((p) => filters.category.includes(p.category));
    }

    // Filter by tags
    if (filters.tags.length > 0) {
      result = result.filter((p) =>
        p.tags.some((tag) => filters.tags.includes(tag))
      );
    }

    // Filter by featured
    if (filters.featured !== null) {
      result = result.filter((p) => p.featured === filters.featured);
    }

    // Sort by featured first, then by name
    result.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return a.name.localeCompare(b.name);
    });

    return result;
  }, [filters]);

  // Group filtered products by category
  const productsByCategory = useMemo(() => {
    return filteredProducts.reduce((acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = [];
      }
      acc[product.category].push(product);
      return acc;
    }, {} as Record<string, typeof filteredProducts>);
  }, [filteredProducts]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const clearFilters = () => {
    setFilters({ category: [], tags: [], featured: null });
    setCurrentPage(1);
  };

  return (
    <section className="bg-white py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-[85%] mx-auto">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden flex justify-between items-center mb-8 pb-6 border-b border-gray-200">
            <Button
              variant="outline"
              onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
              className="flex items-center gap-2 font-sans"
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
              Filtros
            </Button>
            <span className="text-sm text-black font-sans font-semibold">
              {filteredProducts.length} productos
            </span>
          </div>

          {/* Sidebar Filters */}
          <aside className={`lg:w-1/4 ${isMobileFiltersOpen ? "block" : "hidden"} lg:block`}>
            <ShowroomFilters
              filters={filters}
              setFilters={(val) => {
                setFilters(val);
                setCurrentPage(1); // Reset page on filter change
              }}
              clearFilters={clearFilters}
              availableCategories={availableCategories}
              availableTags={availableTags}
            />
          </aside>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
              <p className="text-black hidden md:block font-sans text-sm">
                Mostrando <span className="font-semibold text-[#2A2522]">{currentProducts.length}</span> de{" "}
                <span className="font-semibold text-[#2A2522]">{filteredProducts.length}</span> productos encontrados
              </p>
            </div>

            {filteredProducts.length > 0 ? (
              <>
                {/* Show grouped by category if no filters, otherwise show flat grid */}
                {filters.category.length === 0 &&
                filters.tags.length === 0 &&
                filters.featured === null ? (
                  // Grouped by category (default view)
                  <div className="space-y-20">
                    {Object.entries(productsByCategory).map(([category, products]) => (
                      <div key={category}>
                        {/* Encabezado de categoría */}
                        <div className="mb-12">
                          <h2 className="text-4xl md:text-5xl font-semibold text-[#2A2522] mb-4">
                            {categoryLabels[category] || category}
                          </h2>
                          <div className="h-1 w-20 bg-[#8B5A2B]"></div>
                        </div>

                        {/* Grid de productos */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                          {products.map((product) => (
                            <ShowroomCard key={product.id} product={product} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  // Flat grid when filters are active
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
                      {currentProducts.map((product) => (
                        <ShowroomCard key={product.id} product={product} />
                      ))}
                    </div>
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  </>
                )}
              </>
            ) : (
              <div className="text-center py-20 bg-[#F9F7F2] rounded-xl border-2 border-dashed border-[#8B5A2B]/30">
                <p className="text-xl text-black mb-4 font-sans">No se encontraron productos</p>
                <Button
                  onClick={clearFilters}
                  variant="outline"
                  className="text-[#8B5A2B] border-[#8B5A2B] hover:bg-[#8B5A2B] hover:text-white"
                >
                  Limpiar filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
