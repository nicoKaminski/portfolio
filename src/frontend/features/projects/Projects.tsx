"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { ProjectDetailDialog } from "./components/ProjectDetailDialog";
import { GeClauDetail } from "./components/GeClauDetail";
import styles from "./Projects.module.css";

const featuredProjects = [
  {
    id: "geclau",
    title: "GeClAu",
    logo: "/projects/geclau/logo.png",
    description:
      "Gestión académica pensada para ordenar la complejidad de aulas, horarios y clases.",
  },
  {
    id: "horas-claras",
    title: "Horas Claras",
    logo: "/projects/horas-claras/logo.png",
    description:
      "Una herramienta para registrar horas de trabajo, controlar pendientes y mantener ordenada la carga en Jira.",
  },
];

const secondaryProjects = [
  {
    id: "biticraft",
    title: "BitiCraft",
    logo: "/projects/biticraft/logo.png",
    description:
      "Una experiencia web para un emprendimiento de productos artesanales, combinando identidad visual, UX/UI y desarrollo.",
  },
  {
    id: "tracam",
    title: "TRACAM",
    logo: "/projects/tracam/logo.png",
    description:
      "Un MVP orientado a mejorar la trazabilidad de camiones, la gestión de viajes y la organización de documentación.",
  },
  {
    id: "leinwand",
    title: "Leinwand Overland",
    logo: "/projects/leinwand/logo.png",
    description:
      "Sitio web desarrollado con WordPress para una empresa, actualmente publicado y en uso.",
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

        {/* Nivel 1 · Protagonistas (2 columnas) */}
        <div className={styles.featuredGrid}>
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

                <div
                  className={styles.mediaContainer}
                  aria-hidden="true"
                >
                  <div className={styles.logoSurface}>
                    <Image
                      src={project.logo}
                      alt=""
                      fill
                      sizes="(max-width: 960px) 100vw, 560px"
                      className={styles.featuredLogo}
                    />
                  </div>
                </div>
                <div className={styles.featuredContent}>
                  <h3 className={styles.featuredTitle}>{project.title}</h3>
                  <div className={styles.featuredBody}>
                    <p className={styles.featuredDescription}>
                      {project.description}
                    </p>
                    {isGeclau && (
                      <span className={styles.moreInfoCta} aria-hidden="true">
                        Más info
                      </span>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Nivel 2 · Secundarios (3 columnas) */}
        <div className={styles.secondaryGrid}>
          {secondaryProjects.map((project) => (
            <article key={project.id} className={styles.secondaryCard}>
              <div className={styles.secondaryHeader}>
                <h3 className={styles.secondaryTitle}>{project.title}</h3>
                <div
                  className={styles.secondaryLogoContainer}
                  aria-hidden="true"
                >
                  <Image
                    src={project.logo}
                    alt=""
                    fill
                    sizes="110px"
                    className={`${styles.secondaryLogo} ${project.id === "leinwand" ? styles.secondaryLogoLeinwand : ""}`}
                  />
                </div>
              </div>
              <p className={styles.secondaryDescription}>
                {project.description}
              </p>
            </article>
          ))}
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
