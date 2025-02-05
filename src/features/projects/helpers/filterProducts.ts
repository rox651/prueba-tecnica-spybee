import type { ProjectsFilter } from "../types/projects";
import { getIncidentsByItem } from "./getIncidentsByItem";

export const filterProjects = ({
   projects,
   query,
   sort,
   incidentsNumber,
   RFIsNumber,
   tasksNumber,
   page = 1,
   itemsPerPage = 10,
}: ProjectsFilter & {
   page?: number;
   itemsPerPage?: number;
}) => {
   let filteredProjects = [...projects];

   if (query) {
      filteredProjects = filteredProjects.filter(project =>
         project.title.toLowerCase().includes(query.toLowerCase())
      );
   }

   if (sort) {
      filteredProjects = filteredProjects.toSorted((a, b) => {
         if (sort === "asc") return a.title.localeCompare(b.title);
         return 0;
      });
   }

   if (incidentsNumber) {
      filteredProjects = filteredProjects.toSorted((a, b) => {
         const { incidentsLength } = getIncidentsByItem(a.incidents);
         const { incidentsLength: incidentsLengthB } = getIncidentsByItem(b.incidents);

         return incidentsLength - incidentsLengthB;
      });
   }

   if (RFIsNumber) {
      filteredProjects = filteredProjects.toSorted((a, b) => {
         const { RFILength } = getIncidentsByItem(a.incidents);
         const { RFILength: RFILengthB } = getIncidentsByItem(b.incidents);

         return RFILength - RFILengthB;
      });
   }

   if (tasksNumber) {
      filteredProjects = filteredProjects.toSorted((a, b) => {
         const { tasksLength } = getIncidentsByItem(a.incidents);
         const { tasksLength: tasksLengthB } = getIncidentsByItem(b.incidents);

         return tasksLength - tasksLengthB;
      });
   }

   const startIndex = (page - 1) * itemsPerPage;
   const endIndex = startIndex + itemsPerPage;

   return {
      filteredProjects: filteredProjects.slice(startIndex, endIndex),
      totalCount: filteredProjects.length,
   };
};
