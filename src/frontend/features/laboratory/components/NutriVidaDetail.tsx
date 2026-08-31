import Image from "next/image";
import styles from "./LaboratoryDetail.module.css";

const technologies = ["Java", "Swing", "JDBC", "MariaDB"];

export function NutriVidaDetail() {
  return (
    <article className={styles.container}>
      {/* 1. Introducción + CTA */}
      <section className={styles.introSection}>
        <p className={styles.intro}>
          NutriVida Suite fue el proyecto final de la cursada de Java,
          desarrollado en equipo para la gestión integral de pacientes, dietas y
          seguimiento nutricional. Fue una aplicación de escritorio más grande y
          completa que SYSAD UNI, con múltiples vistas y relaciones entre datos,
          además de una experiencia clave para aprender a coordinar y ordenar el
          trabajo colaborativo.
        </p>

        <div className={styles.actionsBlock}>
          <div className={styles.primaryCtas}>
            <a
              href="https://github.com/abfj27/G63Nutricionista"
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
        aria-label="Demo funcional de NutriVida Suite"
      >
        <div className={styles.videoContainer}>
          <iframe
            src="https://www.youtube-nocookie.com/embed/eowGbzLlco0"
            title="Demo funcional de NutriVida Suite"
            loading="lazy"
            allowFullScreen
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            className={styles.videoIframe}
          />
        </div>
      </section>

      {/* 3. Cuando el proyecto necesitaba arrancar */}
      <section className={styles.editorialSection}>
        <h3 className={styles.sectionTitle}>
          Cuando el proyecto necesitaba arrancar
        </h3>
        <p className={styles.paragraph}>
          Al comienzo costó coordinar el trabajo entre varias personas y definir
          por dónde empezar. El proyecto empezó a destrabarse cuando organizamos
          en una reunión las vistas, las funciones principales y la división de
          tareas.
        </p>
        <p className={styles.paragraph}>
          En ese momento empecé a diseñar en Miro una primera estructura de
          pantallas y flujos, lo que ayudó a que el resto del trabajo tomara
          forma y el equipo ganara claridad. Uno de los grandes aprendizajes fue
          entender que, a veces, hace falta dar el primer paso con más decisión
          para que el equipo pueda avanzar.
        </p>
      </section>

      {/* 4. Una aplicación más completa */}
      <section className={styles.editorialSection}>
        <h3 className={styles.sectionTitle}>Una aplicación más completa</h3>
        <p className={styles.paragraph}>
          La aplicación permite gestionar el circuito nutricional completo:
          pacientes, dietas, comidas y visitas de control. Incluye la carga y
          modificación de pacientes, acceso a su historial médico y dieta
          asignada, administración de dietas con sus comidas relacionadas y
          búsqueda rápida por ficha médica.
        </p>
        <p className={styles.paragraph}>
          A diferencia de prácticas anteriores como SYSAD UNI, representó un
          desafío mucho más amplio, con un mayor número de vistas, filtros y
          relaciones entre tablas en la base de datos.
        </p>
      </section>

      {/* 5. Capturas */}
      <section
        className={styles.galleryGrid}
        aria-label="Capturas de NutriVida Suite"
      >
        <figure className={styles.galleryFigure}>
          <div className={styles.imageWrapper}>
            <Image
              src="/projects/laboratory/nutrivida/captura-01.jpg"
              alt="Carga y modificación de paciente en NutriVida Suite con accesos a historial y dieta"
              width={600}
              height={400}
              sizes="(max-width: 768px) 100vw, 400px"
              className={styles.captureImage}
            />
          </div>
          <figcaption className={styles.galleryCaption}>
            Carga y modificación de paciente con accesos a historial médico y
            plan de dieta.
          </figcaption>
        </figure>

        <figure className={styles.galleryFigure}>
          <div className={styles.imageWrapper}>
            <Image
              src="/projects/laboratory/nutrivida/captura-02.jpg"
              alt="Listado de dietas, CRUD, modificación de comidas y detalle en NutriVida Suite"
              width={600}
              height={400}
              sizes="(max-width: 768px) 100vw, 400px"
              className={styles.captureImage}
            />
          </div>
          <figcaption className={styles.galleryCaption}>
            Listado de dietas, administración de comidas y detalle de
            seguimiento nutricional.
          </figcaption>
        </figure>
      </section>

      {/* 6. Mi aporte */}
      <section className={styles.editorialSection}>
        <h3 className={styles.sectionTitle}>Mi aporte</h3>
        <p className={styles.paragraph}>
          En el equipo creé el nombre del proyecto, definí la identidad visual con
          su logo y paleta de colores, y participé activamente en el diseño de las
          vistas. También desarrollé buena parte de la interfaz en Java y tuve un
          rol importante para ordenar el arranque del proyecto, ayudando a
          transformar ideas sueltas en una estructura clara y viable para todos.
        </p>
      </section>

      {/* 7. Lo que me dejó */}
      <section className={styles.editorialSection}>
        <h3 className={styles.sectionTitle}>Lo que me dejó</h3>
        <p className={styles.paragraph}>
          Fue mi primera experiencia completando un proyecto final más extenso en
          Java, lo que me ayudó a consolidar conocimientos en interfaces gráficas
          con Swing, programación orientada a objetos y persistencia en bases de
          datos.
        </p>
        <p className={styles.paragraph}>
          Además de lo técnico, me dejó una enseñanza concreta sobre iniciativa,
          organización y trabajo colaborativo, y hoy me permite mirar hacia atrás
          y ver una evolución clara en la forma de pensar y estructurar un
          producto digital.
        </p>
      </section>

      {/* 8. Tecnologías */}
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
