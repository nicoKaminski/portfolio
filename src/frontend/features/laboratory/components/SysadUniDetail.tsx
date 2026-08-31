import Image from "next/image";
import styles from "./LaboratoryDetail.module.css";

const technologies = ["Java", "Swing", "JDBC", "MariaDB"];

export function SysadUniDetail() {
  return (
    <article className={styles.container}>
      {/* 1. Introducción + CTA */}
      <section className={styles.introSection}>
        <p className={styles.intro}>
          SYSAD UNI fue una simulación del proyecto final de la cursada. Lo
          desarrollamos en equipo para construir una aplicación de escritorio
          que permitiera gestionar alumnos, materias e inscripciones.
        </p>

        <div className={styles.actionsBlock}>
          <div className={styles.primaryCtas}>
            <a
              href="https://github.com/nicoKaminski/universidad.g63"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaPrimary}
            >
              Ver código en GitHub
            </a>
          </div>
        </div>
      </section>

      {/* 2. Capturas */}
      <section
        className={styles.galleryGrid}
        aria-label="Capturas de SYSAD UNI"
      >
        <div className={styles.imageWrapper}>
          <Image
            src="/projects/laboratory/sysaduni/captura-01.jpg"
            alt="Vista de SYSAD UNI para crear y modificar una materia"
            width={600}
            height={400}
            sizes="(max-width: 768px) 100vw, 400px"
            className={styles.captureImage}
          />
        </div>
        <div className={styles.imageWrapper}>
          <Image
            src="/projects/laboratory/sysaduni/captura-02.jpg"
            alt="Listado de alumnos de SYSAD UNI con filtros de activos e inactivos"
            width={600}
            height={400}
            sizes="(max-width: 768px) 100vw, 400px"
            className={styles.captureImage}
          />
        </div>
      </section>

      {/* 3. Primeros pasos con Java */}
      <section className={styles.editorialSection}>
        <h3 className={styles.sectionTitle}>Primeros pasos con Java</h3>
        <p className={styles.paragraph}>
          Casi todo era nuevo para mí: Java, programación orientada a objetos,
          trabajar con una base de datos y construir una interfaz gráfica de
          escritorio. Fue mi primera aplicación con este stack y uno de esos
          proyectos donde gran parte del aprendizaje aparecía mientras
          intentábamos hacer que todas esas piezas funcionaran juntas.
        </p>
      </section>

      {/* 4. Mi aporte en la interfaz */}
      <section className={styles.editorialSection}>
        <h3 className={styles.sectionTitle}>Mi aporte en la interfaz</h3>
        <p className={styles.paragraph}>
          Los dos trabajamos en distintas partes del proyecto, pero yo terminé
          enfocándome más en la interfaz. Construí varias de las vistas, pulí
          otras que ya estaban hechas y trabajé también en el nombre, las
          imágenes y los iconos de la aplicación.
        </p>
      </section>

      {/* 5. Trabajar por primera vez en equipo */}
      <section className={styles.editorialSection}>
        <h3 className={styles.sectionTitle}>
          Trabajar por primera vez en equipo
        </h3>
        <p className={styles.paragraph}>
          También fue mi primera experiencia desarrollando una aplicación junto
          a otra persona. Los dos tuvimos que tocar distintas partes del
          proyecto y aprender a hacer que nuestro trabajo terminara formando una
          sola aplicación.
        </p>
      </section>

      {/* 6. El paso previo a NutriVida Suite */}
      <section className={styles.editorialSection}>
        <h3 className={styles.sectionTitle}>
          El paso previo a NutriVida Suite
        </h3>
        <p className={styles.paragraph}>
          SYSAD UNI no era todavía el proyecto final. Era justamente una
          práctica para entender cómo iba a ser ese desafío. Después llegó
          NutriVida Suite, donde pudimos llevar lo aprendido a una aplicación más
          grande y completar el proyecto final de la cursada.
        </p>
      </section>

      {/* 7. Tecnologías */}
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
