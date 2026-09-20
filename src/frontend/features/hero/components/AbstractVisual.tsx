"use client";

import { useEffect, useRef } from "react";
import styles from "./AbstractVisual.module.css";

export function AbstractVisual() {
  const stageRef = useRef<HTMLDivElement>(null);
  const parallaxLayerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const offsetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const supportsFinePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (!supportsFinePointer || prefersReducedMotion || isMobile) return;

    const stage = stageRef.current;
    const parallaxLayer = parallaxLayerRef.current;
    if (!stage || !parallaxLayer) return;

    const applyParallax = () => {
      const { x, y } = offsetRef.current;

      parallaxLayer.style.setProperty("--parallax-x", `${x}px`);
      parallaxLayer.style.setProperty("--parallax-y", `${y}px`);
      frameRef.current = null;
    };

    const scheduleParallax = () => {
      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(applyParallax);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;

      const bounds = stage.getBoundingClientRect();
      if (bounds.width === 0 || bounds.height === 0) return;

      const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 16;
      const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 16;

      offsetRef.current = {
        x: Math.max(-8, Math.min(8, x)),
        y: Math.max(-8, Math.min(8, y)),
      };
      scheduleParallax();
    };

    const handlePointerLeave = () => {
      offsetRef.current = { x: 0, y: 0 };
      scheduleParallax();
    };

    stage.addEventListener("pointermove", handlePointerMove, { passive: true });
    stage.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      stage.removeEventListener("pointermove", handlePointerMove);
      stage.removeEventListener("pointerleave", handlePointerLeave);

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <div ref={stageRef} className={styles.stage} aria-hidden="true">
      <div ref={parallaxLayerRef} className={styles.parallaxLayer}>
        <div className={styles.halo} />
        <div className={styles.mineralMain} />
        <div className={styles.mineralFacet} />
        <div className={styles.crystalRidge} />
        <div className={styles.coreElement} />
      </div>
    </div>
  );
}
