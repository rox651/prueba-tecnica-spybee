import styles from "@/features/projects/styles/projects.module.css";

import { BsFillFilterSquareFill } from "react-icons/bs";
import { BsFilterSquare } from "react-icons/bs";
import { useToggle } from "@/features/shared/hooks/useToggle";

import type { ProjectsFilter } from "../types/projects";
import { useRef } from "react";
import { useClickOutside } from "@/features/shared/hooks/useClickOutside";
import { BiCheck } from "react-icons/bi";
import { MdFilterAltOff } from "react-icons/md";

interface ProjectsModalFiltersProps {
   filters: Omit<Required<ProjectsFilter>, "projects" | "query">;
   toggleFilter: (key: string, currentValue: string) => void;
   clearFilters: () => void;
   isThereFilters: boolean;
}

const ProjectsModalFilters = ({
   filters,
   toggleFilter,
   clearFilters,
   isThereFilters,
}: ProjectsModalFiltersProps) => {
   const modalRef = useRef<HTMLDivElement>(null);
   const [isOpen, toggleIsOpen] = useToggle(false);

   const handleClickOutside = () => {
      toggleIsOpen();
   };

   useClickOutside(modalRef as React.RefObject<HTMLElement>, handleClickOutside);

   return (
      <div className={styles.projects__header__filters}>
         <button className={styles.projects__header__filters__button} onClick={toggleIsOpen}>
            {isOpen ? <BsFillFilterSquareFill /> : <BsFilterSquare />}
         </button>
         {isThereFilters && (
            <button className={styles.projects__header__filters__button} onClick={clearFilters}>
               Limpiar filtros
               <MdFilterAltOff />
            </button>
         )}
         {isOpen && (
            <div className={styles.projects__header__filters__modal} ref={modalRef}>
               <button onClick={() => toggleFilter("sort", filters.sort)}>
                  Orden alfabético
                  {filters.sort === "asc" && <BiCheck />}
               </button>
               <button onClick={() => toggleFilter("incidents", filters.incidentsNumber)}>
                  Número de incidentes
                  {filters.incidentsNumber === "asc" && <BiCheck />}
               </button>
               <button onClick={() => toggleFilter("rfis", filters.RFIsNumber)}>
                  Número de RFIs
                  {filters.RFIsNumber === "asc" && <BiCheck />}
               </button>
               <button onClick={() => toggleFilter("tasks", filters.tasksNumber)}>
                  Número de tareas
                  {filters.tasksNumber === "asc" && <BiCheck />}
               </button>
            </div>
         )}
      </div>
   );
};

export default ProjectsModalFilters;
