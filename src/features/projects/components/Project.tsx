"use client";
import { memo } from "react";
import Image from "next/image";

import { isValidUrl } from "@/features/core/helpers/isValidUrl";
import { getIncidentsByItem } from "../helpers/getIncidentsByItem";
import { getUserInitials } from "../helpers/getUserInitials";
import styles from "@/features/projects/styles/project.module.css";

import type { Project as ProjectType } from "../types/projects";
import { getStatusProduct } from "../helpers/getStatusProduct";
import { getPlanProduct } from "../helpers/getPlanProduct";

interface ProjectProps {
   project: ProjectType;
}

const MAX_USERS_TO_SHOW = 4;

const Project = ({ project }: ProjectProps) => {
   const usersInitials = project.users.map(user => getUserInitials(user.name, user.lastName));

   const remainingUsers = usersInitials.length - MAX_USERS_TO_SHOW;
   const usersInitialsToShow = usersInitials.slice(0, MAX_USERS_TO_SHOW);

   const { incidentsLength, RFILength, tasksLength } = getIncidentsByItem(project.incidents);

   const statusProduct = getStatusProduct(project.status);
   const planProduct = getPlanProduct(project.projectPlanData.plan);
   const isValidImageUrl = isValidUrl(project.img);

   return (
      <tr>
         <td data-cell="project">
            <div className={styles.project__core}>
               {isValidImageUrl ? (
                  <Image
                     src={project.img}
                     width={200}
                     height={200}
                     alt={`${project.title} - Cover`}
                     className={styles.project__image}
                  />
               ) : (
                  <div className={styles.project__image__placeholder}></div>
               )}
               <p className={styles.project__title}>{project.title}</p>
            </div>
         </td>
         <td data-cell="plan">
            <p className={`${styles.project__plan} ${styles[project.projectPlanData.plan]}`}>
               {planProduct}
            </p>
         </td>
         <td data-cell="status">
            <p className={`${styles.project__status} ${styles[project.status]}`}>{statusProduct}</p>
         </td>
         <td data-cell="team">
            <div className={styles.project__team}>
               {usersInitialsToShow.map((initial, index) => (
                  <p
                     key={initial}
                     className={styles.project__team__initial}
                     style={
                        {
                           "--user-color": `hsl(45, 100%, ${90 - index * 15}%)`,
                        } as React.CSSProperties
                     }
                  >
                     {initial}
                  </p>
               ))}
               {remainingUsers > 0 && (
                  <p className={styles.project__team__remaining}>+{remainingUsers}</p>
               )}
            </div>
         </td>
         <td data-cell="items">
            <div className={styles.project__items}>
               <div className={styles.project__item}>
                  <p className={styles.project__item__number}>{incidentsLength}</p>
                  <p className={styles.project__item__text}>Incidentes</p>
               </div>
               <div className={styles.project__item}>
                  <p className={styles.project__item__number}>{RFILength}</p>
                  <p className={styles.project__item__text}>RFI</p>
               </div>
               <div className={styles.project__item}>
                  <p className={styles.project__item__number}>{tasksLength}</p>
                  <p className={styles.project__item__text}>Tareas</p>
               </div>
            </div>
         </td>
      </tr>
   );
};

export default memo(Project);
