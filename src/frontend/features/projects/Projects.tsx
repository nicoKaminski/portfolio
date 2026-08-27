"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { ProjectDetailDialog } from "./components/ProjectDetailDialog";
import { GeClauDetail } from "./components/GeClauDetail";
import { HorasClarasDetail } from "./components/HorasClarasDetail";
import { BitiCraftDetail } from "./components/BitiCraftDetail";
import { TracamDetail } from "./components/TracamDetail";
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
      "Sitio web para un emprendimiento de papelería personalizada, con foco en UX/UI, presentación de productos y contacto.",
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
  const horasClarasTriggerRef = useRef<HTMLButtonElement>(null);
  const biticraftTriggerRef = useRef<HTMLButtonElement>(null);
  const tracamTriggerRef = useRef<HTMLButtonElement>(null);

  const isGeclauOpen = activeProject === "geclau";
  const isHorasClarasOpen = activeProject === "horas-claras";
  const isBiticraftOpen = activeProject === "biticraft";
  const isTracamOpen = activeProject === "tracam";

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
            const isHorasClaras = project.id === "horas-claras";
            const isInteractive = isGeclau || isHorasClaras;
            const triggerRef = isGeclau
              ? geclauTriggerRef
              : isHorasClaras
                ? horasClarasTriggerRef
                : undefined;

            return (
              <article
                key={project.id}
                className={`${styles.featuredCard} ${isInteractive ? styles.interactiveCard : ""}`}
              >
                {isInteractive && (
                  <button
                    ref={triggerRef}
                    type="button"
                    className={styles.cardActionOverlay}
                    onClick={() => setActiveProject(project.id)}
                    aria-label={`Más info sobre ${project.title}`}
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
                    {isInteractive && (
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
          {secondaryProjects.map((project) => {
            const isBiticraft = project.id === "biticraft";
            const isTracam = project.id === "tracam";
            const isInteractive = isBiticraft || isTracam;
            const triggerRef = isBiticraft
              ? biticraftTriggerRef
              : isTracam
                ? tracamTriggerRef
                : undefined;

            return (
              <article
                key={project.id}
                className={`${styles.secondaryCard} ${isInteractive ? styles.secondaryInteractiveCard : ""}`}
              >
                {isInteractive && (
                  <button
                    ref={triggerRef}
                    type="button"
                    className={styles.secondaryActionOverlay}
                    onClick={() => setActiveProject(project.id)}
                    aria-label={`Más info sobre ${project.title}`}
                  />
                )}
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
                <div className={styles.secondaryBody}>
                  <p className={styles.secondaryDescription}>
                    {project.description}
                  </p>
                  {isInteractive && (
                    <span
                      className={styles.secondaryMoreInfoCta}
                      aria-hidden="true"
                    >
                      Más info
                    </span>
                  )}
                </div>
              </article>
            );
          })}
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

      <ProjectDetailDialog
        isOpen={isHorasClarasOpen}
        onClose={() => setActiveProject(null)}
        title="Horas Claras"
        subtitle="Registro de horas y seguimiento de carga en Jira"
        closeAriaLabel="Cerrar detalle de Horas Claras"
        triggerRef={horasClarasTriggerRef}
      >
        <HorasClarasDetail />
      </ProjectDetailDialog>

      <ProjectDetailDialog
        isOpen={isBiticraftOpen}
        onClose={() => setActiveProject(null)}
        title="BitiCraft"
        subtitle="Sitio web para un emprendimiento de papelería personalizada"
        status="Publicado · En evolución"
        closeAriaLabel="Cerrar detalle de BitiCraft"
        triggerRef={biticraftTriggerRef}
      >
        <BitiCraftDetail />
      </ProjectDetailDialog>

      <ProjectDetailDialog
        isOpen={isTracamOpen}
        onClose={() => setActiveProject(null)}
        title="TRACAM"
        subtitle="Gestión operativa y trazabilidad de viajes de camiones"
        closeAriaLabel="Cerrar detalle de TRACAM"
        triggerRef={tracamTriggerRef}
      >
        <TracamDetail />
      </ProjectDetailDialog>
    </section>
  );
}
