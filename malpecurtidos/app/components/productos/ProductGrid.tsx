import React, { useState, useMemo } from "react";
import { ProductCard } from "./ProductCard";
import { ProductFilters } from "./ProductFilters";
import { Pagination } from "./Pagination";
import { products, type Product } from "~/data/productsData";
import { Button } from "~/ui/button";

const ITEMS_PER_PAGE = 12;

export function ProductGrid() {
  const [filters, setFilters] = useState({
    category: [] as string[],
    finish: [] as string[],
    thickness: [] as string[],
  });
  
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Derive available options for filters
  const availableCategories = Array.from(new Set(products.map((p) => p.category)));
  const availableFinishes = Array.from(new Set(products.map((p) => p.finish)));
  const availableThicknesses = Array.from(
    new Set(products.flatMap((p) => p.thickness))
  ).sort();

  // Filter and Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (filters.category.length > 0) {
      result = result.filter((p) => filters.category.includes(p.category));
    }

    if (filters.finish.length > 0) {
      result = result.filter((p) => filters.finish.includes(p.finish));
    }

    if (filters.thickness.length > 0) {
      result = result.filter((p) =>
        p.thickness.some((t) => filters.thickness.includes(t))
      );
    }

    // Sort by featured first, then by name
    result.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return a.name.localeCompare(b.name);
    });

    return result;
  }, [filters]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const clearFilters = () => {
    setFilters({ category: [], finish: [], thickness: [] });
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
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
            Filtros
          </Button>
          <span className="text-sm text-black font-sans font-semibold">{filteredProducts.length} productos</span>
        </div>

        {/* Sidebar Filters */}
        <aside className={`lg:w-1/4 ${isMobileFiltersOpen ? 'block' : 'hidden'} lg:block`}>
          <ProductFilters
            filters={filters}
            setFilters={(val) => {
              setFilters(val);
              setCurrentPage(1); // Reset page on filter change
            }}
            clearFilters={clearFilters}
            availableCategories={availableCategories}
            availableFinishes={availableFinishes}
            availableThicknesses={availableThicknesses}
          />
        </aside>

        {/* Main Grid */}
        <div className="lg:w-3/4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
            <p className="text-black hidden md:block font-sans text-sm">
              Mostrando <span className="font-semibold text-[#1A1816]">{currentProducts.length}</span> de <span className="font-semibold text-[#1A1816]">{filteredProducts.length}</span> productos encontrados
            </p>
          </div>

          {currentProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-[#F5F2ED] rounded-xl border-2 border-dashed border-[#4A3728]/30">
              <p className="text-xl text-black mb-4 font-sans">No se encontraron productos</p>
              <Button onClick={clearFilters} variant="outline" className="text-[#4A3728] border-[#4A3728] hover:bg-[#4A3728] hover:text-white">
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
    </section>
  );
}

