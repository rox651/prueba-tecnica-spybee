import { create } from "zustand";

import data from "@/features/projects/data/mock_data.json";

import type { Project } from "@/features/projects/types/projects";

const projectsData = data as Project[];

export interface ProjectsStore {
   projects: Project[];
}

export const useProjectsStore = create<ProjectsStore>()(() => ({
   projects: projectsData,
}));
