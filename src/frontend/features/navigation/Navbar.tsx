import { ThemeToggle } from "@/frontend/features/theme";
import styles from "./Navbar.module.css";

export function Navbar() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a href="#" className={styles.brand}>
          Nico Kaminski
        </a>

        <div className={styles.navGroup}>
          <nav aria-label="Navegación principal">
            <ul className={styles.navList}>
              <li>
                <a href="#proyectos" className={styles.navLink}>
                  Proyectos
                </a>
              </li>
              <li>
                <a href="#como-trabajo" className={styles.navLink}>
                  Cómo trabajo
                </a>
              </li>
              <li>
                <a href="#contacto" className={styles.navLink}>
                  Contacto
                </a>
              </li>
            </ul>
          </nav>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
