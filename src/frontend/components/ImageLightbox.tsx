"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./ImageLightbox.module.css";

interface ImageLightboxProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  triggerAriaLabel: string;
  triggerClassName?: string;
  children: ReactNode;
}

export function ImageLightbox({
  src,
  alt,
  width,
  height,
  triggerAriaLabel,
  triggerClassName,
  children,
}: ImageLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const closeLightbox = useCallback(() => {
    setIsOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const rootWasLocked = document.documentElement.classList.contains("scroll-locked");
    const bodyWasLocked = document.body.classList.contains("scroll-locked");

    document.documentElement.classList.add("scroll-locked");
    document.body.classList.add("scroll-locked");
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      event.stopPropagation();
      event.preventDefault();
      closeLightbox();
    };

    window.addEventListener("keydown", handleKeyDown, { capture: true });

    return () => {
      window.removeEventListener("keydown", handleKeyDown, { capture: true });

      if (!rootWasLocked) {
        document.documentElement.classList.remove("scroll-locked");
      }
      if (!bodyWasLocked) {
        document.body.classList.remove("scroll-locked");
      }
    };
  }, [closeLightbox, isOpen]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={triggerClassName}
        onClick={() => setIsOpen(true)}
        aria-label={triggerAriaLabel}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        {children}
      </button>

      {isOpen ? (
        <div
          className={styles.overlay}
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`Ampliación: ${alt}`}
        >
          <div className={styles.dialog} onClick={(event) => event.stopPropagation()}>
            <button
              ref={closeButtonRef}
              type="button"
              className={styles.closeButton}
              onClick={closeLightbox}
              aria-label="Cerrar ampliación de imagen"
            >
              <span aria-hidden="true">✕</span>
            </button>
            <div className={styles.imageContainer}>
              <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                sizes="(max-width: 960px) 96vw, 920px"
                className={styles.image}
                priority
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
