"use client";

import styles from "./ProjectDetailDialog.module.css";
import {
  useEffect,
  useRef,
  useCallback,
  useState,
  type ReactNode,
  type RefObject,
} from "react";

type DialogTriggerElement = HTMLAnchorElement | HTMLButtonElement;

export type DialogPhase = "open" | "closing" | "closed";

export interface ProjectDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  status?: string;
  closeAriaLabel?: string;
  triggerRef?: RefObject<DialogTriggerElement | null>;
  children: ReactNode;
  projectId?: string;
}

interface RetainedDialogContent {
  projectId?: string;
  title: string;
  subtitle?: string;
  status?: string;
  closeAriaLabel?: string;
  children: ReactNode;
}

/** Returns true if the user prefers reduced motion. */
function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function ProjectDetailDialog({
  isOpen,
  onClose,
  title,
  subtitle,
  status,
  closeAriaLabel,
  triggerRef,
  children,
  projectId,
}: ProjectDetailDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogCardRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const scrollContentRef = useRef<HTMLDivElement>(null);
  const topBarRef = useRef<HTMLElement>(null);

  // ─── 2.A — Fases explícitas: "open" | "closing" | "closed" ────────────────
  const [phase, setPhase] = useState<DialogPhase>(() =>
    isOpen ? "open" : "closed"
  );
  const phaseRef = useRef<DialogPhase>(phase);

  // Sincronizar phaseRef fuera del render
  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  // Retiene el último detalle completo durante la animación de salida
  const [retained, setRetained] = useState<RetainedDialogContent | null>(() =>
    isOpen
      ? {
          projectId,
          title,
          subtitle,
          status,
          closeAriaLabel,
          children,
        }
      : null
  );

  // Referencias para cancelación de cierre y temporizador de respaldo
  const isFinalizingRef = useRef(false);
  const fallbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animationEndCleanupRef = useRef<(() => void) | null>(null);
  const motionQueryCleanupRef = useRef<(() => void) | null>(null);

  // Registro de elementos de reveal para limpieza precisa y frames de dirección
  const observedElementsRef = useRef<HTMLElement[]>([]);
  const activeRevealRafsRef = useRef<Set<number>>(new Set());

  // ─── Sincronización de props con contenido retenido y fases ───────────────
  const [prevProps, setPrevProps] = useState({
    isOpen,
    projectId,
    title,
    subtitle,
    status,
    closeAriaLabel,
    children,
  });

  if (isOpen) {
    const hasPropsChanged =
      !prevProps.isOpen ||
      prevProps.projectId !== projectId ||
      prevProps.title !== title ||
      prevProps.subtitle !== subtitle ||
      prevProps.status !== status ||
      prevProps.closeAriaLabel !== closeAriaLabel ||
      prevProps.children !== children;

    if (hasPropsChanged) {
      setPrevProps({
        isOpen,
        projectId,
        title,
        subtitle,
        status,
        closeAriaLabel,
        children,
      });
      setRetained({
        projectId,
        title,
        subtitle,
        status,
        closeAriaLabel,
        children,
      });
      if (phase !== "open") {
        setPhase("open");
      }
    }
  } else if (prevProps.isOpen) {
    // Transición de isOpen a false (incluso si el padre limpió activeProject de inmediato)
    setPrevProps({
      isOpen,
      projectId,
      title,
      subtitle,
      status,
      closeAriaLabel,
      children,
    });
    if (phase === "open") {
      setPhase("closing");
    }
  }

  // ─── Finalización única de cierre ─────────────────────────────────────────
  const finalizeClose = useCallback(() => {
    if (isFinalizingRef.current || phaseRef.current === "closed") {
      return;
    }
    isFinalizingRef.current = true;
    phaseRef.current = "closed";

    // 1. Cancelar temporizador de respaldo y listeners de animación / motion
    if (fallbackTimerRef.current !== null) {
      clearTimeout(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }
    if (animationEndCleanupRef.current) {
      animationEndCleanupRef.current();
      animationEndCleanupRef.current = null;
    }
    if (motionQueryCleanupRef.current) {
      motionQueryCleanupRef.current();
      motionQueryCleanupRef.current = null;
    }

    // 2. Invocar dialog.close()
    const dialog = dialogRef.current;
    if (dialog && dialog.open) {
      dialog.close();
    }

    // 3. Liberar scroll-locked ÚNICAMENTE cuando el modal queda efectivamente "closed"
    document.documentElement.classList.remove("scroll-locked");
    document.body.classList.remove("scroll-locked");

    // 4. Limpiar clases de reveal exactamente en los elementos observados
    observedElementsRef.current.forEach((el) => {
      el.classList.remove(
        styles.revealHidden,
        styles.revealVisible,
        styles.revealFromAbove
      );
    });
    observedElementsRef.current = [];

    // 5. Cancelar frames pendientes de reveals
    activeRevealRafsRef.current.forEach((id) => cancelAnimationFrame(id));
    activeRevealRafsRef.current.clear();

    // 6. Resetear posición de scroll y barra de progreso
    if (scrollContentRef.current) {
      scrollContentRef.current.scrollTop = 0;
    }
    if (topBarRef.current) {
      topBarRef.current.style.removeProperty("--read-progress");
    }

    // 7. Retornar foco a triggerRef
    triggerRef?.current?.focus();

    // 8. Limpiar contenido retenido y finalizar fase
    setRetained(null);
    setPhase("closed");
    isFinalizingRef.current = false;
  }, [triggerRef]);

  // ─── Circuito centralizado de solicitud de cierre ─────────────────────────
  const handleCloseTrigger = useCallback(() => {
    if (phaseRef.current === "closing" || phaseRef.current === "closed") {
      return;
    }
    phaseRef.current = "closing";

    // Con prefers-reduced-motion, finalizar inmediatamente sin esperar animación
    if (prefersReducedMotion()) {
      onClose();
      finalizeClose();
      return;
    }

    setPhase("closing");
    onClose();
  }, [onClose, finalizeClose]);

  // ─── Ciclo de vida cuando phase === "closing" ──────────────────────────────
  useEffect(() => {
    if (phase !== "closing") return;

    if (prefersReducedMotion()) {
      finalizeClose();
      return;
    }

    const dialogCard = dialogCardRef.current;
    if (!dialogCard) {
      finalizeClose();
      return;
    }

    // Filtrar animationend: verificar event.target === dialogCard para su animación de salida
    const handleAnimationEnd = (event: AnimationEvent) => {
      if (event.target !== dialogCard) return;
      finalizeClose();
    };

    dialogCard.addEventListener("animationend", handleAnimationEnd);
    animationEndCleanupRef.current = () => {
      dialogCard.removeEventListener("animationend", handleAnimationEnd);
    };

    // Si prefers-reduced-motion se activa durante la salida, finalizar inmediatamente
    let mediaQuery: MediaQueryList | null = null;
    let handleMotionChange: ((event: MediaQueryListEvent) => void) | null = null;
    if (typeof window !== "undefined") {
      mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      handleMotionChange = (event: MediaQueryListEvent) => {
        if (event.matches) {
          finalizeClose();
        }
      };
      mediaQuery.addEventListener("change", handleMotionChange);
      motionQueryCleanupRef.current = () => {
        if (mediaQuery && handleMotionChange) {
          mediaQuery.removeEventListener("change", handleMotionChange);
        }
      };
    }

    // Timeout de respaldo (350ms)
    fallbackTimerRef.current = setTimeout(() => {
      fallbackTimerRef.current = null;
      finalizeClose();
    }, 350);

    return () => {
      if (fallbackTimerRef.current !== null) {
        clearTimeout(fallbackTimerRef.current);
        fallbackTimerRef.current = null;
      }
      if (animationEndCleanupRef.current) {
        animationEndCleanupRef.current();
        animationEndCleanupRef.current = null;
      }
      if (motionQueryCleanupRef.current) {
        motionQueryCleanupRef.current();
        motionQueryCleanupRef.current = null;
      }
    };
  }, [phase, finalizeClose]);

  // ─── Ciclo de vida cuando phase === "open" ────────────────────────────────
  useEffect(() => {
    if (phase !== "open") return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    if (!dialog.open) {
      dialog.showModal();
    }

    // Mantener scroll-locked en documentElement y body durante "open" y "closing"
    document.documentElement.classList.add("scroll-locked");
    document.body.classList.add("scroll-locked");

    closeButtonRef.current?.focus();
  }, [phase]);

  // Si cambia de proyecto mientras sigue abierto, resetear scroll
  useEffect(() => {
    if (phase === "open" && scrollContentRef.current) {
      scrollContentRef.current.scrollTop = 0;
    }
  }, [projectId, phase]);

  // ─── Escape / Cancel nativo ───────────────────────────────────────────────
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (event: Event) => {
      event.preventDefault();
      handleCloseTrigger();
    };

    dialog.addEventListener("cancel", handleCancel);
    return () => {
      dialog.removeEventListener("cancel", handleCancel);
    };
  }, [handleCloseTrigger]);

  // ─── Limpieza ante desmontaje ──────────────────────────────────────────────
  useEffect(() => {
    return () => {
      document.documentElement.classList.remove("scroll-locked");
      document.body.classList.remove("scroll-locked");
      if (fallbackTimerRef.current !== null) {
        clearTimeout(fallbackTimerRef.current);
      }
    };
  }, []);

  // ─── Click en backdrop ────────────────────────────────────────────────────
  const handleBackdropClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const rect = dialog.getBoundingClientRect();
    const isOutside =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom;

    if (isOutside || event.target === dialog) {
      handleCloseTrigger();
    }
  };

  // ─── 2.C — Progreso de lectura ─────────────────────────────────────────────
  useEffect(() => {
    if (phase !== "open") return;

    const scrollEl = scrollContentRef.current;
    const topBar = topBarRef.current;
    if (!scrollEl || !topBar) return;

    let rafId: number | null = null;

    const updateProgress = () => {
      rafId = null;
      const { scrollTop, scrollHeight, clientHeight } = scrollEl;
      const scrollable = scrollHeight - clientHeight;
      // Sin scroll real (scrollHeight <= clientHeight), mostrar 0% (no engañoso)
      const pct =
        scrollable > 0
          ? Math.min(100, Math.max(0, (scrollTop / scrollable) * 100))
          : 0;
      topBar.style.setProperty("--read-progress", `${pct}%`);
    };

    const scheduleUpdate = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(updateProgress);
      }
    };

    // 1. Recalcular al abrir
    scheduleUpdate();

    // 2. Recalcular al scrollear
    scrollEl.addEventListener("scroll", scheduleUpdate, { passive: true });

    // 3. Recalcular al redimensionar ventana
    window.addEventListener("resize", scheduleUpdate, { passive: true });

    // 4. ResizeObserver sobre scrollEl y su contenido (dimensiones / multimedia)
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        scheduleUpdate();
      });
      resizeObserver.observe(scrollEl);
      if (scrollEl.firstElementChild) {
        resizeObserver.observe(scrollEl.firstElementChild);
      }
    }

    return () => {
      scrollEl.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };
  }, [phase, projectId]);

  // ─── 2.B — Reveals internos (bidireccionales) ─────────────────────────────
  useEffect(() => {
    if (phase !== "open") return;
    if (prefersReducedMotion()) return;

    const scrollEl = scrollContentRef.current;
    if (!scrollEl) return;

    let observer: IntersectionObserver | null = null;
    let initRafId: number | null = null;
    const activeRevealRafs = activeRevealRafsRef.current;

    // Seguimiento en tiempo real de la dirección de scroll dentro de scrollEl
    let lastScrollTop = scrollEl.scrollTop;
    let scrollDirection: "down" | "up" = "down";

    const handleScroll = () => {
      const currentScrollTop = scrollEl.scrollTop;
      if (currentScrollTop > lastScrollTop) {
        scrollDirection = "down";
      } else if (currentScrollTop < lastScrollTop) {
        scrollDirection = "up";
      }
      lastScrollTop = currentScrollTop;
    };
    scrollEl.addEventListener("scroll", handleScroll, { passive: true });

    initRafId = requestAnimationFrame(() => {
      initRafId = null;

      // Entradas por bloques conceptuales (hijos directos de <article> dentro del modal)
      const article = scrollEl.querySelector("article");
      const sections = article
        ? (Array.from(article.children) as HTMLElement[])
        : (Array.from(scrollEl.children) as HTMLElement[]);

      if (sections.length === 0) return;

      // Limpiar clases previas si cambiamos de proyecto mientras el diálogo seguía abierto
      observedElementsRef.current.forEach((el) => {
        el.classList.remove(
          styles.revealHidden,
          styles.revealVisible,
          styles.revealFromAbove
        );
      });

      // Registrar los nodos realmente observados para limpieza exacta
      observedElementsRef.current = sections;

      // Inicializa secciones como ocultas
      sections.forEach((el) => {
        el.classList.add(styles.revealHidden);
      });

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const el = entry.target as HTMLElement;
            const rootBounds = entry.rootBounds;

            const isAbove = rootBounds
              ? entry.boundingClientRect.bottom <= rootBounds.top
              : entry.boundingClientRect.bottom <= 0;
            const isBelow = rootBounds
              ? entry.boundingClientRect.top >= rootBounds.bottom
              : false;
            const isCompletelyOutside =
              (!entry.isIntersecting || entry.intersectionRatio === 0) &&
              (isAbove || isBelow);

            if (entry.isIntersecting && entry.intersectionRatio > 0) {
              if (el.classList.contains(styles.revealVisible)) {
                return;
              }

              // Entrada según dirección de scroll (down o up)
              const enteringFromAbove =
                scrollDirection === "up" ||
                (rootBounds !== null &&
                  entry.boundingClientRect.bottom <
                    rootBounds.top + rootBounds.height / 2);

              if (enteringFromAbove) {
                el.classList.remove(styles.revealHidden, styles.revealVisible);
                el.classList.add(styles.revealFromAbove);

                const frameId = requestAnimationFrame(() => {
                  activeRevealRafs.delete(frameId);
                  el.classList.remove(styles.revealFromAbove);
                  el.classList.add(styles.revealVisible);
                });
                activeRevealRafs.add(frameId);
              } else {
                el.classList.remove(styles.revealHidden, styles.revealFromAbove);
                el.classList.add(styles.revealVisible);
              }
            } else if (isCompletelyOutside) {
              if (el.contains(document.activeElement)) {
                return;
              }

              // Rearmar solo tras salir completamente de la zona visible
              el.classList.remove(styles.revealVisible, styles.revealFromAbove);
              el.classList.add(styles.revealHidden);
            }
          });
        },
        {
          root: scrollEl,
          rootMargin: "0px 0px -5% 0px",
          threshold: [0, 0.05],
        }
      );

      sections.forEach((el) => observer!.observe(el));
    });

    // Escucha cambios en prefers-reduced-motion durante la visualización
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        observedElementsRef.current.forEach((el) => {
          el.classList.remove(styles.revealHidden, styles.revealFromAbove);
          el.classList.add(styles.revealVisible);
        });
      }
    };
    mediaQuery.addEventListener("change", handleMotionChange);

    return () => {
      if (initRafId !== null) {
        cancelAnimationFrame(initRafId);
      }
      scrollEl.removeEventListener("scroll", handleScroll);
      mediaQuery.removeEventListener("change", handleMotionChange);

      if (observer) {
        observer.disconnect();
      }

      // Cancelar frames activos y vaciar el Set
      activeRevealRafs.forEach((id) => cancelAnimationFrame(id));
      activeRevealRafs.clear();

      // NOTA: NO retirar estilos de reveal durante la animación de cierre.
      // Las clases se conservan mientras phase === "closing" y son limpiadas
      // en finalizeClose() una vez que el modal queda efectivamente "closed".
    };
  }, [phase, projectId]);

  // Contenido a renderizar: retiene el detalle completo durante "closing"
  const displayTitle = retained?.title ?? title;
  const displaySubtitle = retained?.subtitle ?? subtitle;
  const displayStatus = retained?.status ?? status;
  const displayCloseAriaLabel =
    retained?.closeAriaLabel ?? closeAriaLabel ?? `Cerrar detalle de ${displayTitle}`;
  const displayChildren = retained?.children ?? children;

  return (
    <dialog
      ref={dialogRef}
      className={`${styles.dialog} ${phase === "closing" ? styles.isClosing : ""}`}
      aria-label={displayTitle}
      onClick={handleBackdropClick}
    >
      <div ref={dialogCardRef} className={styles.dialogCard}>
        <header ref={topBarRef} className={styles.topBar}>
          <div className={styles.headerInfo}>
            <div className={styles.titleGroup}>
              <h2 className={styles.headerTitle}>{displayTitle}</h2>
              {displayStatus && (
                <span className={styles.headerStatus}>{displayStatus}</span>
              )}
            </div>
            {displaySubtitle && (
              <p className={styles.headerSubtitle}>{displaySubtitle}</p>
            )}
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            className={styles.closeButton}
            onClick={handleCloseTrigger}
            aria-label={displayCloseAriaLabel}
          >
            <span aria-hidden="true" className={styles.closeIcon}>✕</span>
          </button>
        </header>
        <div ref={scrollContentRef} className={styles.scrollContent}>
          {displayChildren}
        </div>
      </div>
    </dialog>
  );
}
