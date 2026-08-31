import styles from "./LaboratoryDetail.module.css";

const technologies = [
  "TypeScript",
  "Node.js",
  "Express",
  "TypeORM",
  "MySQL",
  "SweetAlert2",
];

export function SigesUniDetail() {
  return (
    <article className={styles.container}>
      {/* 1. Introducción + CTA */}
      <section className={styles.introSection}>
        <p className={styles.intro}>
          SIGES UNI fue mi proyecto final de Desarrollo de Aplicaciones Web. Lo
          desarrollé siguiendo las pautas de la materia para construir una
          aplicación de gestión universitaria con estudiantes, profesores,
          cursos e inscripciones.
        </p>

        <div className={styles.actionsBlock}>
          <div className={styles.primaryCtas}>
            <a
              href="https://github.com/nicoKaminski/universidad"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaPrimary}
            >
              Ver código en GitHub
            </a>
          </div>
        </div>
      </section>

      {/* 2. Video funcional */}
      <section
        className={styles.videoSection}
        aria-label="Demo funcional de SIGES UNI"
      >
        <div className={styles.videoContainer}>
          <iframe
            src="https://www.youtube-nocookie.com/embed/IstsbizlcPM"
            title="Demo funcional de SIGES UNI"
            loading="lazy"
            allowFullScreen
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            className={styles.videoIframe}
          />
        </div>
      </section>

      {/* 3. Aprender a seguir los datos */}
      <section className={styles.editorialSection}>
        <h3 className={styles.sectionTitle}>Aprender a seguir los datos</h3>
        <p className={styles.paragraph}>
          Una de las partes que más me costó fue entender TypeORM y empezar a
          seguir qué pasaba con los datos entre la base, la API y la interfaz.
          Cuando una función no devolvía lo que esperaba, tenía que revisar la
          consulta, comprobar la respuesta en Postman y después entender por qué
          ese resultado no llegaba a la UI como esperaba.
        </p>
        <p className={styles.paragraph}>
          Hoy parece un recorrido bastante natural, pero en ese momento fue una
          parte importante del aprendizaje y me ayudó a entender mucho mejor
          cómo se conectan las distintas capas de una aplicación.
        </p>
      </section>

      {/* 4. Lo que me dejó */}
      <section className={styles.editorialSection}>
        <h3 className={styles.sectionTitle}>Lo que me dejó</h3>
        <p className={styles.paragraph}>
          Hoy haría muchas cosas de otra manera. Mejoraría la experiencia para
          buscar y seleccionar información, trabajaría más el diseño y
          seguramente construiría una solución más completa y optimizada.
        </p>
        <p className={styles.paragraph}>
          Pero SIGES UNI fue justamente para eso: aprender. Fue uno de los
          proyectos con los que empecé a entender mejor el backend, las APIs, las
          relaciones entre datos y cómo todo eso termina llegando a una
          interfaz.
        </p>
      </section>

      {/* 5. Un antecedente de GeClau */}
      <section className={styles.editorialSection}>
        <h3 className={styles.sectionTitle}>Un antecedente de GeClau</h3>
        <p className={styles.paragraph}>
          Tiempo después apareció GeClau. Son proyectos distintos y nacieron
          para resolver necesidades diferentes, pero parte de lo aprendido en
          SIGES UNI me sirvió como base para dar esos primeros pasos. Algunas
          tecnologías y conceptos que había conocido en este proyecto volvieron a
          aparecer después, esta vez dentro de una aplicación mucho más grande y
          construida a partir de necesidades reales.
        </p>
      </section>

      {/* 6. Tecnologías */}
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
