import React from "react";
import { usePagination } from "../hooks/usePagination";

interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
   onPageChange: (page: number) => void;
   totalCount: number;
   currentPage: number;
   pageSize: number;
}

const Pagination = ({
   onPageChange,
   totalCount,
   currentPage,
   pageSize,
   ...props
}: PaginationProps) => {
   const { totalPages, isFirstPage, isLastPage } = usePagination({
      currentPage,
      totalCount,
      pageSize,
   });

   if (totalPages <= 1) return null;

   const onNext = () => {
      if (!isLastPage) onPageChange(currentPage + 1);
   };

   const onPrevious = () => {
      if (!isFirstPage) onPageChange(currentPage - 1);
   };

   return (
      <div {...props}>
         <button onClick={onPrevious} disabled={isFirstPage}>
            Previous
         </button>

         <span>
            {currentPage} of {totalPages} pages
         </span>

         <button onClick={onNext} disabled={isLastPage}>
            Next
         </button>
      </div>
   );
};

export default Pagination;
