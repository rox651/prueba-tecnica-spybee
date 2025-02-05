import Pagination from "@/features/shared/components/Pagination";
import { useProjects } from "@/features/projects/hooks/useProjects";
import styles from "@/features/projects/styles/projects.module.css";
import ProjectsModalFilters from "./ProjectsModalFilters";
import ProjectsTable from "./ProjectsTable";
import { useCallback } from "react";

export const Projects = () => {
   const {
      projects,
      totalCount,
      search,
      setSearch,
      filters,
      toggleFilter,
      clearFilters,
      isThereFilters,
      pagination,
   } = useProjects();

   const handleSearch = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
         setSearch(e.target.value);
      },
      [setSearch]
   );

   return (
      <>
         <header className={styles.projects__header}>
            <div className={styles.projects__title__container}>
               <h1 className={styles.projects__title}>Mis proyectos</h1>
               <p className={styles.projects__counter}>{totalCount} proyectos</p>
            </div>
            <div className={styles.projects__header__buttons__container}>
               <ProjectsModalFilters
                  filters={filters}
                  toggleFilter={toggleFilter}
                  clearFilters={clearFilters}
                  isThereFilters={isThereFilters}
               />
               <input
                  className={styles.projects__header__search}
                  name="search"
                  value={search}
                  placeholder="Buscar"
                  onChange={handleSearch}
               />
            </div>
         </header>
         <Pagination
            currentPage={pagination.currentPage}
            totalCount={totalCount}
            pageSize={pagination.pageSize}
            onPageChange={pagination.onPageChange}
         />
         <ProjectsTable projects={projects} />
      </>
   );
};
