import Pagination from "@/features/core/components/Pagination";
import { useProjects } from "@/features/projects/hooks/useProjects";
import { Project } from "./Project";
import styles from "@/features/projects/styles/projects.module.css";

export const Projects = () => {
   const {
      projects,
      totalCount,
      search,
      setSearch,
      filters,
      toggleFilter,
      clearFilters,
      pagination,
   } = useProjects();
   return (
      <>
         <Pagination
            currentPage={pagination.currentPage}
            totalCount={totalCount}
            pageSize={pagination.pageSize}
            onPageChange={pagination.onPageChange}
         />
         <input
            name="search"
            value={search}
            placeholder="Buscar"
            onChange={e => setSearch(e.target.value)}
         />

         <div>
            <button onClick={() => toggleFilter("sort", filters.sort)}>
               Ordenar alfabéticamente
            </button>
            <button onClick={() => toggleFilter("incidents", filters.incidentsNumber)}>
               Incidents
            </button>
            <button onClick={() => toggleFilter("rfis", filters.RFIsNumber)}>RFIs</button>
            <button onClick={() => toggleFilter("tasks", filters.tasksNumber)}>Tasks</button>
         </div>

         <button onClick={clearFilters}>Clear</button>

         <table className={styles.projects__table}>
            <thead>
               <tr>
                  <th>Proyecto</th>
                  <th>Plan</th>
                  <th>Status</th>
                  <th>Equipo</th>
                  <th>Items por vencer</th>
               </tr>
            </thead>
            {projects.map(project => (
               <Project key={project._id} project={project} />
            ))}
         </table>
      </>
   );
};
