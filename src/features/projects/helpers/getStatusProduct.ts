import type { ProjectStatus } from "../types/projects";

export const getStatusProduct = (status: ProjectStatus) => {
   if (status === "suspended") return "Suspendido";
   if (status === "active") return "Activo";
   if (status === "pending_payment") return "Pendiente de pago";
   return "Inactivo";
};
