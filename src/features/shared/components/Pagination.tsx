import { usePagination } from "../hooks/usePagination";
import styles from "@/features/projects/styles/projects.module.css";

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
      <div className={styles.projects__table__pagination} {...props}>
         <button
            onClick={onPrevious}
            disabled={isFirstPage}
            className={styles.projects__table__pagination__button}
         >
            Previous
         </button>

         <span>
            {currentPage} of {totalPages} pages
         </span>

         <button
            onClick={onNext}
            disabled={isLastPage}
            className={styles.projects__table__pagination__button}
         >
            Next
         </button>
      </div>
   );
};

export default Pagination;
