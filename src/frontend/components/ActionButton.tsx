import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Action.module.css";

export interface ActionButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary";
  /** Usa la escala reducida para acciones ubicadas en espacios compactos. */
  size?: "compact";
  /** Comunica y aplica el estado visual de una acción en curso. */
  loading?: boolean;
  children: ReactNode;
  /** Ícono decorativo o funcional ubicado antes de la etiqueta. */
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  ref?: React.Ref<HTMLButtonElement>;
}

export function ActionButton({
  variant,
  size,
  loading = false,
  className,
  children,
  startIcon,
  endIcon,
  type = "button",
  disabled,
  ref,
  ...props
}: ActionButtonProps) {
  const actionClassName = [
    styles.action,
    styles[variant],
    size ? styles[size] : null,
    loading ? styles.loading : null,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      {...props}
      ref={ref}
      type={type}
      className={actionClassName}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
    >
      {startIcon ? <span className={styles.startIcon}>{startIcon}</span> : null}
      <span className={styles.label}>{children}</span>
      {endIcon ? <span className={styles.endIcon}>{endIcon}</span> : null}
    </button>
  );
}
