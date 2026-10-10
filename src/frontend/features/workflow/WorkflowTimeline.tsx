"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface WorkflowTimelineProps {
  children: ReactNode;
  className: string;
  timelineClassName: string;
}

const VERTICAL_LAYOUT_QUERY = "(max-width: 1024px)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export function WorkflowTimeline({
  children,
  className,
  timelineClassName,
}: WorkflowTimelineProps) {
  const timelineRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline || !("IntersectionObserver" in window)) return;

    const verticalLayout = window.matchMedia(VERTICAL_LAYOUT_QUERY);
    const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY);
    let observer: IntersectionObserver | null = null;

    const clearProgressiveState = () => {
      observer?.disconnect();
      observer = null;
      timeline.removeAttribute("data-progressive-reveal");
      timeline.style.removeProperty("--workflow-line-progress");
      timeline.querySelectorAll("[data-step-visible]").forEach((step) => {
        step.removeAttribute("data-step-visible");
      });
    };

    const configureReveal = () => {
      clearProgressiveState();

      if (!verticalLayout.matches || reducedMotion.matches) return;

      const steps = Array.from(timeline.querySelectorAll(":scope > li"));
      if (steps.length === 0) return;

      timeline.setAttribute("data-progressive-reveal", "true");
      steps.forEach((step) => step.setAttribute("data-step-visible", "false"));

      observer = new IntersectionObserver(
        (entries) => {
          let progress = Number.parseFloat(
            timeline.style.getPropertyValue("--workflow-line-progress")
          ) || 0;

          entries.forEach((entry) => {
            if (!entry.isIntersecting || entry.intersectionRatio <= 0) return;

            const step = entry.target;
            step.setAttribute("data-step-visible", "true");

            const indicator = step.querySelector<HTMLElement>(
              "[data-workflow-indicator='true']"
            );
            if (indicator) {
              const indicatorCenter =
                step.offsetTop + indicator.offsetTop + indicator.offsetHeight / 2;
              progress = Math.max(progress, indicatorCenter - 24);
            }

            observer?.unobserve(step);
          });

          timeline.style.setProperty(
            "--workflow-line-progress",
            `${Math.max(0, progress)}px`
          );
        },
        { threshold: 0.15, rootMargin: "0px" }
      );

      steps.forEach((step) => observer?.observe(step));
    };

    configureReveal();
    verticalLayout.addEventListener("change", configureReveal);
    reducedMotion.addEventListener("change", configureReveal);

    return () => {
      verticalLayout.removeEventListener("change", configureReveal);
      reducedMotion.removeEventListener("change", configureReveal);
      clearProgressiveState();
    };
  }, []);

  return (
    <div className={className}>
      <ol ref={timelineRef} className={timelineClassName}>
        {children}
      </ol>
    </div>
  );
}
