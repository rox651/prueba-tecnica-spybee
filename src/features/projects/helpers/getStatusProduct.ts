import type { ProjectStatus } from "../types/projects";

export const getStatusProduct = (status: ProjectStatus) => {
   const statusProduct = {
      suspended: "Suspendido",
      active: "Activo",
      pending_payment: "Pendiente de pago",
      inactive: "Inactivo",
   };

   return statusProduct[status];
};
