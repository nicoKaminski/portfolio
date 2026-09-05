import styles from "./CardActionLabel.module.css";

interface CardActionLabelProps {
  label: string;
  size: "large" | "medium" | "small";
  appearance?: "surface" | "plain";
}

export function CardActionLabel({
  label,
  size,
  appearance = "surface",
}: CardActionLabelProps) {
  return (
    <span
      className={`${styles.label} ${styles[size]} ${styles[appearance]}`}
      aria-hidden="true"
    >
      <span className={styles.text}>{label}</span>
      <span className={styles.arrow}>&rarr;</span>
    </span>
  );
}
