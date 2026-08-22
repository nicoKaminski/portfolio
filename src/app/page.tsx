import { ThemeToggle } from "@/frontend/features/theme";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div>
        <h1 className={styles.title}>Nico Kaminski</h1>
        <p className={styles.subtitle}>
          Desarrollador de software con enfoque en{" "}
          <span className={styles.highlight}>Front-End</span>
        </p>
      </div>

      <ThemeToggle />
    </main>
  );
}
