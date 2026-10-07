"use client";

import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => {
    mediaQuery.removeEventListener("change", callback);
  };
}

function getSnapshot(): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getServerSnapshot(): boolean {
  return false;
}

/**
 * Consulta síncrona puntual para handlers imperativos fuera del ciclo de render.
 */
export function getPrefersReducedMotion(): boolean {
  return getSnapshot();
}

/**
 * Hook reactivo para consultar la preferencia de reducción de movimiento del usuario.
 * Utiliza useSyncExternalStore para evitar desincronizaciones e hydration mismatches.
 *
 * @returns true si el usuario solicita reducir movimiento, false en caso contrario o en SSR.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
