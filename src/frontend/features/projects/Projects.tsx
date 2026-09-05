"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { ProjectDetailDialog } from "@/frontend/components/ProjectDetailDialog";
import { GeClauDetail } from "./components/GeClauDetail";
import { HorasClarasDetail } from "./components/HorasClarasDetail";
import { BitiCraftDetail } from "./components/BitiCraftDetail";
import { TracamDetail } from "./components/TracamDetail";
import { LeinwandDetail } from "./components/LeinwandDetail";
import styles from "./Projects.module.css";

type ActiveProject =
  | "geclau"
  | "horas-claras"
  | "biticraft"
  | "tracam"
  | "leinwand";

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
] as const;

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
      "E-commerce desarrollado con WordPress y WooCommerce para una empresa de equipamiento overland.",
  },
] as const;

const PROJECT_DIALOG_CONFIG: Record<
  ActiveProject,
  {
    title: string;
    subtitle: string;
    status?: string;
    closeAriaLabel: string;
  }
> = {
  geclau: {
    title: "GeClAu",
    subtitle: "Gestión académica de clases y asignación de aulas",
    closeAriaLabel: "Cerrar detalle de GeClAu",
  },
  "horas-claras": {
    title: "Horas Claras",
    subtitle: "Registro de horas y seguimiento de carga en Jira",
    closeAriaLabel: "Cerrar detalle de Horas Claras",
  },
  biticraft: {
    title: "BitiCraft",
    subtitle: "Sitio web para un emprendimiento de papelería personalizada",
    status: "Publicado · En evolución",
    closeAriaLabel: "Cerrar detalle de BitiCraft",
  },
  tracam: {
    title: "TRACAM",
    subtitle: "Gestión operativa y trazabilidad de viajes de camiones",
    closeAriaLabel: "Cerrar detalle de TRACAM",
  },
  leinwand: {
    title: "Leinwand Overland",
    subtitle: "E-commerce de equipamiento para aventura y overland",
    status: "Publicado · En uso",
    closeAriaLabel: "Cerrar detalle de Leinwand Overland",
  },
};

export function Projects() {
  const [activeProject, setActiveProject] = useState<ActiveProject | null>(null);
  const triggerRefs = useRef<
    Partial<Record<ActiveProject, HTMLButtonElement | null>>
  >({});
  const activeTriggerRef = useRef<HTMLButtonElement>(null);
  const dialogConfig = activeProject
    ? PROJECT_DIALOG_CONFIG[activeProject]
    : null;

  const openProject = (project: ActiveProject) => {
    activeTriggerRef.current = triggerRefs.current[project] ?? null;
    setActiveProject(project);
  };

  return (
    <section
      id="proyectos"
      className={styles.projectsSection}
      aria-labelledby="projects-title"
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.titleWrapper}>
            <h2 id="projects-title" className={styles.title}>
              Proyectos
            </h2>
            <span className={styles.titleAccent} aria-hidden="true" />
          </div>
        </header>

        {/* Nivel 1 · Protagonistas (2 columnas) */}
        <div className={styles.featuredGrid}>
          {featuredProjects.map((project) => (
            <article
              key={project.id}
              className={`${styles.featuredCard} ${styles.interactiveCard}`}
            >
              <button
                ref={(element) => {
                  triggerRefs.current[project.id] = element;
                }}
                type="button"
                className={styles.cardActionOverlay}
                onClick={() => openProject(project.id)}
                aria-label={`Más info sobre ${project.title}`}
              />

              <div className={styles.mediaContainer} aria-hidden="true">
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
                  <span className={styles.moreInfoCta} aria-hidden="true">
                    <span className={styles.moreInfoCtaText}>Más info</span>
                    <span className={styles.moreInfoCtaArrow}>&rarr;</span>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Nivel 2 · Secundarios (3 columnas) */}
        <div className={styles.secondaryGrid}>
          {secondaryProjects.map((project) => (
            <article
              key={project.id}
              className={`${styles.secondaryCard} ${styles.secondaryInteractiveCard}`}
            >
              <button
                ref={(element) => {
                  triggerRefs.current[project.id] = element;
                }}
                type="button"
                className={styles.secondaryActionOverlay}
                onClick={() => openProject(project.id)}
                aria-label={`Más info sobre ${project.title}`}
              />
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
                <span
                  className={styles.secondaryMoreInfoCta}
                  aria-hidden="true"
                >
                  <span className={styles.secondaryMoreInfoCtaText}>
                    Más info
                  </span>
                  <span className={styles.secondaryMoreInfoCtaArrow}>
                    &rarr;
                  </span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      <ProjectDetailDialog
        isOpen={activeProject !== null}
        onClose={() => setActiveProject(null)}
        title={dialogConfig?.title ?? ""}
        subtitle={dialogConfig?.subtitle}
        status={dialogConfig?.status}
        closeAriaLabel={dialogConfig?.closeAriaLabel}
        triggerRef={activeTriggerRef}
      >
        {activeProject === "geclau" && <GeClauDetail />}
        {activeProject === "horas-claras" && <HorasClarasDetail />}
        {activeProject === "biticraft" && <BitiCraftDetail />}
        {activeProject === "tracam" && <TracamDetail />}
        {activeProject === "leinwand" && <LeinwandDetail />}
      </ProjectDetailDialog>
    </section>
  );
}
