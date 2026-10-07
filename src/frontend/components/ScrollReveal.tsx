"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from "react";
import styles from "./ScrollReveal.module.css";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

function subscribeMotion(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => {
    mediaQuery.removeEventListener("change", callback);
  };
}

function getMotionSnapshot(): boolean {
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
    return false;
  }
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getServerSnapshot(): boolean {
  return false;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
}: ScrollRevealProps) {
  // En SSR y sin JS, isEnabled es false e isVisible es false.
  // El CSS asegura que .reveal tenga opacity: 1 y transform: none cuando data-reveal-enabled no es "true".
  const isEnabled = useSyncExternalStore(
    subscribeMotion,
    getMotionSnapshot,
    getServerSnapshot
  );

  const [isVisible, setIsVisible] = useState(false);
  const [direction, setDirection] = useState<"down" | "up">("down");

  const elementRef = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef(false);
  const lastScrollYRef = useRef(0);
  const scrollDirectionRef = useRef<"down" | "up">("down");

  const frame1Ref = useRef<number | null>(null);
  const frame2Ref = useRef<number | null>(null);

  const cancelPendingFrames = () => {
    if (frame1Ref.current !== null) {
      cancelAnimationFrame(frame1Ref.current);
      frame1Ref.current = null;
    }
    if (frame2Ref.current !== null) {
      cancelAnimationFrame(frame2Ref.current);
      frame2Ref.current = null;
    }
  };

  useEffect(() => {
    if (!isEnabled) {
      cancelPendingFrames();
      return;
    }

    const element = elementRef.current;
    if (!element) return;

    // Seguimiento en tiempo real de la dirección de scroll en window
    lastScrollYRef.current = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollYRef.current) {
        scrollDirectionRef.current = "down";
      } else if (currentScrollY < lastScrollYRef.current) {
        scrollDirectionRef.current = "up";
      }
      lastScrollYRef.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Activación de la entrada mediante secuencia de frames cancelable
    const triggerEntrance = (entryDir: "down" | "up") => {
      cancelPendingFrames();

      // Establecer dirección sin transición en el DOM mientras está oculto
      setDirection(entryDir);
      element.setAttribute("data-reveal-direction", entryDir);
      element.setAttribute("data-reveal-visible", "false");

      // Activar la transición en el frame siguiente tras pintar la posición inicial
      frame1Ref.current = requestAnimationFrame(() => {
        frame2Ref.current = requestAnimationFrame(() => {
          setIsVisible(true);
          isVisibleRef.current = true;
          element.setAttribute("data-reveal-visible", "true");
          frame1Ref.current = null;
          frame2Ref.current = null;
        });
      });
    };

    // Navegación por teclado: mostrar inmediatamente si el foco entra al bloque
    const handleFocusIn = () => {
      cancelPendingFrames();
      setIsVisible(true);
      isVisibleRef.current = true;
      element.setAttribute("data-reveal-visible", "true");
    };
    element.addEventListener("focusin", handleFocusIn);

    // Acceso por ancla: comprobar si el hash actual apunta a este elemento o un hijo
    const handleHashCheck = () => {
      const hash = window.location.hash;
      if (!hash) return;
      const targetId = hash.replace(/^#/, "");
      if (element.id === targetId || element.querySelector(`#${targetId}`)) {
        triggerEntrance("down");
      }
    };
    handleHashCheck();
    window.addEventListener("hashchange", handleHashCheck);

    const observer = new IntersectionObserver(
      ([entry]) => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollYRef.current) {
          scrollDirectionRef.current = "down";
        } else if (currentScrollY < lastScrollYRef.current) {
          scrollDirectionRef.current = "up";
        }
        lastScrollYRef.current = currentScrollY;

        const rect = entry.boundingClientRect;
        const windowHeight =
          window.innerHeight || document.documentElement.clientHeight;

        const isCompletelyAbove = rect.bottom <= 0;
        const isCompletelyBelow = rect.top >= windowHeight;
        const isCompletelyOutside =
          (!entry.isIntersecting || entry.intersectionRatio === 0) &&
          (isCompletelyAbove || isCompletelyBelow);

        if (entry.isIntersecting && entry.intersectionRatio > 0) {
          // Si ya está visible, no reiniciar ni alterar la animación
          if (isVisibleRef.current) {
            return;
          }

          // Bajar: entrada desde abajo ("down"); Subir: entrada desde arriba ("up")
          const isEnteringFromAbove =
            scrollDirectionRef.current === "up" ||
            rect.bottom < windowHeight / 2;
          const entryDir: "down" | "up" = isEnteringFromAbove ? "up" : "down";

          triggerEntrance(entryDir);
        } else if (isCompletelyOutside) {
          // No ocultar si el bloque contiene el foco activo
          if (element.contains(document.activeElement)) {
            return;
          }

          cancelPendingFrames();

          // Rearmar solo cuando haya salido completamente del área visible real
          setIsVisible(false);
          isVisibleRef.current = false;
          element.setAttribute("data-reveal-visible", "false");

          // Preparar la dirección para la siguiente entrada mientras permanece oculto
          const nextDir: "down" | "up" = isCompletelyAbove ? "up" : "down";
          setDirection(nextDir);
          element.setAttribute("data-reveal-direction", nextDir);
        }
      },
      {
        threshold: [0, 0.1],
        rootMargin: "0px",
      }
    );

    observer.observe(element);

    return () => {
      cancelPendingFrames();
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleHashCheck);
      element.removeEventListener("focusin", handleFocusIn);
    };
  }, [isEnabled]);

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
