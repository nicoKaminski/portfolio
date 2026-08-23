import styles from "./Projects.module.css";

const featuredProjects = [
  {
    id: "geclau",
    title: "GeClau",
    description:
      "Gestión académica pensada para ordenar la complejidad de aulas, horarios y clases.",
  },
  {
    id: "horas-claras",
    title: "Horas Claras",
    description:
      "Una herramienta para registrar horas de trabajo, controlar pendientes y mantener ordenada la carga en Jira.",
  },
];

const secondaryProjects = [
  {
    id: "biticraft",
    title: "BitiCraft",
    description:
      "Una experiencia web para un emprendimiento de productos artesanales, combinando identidad visual, UX/UI y desarrollo.",
  },
  {
    id: "tracam",
    title: "TRACAM",
    description:
      "Un MVP orientado a mejorar la trazabilidad de camiones, la gestión de viajes y la organización de documentación.",
  },
];

export function Projects() {
  return (
    <section
      id="proyectos"
      className={styles.projectsSection}
      aria-labelledby="projects-title"
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 id="projects-title" className={styles.title}>
            Proyectos
          </h2>
        </header>

        <div className={styles.projectsGrid}>
          {featuredProjects.map((project) => (
            <article key={project.id} className={styles.featuredCard}>
              <div className={styles.mediaContainer} aria-hidden="true">
                <div className={styles.mediaPlaceholder} />
              </div>
              <div className={styles.featuredContent}>
                <span className={styles.tag}>Proyecto Destacado</span>
                <h3 className={styles.featuredTitle}>{project.title}</h3>
                <p className={styles.featuredDescription}>
                  {project.description}
                </p>
              </div>
            </article>
          ))}

          <div className={styles.secondaryColumn}>
            {secondaryProjects.map((project) => (
              <article key={project.id} className={styles.secondaryCard}>
                <div className={styles.secondaryContent}>
                  <h3 className={styles.secondaryTitle}>{project.title}</h3>
                  <p className={styles.secondaryDescription}>
                    {project.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
