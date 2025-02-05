import Pagination from "@/features/core/components/Pagination";
import { useProjects } from "@/features/projects/hooks/useProjects";
import styles from "@/features/projects/styles/projects.module.css";
import ProjectsModalFilters from "./ProjectsModalFilters";
import ProjectsTable from "./ProjectsTable";

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
                  onChange={e => setSearch(e.target.value)}
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
