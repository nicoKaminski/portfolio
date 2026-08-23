import { Navbar } from "@/frontend/features/navigation";
import { Hero } from "@/frontend/features/hero";
import { About } from "@/frontend/features/about";
import { Workflow } from "@/frontend/features/workflow";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.layout}>
      <Navbar />
      <main className={styles.main}>
        <Hero />
        <About />
        <Workflow />
        <div id="proyectos" className={styles.targetAnchor} aria-hidden="true" />
      </main>
    </div>
  );
}
