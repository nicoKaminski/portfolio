"use client";

import styles from "./BackToTop.module.css";

interface BackToTopProps {
  isVisible: boolean;
}

export function BackToTop({ isVisible }: BackToTopProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const target = document.getElementById("inicio");
    if (target) {
      target.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
      window.history.pushState(null, "", "#inicio");
    } else {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
      window.history.pushState(null, "", "#inicio");
    }
  };

  return (
    <a
      href="#inicio"
      onClick={handleClick}
      className={`${styles.backToTop} ${isVisible ? styles.visible : ""}`}
      aria-label="Volver al inicio"
      tabIndex={isVisible ? 0 : -1}
      aria-hidden={!isVisible}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={styles.icon}
      >
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </a>
  );
}
