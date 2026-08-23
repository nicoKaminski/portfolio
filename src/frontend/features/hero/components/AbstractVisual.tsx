import styles from "./AbstractVisual.module.css";

export function AbstractVisual() {
  return (
    <div className={styles.stage} aria-hidden="true">
      <div className={styles.halo} />
      <div className={styles.mineralMain} />
      <div className={styles.mineralFacet} />
      <div className={styles.crystalRidge} />
      <div className={styles.coreElement} />
    </div>
  );
}
