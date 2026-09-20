"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { ScrollReveal } from "@/frontend/components/ScrollReveal";
import { GameLauncher } from "@/frontend/features/game";
import styles from "./About.module.css";

export function About() {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleCardClick = () => {
    setIsOpen(true);
  };

  return (
    <section
      id="cazador-bugs"
      className={styles.aboutSection}
      aria-label="Cazador de Bugs"
    >
      <div className={styles.container}>
        <ScrollReveal className={styles.gameReveal}>
          <aside
            className={styles.gameBanner}
            aria-label="Cazador de Bugs"
            onClick={handleCardClick}
          >
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

            {/* Zona 3: CTA Cazador de Bugs */}
            <div className={styles.ctaZone}>
              <GameLauncher
                isOpen={isOpen}
                onOpen={() => setIsOpen(true)}
                onClose={() => setIsOpen(false)}
                triggerRef={triggerRef}
              />
            </div>
          </aside>
        </ScrollReveal>
      </div>
    </section>
  );
}
