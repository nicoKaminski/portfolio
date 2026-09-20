"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ActionLink } from "@/frontend/components/ActionLink";
import { CardActionLabel } from "@/frontend/components/CardActionLabel";
import { ProjectDetailDialog } from "@/frontend/components/ProjectDetailDialog";
import { ScrollReveal } from "@/frontend/components/ScrollReveal";
import {
  projects,
  type Project,
  type ProjectSlug,
} from "./projectCatalog";
import styles from "./Projects.module.css";

const PROJECT_DIALOG_CONFIG: Record<
  ProjectSlug,
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
  "leinwand-overland": {
    title: "Leinwand Overland",
    subtitle: "E-commerce de equipamiento para aventura y overland",
    status: "Publicado · En uso",
    closeAriaLabel: "Cerrar detalle de Leinwand Overland",
  },
};

interface ProjectCardProps {
  project: Project;
  onOpen: (project: ProjectSlug) => void;
  triggerRef: (element: HTMLAnchorElement | null) => void;
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
      data-project={project.slug}
    >
      <a
        ref={triggerRef}
        href={`/proyectos/${project.slug}`}
        className={styles.cardActionOverlay}
        onClick={(event) => {
          if (
            event.button !== 0 ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey
          ) {
            return;
          }

          event.preventDefault();
          onOpen(project.slug);
        }}
        aria-label={`Más info sobre ${project.title}`}
        aria-haspopup="dialog"
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
                project.slug === "leinwand-overland" ? styles.leinwandLogo : ""
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
  const [activeProject, setActiveProject] = useState<ProjectSlug | null>(null);
  const triggerRefs = useRef<
    Partial<Record<ProjectSlug, HTMLAnchorElement | null>>
  >({});
  const activeTriggerRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const dialogConfig = activeProject
    ? PROJECT_DIALOG_CONFIG[activeProject]
    : null;
  const activeProjectData = activeProject
    ? projects.find(({ slug }) => slug === activeProject)
    : null;
  const ActiveDetail = activeProjectData?.Detail;

  const openProject = (project: ProjectSlug) => {
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
            {projects.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                onOpen={openProject}
                triggerRef={(element) => {
                  triggerRefs.current[project.slug] = element;
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
        {ActiveDetail && <ActiveDetail />}
      </ProjectDetailDialog>
    </section>
  );
}
