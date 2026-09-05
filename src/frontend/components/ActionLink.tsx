import type { AnchorHTMLAttributes, ReactNode } from "react";
import styles from "./Action.module.css";

export interface ActionLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant: "primary" | "secondary";
  children: ReactNode;
  endIcon?: ReactNode;
}

export function ActionLink({
  variant,
  className,
  children,
  endIcon,
  ...props
}: ActionLinkProps) {
  const actionClassName = `${styles.action} ${styles[variant]}${
    className ? ` ${className}` : ""
  }`;

  return (
    <a {...props} className={actionClassName}>
      <span className={styles.label}>{children}</span>
      {endIcon ? <span className={styles.endIcon}>{endIcon}</span> : null}
    </a>
  );
}
