import type { Incident } from "../types/projects";

export const getIncidentsByItem = (incidents: Incident[]) => {
   const incidentsByItem = Object.groupBy(incidents, incident => incident.item);
   const incidentsLength = incidentsByItem.incidents?.length || 0;
   const RFILength = incidentsByItem.RFI?.length || 0;
   const tasksLength = incidentsByItem.task?.length || 0;

   return { incidentsLength, RFILength, tasksLength };
};
