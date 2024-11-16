interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex justify-center items-center mt-8 space-x-2">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Anterior
      </button>

      <span className="text-lg font-semibold">
        Página {currentPage} de {totalPages}
      </span>

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Próxima
      </button>
    </div>
  );
}

export default Pagination;
