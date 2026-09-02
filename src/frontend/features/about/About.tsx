import Image from "next/image";
import styles from "./About.module.css";

function GameControllerIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 512 512"
      fill="currentColor"
      aria-hidden="true"
      className={styles.ctaIcon}
    >
      <path d="M467.51 248.83c-18.4-83.18-45.69-136.24-89.43-149.17A91.5 91.5 0 00352 96c-26.89 0-48.11 16-96 16s-69.15-16-96-16a99.09 99.09 0 00-27.52 3.84c-43.61 13.06-70.83 66.25-89.13 149.61C24.49 335.6 16 380.44 16 392a56 56 0 0056 56c24 0 41.52-16.29 58.07-32.84l40-40A31.81 31.81 0 01192.54 366h126.92a31.81 31.81 0 0122.47 9.16l40 40C398.48 431.71 416 448 440 448a56 56 0 0056-56c0-11.56-8.49-56.4-28.49-143.17zM200 248h-24v24a8 8 0 01-8 8h-16a8 8 0 01-8-8v-24h-24a8 8 0 01-8-8v-16a8 8 0 018-8h24v-24a8 8 0 018-8h16a8 8 0 018 8v24h24a8 8 0 018 8v16a8 8 0 01-8 8zm136 24a24 24 0 1124-24 24 24 0 01-24 24zm48-48a24 24 0 1124-24 24 24 0 01-24 24z" />
    </svg>
  );
}

export function About() {
  return (
    <section
      id="cazador-bugs"
      className={styles.aboutSection}
      aria-label="Cazador de Bugs"
    >
      <div className={styles.container}>
        <aside className={styles.gameBanner} aria-label="Cazador de Bugs">
          {/* Acento pixel art decorativo sutil */}
          <div className={styles.pixelGrid} aria-hidden="true">
            <span className={styles.pixelDot} />
            <span className={styles.pixelDot} />
            <span className={styles.pixelDot} />
          </div>

          {/* Zona 1: Logo del juego sin marco interno */}
          <div className={styles.visualZone}>
            <Image
              src="/juego/cazador-bugs-logo.png"
              alt="Personaje pixel art del Cazador de Bugs con red atrapamariposas"
              width={104}
              height={104}
              className={styles.gameLogo}
              priority={false}
            />
          </div>

          {/* Zona 2: Contenido textual */}
          <div className={styles.contentZone}>
            <span className={styles.eyebrow}>¿Necesitás un descanso?</span>
            <h2 className={styles.gameTitle}>Probá el Cazador de Bugs</h2>
            <p className={styles.gameDescription}>
              Un minijuego corto para despejar la mente.
            </p>
          </div>

          {/* Zona 3: CTA sin Próximamente */}
          <div className={styles.ctaZone}>
            <button
              type="button"
              className={styles.gameButton}
              disabled
              aria-disabled="true"
            >
              <GameControllerIcon />
              <span>Jugar</span>
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
}
