import { memo } from "react";
import Project from "./Project";
import styles from "@/features/projects/styles/projects.module.css";

import type { Project as ProjectType } from "../types/projects";

interface ProjectsTableProps {
   projects: ProjectType[];
}

const ProjectsTable = ({ projects }: ProjectsTableProps) => {
   return (
      <div className={styles.projects__table__container}>
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
            <tbody>
               {projects.map(project => (
                  <Project key={project._id} project={project} />
               ))}
            </tbody>
         </table>
      </div>
   );
};

export default memo(ProjectsTable);
