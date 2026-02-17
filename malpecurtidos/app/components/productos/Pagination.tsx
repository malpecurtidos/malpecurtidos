import React from "react";
import { Button } from "~/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-6 mt-12">
      <Button
        variant="outline"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="border-zinc-700 text-white hover:bg-zinc-800 hover:border-[#967D59] hover:text-[#967D59] disabled:opacity-40 disabled:cursor-not-allowed font-sans bg-transparent"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        Anterior
      </Button>

      <span className="text-sm font-medium text-white font-sans">
        Página <span className="text-[#967D59] font-bold">{currentPage}</span> de {totalPages}
      </span>

      <Button
        variant="outline"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="border-zinc-700 text-white hover:bg-zinc-800 hover:border-[#967D59] hover:text-[#967D59] disabled:opacity-40 disabled:cursor-not-allowed font-sans bg-transparent"
      >
        Siguiente
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="ml-2"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </Button>
    </div>
  );
}

