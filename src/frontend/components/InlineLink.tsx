import type { AnchorHTMLAttributes, ReactNode } from "react";
import styles from "./InlineAction.module.css";

export interface InlineLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
}

export function InlineLink({
  className,
  children,
  ...props
}: InlineLinkProps) {
  const linkClassName = `${styles.action}${className ? ` ${className}` : ""}`;

  return (
    <a {...props} className={linkClassName}>
      {children}
    </a>
  );
}
