/**
 * useAmbientParallax
 *
 * Aplica un desplazamiento vertical muy sutil al pseudo-elemento `::before`
 * de una sección mediante la custom property CSS `--ambient-offset`.
 *
 * Requisitos de diseño:
 * - Sin animación autónoma: solo se mueve cuando el usuario scrollea.
 * - Amplitud máxima configurable (default 10px).
 * - Solo activo mientras la sección es visible (IntersectionObserver).
 * - Usa rAF para limitar actualizaciones al refresco del navegador.
 * - Respeta prefers-reduced-motion: si está activo, no registra nada.
 * - No modifica state de React → sin re-renders durante el scroll.
 */

import { useEffect, useRef } from "react";

interface UseAmbientParallaxOptions {
  /** Desplazamiento máximo en px. Default: 10 */
  amplitude?: number;
}

export function useAmbientParallax<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  options: UseAmbientParallaxOptions = {}
): void {
  const { amplitude = 10 } = options;

  const amplitudeRef = useRef(amplitude);

  useEffect(() => {
    amplitudeRef.current = amplitude;
  }, [amplitude]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Respetar prefers-reduced-motion
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let rafId: number | null = null;
    let isVisible = false;

    /** Calcula el offset y lo aplica como custom property CSS */
    const updateOffset = () => {
      rafId = null;

      const rect = element.getBoundingClientRect();
      const vh = window.innerHeight;
      const sectionHeight = rect.height;

      // progress: 0 cuando el top entra por abajo, 1 cuando el bottom sale por arriba
      const totalTravel = vh + sectionHeight;
      const scrolled = vh - rect.top;
      const progress = Math.min(1, Math.max(0, scrolled / totalTravel));

      // Mapeamos progress [0,1] → offset [-amp/2, +amp/2]
      const offset = (progress - 0.5) * amplitudeRef.current;

      element.style.setProperty("--ambient-offset", `${offset.toFixed(2)}px`);
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
      { rootMargin: "200px 0px 200px 0px", threshold: 0 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      element.style.removeProperty("--ambient-offset");
    };
  }, [ref]);
}
