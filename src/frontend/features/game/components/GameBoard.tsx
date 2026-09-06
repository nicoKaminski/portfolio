"use client";

import { useState, useEffect, useRef } from "react";
import { BUG_TYPES, ActiveBug, BugType } from "../constants";
import { PixelBug } from "./PixelBug";
import styles from "./GameBoard.module.css";

interface GameBoardProps {
  activeBugs: ActiveBug[];
  onCatchBug: (bugId: number) => void;
}

interface CatchFeedbackItem {
  id: number;
  x: number;
  y: number;
  points: number;
  bugType: BugType;
}

export function GameBoard({ activeBugs, onCatchBug }: GameBoardProps) {
  const [feedbacks, setFeedbacks] = useState<CatchFeedbackItem[]>([]);
  const [announcement, setAnnouncement] = useState("");
  const boardRef = useRef<HTMLDivElement>(null);
  const nextFeedbackIdRef = useRef(1);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const caughtBugIdsRef = useRef<Set<number>>(new Set());
  const isMountedRef = useRef(true);

  // Foco inicial accesible al entrar en juego
  useEffect(() => {
    boardRef.current?.focus();
  }, []);

  // Limpieza de timeouts activos al desmontar
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      timeoutsRef.current.forEach((t) => clearTimeout(t));
      timeoutsRef.current = [];
    };
  }, []);

  // Limpieza de IDs resueltos cuando cambia la colección de bugs activos
  useEffect(() => {
    const currentIds = new Set(activeBugs.map((b) => b.id));
    caughtBugIdsRef.current.forEach((id) => {
      if (!currentIds.has(id)) {
        caughtBugIdsRef.current.delete(id);
      }
    });
  }, [activeBugs]);

  const handleBugCatch = (bug: ActiveBug) => {
    if (caughtBugIdsRef.current.has(bug.id)) {
      return;
    }
    caughtBugIdsRef.current.add(bug.id);

    const config = BUG_TYPES[bug.type];
    const feedbackId = nextFeedbackIdRef.current;
    nextFeedbackIdRef.current += 1;

    const newFeedback: CatchFeedbackItem = {
      id: feedbackId,
      x: bug.position.x,
      y: bug.position.y,
      points: config.points,
      bugType: bug.type,
    };

    setFeedbacks((prev) => [...prev, newFeedback]);
    setAnnouncement((prev) =>
      prev.endsWith("\u00A0")
        ? `+${config.points} ${config.points === 1 ? "punto" : "puntos"}`
        : `+${config.points} ${config.points === 1 ? "punto" : "puntos"}\u00A0`
    );

    const feedbackTimer = setTimeout(() => {
      if (!isMountedRef.current) return;
      setFeedbacks((prev) => prev.filter((f) => f.id !== feedbackId));
    }, 520);

    timeoutsRef.current.push(feedbackTimer);

    onCatchBug(bug.id);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " " || event.code === "Space") {
      event.preventDefault();
      const uncaughtBugs = activeBugs
        .filter((b) => !caughtBugIdsRef.current.has(b.id))
        .sort((a, b) => a.id - b.id);
      if (uncaughtBugs.length > 0) {
        handleBugCatch(uncaughtBugs[0]);
      }
    }
  };

  return (
    <div
      ref={boardRef}
      tabIndex={0}
      className={styles.board}
      role="region"
      aria-label="Tablero de Cazador de Bugs. Presioná Espacio o Enter para atrapar el bug activo"
      onKeyDown={handleKeyDown}
    >
      <div className={styles.srOnly} aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      {activeBugs.map((bug) => {
        const config = BUG_TYPES[bug.type];
        const buttonClasses = [
          styles.bugButton,
          bug.type === "normal" && styles.bugNormal,
          bug.type === "rapido" && styles.bugRapido,
          bug.type === "especial" && styles.bugEspecial,
        ]
          .filter(Boolean)
          .join(" ");

        const ariaLabel = `Atrapar bug ${config.label} (+${config.points} ${
          config.points === 1 ? "punto" : "puntos"
        })`;

        return (
          <button
            key={bug.id}
            type="button"
            className={buttonClasses}
            style={{
              left: `${bug.position.x}%`,
              top: `${bug.position.y}%`,
            }}
            onClick={() => handleBugCatch(bug)}
            tabIndex={-1}
            aria-label={ariaLabel}
          >
            <PixelBug
              type={bug.type}
              size={48}
              className={styles.bugGraphic}
            />
          </button>
        );
      })}

      {/* Feedback breve de captura (+1, +2 o +3) */}
      {feedbacks.map((f) => (
        <span
          key={f.id}
          className={`${styles.catchFeedback} ${styles[`feedback_${f.bugType}`]}`}
          style={{
            left: `${f.x}%`,
            top: `${f.y}%`,
          }}
          aria-hidden="true"
        >
          +{f.points}
        </span>
      ))}
    </div>
  );
}
