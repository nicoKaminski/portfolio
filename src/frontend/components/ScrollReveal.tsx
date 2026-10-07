"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
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
  const [direction, setDirection] = useState<"down" | "up">("down");
  const elementRef = useRef<HTMLDivElement>(null);
  // Track previous scroll position to determine direction
  const prevScrollY = useRef(0);

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
        const currentScrollY = window.scrollY;
        const scrollingDown = currentScrollY >= prevScrollY.current;
        prevScrollY.current = currentScrollY;

        if (entry.isIntersecting) {
          // Entering: direction tells us from which side it arrives
          setDirection(scrollingDown ? "down" : "up");
          setIsVisible(true);
        } else {
          // Leaving viewport: reset so it can animate again on re-entry
          setIsVisible(false);
          // Direction for next entry is the opposite of current exit direction
          setDirection(scrollingDown ? "down" : "up");
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px",
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
      data-reveal-direction={direction}
      style={revealStyle}
    >
      {children}
    </div>
  );
}
