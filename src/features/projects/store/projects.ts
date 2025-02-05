import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import data from "@/features/projects/data/mock_data.json";

import type { Project } from "@/features/projects/types/projects";

export interface ProjectsStore {
   filteredProjects: Project[];
   setFilteredProjects: (filteredProjects: Project[]) => void;
}

export const useProjectsStore = create<ProjectsStore>()(
   persist(
      set => ({
         filteredProjects: data as Project[],
         setFilteredProjects: (filteredProjects: Project[]) => set(() => ({ filteredProjects })),
      }),
      {
         name: "projects",
         storage: createJSONStorage(() => localStorage),
      }
   )
);
