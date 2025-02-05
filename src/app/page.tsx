"use client";
import styles from "./page.module.css";

import { Projects } from "@/features/projects/components/Projects";

export default function Home() {
   return (
      <div className={styles.page}>
         <Projects />
      </div>
   );
}
