import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import { useProjectsStore } from "@/features/projects/store/projects";
import { useDebounce } from "@/features/shared/hooks/useDebounce";

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
   const sort = (searchParams.get("sort") || "") as Sort;
   const incidentsNumber = (searchParams.get("incidents") || "") as Sort;
   const RFIsNumber = (searchParams.get("rfis") || "") as Sort;
   const tasksNumber = (searchParams.get("tasks") || "") as Sort;

   const isThereFilters = useMemo(() => {
      return !!sort || !!incidentsNumber || !!RFIsNumber || !!tasksNumber || !!query;
   }, [sort, incidentsNumber, RFIsNumber, tasksNumber, query]);

   const { filteredProjects, totalCount } = useMemo(() => {
      return filterProjects({
         projects,
         query: debouncedQuery,
         sort,
         incidentsNumber,
         RFIsNumber,
         tasksNumber,
         page: currentPage,
         itemsPerPage: ITEMS_PER_PAGE,
      });
   }, [projects, debouncedQuery, sort, incidentsNumber, RFIsNumber, tasksNumber, currentPage]);

   const updateSearchParams = useCallback(
      (key: string, value: string) => {
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
      },
      [searchParams, router]
   );

   const toggleFilter = useCallback(
      (key: string, currentValue: string) => {
         updateSearchParams(key, currentValue === "asc" ? "" : "asc");
      },
      [updateSearchParams]
   );

   const clearFilters = useCallback(() => {
      router.push("/");
      setSearch("");
   }, [router, setSearch]);

   const handlePageChange = useCallback(
      (page: number) => updateSearchParams("page", page.toString()),
      [updateSearchParams]
   );

   useEffect(() => {
      if (debouncedQuery !== query) {
         updateSearchParams("query", debouncedQuery);
      }
   }, [debouncedQuery, query, updateSearchParams]);

   return {
      isThereFilters,
      projects,
      filteredProjects,
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
         onPageChange: handlePageChange,
      },
   };
};
