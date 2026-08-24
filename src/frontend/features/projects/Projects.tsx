"use client";

import { useState, useRef } from "react";
import { ProjectDetailDialog } from "./components/ProjectDetailDialog";
import { GeClauDetail } from "./components/GeClauDetail";
import styles from "./Projects.module.css";

const featuredProjects = [
  {
    id: "geclau",
    title: "GeClAu",
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
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const geclauTriggerRef = useRef<HTMLButtonElement>(null);

  const isGeclauOpen = activeProject === "geclau";

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
          {featuredProjects.map((project) => {
            const isGeclau = project.id === "geclau";

            return (
              <article
                key={project.id}
                className={`${styles.featuredCard} ${isGeclau ? styles.interactiveCard : ""}`}
              >
                {isGeclau && (
                  <button
                    ref={geclauTriggerRef}
                    type="button"
                    className={styles.cardActionOverlay}
                    onClick={() => setActiveProject("geclau")}
                    aria-label="Más info sobre GeClAu"
                  />
                )}

                <div className={styles.mediaContainer} aria-hidden="true">
                  <div className={styles.mediaPlaceholder} />
                </div>
                <div className={styles.featuredContent}>
                  <span className={styles.tag}>Proyecto Destacado</span>
                  <h3 className={styles.featuredTitle}>{project.title}</h3>
                  <p className={styles.featuredDescription}>
                    {project.description}
                  </p>
                  {isGeclau && (
                    <div className={styles.ctaWrapper}>
                      <span className={styles.moreInfoCta} aria-hidden="true">
                        Más info
                      </span>
                    </div>
                  )}
                </div>
              </article>
            );
          })}

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

      <ProjectDetailDialog
        isOpen={isGeclauOpen}
        onClose={() => setActiveProject(null)}
        title="GeClAu"
        subtitle="Gestión académica de clases y asignación de aulas"
        closeAriaLabel="Cerrar detalle de GeClAu"
        triggerRef={geclauTriggerRef}
      >
        <GeClauDetail />
      </ProjectDetailDialog>
    </section>
  );
}
