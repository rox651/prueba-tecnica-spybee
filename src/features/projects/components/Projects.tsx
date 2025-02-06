import Pagination from "@/features/shared/components/Pagination";
import { useProjects } from "@/features/projects/hooks/useProjects";
import styles from "@/features/projects/styles/projects.module.css";
import ProjectsModalFilters from "./ProjectsModalFilters";
import ProjectsTable from "./ProjectsTable";
import { useCallback, useRef, useState } from "react";
import { MapBox } from "./MapBox";
import { API_MAP_GL_TOKEN } from "../data/constanst";
import { LngLatLike } from "mapbox-gl";

export const Projects = () => {
   const mapRef = useRef<mapboxgl.Map | null>(null);
   const [showMap, setShowMap] = useState(false);

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

   const [defaultPoints, setDefaultPoints] = useState<LngLatLike>([
      projects[0].position.lng,
      projects[0].position.lat,
   ]);

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
            zoom: 15,
         });

         setDefaultPoints([lng, lat]);
         setShowMap(true);
      },
      [mapRef, setDefaultPoints, setShowMap]
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
                  showMap={showMap}
                  setShowMap={setShowMap}
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
         {showMap && (
            <MapBox
               projects={projects}
               mapRef={mapRef}
               accessToken={API_MAP_GL_TOKEN}
               defaultPoints={defaultPoints}
            />
         )}
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
