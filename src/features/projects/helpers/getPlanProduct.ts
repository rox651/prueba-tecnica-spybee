import type { ProjectPlanType } from "../types/projects";

export const getPlanProduct = (plan: ProjectPlanType) => {
   if (plan === "small") return "Pequeño";
   return "Avanzado";
};
