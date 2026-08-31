import Image from "next/image";
import styles from "./LaboratoryDetail.module.css";

interface MemoPotterDetailProps {
  onNavigateToMemoWars: () => void;
}

const evolutionItems = [
  "30 cartas / 15 pares.",
  "Personajes obtenidos desde una API externa.",
  "Backend con Node.js y Express.",
  "Registro de jugador.",
  "Estadísticas de movimientos, tiempo y aciertos.",
  "Ranking de partidas.",
];

const technologies = [
  "JavaScript",
  "Node.js",
  "Express",
  "HTML",
  "CSS",
  "SweetAlert2",
];

export function MemoPotterDetail({
  onNavigateToMemoWars,
}: MemoPotterDetailProps) {
  return (
    <article className={styles.container}>
      {/* 1. Introducción + CTAs + Navegación previa */}
      <section className={styles.introSection}>
        <p className={styles.intro}>
          El proyecto final llevó la mecánica aprendida en MemoWars a una
          aplicación más completa: un memotest de Harry Potter con personajes
          obtenidos desde una API externa, registro de jugador, estadísticas y
          ranking.
        </p>

        <div className={styles.actionsBlock}>
          <div className={styles.primaryCtas}>
            <a
              href="https://memo-potter.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaPrimary}
            >
              Jugar
            </a>
            <a
              href="https://github.com/nicoKaminski/Memo-Potter"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaSecondary}
            >
              GitHub
            </a>
          </div>

          <button
            type="button"
            className={styles.navInverseButton}
            onClick={onNavigateToMemoWars}
          >
            ← Ver la práctica previa: MemoWars
          </button>
        </div>
      </section>

      {/* 2. Captura visual */}
      <section
        className={styles.visualSection}
        aria-label="Captura de MemoPotter"
      >
        <div className={styles.imageWrapper}>
          <Image
            src="/projects/laboratory/memo-potter/preview.png"
            alt="Captura del juego MemoPotter mostrando la interfaz temática de Harry Potter con cartas y ranking"
            width={800}
            height={450}
            sizes="(max-width: 860px) 100vw, 800px"
            className={styles.captureImage}
            priority
          />
        </div>
      </section>

      {/* 3. La evolución */}
      <section className={styles.editorialSection}>
        <h3 className={styles.sectionTitle}>La evolución</h3>
        <ul className={styles.featureList}>
          {evolutionItems.map((item) => (
            <li key={item} className={styles.featureItem}>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* 4. Tecnologías */}
      <section className={styles.techSection}>
        <h3 className={styles.techTitle}>Tecnologías</h3>
        <ul className={styles.techList}>
          {technologies.map((tech) => (
            <li key={tech} className={styles.techTag}>
              {tech}
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
