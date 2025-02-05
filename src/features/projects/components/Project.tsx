import React from "react";
import type { Project as ProjectType } from "../types/projects";
import Image from "next/image";

import { isValidUrl } from "@/features/core/helpers/isValidUrl";

interface ProjectProps {
   project: ProjectType;
}

export const Project = ({ project }: ProjectProps) => {
   const usersInitials = project.users.map(
      user => user.name[0].toUpperCase() + user.lastName[0].toUpperCase()
   );

   const incidentsByItem = Object.groupBy(project.incidents, incident => incident.item);
   const incidentsLength = incidentsByItem.incidents?.length || 0;
   const RFILength = incidentsByItem.RFI?.length || 0;
   const tasksLength = incidentsByItem.task?.length || 0;

   const isValidImageUrl = isValidUrl(project.img);

   return (
      <div>
         {isValidImageUrl && (
            <Image src={project.img} width={200} height={200} alt={`${project.title} - Cover`} />
         )}
         <h2>{project.title}</h2>
         <p>{project.status}</p>
         <p>{project.projectPlanData.plan}</p>
         <div>
            {usersInitials.map((initials, index) => (
               <p
                  key={index}
                  style={{
                     margin: 20,
                  }}
               >
                  {initials}
               </p>
            ))}
         </div>
         <div>
            <p> {RFILength}</p>
            <p> {incidentsLength} </p>
            <p> {tasksLength} </p>
         </div>
      </div>
   );
};
