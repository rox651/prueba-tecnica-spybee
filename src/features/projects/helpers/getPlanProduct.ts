import type { ProjectPlanType } from "../types/projects";

export const getPlanProduct = (plan: ProjectPlanType) => {
   const planProduct = {
      small: "Pequeño",
      big: "Avanzado",
   };

   return planProduct[plan];
};
