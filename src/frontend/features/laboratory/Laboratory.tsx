"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { ProjectDetailDialog } from "../projects/components/ProjectDetailDialog";
import { MemoWarsDetail } from "./components/MemoWarsDetail";
import { MemoPotterDetail } from "./components/MemoPotterDetail";
import styles from "./Laboratory.module.css";

interface LaboratoryProject {
  id?: "memo-potter" | "memo-wars";
  name: string;
  previewSrc: string;
}

const laboratoryProjects: LaboratoryProject[] = [
  {
    id: "memo-wars",
    name: "MemoWars",
    previewSrc: "/projects/laboratory/memo-war/preview.jpg",
  },
  {
    id: "memo-potter",
    name: "MemoPotter",
    previewSrc: "/projects/laboratory/memo-potter/preview.png",
  },
  {
    name: "Qué Como · UX/UI",
    previewSrc: "/projects/laboratory/que-como/39.png",
  },
  {
    name: "Sistema Universitario TypeScript",
    previewSrc: "/projects/laboratory/sigesuni/preview.png",
  },
  {
    name: "Sistema Universitario Java",
    previewSrc: "/projects/laboratory/sysaduni/preview.png",
  },
  {
    name: "NutriVida Suite",
    previewSrc: "/projects/laboratory/nutrivida/preview.png",
  },
];

type ActiveLabProject = "memo-potter" | "memo-wars" | null;

export function Laboratory() {
  const [activeProject, setActiveProject] = useState<ActiveLabProject>(null);
  const memoPotterTriggerRef = useRef<HTMLButtonElement>(null);
  const memoWarsTriggerRef = useRef<HTMLButtonElement>(null);

  const isMemoPotter = activeProject === "memo-potter";
  const isMemoWars = activeProject === "memo-wars";
  const isDialogOpen = activeProject !== null;

  const currentTriggerRef = isMemoPotter
    ? memoPotterTriggerRef
    : isMemoWars
      ? memoWarsTriggerRef
      : undefined;

  const dialogTitle = isMemoPotter
    ? "MemoPotter"
    : isMemoWars
      ? "MemoWars"
      : "";

  const dialogSubtitle = isMemoPotter
    ? "Proyecto final · Web II"
    : isMemoWars
      ? "Práctica previa · Web II"
      : undefined;

  const dialogCloseAriaLabel = isMemoPotter
    ? "Cerrar detalle de MemoPotter"
    : isMemoWars
      ? "Cerrar detalle de MemoWars"
      : undefined;

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
          {laboratoryProjects.map((project) => {
            const isInteractive =
              project.id === "memo-potter" || project.id === "memo-wars";

            if (isInteractive) {
              const triggerRef =
                project.id === "memo-potter"
                  ? memoPotterTriggerRef
                  : memoWarsTriggerRef;

              return (
                <button
                  key={project.name}
                  ref={triggerRef}
                  type="button"
                  className={`${styles.item} ${styles.interactiveItem}`}
                  onClick={() => setActiveProject(project.id as ActiveLabProject)}
                  aria-haspopup="dialog"
                >
                  <span className={styles.projectName}>{project.name}</span>

                  <div className={styles.preview} aria-hidden="true">
                    <div className={styles.previewImageWrapper}>
                      <Image
                        src={project.previewSrc}
                        alt=""
                        width={400}
                        height={225}
                        className={styles.previewImage}
                      />
                    </div>
                    <span className={styles.previewTitle}>{project.name}</span>
                  </div>
                </button>
              );
            }

            return (
              <article
                key={project.name}
                className={styles.item}
              >
                <span className={styles.projectName}>{project.name}</span>

                <div className={styles.preview} aria-hidden="true">
                  <div className={styles.previewImageWrapper}>
                    <Image
                      src={project.previewSrc}
                      alt=""
                      width={400}
                      height={225}
                      className={styles.previewImage}
                    />
                  </div>
                  <span className={styles.previewTitle}>{project.name}</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <ProjectDetailDialog
        isOpen={isDialogOpen}
        onClose={() => setActiveProject(null)}
        title={dialogTitle}
        subtitle={dialogSubtitle}
        closeAriaLabel={dialogCloseAriaLabel}
        triggerRef={currentTriggerRef}
      >
        {isMemoWars && (
          <MemoWarsDetail
            onNavigateToMemoPotter={() => setActiveProject("memo-potter")}
          />
        )}
        {isMemoPotter && (
          <MemoPotterDetail
            onNavigateToMemoWars={() => setActiveProject("memo-wars")}
          />
        )}
      </ProjectDetailDialog>
    </section>
  );
}
