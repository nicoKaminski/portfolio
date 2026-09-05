import type { AnchorHTMLAttributes, ReactNode } from "react";
import styles from "./Action.module.css";

export interface ActionLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant: "primary" | "secondary";
  /** Usa la escala reducida para acciones ubicadas en espacios compactos. */
  size?: "compact";
  children: ReactNode;
  /** Ícono decorativo o funcional ubicado antes de la etiqueta. */
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

export function ActionLink({
  variant,
  size,
  className,
  children,
  startIcon,
  endIcon,
  ...props
}: ActionLinkProps) {
  const actionClassName = [
    styles.action,
    styles[variant],
    size ? styles[size] : null,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <a {...props} className={actionClassName}>
      {startIcon ? <span className={styles.startIcon}>{startIcon}</span> : null}
      <span className={styles.label}>{children}</span>
      {endIcon ? <span className={styles.endIcon}>{endIcon}</span> : null}
    </a>
  );
}
