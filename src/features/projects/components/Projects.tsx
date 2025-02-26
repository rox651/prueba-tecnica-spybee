import Pagination from "@/features/shared/components/Pagination";
import { useProjects } from "@/features/projects/hooks/useProjects";
import styles from "@/features/projects/styles/projects.module.css";
import ProjectsModalFilters from "./ProjectsModalFilters";
import ProjectsTable from "./ProjectsTable";
import { useCallback, useRef } from "react";
import { MapBox } from "./MapBox";
import { API_MAP_GL_TOKEN } from "../data/constanst";

export const Projects = () => {
   const mapRef = useRef<mapboxgl.Map | null>(null);

   const {
      projects,
      filteredProjects,
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

   const handleClick = useCallback(
      (lng: number, lat: number) => {
         mapRef.current?.flyTo({
            center: [lng, lat],
            zoom: 2,
         });

         const box = document.querySelector(".mapboxgl-map");

         if (box) {
            box.scrollIntoView({
               behavior: "smooth",
            });
         }
      },
      [mapRef]
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
         <MapBox projects={projects} mapRef={mapRef} accessToken={API_MAP_GL_TOKEN} />
         <Pagination
            currentPage={pagination.currentPage}
            totalCount={totalCount}
            pageSize={pagination.pageSize}
            onPageChange={pagination.onPageChange}
         />
         <ProjectsTable handleClick={handleClick} projects={filteredProjects} />
      </>
   );
};
