// components/Pagination.tsx
"use client"
import React from "react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalResults: number;
  articlesPerPage: number;
  onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalResults,
  articlesPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalResults / articlesPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-between items-center mt-6">
      <Button onClick={handlePrevPage} disabled={currentPage === 1}>
        Anterior
      </Button>
      <span>
        Página {currentPage} de {totalPages}
      </span>
      <Button
        onClick={handleNextPage}
        disabled={currentPage * articlesPerPage >= totalResults}
      >
        Próxima
      </Button>
    </div>
  );
};

export default Pagination;
