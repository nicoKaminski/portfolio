"use client";

import { useEffect, useState } from "react";

export interface UseActiveSectionOptions<T extends string> {
  sectionMap: Record<string, T>;
  initialSection: T;
  rootMargin?: string;
  threshold?: number[];
}

/**
 * Hook para determinar la sección activa en pantalla mediante IntersectionObserver.
 *
 * Mapea los IDs de sección a una clave semántica de navegación y selecciona
 * la que tenga mayor ratio de intersección respetando el margen de lectura.
 */
export function useActiveSection<T extends string>({
  sectionMap,
  initialSection,
  rootMargin = "-15% 0px -40% 0px",
  threshold = [0, 0.1, 0.25, 0.5, 0.75, 1],
}: UseActiveSectionOptions<T>): T {
  const [activeSection, setActiveSection] = useState<T>(initialSection);

  useEffect(() => {
    const sectionIds = Object.keys(sectionMap);
    const visibleSections = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSections.set(entry.target.id, entry.intersectionRatio);
          } else {
            visibleSections.delete(entry.target.id);
          }
        });

        if (visibleSections.size === 0) {
          return;
        }

        let bestSectionId = "";
        let maxRatio = -1;

        for (const id of sectionIds) {
          const ratio = visibleSections.get(id);
          if (ratio !== undefined && ratio > maxRatio) {
            maxRatio = ratio;
            bestSectionId = id;
          }
        }

        if (bestSectionId && sectionMap[bestSectionId]) {
          setActiveSection(sectionMap[bestSectionId]);
        }
      },
      {
        rootMargin,
        threshold,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionMap, rootMargin, threshold]);

  return activeSection;
}
