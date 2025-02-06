import type { Incident, IncidentItem } from "../types/projects";

export const getIncidentsByItem = (incidents: Incident[]) => {
   const incidentsByItem = incidents.reduce(
      (acc, incident) => {
         acc[incident.item] = (acc[incident.item] || 0) + 1;
         return acc;
      },
      {
         incidents: 0,
         RFI: 0,
         task: 0,
      } as Record<IncidentItem, number>
   );

   const incidentsLength = incidentsByItem.incidents;
   const RFILength = incidentsByItem.RFI;
   const tasksLength = incidentsByItem.task;

   return { incidentsLength, RFILength, tasksLength };
};
