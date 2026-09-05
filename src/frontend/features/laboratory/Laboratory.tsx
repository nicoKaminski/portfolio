"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { CardActionLabel } from "@/frontend/components/CardActionLabel";
import { ProjectDetailDialog } from "@/frontend/components/ProjectDetailDialog";
import { MemoWarsDetail } from "./components/MemoWarsDetail";
import { MemoPotterDetail } from "./components/MemoPotterDetail";
import { QueComoDetail } from "./components/QueComoDetail";
import { SigesUniDetail } from "./components/SigesUniDetail";
import { SysadUniDetail } from "./components/SysadUniDetail";
import { NutriVidaDetail } from "./components/NutriVidaDetail";
import styles from "./Laboratory.module.css";

type LabProjectId =
  | "memo-potter"
  | "memo-wars"
  | "que-como"
  | "siges-uni"
  | "sysad-uni"
  | "nutrivida";

interface LaboratoryProject {
  id: LabProjectId;
  name: string;
  description: string;
  previewSrc: string;
}

const laboratoryProjects: LaboratoryProject[] = [
  {
    id: "memo-wars",
    name: "MemoWars",
    description: "Juego de memoria inspirado en Star Wars.",
    previewSrc: "/projects/laboratory/memo-war/preview.jpg",
  },
  {
    id: "memo-potter",
    name: "MemoPotter",
    description: "Memotest de Harry Potter con API y ranking.",
    previewSrc: "/projects/laboratory/memo-potter/preview.png",
  },
  {
    id: "que-como",
    name: "Qué Como · UX/UI",
    description: "Investigación y prototipado de app culinaria.",
    previewSrc: "/projects/laboratory/que-como/39.png",
  },
  {
    id: "siges-uni",
    name: "SIGES UNI · TypeScript",
    description: "Gestión universitaria académica con backend.",
    previewSrc: "/projects/laboratory/sigesuni/preview.png",
  },
  {
    id: "sysad-uni",
    name: "SYSAD UNI · Java",
    description: "Sistema de escritorio para gestión de alumnos.",
    previewSrc: "/projects/laboratory/sysaduni/preview.png",
  },
  {
    id: "nutrivida",
    name: "NutriVida Suite",
    description: "Software de escritorio para seguimiento nutricional.",
    previewSrc: "/projects/laboratory/nutrivida/preview.png",
  },
];

type ActiveLabProject = LabProjectId | null;

const LAB_DIALOG_CONFIG: Record<
  LabProjectId,
  { title: string; subtitle: string; closeAriaLabel: string }
> = {
  "memo-potter": {
    title: "MemoPotter",
    subtitle: "Proyecto final · Web II",
    closeAriaLabel: "Cerrar detalle de MemoPotter",
  },
  "memo-wars": {
    title: "MemoWars",
    subtitle: "Práctica previa · Web II",
    closeAriaLabel: "Cerrar detalle de MemoWars",
  },
  "que-como": {
    title: "Qué Como · UX/UI",
    subtitle: "Proyecto final · UX/UI",
    closeAriaLabel: "Cerrar detalle de Qué Como · UX/UI",
  },
  "siges-uni": {
    title: "SIGES UNI",
    subtitle: "Proyecto final · Desarrollo de Aplicaciones Web",
    closeAriaLabel: "Cerrar detalle de SIGES UNI",
  },
  "sysad-uni": {
    title: "SYSAD UNI",
    subtitle: "Práctica previa al proyecto final · Java",
    closeAriaLabel: "Cerrar detalle de SYSAD UNI",
  },
  nutrivida: {
    title: "NutriVida Suite",
    subtitle: "Proyecto final · Java",
    closeAriaLabel: "Cerrar detalle de NutriVida Suite",
  },
};

export function Laboratory() {
  const [activeProject, setActiveProject] = useState<ActiveLabProject>(null);
  const triggerRefs = useRef<
    Partial<Record<LabProjectId, HTMLButtonElement | null>>
  >({});
  const activeTriggerRef = useRef<HTMLButtonElement>(null);
  const dialogConfig = activeProject
    ? LAB_DIALOG_CONFIG[activeProject]
    : null;

  const openProject = (project: LabProjectId) => {
    activeTriggerRef.current = triggerRefs.current[project] ?? null;
    setActiveProject(project);
  };

  return (
    <section
      id="laboratorio"
      className={styles.laboratorySection}
      aria-labelledby="laboratory-title"
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 id="laboratory-title" className={styles.title}>
            Laboratorio
          </h2>
          <p className={styles.intro}>
            Proyectos de práctica y aprendizaje en la universidad.
          </p>
        </header>

        <div className={styles.grid}>
          {laboratoryProjects.map((project) => (
            <button
              key={project.name}
              ref={(element) => {
                triggerRefs.current[project.id] = element;
              }}
              type="button"
              className={styles.card}
              onClick={() => openProject(project.id)}
              aria-haspopup="dialog"
              data-card-action
            >
              <div className={styles.cardImageWrapper}>
                <Image
                  src={project.previewSrc}
                  alt=""
                  width={400}
                  height={225}
                  className={styles.cardImage}
                />
              </div>
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <span className={styles.projectName}>{project.name}</span>
                </div>
                <p className={styles.projectDescription}>
                  {project.description}
                </p>
                <div className={styles.cardFooter}>
                  <CardActionLabel
                    label="Ver más"
                    size="small"
                    appearance="plain"
                  />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <ProjectDetailDialog
        isOpen={activeProject !== null}
        onClose={() => setActiveProject(null)}
        title={dialogConfig?.title ?? ""}
        subtitle={dialogConfig?.subtitle}
        closeAriaLabel={dialogConfig?.closeAriaLabel}
        triggerRef={activeTriggerRef}
      >
        {activeProject === "memo-wars" && (
          <MemoWarsDetail
            onNavigateToMemoPotter={() => setActiveProject("memo-potter")}
          />
        )}
        {activeProject === "memo-potter" && (
          <MemoPotterDetail
            onNavigateToMemoWars={() => setActiveProject("memo-wars")}
          />
        )}
        {activeProject === "que-como" && <QueComoDetail />}
        {activeProject === "siges-uni" && <SigesUniDetail />}
        {activeProject === "sysad-uni" && <SysadUniDetail />}
        {activeProject === "nutrivida" && <NutriVidaDetail />}
      </ProjectDetailDialog>
    </section>
  );
}
