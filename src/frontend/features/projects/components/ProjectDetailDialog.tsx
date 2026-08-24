import styles from "./ProjectDetailDialog.module.css";
import { useEffect, useRef } from "react";

interface ProjectDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  status?: string;
  closeAriaLabel?: string;
  triggerRef?: React.RefObject<HTMLButtonElement | null>;
  children: React.ReactNode;
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
        dialog.close();
      }
      document.documentElement.classList.remove("scroll-locked");
      document.body.classList.remove("scroll-locked");
      if (scrollContentRef.current) {
        scrollContentRef.current.scrollTop = 0;
      }
      triggerRef?.current?.focus();
    }

    return () => {
      document.documentElement.classList.remove("scroll-locked");
      document.body.classList.remove("scroll-locked");
    };
  }, [isOpen, triggerRef]);

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

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-label={title}
      onClick={handleBackdropClick}
    >
      <div className={styles.dialogCard}>
        <header className={styles.topBar}>
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
          {isOpen ? children : null}
        </div>
      </div>
    </dialog>
  );
}
