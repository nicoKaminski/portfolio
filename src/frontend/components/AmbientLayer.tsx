"use client";

/**
 * AmbientLayer
 *
 * Componente cliente que aplica el movimiento sutil de parallax ambiental (--ambient-offset)
 * al elemento sección padre mediante un listener pasivo de scroll y requestAnimationFrame.
 *
 * Requisitos cumplidos:
 * - Movimiento vertical sutil (8-12px total, default 10px).
 * - Solo se mueve durante el scroll del usuario (sin animación autónoma).
 * - Activo solo mientras la sección es visible (IntersectionObserver).
 * - Actualiza vía CSS custom property (--ambient-offset) sin re-renders de React.
 * - Desactivado completamente en prefers-reduced-motion.
 * - Compatible con Server Components (se renderiza dentro sin convertir la sección a cliente).
 */

import { useEffect, useRef } from "react";

interface AmbientLayerProps {
  /** Amplitud máxima en px del desplazamiento ambiental. Default: 10 */
  amplitude?: number;
  /** Selector CSS de la sección contenedora. Default: "section" */
  sectionSelector?: string;
}

export function AmbientLayer({
  amplitude = 10,
  sectionSelector = "section",
}: AmbientLayerProps) {
  const anchorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const anchor = anchorRef.current;
    if (!anchor) return;
    const section = anchor.closest<HTMLElement>(sectionSelector);
    if (!section) return;

    let rafId: number | null = null;
    let isVisible = false;

    // En pantallas pequeñas reducimos la amplitud a 6px para evitar cualquier artefacto
    const effectiveAmplitude = window.innerWidth <= 600 ? Math.min(amplitude, 6) : amplitude;

    const updateOffset = () => {
      rafId = null;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const totalTravel = vh + rect.height;
      const scrolled = vh - rect.top;
      const progress = Math.min(1, Math.max(0, scrolled / totalTravel));
      // Mapea [0, 1] a [-amp/2, +amp/2] para recorrido simétrico
      const offset = (progress - 0.5) * effectiveAmplitude;
      section.style.setProperty("--ambient-offset", `${offset.toFixed(2)}px`);
    };

    const onScroll = () => {
      if (!isVisible || rafId !== null) return;
      rafId = requestAnimationFrame(updateOffset);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          isVisible = entry.isIntersecting;
        }
        if (isVisible) {
          updateOffset();
          window.addEventListener("scroll", onScroll, { passive: true });
        } else {
          window.removeEventListener("scroll", onScroll);
          if (rafId !== null) {
            cancelAnimationFrame(rafId);
            rafId = null;
          }
        }
      },
      { rootMargin: "150px 0px 150px 0px", threshold: 0 }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      section.style.removeProperty("--ambient-offset");
    };
  }, [amplitude, sectionSelector]);

  return <span ref={anchorRef} aria-hidden="true" style={{ display: "none" }} />;
}
