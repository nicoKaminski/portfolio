"use client";

import styles from "./ProjectDetailDialog.module.css";
import { useEffect, useRef, useCallback, useState } from "react";

type DialogTriggerElement = HTMLAnchorElement | HTMLButtonElement;

interface ProjectDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  status?: string;
  closeAriaLabel?: string;
  triggerRef?: React.RefObject<DialogTriggerElement | null>;
  children: React.ReactNode;
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
}: ProjectDetailDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const scrollContentRef = useRef<HTMLDivElement>(null);
  const topBarRef = useRef<HTMLElement>(null);

  // Retiene los children renderizados durante la animación de cierre (patrón oficial de React para sincronizar estado al renderizar)
  const [renderedChildren, setRenderedChildren] = useState<React.ReactNode>(() => (isOpen ? children : null));
  const [prevChildren, setPrevChildren] = useState<React.ReactNode>(children);

  if (isOpen && children !== prevChildren) {
    setPrevChildren(children);
    setRenderedChildren(children);
  }

  // ─── 4.A — Cierre animado ──────────────────────────────────────────────────
  /**
   * Ejecuta la animación de salida en dialogCard (slideDown) y backdrop (fadeOut),
   * y una vez finalizada invoca el cierre real (dialog.close()) y retorna el foco.
   * Con prefers-reduced-motion, cierra inmediatamente.
   */
  const animatedClose = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog || !dialog.open) return;

    const cleanupAfterClose = () => {
      dialog.classList.remove(styles.isClosing);
      if (dialog.open) {
        dialog.close();
      }
      setRenderedChildren(null);
      document.documentElement.classList.remove("scroll-locked");
      document.body.classList.remove("scroll-locked");
      if (scrollContentRef.current) {
        scrollContentRef.current.scrollTop = 0;
      }
      triggerRef?.current?.focus();
    };

    if (prefersReducedMotion()) {
      cleanupAfterClose();
      return;
    }

    dialog.classList.add(styles.isClosing);

    const dialogCard = dialog.querySelector<HTMLElement>(`.${styles.dialogCard}`);
    if (!dialogCard) {
      cleanupAfterClose();
      return;
    }

    let closed = false;
    const handleAnimationEnd = () => {
      if (closed) return;
      closed = true;
      clearTimeout(fallbackTimer);
      cleanupAfterClose();
    };

    // Timer de seguridad por si animationend es cancelado
    const fallbackTimer = setTimeout(handleAnimationEnd, 300);
    dialogCard.addEventListener("animationend", handleAnimationEnd, { once: true });
  }, [triggerRef]);

  // ─── Ciclo de vida apertura / cierre ───────────────────────────────────────
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
      document.documentElement.classList.add("scroll-locked");
      document.body.classList.add("scroll-locked");
      if (scrollContentRef.current) {
        scrollContentRef.current.scrollTop = 0;
      }
      closeButtonRef.current?.focus();
    } else {
      if (dialog.open) {
        animatedClose();
      }
    }

    return () => {
      document.documentElement.classList.remove("scroll-locked");
      document.body.classList.remove("scroll-locked");
    };
  }, [isOpen, animatedClose]);

  // ─── Escape / Cancel nativo ───────────────────────────────────────────────
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (event: Event) => {
      event.preventDefault();
      onClose();
    };

    dialog.addEventListener("cancel", handleCancel);
    return () => {
      dialog.removeEventListener("cancel", handleCancel);
    };
  }, [onClose]);

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
      onClose();
    }
  };

  // ─── 4.B — Barra de progreso de lectura ───────────────────────────────────
  /**
   * Actualiza la variable CSS --read-progress en el topBar mediante rAF y scroll pasivo.
   * Sin re-renderizar React en cada píxel de scroll.
   */
  useEffect(() => {
    if (!isOpen) return;

    const scrollEl = scrollContentRef.current;
    const topBar = topBarRef.current;
    if (!scrollEl || !topBar) return;

    let rafId: number | null = null;

    const updateProgress = () => {
      rafId = null;
      const { scrollTop, scrollHeight, clientHeight } = scrollEl;
      const scrollable = scrollHeight - clientHeight;
      // Si el contenido no tiene scroll real, 0% para no mostrar un progreso engañoso
      const pct = scrollable > 0 ? Math.min(100, (scrollTop / scrollable) * 100) : 0;
      topBar.style.setProperty("--read-progress", `${pct}%`);
    };

    const onScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(updateProgress);
      }
    };

    // Valor inicial
    updateProgress();

    scrollEl.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      scrollEl.removeEventListener("scroll", onScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      topBar.style.removeProperty("--read-progress");
    };
  }, [isOpen]);

  // ─── 4.C — Reveals internos (bidireccionales) ──────────────────────────────
  /**
   * Observa los bloques semánticos hijos directos de <article> dentro de scrollContent.
   * root = scrollContent (no el viewport general).
   * Al bajar dentro del modal: secciones entran desde abajo (.revealVisible).
   * Al subir dentro del modal: secciones vuelven a entrar desde arriba (.revealFromAbove → .revealVisible).
   */
  useEffect(() => {
    if (!isOpen) return;
    if (prefersReducedMotion()) return;

    const scrollEl = scrollContentRef.current;
    if (!scrollEl) return;

    let observer: IntersectionObserver | null = null;
    let rafId: number | null = null;
    let directionRafs: number[] = [];

    rafId = requestAnimationFrame(() => {
      rafId = null;

      const article = scrollEl.querySelector("article");
      const sections = article
        ? (Array.from(article.children) as HTMLElement[])
        : (Array.from(scrollEl.children) as HTMLElement[]);

      if (sections.length === 0) return;

      const lastY = new Map<Element, number>();

      // Inicializa secciones como ocultas
      sections.forEach((el) => {
        el.classList.add(styles.revealHidden);
        lastY.set(el, el.getBoundingClientRect().top);
      });

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const el = entry.target as HTMLElement;
            const prevY = lastY.get(el) ?? 0;
            const currentY = entry.boundingClientRect.top;
            lastY.set(el, currentY);

            if (entry.isIntersecting) {
              const scrollingDown = currentY <= prevY;

              if (scrollingDown) {
                // Entrada desde abajo
                el.classList.remove(styles.revealHidden, styles.revealFromAbove);
                el.classList.add(styles.revealVisible);
              } else {
                // Entrada desde arriba al regresar
                el.classList.remove(styles.revealHidden, styles.revealVisible);
                el.classList.add(styles.revealFromAbove);
                const id = requestAnimationFrame(() => {
                  el.classList.remove(styles.revealFromAbove);
                  el.classList.add(styles.revealVisible);
                });
                directionRafs.push(id);
              }
            } else {
              // Salió de la zona visible: queda preparado para volver a animarse
              el.classList.remove(styles.revealVisible, styles.revealFromAbove);
              el.classList.add(styles.revealHidden);
            }
          });
        },
        {
          root: scrollEl,
          rootMargin: "0px 0px -5% 0px",
          threshold: 0.05,
        }
      );

      sections.forEach((el) => observer!.observe(el));
    });

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      directionRafs.forEach((id) => cancelAnimationFrame(id));
      directionRafs = [];

      if (observer) observer.disconnect();

      if (scrollEl) {
        const article = scrollEl.querySelector("article");
        const sections = article
          ? (Array.from(article.children) as HTMLElement[])
          : (Array.from(scrollEl.children) as HTMLElement[]);
        sections.forEach((el) => {
          el.classList.remove(styles.revealHidden, styles.revealVisible, styles.revealFromAbove);
        });
      }
    };
  }, [isOpen, children]);

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-label={title}
      onClick={handleBackdropClick}
    >
      <div className={styles.dialogCard}>
        <header ref={topBarRef} className={styles.topBar}>
          <div className={styles.headerInfo}>
            <div className={styles.titleGroup}>
              <h2 className={styles.headerTitle}>{title}</h2>
              {status && <span className={styles.headerStatus}>{status}</span>}
            </div>
            {subtitle && <p className={styles.headerSubtitle}>{subtitle}</p>}
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label={closeAriaLabel ?? `Cerrar detalle de ${title}`}
          >
            <span aria-hidden="true" className={styles.closeIcon}>✕</span>
          </button>
        </header>
        <div ref={scrollContentRef} className={styles.scrollContent}>
          {renderedChildren}
        </div>
      </div>
    </dialog>
  );
}
