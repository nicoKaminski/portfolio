export type BugType = "normal" | "rapido" | "especial";

export interface BugConfig {
  type: BugType;
  label: string;
  points: number;
  probability: number;
  baseDurationMs: number;
}

export interface BugPosition {
  x: number;
  y: number;
}

export interface ActiveBug {
  id: number;
  type: BugType;
  position: BugPosition;
  points: number;
}

/**
 * Duración de la partida en segundos.
 */
export const GAME_DURATION_SECONDS = 30;

/**
 * Límites de coordenadas seguras relativas (%) dentro del tablero para evitar bordes y cortes.
 */
export const BOARD_BOUNDS = {
  minX: 14,
  maxX: 86,
  minY: 15,
  maxY: 85,
  minDistance: 22,
} as const;

/**
 * Tipos de bug con sus puntos, probabilidad (suman 100%) y tiempo base visible.
 */
export const BUG_TYPES: Record<BugType, BugConfig> = {
  normal: {
    type: "normal",
    label: "normal",
    points: 1,
    probability: 0.65,
    baseDurationMs: 1100,
  },
  rapido: {
    type: "rapido",
    label: "rápido",
    points: 2,
    probability: 0.25,
    baseDurationMs: 750,
  },
  especial: {
    type: "especial",
    label: "especial",
    points: 3,
    probability: 0.10,
    baseDurationMs: 900,
  },
};

/**
 * Clave segura para persistencia del mejor puntaje en sessionStorage.
 */
export const BEST_SCORE_STORAGE_KEY = "cazador-bugs-best-score-v1";
