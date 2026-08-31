import Image from "next/image";
import styles from "./LaboratoryDetail.module.css";

interface MemoWarsDetailProps {
  onNavigateToMemoPotter: () => void;
}

const technologies = ["JavaScript", "DOM", "HTML", "CSS", "SweetAlert2"];

export function MemoWarsDetail({
  onNavigateToMemoPotter,
}: MemoWarsDetailProps) {
  return (
    <article className={styles.container}>
      {/* 1. Introducción + CTAs */}
      <section className={styles.introSection}>
        <p className={styles.intro}>
          Una práctica guiada que hice para entender la lógica de un memotest
          antes de desarrollar el proyecto final de la materia.
        </p>

        <div className={styles.actionsBlock}>
          <div className={styles.primaryCtas}>
            <a
              href="https://nicokaminski.github.io/memo-wars/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaPrimary}
            >
              Jugar
            </a>
            <a
              href="https://github.com/nicoKaminski/memo-wars"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaSecondary}
            >
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* 2. Captura visual */}
      <section
        className={styles.visualSection}
        aria-label="Captura de MemoWars"
      >
        <div className={styles.imageWrapper}>
          <Image
            src="/projects/laboratory/memo-war/preview.jpg"
            alt="Captura del juego MemoWars mostrando el tablero de cartas de Star Wars"
            width={800}
            height={450}
            sizes="(max-width: 860px) 100vw, 800px"
            className={styles.captureImage}
            priority
          />
        </div>
      </section>

      {/* 3. Contexto */}
      <section className={styles.editorialSection}>
        <p className={styles.paragraph}>
          MemoWars fue una práctica realizada siguiendo un tutorial de
          CodigTube. Me sirvió para trabajar la mecánica básica del juego de
          memoria y entender cómo manejar cartas, coincidencias, movimientos y
          tiempo antes de encarar el proyecto final.
        </p>
      </section>

      {/* 4. Qué trabajé */}
      <section className={styles.techSection}>
        <h3 className={styles.techTitle}>Qué trabajé</h3>
        <ul className={styles.techList}>
          {technologies.map((tech) => (
            <li key={tech} className={styles.techTag}>
              {tech}
            </li>
          ))}
        </ul>
      </section>

      {/* 5. Evolución MemoWars → MemoPotter */}
      <section className={styles.crossNavSection}>
        <h3 className={styles.sectionTitle}>El paso siguiente</h3>
        <p className={styles.paragraph}>
          Esta práctica fue la base para MemoPotter, donde llevé la misma
          mecánica a un proyecto más completo.
        </p>
        <button
          type="button"
          className={styles.navSwitchButton}
          onClick={onNavigateToMemoPotter}
        >
          Ver evolución → MemoPotter
        </button>
      </section>
    </article>
  );
}
