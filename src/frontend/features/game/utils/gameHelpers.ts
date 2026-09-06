import {
  BEST_SCORE_STORAGE_KEY,
  BOARD_BOUNDS,
  BugPosition,
  BugType,
} from "../constants";

/**
 * Genera una posición aleatoria dentro del área segura del tablero en coordenadas relativas (%).
 * Evita deliberadamente repetir la posición anterior garantizando una distancia euclidiana mínima.
 *
 * @param previousPosition - Coordenadas relativas de la aparición anterior, o null si es la primera.
 * @param bounds - Márgenes de seguridad y distancia mínima.
 * @returns Posición { x, y } en porcentajes dentro del tablero.
 */
export function getNextBugPosition(
  previousPosition: BugPosition | null,
  bounds = BOARD_BOUNDS
): BugPosition {
  const { minX, maxX, minY, maxY, minDistance } = bounds;
  const rangeX = maxX - minX;
  const rangeY = maxY - minY;

  const getRandomCoord = (): BugPosition => ({
    x: Number((minX + Math.random() * rangeX).toFixed(1)),
    y: Number((minY + Math.random() * rangeY).toFixed(1)),
  });

  if (!previousPosition) {
    return getRandomCoord();
  }

  let bestPosition = getRandomCoord();
  let maxDist = -1;

  for (let i = 0; i < 12; i++) {
    const candidate = getRandomCoord();
    const dist = Math.hypot(
      candidate.x - previousPosition.x,
      candidate.y - previousPosition.y
    );

    if (dist >= minDistance) {
      return candidate;
    }

    if (dist > maxDist) {
      maxDist = dist;
      bestPosition = candidate;
    }
  }

  return bestPosition;
}

export type WaveSize = 1 | 2 | 3;

/**
 * Selecciona aleatoriamente la cantidad de bugs de la oleada (1, 2 o 3) según el tiempo transcurrido:
 * - 0 a < 10 s: 1 bug: 90 %, 2 bugs: 10 %, 3 bugs: 0 %
 * - 10 a < 20 s: 1 bug: 75 %, 2 bugs: 20 %, 3 bugs: 5 %
 * - 20 a 30 s: 1 bug: 60 %, 2 bugs: 30 %, 3 bugs: 10 %
 *
 * Utiliza una única muestra aleatoria y garantiza que las probabilidades de cada tramo sumen exactamente 100%.
 */
export function getWaveSize(
  elapsedSeconds: number,
  random: number = Math.random()
): WaveSize {
  if (elapsedSeconds < 10) {
    return random < 0.90 ? 1 : 2;
  }

  if (elapsedSeconds < 20) {
    if (random < 0.75) {
      return 1;
    }
    if (random < 0.95) {
      return 2;
    }
    return 3;
  }

  if (random < 0.60) {
    return 1;
  }
  if (random < 0.90) {
    return 2;
  }
  return 3;
}

/**
 * Genera las posiciones seguras para una oleada de 1, 2 o 3 bugs dentro de BOARD_BOUNDS.
 * Valida que ningún par de bugs se superponga y que todos los pares respeten como mínimo bounds.minDistance:
 * - Para 2 bugs: bug 1 ↔ bug 2 >= minDistance.
 * - Para 3 bugs: bug 1 ↔ bug 2, bug 1 ↔ bug 3 y bug 2 ↔ bug 3 >= minDistance.
 *
 * Aplica degradación segura con intentos acotados (sin bucles infinitos):
 * - Si se piden 3 bugs y no se encuentran 3 posiciones válidas dentro de los intentos permitidos:
 *   1. intenta producir una oleada válida de 2 bugs;
 *   2. si tampoco resulta posible, degrada a 1 bug.
 * - Si se piden 2 bugs y no se obtiene una segunda posición segura:
 *   degrada a 1 bug.
 */
export function getWavePositions(
  count: number,
  previousPosition: BugPosition | null = null,
  bounds = BOARD_BOUNDS
): BugPosition[] {
  const pos1 = getNextBugPosition(previousPosition, bounds);
  if (count <= 1) {
    return [pos1];
  }

  const { minX, maxX, minY, maxY, minDistance } = bounds;
  const rangeX = maxX - minX;
  const rangeY = maxY - minY;

  const getRandomCoord = (): BugPosition => ({
    x: Number((minX + Math.random() * rangeX).toFixed(1)),
    y: Number((minY + Math.random() * rangeY).toFixed(1)),
  });

  const MAX_ATTEMPTS = 20;

  if (count >= 3) {
    let validPos2: BugPosition | null = null;

    for (let i = 0; i < MAX_ATTEMPTS; i++) {
      const candidate2 = getRandomCoord();
      const dist12 = Math.hypot(candidate2.x - pos1.x, candidate2.y - pos1.y);

      if (dist12 >= minDistance) {
        if (!validPos2) {
          validPos2 = candidate2;
        }

        for (let j = 0; j < MAX_ATTEMPTS; j++) {
          const candidate3 = getRandomCoord();
          const dist13 = Math.hypot(candidate3.x - pos1.x, candidate3.y - pos1.y);
          const dist23 = Math.hypot(
            candidate3.x - candidate2.x,
            candidate3.y - candidate2.y
          );

          if (dist13 >= minDistance && dist23 >= minDistance) {
            return [pos1, candidate2, candidate3];
          }
        }
      }
    }

    // Degradación segura 3 -> 2:
    if (validPos2) {
      return [pos1, validPos2];
    }

    for (let i = 0; i < MAX_ATTEMPTS; i++) {
      const candidate2 = getRandomCoord();
      if (Math.hypot(candidate2.x - pos1.x, candidate2.y - pos1.y) >= minDistance) {
        return [pos1, candidate2];
      }
    }

    // Degradación segura 2 -> 1:
    return [pos1];
  }

  // count === 2
  for (let i = 0; i < MAX_ATTEMPTS; i++) {
    const candidate = getRandomCoord();
    if (Math.hypot(candidate.x - pos1.x, candidate.y - pos1.y) >= minDistance) {
      return [pos1, candidate];
    }
  }

  // Fallback seguro: degradar a un único bug si no se halló segunda posición segura
  return [pos1];
}

export interface DifficultyPhase {
  durationMultiplier: number;
  respawnDelayMs: number;
}

/**
 * Selecciona aleatoriamente el tipo de bug según las probabilidades exactas:
 * - normal: 65 % (0.00 a 0.65)
 * - rápido: 25 % (0.65 a 0.90)
 * - especial: 10 % (0.90 a 1.00)
 */
export function getRandomBugType(random: number = Math.random()): BugType {
  if (random < 0.65) {
    return "normal";
  }
  if (random < 0.90) {
    return "rapido";
  }
  return "especial";
}

/**
 * Determina los parámetros de dificultad progresiva según los segundos transcurridos:
 * - 0–10s: multiplicador 1, espera ~180 ms
 * - 10–20s: multiplicador 0.85, espera ~130 ms
 * - 20–30s: multiplicador 0.70, espera ~90 ms
 */
export function getDifficultyPhase(elapsedSeconds: number): DifficultyPhase {
  if (elapsedSeconds < 10) {
    return {
      durationMultiplier: 1,
      respawnDelayMs: 180,
    };
  }
  if (elapsedSeconds < 20) {
    return {
      durationMultiplier: 0.85,
      respawnDelayMs: 130,
    };
  }
  return {
    durationMultiplier: 0.70,
    respawnDelayMs: 90,
  };
}

const bestScoreListeners = new Set<() => void>();

/**
 * Suscribe un callback a las actualizaciones de mejor puntaje (mismo tab o storage event externo).
 */
export function subscribeBestScore(callback: () => void): () => void {
  bestScoreListeners.add(callback);
  if (typeof window !== "undefined") {
    window.addEventListener("storage", callback);
  }
  return () => {
    bestScoreListeners.delete(callback);
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", callback);
    }
  };
}

/**
 * Snapshot de servidor para el mejor puntaje (siempre 0 para evitar hydration mismatches).
 */
export function getBestScoreServerSnapshot(): number {
  return 0;
}

/**
 * Lee el mejor puntaje de sesión de forma segura.
 * Devuelve un entero no negativo válido, o 0 si no existe, no está disponible o falla.
 */
export function getStoredBestScore(): number {
  if (typeof window === "undefined") {
    return 0;
  }
  try {
    const raw = window.sessionStorage.getItem(BEST_SCORE_STORAGE_KEY);
    if (!raw || !/^\d+$/.test(raw)) {
      return 0;
    }
    const parsed = parseInt(raw, 10);
    return Number.isSafeInteger(parsed) && parsed >= 0 ? parsed : 0;
  } catch {
    return 0;
  }
}

/**
 * Almacena de forma segura un entero no negativo válido en sessionStorage únicamente en cliente
 * y notifica a los suscriptores.
 * Falla silenciosamente si sessionStorage está deshabilitado, restringido o arroja error.
 */
export function saveStoredBestScore(score: number): void {
  if (typeof window === "undefined") {
    return;
  }
  try {
    if (Number.isSafeInteger(score) && score >= 0) {
      window.sessionStorage.setItem(BEST_SCORE_STORAGE_KEY, score.toString());
      bestScoreListeners.forEach((listener) => listener());
    }
  } catch {
    // Si sessionStorage no está disponible o lanza error, el juego continúa normalmente
  }
}
