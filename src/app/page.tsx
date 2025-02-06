"use client";
import styles from "./page.module.css";

import { Projects } from "@/features/projects/components/Projects";
import { Suspense } from "react";
export default function Home() {
   return (
      <div className={styles.page}>
         <Suspense fallback={<div>Loading...</div>}>
            <Projects />
         </Suspense>
      </div>
   );
}
