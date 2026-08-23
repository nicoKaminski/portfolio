import { AbstractVisual } from "./components/AbstractVisual";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.heroSection} aria-label="Introducción">
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Desarrollador de software <span className={styles.nowrap}>full stack</span> con enfoque en frontend
          </h1>
          <p className={styles.description}>
            Desarrollo interfaces y aplicaciones web poniendo especial atención en
            la experiencia de usuario, sin limitarme al frontend: también trabajo
            con backend, datos e integración cuando el producto lo necesita.
          </p>
          <div className={styles.actions}>
            <a href="#proyectos" className={styles.ctaButton}>
              Ver proyectos
            </a>
          </div>
        </div>

        <div className={styles.visualColumn}>
          <AbstractVisual />
        </div>
      </div>
    </section>
  );
}
