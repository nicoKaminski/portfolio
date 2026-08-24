import styles from "./GeClauDetail.module.css";

const participationItems = [
  {
    title: "Analista funcional",
    description:
      "Yo era quien tenía el contacto más directo con los usuarios y autoridades de UTNMDP. En las reuniones escuchaba qué necesitaban, entendía el problema y después lo llevaba al equipo para debatir cómo convertirlo en una funcionalidad real.",
  },
  {
    title: "UX/UI",
    description:
      "Otro de mis focos fue UX/UI. Muchas de las reglas académicas eran complejas por detrás, así que el desafío era encontrar la forma de que no se sintieran así en pantalla y que la app resultara clara para quienes la usan todos los días.",
  },
  {
    title: "Frontend",
    description:
      "Mi foco principal estuvo en frontend con React y TypeScript. Entre otras piezas, desarrollé la grilla horaria interactiva utilizada para visualizar y gestionar la asignación de aulas.",
  },
  {
    title: "Backend e integración",
    description:
      "También contribuí en autenticación, permisos, validaciones e integración con el backend, trabajando sobre el producto más allá de la interfaz.",
  },
  {
    title: "Documentación y evolución",
    description:
      "Participé en la documentación técnica, mantenimiento y evolución posterior del sistema.",
  },
];

const decisionItems = [
  {
    title: "Traducir necesidades reales",
    description:
      "Las reuniones y el relevamiento con quienes utilizarían la aplicación fueron parte del desarrollo: los requerimientos debían convertirse en comportamientos concretos del producto.",
  },
  {
    title: "Hacer simple una lógica compleja",
    description:
      "La interfaz debía ocultar gran parte de la complejidad académica sin perder información ni control sobre aulas, horarios, clases y restricciones.",
  },
  {
    title: "Unificar una gestión fragmentada",
    description:
      "Cada usuario había resuelto parte del trabajo con sus propias planillas Excel y formatos. El objetivo no era trasladar ese mismo caos a una web, sino encontrar una única forma de trabajar que pudiera adaptarse a las necesidades de todos.",
  },
];

const technologies = [
  "React",
  "TypeScript",
  "Vite",
  "Chakra UI",
  "React Hook Form",
  "Zod",
  "React Router",
  "Node.js",
  "Express",
  "TypeORM",
  "MySQL / MariaDB",
  "JWT",
  "bcrypt",
  "Docker",
];

export function GeClauDetail() {
  return (
    <article className={styles.container}>
      {/* Introducción y Acciones principales */}
      <section className={styles.introSection}>
        <p className={styles.intro}>
          GeClAu empezó como un proyecto académico y terminó resolviendo un
          problema real de la UTN Mar del Plata. Detrás de algo tan simple como
          asignar un aula había horarios, docentes, capacidades, recursos y un
          montón de reglas que tenían que convivir sin pisarse. Hoy la app está
          en uso en la facultad y sigue evolucionando a partir de las
          necesidades de quienes la usan.
        </p>

        <div className={styles.actionsBlock}>
          <div className={styles.primaryCtas}>
            <a
              href="https://demo.geclau.grupo6s.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaPrimary}
            >
              Ver demo
            </a>
            <a
              href="https://aulas.mdp.utn.edu.ar/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaSecondary}
            >
              Ver implementación UTN
            </a>
          </div>

          <div className={styles.teamInfo}>
            <span>Desarrollado en equipo por Grupo6s</span>
            <span className={styles.dotSeparator} aria-hidden="true">
              ·
            </span>
            <a
              href="https://grupo6s.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.teamLink}
            >
              Conocer Grupo6s
            </a>
          </div>
        </div>
      </section>

      {/* Video funcional */}
      <section className={styles.videoSection} aria-label="Video demostración">
        <div className={styles.videoContainer}>
          <iframe
            src="https://www.youtube-nocookie.com/embed/Yi3KcC9z6LU"
            title="Demo funcional de GeClAu"
            loading="lazy"
            allowFullScreen
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            className={styles.videoIframe}
          />
        </div>
      </section>

      {/* El problema */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>El problema</h3>
        <p className={styles.paragraph}>
          Antes de GeClAu, buena parte de la gestión estaba repartida entre
          planillas Excel armadas por distintas personas, mensajes y archivos
          con formatos diferentes. Cada uno había encontrado su propia forma de
          resolver el trabajo, pero mantener una única versión de la información
          se volvía cada vez más difícil. El desafío no era pasar esas planillas
          a una web, era entender qué necesitaba cada usuario y unificar todo en
          una herramienta que sirviera para todos.
        </p>
      </section>

      {/* Mi participación */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Mi participación</h3>
        <div className={styles.participationGrid}>
          {participationItems.map((item) => (
            <div key={item.title} className={styles.participationItem}>
              <h4 className={styles.itemTitle}>{item.title}</h4>
              <p className={styles.itemDescription}>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Decisiones y desafíos */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Decisiones y desafíos</h3>
        <div className={styles.decisionsList}>
          {decisionItems.map((item) => (
            <div key={item.title} className={styles.decisionItem}>
              <h4 className={styles.itemTitle}>{item.title}</h4>
              <p className={styles.itemDescription}>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Resultado */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Resultado</h3>
        <p className={styles.paragraph}>
          GeClAu pasó de ser un proyecto académico a una herramienta
          implementada y operativa en UTN Mar del Plata. Centraliza la gestión
          académica, ayuda a prevenir conflictos de horarios y espacios y
          facilita la administración y consulta de la información desde un único
          sistema.
        </p>
      </section>

      {/* Tecnologías */}
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
