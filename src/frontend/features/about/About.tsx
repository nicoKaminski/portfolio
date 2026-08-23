import styles from "./About.module.css";

export function About() {
  return (
    <section className={styles.aboutSection} aria-labelledby="about-title">
      <div className={styles.container}>
        <div className={styles.mainContent}>
          <h2 id="about-title" className={styles.title}>
            Sobre mí
          </h2>
          <p className={styles.description}>
            Me interesa construir software que resuelva problemas reales y que
            resulte claro para quienes lo usan. Mi foco está en frontend, pero
            trabajo con una visión integral del producto, entendiendo también la
            lógica, los datos, la integración y las decisiones que conectan cada
            parte.
          </p>
        </div>

        <aside
          className={styles.gameInvitation}
          aria-label="Cazador de Bugs"
        >
          <p className={styles.gamePrompt}>
            ¿Necesitás un descanso? Probá el Cazador de Bugs.
          </p>
          <button
            type="button"
            className={styles.gameButton}
            disabled
            aria-disabled="true"
          >
            Jugar
          </button>
        </aside>
      </div>
    </section>
  );
}
