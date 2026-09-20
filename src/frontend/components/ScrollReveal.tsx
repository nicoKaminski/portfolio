"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import styles from "./ScrollReveal.module.css";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
}: ScrollRevealProps) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const element = elementRef.current;
    if (!element) return;

    setIsEnabled(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  const revealClassName = `${styles.reveal}${className ? ` ${className}` : ""}`;
  const revealStyle = {
    "--scroll-reveal-delay": `${delay}ms`,
  } as CSSProperties;

  return (
    <div
      ref={elementRef}
      className={revealClassName}
      data-reveal-enabled={isEnabled}
      data-reveal-visible={isVisible}
      style={revealStyle}
    >
      {children}
    </div>
  );
}
