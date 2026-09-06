"use client";

import { useState, useRef, useEffect, useCallback, useSyncExternalStore } from "react";
import {
  GAME_DURATION_SECONDS,
  BUG_TYPES,
  ActiveBug,
  BugPosition,
} from "../constants";
import {
  getRandomBugType,
  getDifficultyPhase,
  getStoredBestScore,
  saveStoredBestScore,
  subscribeBestScore,
  getBestScoreServerSnapshot,
  getWavePositions,
  getWaveSize,
} from "../utils/gameHelpers";

export type GameStatus = "idle" | "playing" | "game_over";

interface UseBugHunterOptions {
  isOpen: boolean;
}

export function useBugHunter({ isOpen }: UseBugHunterOptions) {
  const [status, setStatus] = useState<GameStatus>("idle");
  const [score, setScore] = useState(0);
  const bestScore = useSyncExternalStore(
    subscribeBestScore,
    getStoredBestScore,
    getBestScoreServerSnapshot
  );
  const [timeRemaining, setTimeRemaining] = useState(GAME_DURATION_SECONDS);
  const [activeBugs, setActiveBugs] = useState<ActiveBug[]>([]);

  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  if (prevIsOpen !== isOpen) {
    setPrevIsOpen(isOpen);
    if (!isOpen) {
      setStatus("idle");
      setScore(0);
      setTimeRemaining(GAME_DURATION_SECONDS);
      setActiveBugs([]);
    }
  }

  const isMountedRef = useRef(true);
  const statusRef = useRef<GameStatus>("idle");
  const activeBugsRef = useRef<
    Map<number, { bug: ActiveBug; timer: NodeJS.Timeout }>
  >(new Map());
  const nextBugIdRef = useRef(0);
  const gameSessionIdRef = useRef(0);
  const lastPositionRef = useRef<BugPosition | null>(null);
  const startTimeRef = useRef(0);
  const scoreRef = useRef(0);

  const countdownTimerRef = useRef<NodeJS.Timeout | null>(null);
  const respawnTimerRef = useRef<NodeJS.Timeout | null>(null);
  const spawnWaveRef = useRef<() => void>(() => {});

  const clearAllTimers = useCallback(() => {
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
      countdownTimerRef.current = null;
    }
    if (respawnTimerRef.current) {
      clearTimeout(respawnTimerRef.current);
      respawnTimerRef.current = null;
    }
    activeBugsRef.current.forEach(({ timer }) => {
      clearTimeout(timer);
    });
    activeBugsRef.current.clear();
  }, []);

  const finishGame = useCallback(() => {
    if (!isMountedRef.current || statusRef.current !== "playing") {
      return;
    }
    clearAllTimers();
    gameSessionIdRef.current += 1;
    statusRef.current = "game_over";

    setActiveBugs([]);
    setTimeRemaining(0);
    setStatus("game_over");

    const finalScore = scoreRef.current;
    if (finalScore > getStoredBestScore()) {
      saveStoredBestScore(finalScore);
    }
  }, [clearAllTimers]);

  const expireBug = useCallback((bugId: number) => {
    if (!isMountedRef.current || statusRef.current !== "playing") {
      return;
    }

    const activeEntry = activeBugsRef.current.get(bugId);
    if (!activeEntry) {
      return;
    }

    activeBugsRef.current.delete(bugId);
    setActiveBugs(Array.from(activeBugsRef.current.values()).map((v) => v.bug));

    if (activeBugsRef.current.size > 0) {
      return;
    }

    if (respawnTimerRef.current) {
      clearTimeout(respawnTimerRef.current);
      respawnTimerRef.current = null;
    }

    const elapsedAtExpire = Math.max(
      0,
      (Date.now() - startTimeRef.current) / 1000
    );
    const respawnPhase = getDifficultyPhase(elapsedAtExpire);
    const sessionId = gameSessionIdRef.current;

    respawnTimerRef.current = setTimeout(() => {
      if (
        !isMountedRef.current ||
        statusRef.current !== "playing" ||
        gameSessionIdRef.current !== sessionId
      ) {
        return;
      }
      spawnWaveRef.current();
    }, respawnPhase.respawnDelayMs);
  }, []);

  const catchBug = useCallback((bugId: number) => {
    if (!isMountedRef.current || statusRef.current !== "playing") {
      return;
    }

    const activeEntry = activeBugsRef.current.get(bugId);
    if (!activeEntry) {
      return;
    }

    clearTimeout(activeEntry.timer);
    activeBugsRef.current.delete(bugId);

    scoreRef.current += activeEntry.bug.points;
    setScore(scoreRef.current);
    setActiveBugs(Array.from(activeBugsRef.current.values()).map((v) => v.bug));

    if (activeBugsRef.current.size > 0) {
      return;
    }

    if (respawnTimerRef.current) {
      clearTimeout(respawnTimerRef.current);
      respawnTimerRef.current = null;
    }

    const elapsedAtCatch = Math.max(
      0,
      (Date.now() - startTimeRef.current) / 1000
    );
    const catchPhase = getDifficultyPhase(elapsedAtCatch);
    const sessionId = gameSessionIdRef.current;

    respawnTimerRef.current = setTimeout(() => {
      if (
        !isMountedRef.current ||
        statusRef.current !== "playing" ||
        gameSessionIdRef.current !== sessionId
      ) {
        return;
      }
      spawnWaveRef.current();
    }, catchPhase.respawnDelayMs);
  }, []);

  useEffect(() => {
    spawnWaveRef.current = () => {
      if (!isMountedRef.current || statusRef.current !== "playing") {
        return;
      }

      const sessionId = gameSessionIdRef.current;
      const elapsedSeconds = Math.max(
        0,
        (Date.now() - startTimeRef.current) / 1000
      );
      const phase = getDifficultyPhase(elapsedSeconds);

      const targetCount = getWaveSize(elapsedSeconds);
      const positions = getWavePositions(targetCount, lastPositionRef.current);
      lastPositionRef.current = positions[positions.length - 1];

      for (const pos of positions) {
        const bugType = getRandomBugType();
        const config = BUG_TYPES[bugType];
        const currentBugId = ++nextBugIdRef.current;

        const activeBug: ActiveBug = {
          id: currentBugId,
          type: bugType,
          position: pos,
          points: config.points,
        };

        const durationMs = Math.round(
          config.baseDurationMs * phase.durationMultiplier
        );

        const lifetimeTimer = setTimeout(() => {
          if (
            !isMountedRef.current ||
            statusRef.current !== "playing" ||
            gameSessionIdRef.current !== sessionId
          ) {
            return;
          }
          expireBug(currentBugId);
        }, durationMs);

        activeBugsRef.current.set(currentBugId, {
          bug: activeBug,
          timer: lifetimeTimer,
        });
      }

      setActiveBugs(Array.from(activeBugsRef.current.values()).map((v) => v.bug));
    };
  });

  const startGame = useCallback(() => {
    clearAllTimers();
    gameSessionIdRef.current += 1;
    lastPositionRef.current = null;

    statusRef.current = "playing";
    scoreRef.current = 0;
    setStatus("playing");
    setScore(0);
    setTimeRemaining(GAME_DURATION_SECONDS);
    setActiveBugs([]);

    const startTime = Date.now();
    startTimeRef.current = startTime;
    const endTime = startTime + GAME_DURATION_SECONDS * 1000;

    countdownTimerRef.current = setInterval(() => {
      if (!isMountedRef.current || statusRef.current !== "playing") {
        return;
      }
      const remaining = Math.max(0, Math.ceil((endTime - Date.now()) / 1000));
      setTimeRemaining(remaining);
      if (remaining <= 0) {
        finishGame();
      }
    }, 100);

    const initialPhase = getDifficultyPhase(0);
    const sessionId = gameSessionIdRef.current;
    respawnTimerRef.current = setTimeout(() => {
      if (
        !isMountedRef.current ||
        statusRef.current !== "playing" ||
        gameSessionIdRef.current !== sessionId
      ) {
        return;
      }
      spawnWaveRef.current();
    }, initialPhase.respawnDelayMs);
  }, [clearAllTimers, finishGame]);

  const resetGame = useCallback(() => {
    clearAllTimers();
    gameSessionIdRef.current += 1;
    lastPositionRef.current = null;

    statusRef.current = "idle";
    scoreRef.current = 0;
    setStatus("idle");
    setScore(0);
    setTimeRemaining(GAME_DURATION_SECONDS);
    setActiveBugs([]);
  }, [clearAllTimers]);

  useEffect(() => {
    if (!isOpen) {
      clearAllTimers();
      gameSessionIdRef.current += 1;
      lastPositionRef.current = null;
      statusRef.current = "idle";
      scoreRef.current = 0;
    }
  }, [isOpen, clearAllTimers]);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      clearAllTimers();
      gameSessionIdRef.current += 1;
    };
  }, [clearAllTimers]);

  return {
    status,
    score,
    bestScore,
    timeRemaining,
    activeBugs,
    startGame,
    catchBug,
    resetGame,
  };
}
