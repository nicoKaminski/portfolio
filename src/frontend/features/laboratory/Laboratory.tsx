import styles from "./Laboratory.module.css";

const laboratoryProjects = [
  "MemoPotter",
  "MemoWars",
  "Qué Como · UX/UI",
  "Sistema Universitario TypeScript",
  "Sistema Universitario Java",
  "NutriVida Suite",
];

export function Laboratory() {
  return (
    <section
      id="laboratorio"
      className={styles.laboratorySection}
      aria-labelledby="laboratory-title"
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 id="laboratory-title" className={styles.title}>
            Laboratorio
          </h2>
          <p className={styles.intro}>
            Proyectos de práctica y aprendizaje en la universidad.
          </p>
        </header>

        <div className={styles.grid}>
          {laboratoryProjects.map((projectName) => (
            <article key={projectName} className={styles.item}>
              <h3 className={styles.projectName}>{projectName}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
