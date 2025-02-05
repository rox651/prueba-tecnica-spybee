import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { useProjectsStore } from "@/features/projects/store/projects";
import { useDebounce } from "@/features/core/hooks/useDebounce";

import { filterProjects } from "@/features/projects/helpers/filterProducts";
import { ITEMS_PER_PAGE } from "@/features/projects/data/constanst";

import type { Sort } from "../types/projects";

export const useProjects = () => {
   const router = useRouter();
   const searchParams = useSearchParams();
   const { projects } = useProjectsStore();

   const query = searchParams.get("query") || "";
   const [search, setSearch] = useState(query);
   const debouncedQuery = useDebounce(search, 500);

   const currentPage = Number(searchParams.get("page")) || 1;
   const sort = (searchParams.get("sort") as Sort) || "";
   const incidentsNumber = (searchParams.get("incidents") as Sort) || "";
   const RFIsNumber = (searchParams.get("rfis") as Sort) || "";
   const tasksNumber = (searchParams.get("tasks") as Sort) || "";

   const { filteredProjects, totalCount } = filterProjects({
      projects,
      query: debouncedQuery,
      sort,
      incidentsNumber,
      RFIsNumber,
      tasksNumber,
      page: currentPage,
      itemsPerPage: ITEMS_PER_PAGE,
   });

   const updateSearchParams = (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
         params.set(key, value);
      } else {
         params.delete(key);
      }

      if (key !== "page") {
         params.delete("page");
      }

      router.push(`?${params.toString()}`);
   };

   const toggleFilter = (key: string, currentValue: string) => {
      updateSearchParams(key, currentValue === "asc" ? "" : "asc");
   };

   const clearFilters = () => {
      router.push("/");
      setSearch("");
   };

   useEffect(() => {
      if (debouncedQuery !== query) {
         updateSearchParams("query", debouncedQuery);
      }
   }, [debouncedQuery]);

   return {
      projects: filteredProjects,
      totalCount,
      search,
      setSearch,
      filters: {
         sort,
         incidentsNumber,
         RFIsNumber,
         tasksNumber,
      },
      toggleFilter,
      clearFilters,
      pagination: {
         currentPage,
         pageSize: ITEMS_PER_PAGE,
         onPageChange: (page: number) => updateSearchParams("page", page.toString()),
      },
   };
};
