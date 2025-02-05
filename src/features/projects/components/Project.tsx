"use client";
import Image from "next/image";

import { isValidUrl } from "@/features/core/helpers/isValidUrl";
import { getIncidentsByItem } from "../helpers/getIncidentsByItem";
import { getUserInitials } from "../helpers/getUserInitials";

import type { Project as ProjectType } from "../types/projects";

interface ProjectProps {
   project: ProjectType;
}

const MAX_USERS_TO_SHOW = 3;
export const Project = ({ project }: ProjectProps) => {
   const usersInitials = project.users.map(user => getUserInitials(user.name, user.lastName));

   const usersInitialsToShow = usersInitials.slice(0, MAX_USERS_TO_SHOW);
   const remainingUsers = usersInitials.length - MAX_USERS_TO_SHOW;

   const { incidentsLength, RFILength, tasksLength } = getIncidentsByItem(project.incidents);

   const isValidImageUrl = isValidUrl(project.img);

   return (
      <tr>
         <td>
            {isValidImageUrl && (
               <Image src={project.img} width={200} height={200} alt={`${project.title} - Cover`} />
            )}
            {project.title}
         </td>
         <td>{project.status}</td>
         <td>{project.projectPlanData.plan}</td>
         <td>
            <div>
               {usersInitialsToShow.map(initial => (
                  <p key={initial}>{initial}</p>
               ))}
               {remainingUsers > 0 && <p>+{remainingUsers}</p>}
            </div>
         </td>
         <td>
            <div>
               <div>
                  <p>{RFILength}</p>
                  <p>RFIs</p>
               </div>
               <div>
                  <p>{incidentsLength}</p>
                  <p>Incidentes</p>
               </div>
               <div>
                  <p>{tasksLength}</p>
                  <p>Tareas</p>
               </div>
            </div>
         </td>
      </tr>
   );
};
