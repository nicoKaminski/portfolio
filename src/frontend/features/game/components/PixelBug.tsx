import { BugType } from "../constants";
import styles from "./PixelBug.module.css";

interface PixelBugProps {
  type: BugType;
  size?: number;
  className?: string;
}

export function PixelBug({ type, size = 48, className }: PixelBugProps) {
  const combinedClass = className
    ? `${styles.bugSvg} ${className}`
    : styles.bugSvg;

  if (type === "normal") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        className={combinedClass}
        aria-hidden="true"
        focusable="false"
      >
        {/* Antenas */}
        <rect x="5" y="2" width="1" height="1" className={styles.normalAccent} />
        <rect x="10" y="2" width="1" height="1" className={styles.normalAccent} />
        <rect x="6" y="3" width="1" height="1" className={styles.normalAccent} />
        <rect x="9" y="3" width="1" height="1" className={styles.normalAccent} />

        {/* Patas delanteras */}
        <rect x="3" y="3" width="1" height="1" className={styles.normalAccent} />
        <rect x="12" y="3" width="1" height="1" className={styles.normalAccent} />
        <rect x="4" y="4" width="1" height="1" className={styles.normalAccent} />
        <rect x="11" y="4" width="1" height="1" className={styles.normalAccent} />

        {/* Cabeza */}
        <rect x="6" y="4" width="4" height="2" className={styles.normalBody} />
        <rect x="6" y="5" width="1" height="1" className={styles.normalEye} />
        <rect x="9" y="5" width="1" height="1" className={styles.normalEye} />

        {/* Tórax */}
        <rect x="5" y="6" width="6" height="1" className={styles.normalBody} />

        {/* Patas medias */}
        <rect x="2" y="7" width="1" height="1" className={styles.normalAccent} />
        <rect x="13" y="7" width="1" height="1" className={styles.normalAccent} />
        <rect x="1" y="8" width="2" height="1" className={styles.normalAccent} />
        <rect x="13" y="8" width="2" height="1" className={styles.normalAccent} />

        {/* Caparazón (Élitros) con hendidura central */}
        <rect x="4" y="7" width="3" height="4" className={styles.normalShell} />
        <rect x="9" y="7" width="3" height="4" className={styles.normalShell} />
        <rect x="5" y="11" width="2" height="1" className={styles.normalShell} />
        <rect x="9" y="11" width="2" height="1" className={styles.normalShell} />
        <rect x="6" y="12" width="4" height="1" className={styles.normalShell} />

        {/* Hendidura central */}
        <rect x="7" y="7" width="2" height="5" className={styles.normalSeam} />

        {/* Brillo del caparazón */}
        <rect x="5" y="8" width="1" height="2" className={styles.normalSheen} />
        <rect x="10" y="8" width="1" height="2" className={styles.normalSheen} />

        {/* Patas traseras */}
        <rect x="3" y="10" width="1" height="1" className={styles.normalAccent} />
        <rect x="12" y="10" width="1" height="1" className={styles.normalAccent} />
        <rect x="2" y="11" width="1" height="2" className={styles.normalAccent} />
        <rect x="13" y="11" width="1" height="2" className={styles.normalAccent} />
        <rect x="1" y="13" width="2" height="1" className={styles.normalAccent} />
        <rect x="13" y="13" width="2" height="1" className={styles.normalAccent} />
      </svg>
    );
  }

  if (type === "rapido") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        className={combinedClass}
        aria-hidden="true"
        focusable="false"
      >
        {/* Antenas aerodinámicas */}
        <rect x="5" y="2" width="1" height="1" className={styles.rapidoAccent} />
        <rect x="10" y="2" width="1" height="1" className={styles.rapidoAccent} />
        <rect x="6" y="3" width="1" height="1" className={styles.rapidoAccent} />
        <rect x="9" y="3" width="1" height="1" className={styles.rapidoAccent} />

        {/* Ala Izquierda */}
        <rect x="3" y="3" width="2" height="1" className={styles.rapidoWingTip} />
        <rect x="2" y="4" width="4" height="1" className={styles.rapidoWing} />
        <rect x="1" y="5" width="5" height="1" className={styles.rapidoWing} />
        <rect x="2" y="6" width="4" height="1" className={styles.rapidoWing} />
        <rect x="3" y="7" width="3" height="1" className={styles.rapidoWing} />
        <rect x="3" y="8" width="3" height="1" className={styles.rapidoWing} />
        <rect x="4" y="9" width="2" height="1" className={styles.rapidoWingTip} />
        <rect x="3" y="5" width="2" height="2" className={styles.rapidoWingInner} />

        {/* Ala Derecha */}
        <rect x="11" y="3" width="2" height="1" className={styles.rapidoWingTip} />
        <rect x="10" y="4" width="4" height="1" className={styles.rapidoWing} />
        <rect x="10" y="5" width="5" height="1" className={styles.rapidoWing} />
        <rect x="10" y="6" width="4" height="1" className={styles.rapidoWing} />
        <rect x="10" y="7" width="3" height="1" className={styles.rapidoWing} />
        <rect x="10" y="8" width="3" height="1" className={styles.rapidoWing} />
        <rect x="10" y="9" width="2" height="1" className={styles.rapidoWingTip} />
        <rect x="11" y="5" width="2" height="2" className={styles.rapidoWingInner} />

        {/* Cuerpo esbelto central */}
        <rect x="7" y="4" width="2" height="1" className={styles.rapidoHead} />
        <rect x="7" y="5" width="2" height="2" className={styles.rapidoBody} />
        <rect x="7" y="7" width="2" height="5" className={styles.rapidoBody} />
        <rect x="7" y="12" width="2" height="1" className={styles.rapidoAccent} />
      </svg>
    );
  }

  // Especial
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      className={combinedClass}
      aria-hidden="true"
      focusable="false"
    >
      {/* Cuernos de ciervo / astas */}
      <rect x="3" y="0" width="1" height="1" className={styles.especialHorns} />
      <rect x="12" y="0" width="1" height="1" className={styles.especialHorns} />
      <rect x="2" y="1" width="1" height="2" className={styles.especialHorns} />
      <rect x="4" y="1" width="1" height="1" className={styles.especialHorns} />
      <rect x="11" y="1" width="1" height="1" className={styles.especialHorns} />
      <rect x="13" y="1" width="1" height="2" className={styles.especialHorns} />
      <rect x="2" y="3" width="2" height="1" className={styles.especialHorns} />
      <rect x="12" y="3" width="2" height="1" className={styles.especialHorns} />
      <rect x="3" y="4" width="2" height="1" className={styles.especialHorns} />
      <rect x="11" y="4" width="2" height="1" className={styles.especialHorns} />

      {/* Cabeza y corona */}
      <rect x="5" y="5" width="6" height="1" className={styles.especialHead} />
      <rect x="5" y="5" width="1" height="1" className={styles.especialEyes} />
      <rect x="10" y="5" width="1" height="1" className={styles.especialEyes} />

      {/* Patas delanteras */}
      <rect x="1" y="5" width="1" height="2" className={styles.especialHorns} />
      <rect x="14" y="5" width="1" height="2" className={styles.especialHorns} />
      <rect x="0" y="6" width="1" height="1" className={styles.especialHorns} />
      <rect x="15" y="6" width="1" height="1" className={styles.especialHorns} />

      {/* Tórax blindado con hombreras */}
      <rect x="4" y="6" width="8" height="1" className={styles.especialArmor} />
      <rect x="3" y="7" width="10" height="1" className={styles.especialArmor} />
      <rect x="2" y="7" width="1" height="1" className={styles.especialHorns} />
      <rect x="13" y="7" width="1" height="1" className={styles.especialHorns} />

      {/* Patas medias */}
      <rect x="1" y="8" width="1" height="2" className={styles.especialHorns} />
      <rect x="14" y="8" width="1" height="2" className={styles.especialHorns} />
      <rect x="0" y="9" width="1" height="1" className={styles.especialHorns} />
      <rect x="15" y="9" width="1" height="1" className={styles.especialHorns} />

      {/* Caparazón ancho */}
      <rect x="3" y="8" width="4" height="3" className={styles.especialArmor} />
      <rect x="9" y="8" width="4" height="3" className={styles.especialArmor} />
      <rect x="4" y="11" width="8" height="1" className={styles.especialArmor} />
      <rect x="5" y="12" width="6" height="1" className={styles.especialArmor} />
      <rect x="6" y="13" width="4" height="1" className={styles.especialArmor} />

      {/* Núcleo de energía brillante */}
      <rect x="7" y="8" width="2" height="3" className={styles.especialCore} />
      <rect x="6" y="9" width="4" height="1" className={styles.especialCore} />

      {/* Patas traseras robustas */}
      <rect x="1" y="12" width="2" height="1" className={styles.especialHorns} />
      <rect x="13" y="12" width="2" height="1" className={styles.especialHorns} />
      <rect x="2" y="13" width="1" height="2" className={styles.especialHorns} />
      <rect x="13" y="13" width="1" height="2" className={styles.especialHorns} />
    </svg>
  );
}
