import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./InlineAction.module.css";

export interface InlineButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function InlineButton({
  className,
  children,
  type = "button",
  ...props
}: InlineButtonProps) {
  const buttonClassName = `${styles.action}${className ? ` ${className}` : ""}`;

  return (
    <button {...props} type={type} className={buttonClassName}>
      {children}
    </button>
  );
}
