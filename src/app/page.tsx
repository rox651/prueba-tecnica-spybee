"use client";
import { Project } from "@/features/projects/components/Project";
import styles from "./page.module.css";

import { useProjectsStore } from "@/features/projects/store/projects";

export default function Home() {
   const { filteredProjects } = useProjectsStore();

   return (
      <div className={styles.page}>
         {filteredProjects.map(project => (
            <Project key={project._id} project={project} />
         ))}
      </div>
   );
}
