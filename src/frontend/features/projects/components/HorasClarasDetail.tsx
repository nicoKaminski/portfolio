import Image from "next/image";
import styles from "./HorasClarasDetail.module.css";

const decisionItems = [
  {
    title: "Resolver el problema, no sobredimensionarlo",
    description:
      "Horas Claras necesitaba ser una herramienta pequeña y fácil de mantener. Elegí una arquitectura suficiente para el problema real, sin sumar un backend independiente ni infraestructura que el proyecto no necesitaba.",
  },
  {
    title: "Permisos que representan el uso real",
    description:
      "Los dos usuarios no necesitan hacer lo mismo. Cada uno puede gestionar sus registros, mientras que el rol administrador tiene la visión global y puede marcar qué horas ya fueron cargadas en Jira. Los permisos no dependen únicamente de la interfaz: también están respaldados mediante Row Level Security en Supabase.",
  },
  {
    title: "Aprender resolviendo algo real",
    description:
      "Fue también mi primera experiencia trabajando con Supabase. En lugar de aprenderlo construyendo un ejemplo descartable, lo incorporé mientras resolvía una necesidad que ya teníamos y que después íbamos a utilizar de verdad.",
  },
];

const technologies = [
  "Next.js",
  "React",
  "TypeScript",
  "CSS Modules",
  "Supabase Auth",
  "PostgreSQL",
  "Row Level Security",
  "Vercel",
];

export function HorasClarasDetail() {
  return (
    <article className={styles.container}>
      {/* A. Introducción */}
      <section className={styles.introSection}>
        <p className={styles.intro}>
          Horas Claras nació de un problema bastante simple: Ariel, un amigo y
          compañero de la facu, y yo necesitábamos registrar nuestras horas de
          trabajo, pero solo yo tenía acceso a Jira para cargarlas. Él llevaba sus
          horas en un Excel, yo anotaba las mías en un TXT y, al final del mes,
          tenía que cruzar ambos archivos con Jira para comprobar que todo
          coincidiera.
        </p>
        <p className={styles.intro}>
          Desarrollé Horas Claras para reemplazar ese proceso por una sola
          aplicación donde los dos pudiéramos registrar nuestro trabajo y yo
          pudiera controlar qué horas seguían pendientes de cargar en Jira.
        </p>

        <div className={styles.actionsBlock}>
          <div className={styles.primaryCtas}>
            <a
              href="https://horas-claras.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaPrimary}
            >
              Abrir aplicación
            </a>
            <a
              href="https://github.com/nicoKaminski/horas-claras"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaSecondary}
            >
              Ver repositorio
            </a>
          </div>
          <p className={styles.authNote}>
            La instancia desplegada es privada y requiere autenticación.
          </p>
        </div>
      </section>

      {/* B. Captura principal */}
      <section
        className={styles.mainCaptureSection}
        aria-label="Captura principal de Horas Claras"
      >
        <div className={styles.mainCaptureWrapper}>
          <Image
            src="/projects/horas-claras/dashboard.jpg"
            alt="Dashboard de Horas Claras"
            width={1280}
            height={800}
            sizes="(max-width: 860px) 100vw, 840px"
            className={styles.mainCaptureImage}
            priority
          />
        </div>
      </section>

      {/* C. De tres lugares a un solo flujo */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>De tres lugares a un solo flujo</h3>
        <div className={styles.processContainer}>
          <div className={styles.processBlock}>
            <span className={styles.processTag}>Antes</span>
            <div className={styles.flowRow}>
              <div className={styles.flowItem}>
                <span>Ariel</span>
                <span className={styles.flowArrow} aria-hidden="true">→</span>
                <span>Excel</span>
              </div>
              <div className={styles.flowItem}>
                <span>Nico</span>
                <span className={styles.flowArrow} aria-hidden="true">→</span>
                <span>TXT</span>
              </div>
              <div className={styles.flowItem}>
                <span className={styles.flowSubtext}>Cierre del mes</span>
                <span className={styles.flowArrow} aria-hidden="true">→</span>
                <span>revisar Excel + TXT + Jira</span>
              </div>
            </div>
          </div>

          <div className={styles.processDivider} aria-hidden="true" />

          <div className={styles.processBlock}>
            <span className={styles.processTag}>Ahora</span>
            <div className={styles.flowRow}>
              <div className={styles.flowItem}>Registrar horas</div>
              <span className={styles.flowArrow} aria-hidden="true">→</span>
              <div className={`${styles.flowItem} ${styles.flowHighlight}`}>
                Centralizar en Horas Claras
              </div>
              <span className={styles.flowArrow} aria-hidden="true">→</span>
              <div className={styles.flowItem}>Revisar pendientes</div>
              <span className={styles.flowArrow} aria-hidden="true">→</span>
              <div className={styles.flowItem}>Cargar en Jira</div>
            </div>
          </div>
        </div>
      </section>

      {/* D. La solución */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>La solución</h3>
        <div className={styles.solutionGrid}>
          <div className={styles.solutionText}>
            <p className={styles.paragraph}>
              La idea no era construir un sistema enorme, sino eliminar las
              partes incómodas del proceso. Cada uno puede registrar y gestionar
              sus propias horas, consultar el trabajo realizado y mantener
              identificado qué todavía falta trasladar a Jira.
            </p>
            <p className={styles.paragraph}>
              Para mí, además, existe una vista global desde la que puedo
              revisar los registros de ambos y marcar los que ya fueron cargados.
              El dashboard completa el flujo con métricas y una lectura rápida
              del período.
            </p>
          </div>
          <div className={styles.solutionCaptureWrapper}>
            <Image
              src="/projects/horas-claras/registro-horas.jpg"
              alt="Registro de horas en Horas Claras"
              width={1280}
              height={800}
              sizes="(max-width: 860px) 100vw, 420px"
              className={styles.solutionCaptureImage}
            />
          </div>
        </div>
      </section>

      {/* E. Decisiones que importan */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Decisiones que importan</h3>
        <div className={styles.decisionsSequence}>
          {decisionItems.map((item, index) => (
            <div key={item.title} className={styles.decisionRow}>
              <span className={styles.decisionIndex} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className={styles.decisionBody}>
                <h4 className={styles.decisionTitle}>{item.title}</h4>
                <p className={styles.decisionDescription}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* G. Cierre */}
      <section className={styles.conclusionSection}>
        <h3 className={styles.conclusionTitle}>
          De herramienta improvisada a herramienta real
        </h3>
        <p className={styles.paragraph}>
          Lo que empezó como un TXT, un Excel y una revisión manual a fin de mes
          terminó convirtiéndose en una aplicación que Ariel y yo usamos para
          gestionar nuestras horas de trabajo.
        </p>
        <p className={styles.paragraph}>
          El MVP está completo y desplegado. La instancia de uso real permanece
          protegida por autenticación, mientras que el código del proyecto es
          público y puede consultarse en GitHub.
        </p>
      </section>

      {/* F. Tecnologías */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Tecnologías</h3>
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
