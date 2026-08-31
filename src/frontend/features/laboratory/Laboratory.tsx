"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { ProjectDetailDialog } from "../projects/components/ProjectDetailDialog";
import { MemoWarsDetail } from "./components/MemoWarsDetail";
import { MemoPotterDetail } from "./components/MemoPotterDetail";
import { QueComoDetail } from "./components/QueComoDetail";
import { SigesUniDetail } from "./components/SigesUniDetail";
import { SysadUniDetail } from "./components/SysadUniDetail";
import { NutriVidaDetail } from "./components/NutriVidaDetail";
import styles from "./Laboratory.module.css";

interface LaboratoryProject {
  id?:
    | "memo-potter"
    | "memo-wars"
    | "que-como"
    | "siges-uni"
    | "sysad-uni"
    | "nutrivida";
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
    id: "que-como",
    name: "Qué Como · UX/UI",
    previewSrc: "/projects/laboratory/que-como/39.png",
  },
  {
    id: "siges-uni",
    name: "SIGES UNI · TypeScript",
    previewSrc: "/projects/laboratory/sigesuni/preview.png",
  },
  {
    id: "sysad-uni",
    name: "SYSAD UNI · Java",
    previewSrc: "/projects/laboratory/sysaduni/preview.png",
  },
  {
    id: "nutrivida",
    name: "NutriVida Suite",
    previewSrc: "/projects/laboratory/nutrivida/preview.png",
  },
];

type ActiveLabProject =
  | "memo-potter"
  | "memo-wars"
  | "que-como"
  | "siges-uni"
  | "sysad-uni"
  | "nutrivida"
  | null;

export function Laboratory() {
  const [activeProject, setActiveProject] = useState<ActiveLabProject>(null);
  const memoPotterTriggerRef = useRef<HTMLButtonElement>(null);
  const memoWarsTriggerRef = useRef<HTMLButtonElement>(null);
  const queComoTriggerRef = useRef<HTMLButtonElement>(null);
  const sigesUniTriggerRef = useRef<HTMLButtonElement>(null);
  const sysadUniTriggerRef = useRef<HTMLButtonElement>(null);
  const nutriVidaTriggerRef = useRef<HTMLButtonElement>(null);

  const isMemoPotter = activeProject === "memo-potter";
  const isMemoWars = activeProject === "memo-wars";
  const isQueComo = activeProject === "que-como";
  const isSigesUni = activeProject === "siges-uni";
  const isSysadUni = activeProject === "sysad-uni";
  const isNutriVida = activeProject === "nutrivida";
  const isDialogOpen = activeProject !== null;

  const currentTriggerRef = isMemoPotter
    ? memoPotterTriggerRef
    : isMemoWars
      ? memoWarsTriggerRef
      : isQueComo
        ? queComoTriggerRef
        : isSigesUni
          ? sigesUniTriggerRef
          : isSysadUni
            ? sysadUniTriggerRef
            : isNutriVida
              ? nutriVidaTriggerRef
              : undefined;

  const dialogTitle = isMemoPotter
    ? "MemoPotter"
    : isMemoWars
      ? "MemoWars"
      : isQueComo
        ? "Qué Como · UX/UI"
        : isSigesUni
          ? "SIGES UNI"
          : isSysadUni
            ? "SYSAD UNI"
            : isNutriVida
              ? "NutriVida Suite"
              : "";

  const dialogSubtitle = isMemoPotter
    ? "Proyecto final · Web II"
    : isMemoWars
      ? "Práctica previa · Web II"
      : isQueComo
        ? "Proyecto final · UX/UI"
        : isSigesUni
          ? "Proyecto final · Desarrollo de Aplicaciones Web"
          : isSysadUni
            ? "Práctica previa al proyecto final · Java"
            : isNutriVida
              ? "Proyecto final · Java"
              : undefined;

  const dialogCloseAriaLabel = isMemoPotter
    ? "Cerrar detalle de MemoPotter"
    : isMemoWars
      ? "Cerrar detalle de MemoWars"
      : isQueComo
        ? "Cerrar detalle de Qué Como · UX/UI"
        : isSigesUni
          ? "Cerrar detalle de SIGES UNI"
          : isSysadUni
            ? "Cerrar detalle de SYSAD UNI"
            : isNutriVida
              ? "Cerrar detalle de NutriVida Suite"
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
              project.id === "memo-potter" ||
              project.id === "memo-wars" ||
              project.id === "que-como" ||
              project.id === "siges-uni" ||
              project.id === "sysad-uni" ||
              project.id === "nutrivida";

            if (isInteractive) {
              const triggerRef =
                project.id === "memo-potter"
                  ? memoPotterTriggerRef
                  : project.id === "memo-wars"
                    ? memoWarsTriggerRef
                    : project.id === "que-como"
                      ? queComoTriggerRef
                      : project.id === "siges-uni"
                        ? sigesUniTriggerRef
                        : project.id === "sysad-uni"
                          ? sysadUniTriggerRef
                          : nutriVidaTriggerRef;

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
        {isQueComo && <QueComoDetail />}
        {isSigesUni && <SigesUniDetail />}
        {isSysadUni && <SysadUniDetail />}
        {isNutriVida && <NutriVidaDetail />}
      </ProjectDetailDialog>
    </section>
  );
}
