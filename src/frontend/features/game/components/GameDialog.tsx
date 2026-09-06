"use client";

import { useEffect, useRef } from "react";
import { ActionButton } from "@/frontend/components/ActionButton";
import { GAME_DURATION_SECONDS } from "../constants";
import { useBugHunter } from "../hooks/useBugHunter";
import { GameBoard } from "./GameBoard";
import { PixelBug } from "./PixelBug";
import styles from "./GameDialog.module.css";

interface GameDialogProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLButtonElement | null>;
}

export function GameDialog({ isOpen, onClose, triggerRef }: GameDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const restartButtonRef = useRef<HTMLButtonElement>(null);

  const {
    status,
    score,
    bestScore,
    timeRemaining,
    activeBugs,
    startGame,
    catchBug,
  } = useBugHunter({ isOpen });

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
      document.documentElement.classList.add("scroll-locked");
      document.body.classList.add("scroll-locked");
      closeButtonRef.current?.focus();
    } else {
      if (dialog.open) {
        dialog.close();
        triggerRef?.current?.focus();
      }
      document.documentElement.classList.remove("scroll-locked");
      document.body.classList.remove("scroll-locked");
    }

    return () => {
      document.documentElement.classList.remove("scroll-locked");
      document.body.classList.remove("scroll-locked");
    };
  }, [isOpen, triggerRef]);

  useEffect(() => {
    if (status === "game_over") {
      restartButtonRef.current?.focus();
    }
  }, [status]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (event: Event) => {
      event.preventDefault();
      onClose();
    };

    dialog.addEventListener("cancel", handleCancel);
    return () => {
      dialog.removeEventListener("cancel", handleCancel);
    };
  }, [onClose]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const rect = dialog.getBoundingClientRect();
    const isOutside =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom;

    if (isOutside || event.target === dialog) {
      onClose();
    }
  };

  const isNewSessionRecord =
    status === "game_over" && score > 0 && score === bestScore;

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="game-dialog-title"
      onClick={handleBackdropClick}
    >
      <div className={styles.dialogCard} onClick={(e) => e.stopPropagation()}>
        <header className={styles.header}>
          <div className={styles.titleWrapper}>
            <div className={styles.pixelAccent} aria-hidden="true">
              <span className={styles.pixelDot} />
              <span className={styles.pixelDot} />
              <span className={styles.pixelDot} />
            </div>
            <h2 id="game-dialog-title" className={styles.title}>
              Cazador de Bugs
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Cerrar Cazador de Bugs"
          >
            <span aria-hidden="true" className={styles.closeIcon}>
              ✕
            </span>
          </button>
        </header>

        <div className={styles.body}>
          {status === "idle" && (
            <div className={styles.idleView}>
              <p className={styles.description}>
                Tenés {GAME_DURATION_SECONDS} segundos para atrapar todos los
                bugs que puedas!
              </p>

              {/* Guía visual rápida de los 3 bugs */}
              <div className={styles.bugLegend} aria-label="Tipos de bugs">
                <div
                  className={`${styles.legendItem} ${styles.legendItemNormal}`}
                >
                  <PixelBug
                    type="normal"
                    size={28}
                    className={styles.legendBug}
                  />
                  <div className={styles.legendMeta}>
                    <span className={styles.legendName}>Normal</span>
                    <span className={styles.legendPoints}>+1 pt</span>
                  </div>
                </div>
                <div
                  className={`${styles.legendItem} ${styles.legendItemRapido}`}
                >
                  <PixelBug
                    type="rapido"
                    size={28}
                    className={styles.legendBug}
                  />
                  <div className={styles.legendMeta}>
                    <span className={styles.legendName}>Rápido</span>
                    <span className={styles.legendPoints}>+2 pts</span>
                  </div>
                </div>
                <div
                  className={`${styles.legendItem} ${styles.legendItemEspecial}`}
                >
                  <PixelBug
                    type="especial"
                    size={28}
                    className={styles.legendBug}
                  />
                  <div className={styles.legendMeta}>
                    <span className={styles.legendName}>Especial</span>
                    <span className={styles.legendPoints}>+3 pts</span>
                  </div>
                </div>
              </div>

              <p className={styles.bestScore}>
                Tu mejor puntaje:{" "}
                <strong className={styles.scoreHighlight}>{bestScore}</strong>
              </p>

              <div className={styles.actions}>
                <ActionButton variant="primary" onClick={startGame}>
                  Comenzar partida
                </ActionButton>
              </div>
            </div>
          )}

          {status === "playing" && (
            <div className={styles.playingView}>
              {/* HUD compacto: Tiempo, Puntos y Mejor de esta sesión */}
              <div className={styles.hud} aria-label="Marcador de la partida">
                <div className={styles.hudItem}>
                  <span className={styles.hudLabel}>Tiempo</span>
                  <span className={styles.hudValue}>{timeRemaining}s</span>
                </div>
                <div className={styles.hudDivider} aria-hidden="true" />
                <div className={styles.hudItem}>
                  <span className={styles.hudLabel}>Puntos</span>
                  <span className={styles.hudValue}>{score}</span>
                </div>
                <div className={styles.hudDivider} aria-hidden="true" />
                <div className={styles.hudItem}>
                  <span className={styles.hudLabel}>Mejor</span>
                  <span className={styles.hudValue}>{bestScore}</span>
                </div>
              </div>

              <GameBoard activeBugs={activeBugs} onCatchBug={catchBug} />
            </div>
          )}

          {status === "game_over" && (
            <div
              className={styles.resultView}
              role="region"
              aria-label="Resultado de la partida"
            >
              <div className={styles.resultHeader}>
                <h3 className={styles.resultTitle}>¡Fin de la partida!</h3>
                {isNewSessionRecord && (
                  <span className={styles.newRecordBadge} role="status">
                    ★ ¡Nuevo récord de sesión!
                  </span>
                )}
              </div>

              <p className={styles.resultScore}>
                Puntaje obtenido:{" "}
                <strong className={styles.scoreHighlight}>
                  {score} {score === 1 ? "punto" : "puntos"}
                </strong>
              </p>

              <p className={styles.bestScore}>
                Tu mejor puntaje:{" "}
                <strong className={styles.scoreHighlight}>{bestScore}</strong>
              </p>

              <div className={styles.actions}>
                <ActionButton
                  ref={restartButtonRef}
                  variant="primary"
                  onClick={startGame}
                >
                  Jugar de nuevo
                </ActionButton>
                <ActionButton variant="secondary" onClick={onClose}>
                  Cerrar
                </ActionButton>
              </div>
            </div>
          )}
        </div>
      </div>
    </dialog>
  );
}
