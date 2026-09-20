"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ActionLink } from "@/frontend/components/ActionLink";
import { CardActionLabel } from "@/frontend/components/CardActionLabel";
import { ProjectDetailDialog } from "@/frontend/components/ProjectDetailDialog";
import { ScrollReveal } from "@/frontend/components/ScrollReveal";
import { BitiCraftDetail } from "./components/BitiCraftDetail";
import { GeClauDetail } from "./components/GeClauDetail";
import { HorasClarasDetail } from "./components/HorasClarasDetail";
import { LeinwandDetail } from "./components/LeinwandDetail";
import { TracamDetail } from "./components/TracamDetail";
import styles from "./Projects.module.css";

type ActiveProject =
  | "geclau"
  | "horas-claras"
  | "biticraft"
  | "tracam"
  | "leinwand";

type Project = {
  id: ActiveProject;
  title: string;
  logo: string;
  mockup: string;
  mockupAlt: string;
  description: string;
  externalCta: string;
  externalHref: string;
};

const featuredProjects: readonly Project[] = [
  {
    id: "geclau",
    title: "GeClAu",
    logo: "/projects/geclau/logo.png",
    mockup: "/projects/geclau/mockup.png",
    mockupAlt: "Vista de la aplicación GeClAu",
    description:
      "Un sistema de gestión académica para organizar aulas, horarios y clases, reduciendo errores y superposiciones.",
    externalCta: "Ver despliegue",
    externalHref: "https://aulas.mdp.utn.edu.ar/",
  },
  {
    id: "horas-claras",
    title: "Horas Claras",
    logo: "/projects/horas-claras/logo.png",
    mockup: "/projects/horas-claras/mockup.png",
    mockupAlt: "Vista de la aplicación Horas Claras",
    description:
      "Una herramienta para registrar horas de trabajo, controlar pendientes y mantener ordenada la carga en Jira.",
    externalCta: "Abrir app",
    externalHref: "https://horas-claras.vercel.app/",
  },
];

const secondaryProjects: readonly Project[] = [
  {
    id: "biticraft",
    title: "BitiCraft",
    logo: "/projects/biticraft/logo.png",
    mockup: "/projects/biticraft/mockup.png",
    mockupAlt: "Vista del sitio web de BitiCraft",
    description:
      "Sitio web para un emprendimiento de papelería personalizada, con foco en UX/UI, presentación de productos y contacto.",
    externalCta: "Visitar sitio",
    externalHref: "https://biticraft.vercel.app/",
  },
  {
    id: "tracam",
    title: "TRACAM",
    logo: "/projects/tracam/logo.png",
    mockup: "/projects/tracam/mockup.png",
    mockupAlt: "Vista de la aplicación TRACAM",
    description:
      "Un MVP orientado a mejorar la trazabilidad de camiones, la gestión de viajes y la organización de documentación.",
    externalCta: "Abrir app",
    externalHref: "https://tracam.grupo6s.com/login",
  },
  {
    id: "leinwand",
    title: "Leinwand Overland",
    logo: "/projects/leinwand/logo.png",
    mockup: "/projects/leinwand/captura-01.png",
    mockupAlt: "Vista de la tienda Leinwand Overland",
    description:
      "E-commerce desarrollado con WordPress y WooCommerce para una empresa de equipamiento overland.",
    externalCta: "Visitar sitio",
    externalHref: "https://leinwand-overland.com/",
  },
];

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

interface ProjectCardProps {
  project: Project;
  onOpen: (project: ActiveProject) => void;
  triggerRef: (element: HTMLButtonElement | null) => void;
}

function ProjectCard({
  project,
  onOpen,
  triggerRef,
}: ProjectCardProps) {
  return (
    <article
      className={styles.projectCard}
      data-card-action
      data-project={project.id}
    >
      <button
        ref={triggerRef}
        type="button"
        className={styles.cardActionOverlay}
        onClick={() => onOpen(project.id)}
        aria-label={`Más info sobre ${project.title}`}
        data-card-action-trigger
      />

      <div className={styles.mockupFrame}>
        <Image
          src={project.mockup}
          alt={project.mockupAlt}
          fill
          sizes="(max-width: 680px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={styles.mockup}
        />
      </div>

      <div className={styles.cardContent}>
        <div className={styles.projectIdentity}>
          <h3 className={styles.projectTitle}>{project.title}</h3>
          <div className={styles.logoFrame} aria-hidden="true">
            <Image
              src={project.logo}
              alt=""
              fill
              sizes="110px"
              className={`${styles.logo} ${
                project.id === "leinwand" ? styles.leinwandLogo : ""
              }`}
            />
          </div>
        </div>

        <p className={styles.description}>{project.description}</p>

        <div className={styles.actions}>
          <CardActionLabel label="Más info" size="medium" />
          <ActionLink
            href={project.externalHref}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            size="compact"
          >
            {project.externalCta}
          </ActionLink>
        </div>
      </div>
    </article>
  );
}

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
        <ScrollReveal className={styles.headerReveal}>
          <header className={styles.header}>
            <div className={styles.titleWrapper}>
              <h2 id="projects-title" className={styles.title}>
                Proyectos
              </h2>
              <span className={styles.titleAccent} aria-hidden="true" />
            </div>
          </header>
        </ScrollReveal>

        <ScrollReveal className={styles.gridReveal} delay={100}>
          <div className={styles.projectsGrid}>
            {[...featuredProjects, ...secondaryProjects].map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpen={openProject}
                triggerRef={(element) => {
                  triggerRefs.current[project.id] = element;
                }}
              />
            ))}
          </div>
        </ScrollReveal>
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
