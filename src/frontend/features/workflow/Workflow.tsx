import styles from "./Workflow.module.css";

function PencilIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={styles.stepIcon}
    >
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </svg>
  );
}

function ChatBubbleIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={styles.stepIcon}
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
      <path d="M8 12h.01" />
      <path d="M12 12h.01" />
      <path d="M16 12h.01" />
    </svg>
  );
}

function SparklesIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={styles.stepIcon}
    >
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
      <path d="M19 3v4" />
      <path d="M21 5h-4" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={styles.stepIcon}
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
      <line x1="14" y1="4" x2="10" y2="20" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={styles.stepIcon}
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={styles.stepIcon}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

const steps = [
  {
    id: "diseno",
    title: "1. Diseño",
    description: "Entender el problema y darle forma a una primera solución.",
    icon: PencilIcon,
  },
  {
    id: "debate",
    title: "2. Debate",
    description: "Revisar decisiones, alternativas y posibles riesgos.",
    icon: ChatBubbleIcon,
  },
  {
    id: "ia-asistida",
    title: "3. IA asistida",
    description:
      "Usar IA como apoyo para investigar, planificar y acelerar tareas.",
    icon: SparklesIcon,
  },
  {
    id: "implementacion",
    title: "4. Implementación",
    description: "Convertir la solución acordada en código mantenible.",
    icon: CodeIcon,
  },
  {
    id: "revision",
    title: "5. Revisión",
    description: "Auditar lo construido y corregir inconsistencias.",
    icon: SearchIcon,
  },
  {
    id: "validacion",
    title: "6. Validación",
    description:
      "Comprobar que funciona como esperamos, técnica y visualmente.",
    icon: CheckIcon,
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
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <li key={step.id} className={styles.stepItem}>
                  <div className={styles.indicatorWrapper}>
                    <div className={styles.indicator} aria-hidden="true">
                      <Icon />
                    </div>
                  </div>
                  <div className={styles.stepContent}>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepDescription}>{step.description}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
