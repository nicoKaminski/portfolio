import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Action.module.css";

export interface ActionButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary";
  children: ReactNode;
  endIcon?: ReactNode;
}

export function ActionButton({
  variant,
  className,
  children,
  endIcon,
  type = "button",
  ...props
}: ActionButtonProps) {
  const actionClassName = `${styles.action} ${styles[variant]}${
    className ? ` ${className}` : ""
  }`;

  return (
    <button {...props} type={type} className={actionClassName}>
      <span className={styles.label}>{children}</span>
      {endIcon ? <span className={styles.endIcon}>{endIcon}</span> : null}
    </button>
  );
}
