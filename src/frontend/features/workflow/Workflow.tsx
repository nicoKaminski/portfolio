import styles from "./Workflow.module.css";

const steps = [
  {
    number: "01",
    title: "Diseño",
    description: "Entender el problema y darle forma a una primera solución.",
  },
  {
    number: "02",
    title: "Debate",
    description: "Revisar decisiones, alternativas y posibles riesgos.",
  },
  {
    number: "03",
    title: "IA asistida",
    description:
      "Usar IA como apoyo para investigar, planificar y acelerar tareas.",
  },
  {
    number: "04",
    title: "Implementación",
    description: "Convertir la solución acordada en código mantenible.",
  },
  {
    number: "05",
    title: "Revisión",
    description: "Auditar lo construido y corregir inconsistencias.",
  },
  {
    number: "06",
    title: "Validación",
    description:
      "Comprobar que funciona como esperamos, técnica y visualmente.",
  },
];

export function Workflow() {
  return (
    <section
      id="como-trabajo"
      className={styles.workflowSection}
      aria-labelledby="workflow-title"
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 id="workflow-title" className={styles.title}>
            Cómo trabajo
          </h2>
          <div className={styles.intro}>
            <p>
              No empiezo por el código. Primero busco entender bien el problema,
              discutir alternativas y elegir la solución que mejor se adapta al
              contexto. A partir de ahí defino el alcance, el orden de
              implementación y los criterios con los que voy a evaluar el
              resultado.
            </p>
            <p>
              La IA forma parte de ese proceso como herramienta de apoyo para
              investigar, planificar, implementar y revisar, sin delegar el
              criterio técnico o funcional. Avanzo por etapas, probando y
              auditando cada una antes de seguir, para detectar desvíos temprano y
              validar que la solución final funcione como fue pensada.
            </p>
          </div>
        </header>

        <div className={styles.trackWrapper}>
          <ol className={styles.timeline}>
            {steps.map((step) => (
              <li key={step.number} className={styles.stepItem}>
                <div className={styles.indicatorWrapper}>
                  <div className={styles.indicator} aria-hidden="true">
                    <span className={styles.stepNumber}>{step.number}</span>
                  </div>
                </div>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDescription}>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
