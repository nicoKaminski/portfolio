"use client";

import { useEffect } from "react";

/**
 * Hook para bloquear y desbloquear el scroll del documento de forma segura.
 *
 * Preserva el estado previo de la clase 'scroll-locked' en <html> y <body>,
 * garantizando que overlays anidados o sucesivos no liberen el scroll prematuramente.
 *
 * @param shouldLock - Indica si el bloqueo de scroll debe estar activo.
 */
export function useScrollLock(shouldLock: boolean): void {
  useEffect(() => {
    if (!shouldLock) return;

    const rootWasLocked = document.documentElement.classList.contains("scroll-locked");
    const bodyWasLocked = document.body.classList.contains("scroll-locked");

    document.documentElement.classList.add("scroll-locked");
    document.body.classList.add("scroll-locked");

    return () => {
      if (!rootWasLocked) {
        document.documentElement.classList.remove("scroll-locked");
      }
      if (!bodyWasLocked) {
        document.body.classList.remove("scroll-locked");
      }
    };
  }, [shouldLock]);
}
