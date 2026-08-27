import Image from "next/image";
import { useState } from "react";
import styles from "./BitiCraftDetail.module.css";

const galleryImages = [
  {
    src: "/projects/biticraft/captura-01.png",
    alt: "Vista del sitio web de BitiCraft",
  },
  {
    src: "/projects/biticraft/captura-02.png",
    alt: "Sección de productos y servicios de BitiCraft",
  },
  {
    src: "/projects/biticraft/captura-03.png",
    alt: "Vista complementaria del sitio de BitiCraft",
  },
];

const technologies = [
  "Next.js",
  "React",
  "TypeScript",
  "CSS Modules",
  "Nodemailer",
  "Vercel",
];

export function BitiCraftDetail() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <article className={styles.container}>
      {/* 1. Introducción */}
      <section className={styles.introSection}>
        <p className={styles.intro}>
          BitiCraft es un emprendimiento real de papelería creativa y
          personalizada para eventos. Diseñé y desarrollé su sitio web de punta
          a punta, trabajando la experiencia, la interfaz y la implementación, y
          validando las propuestas visuales con la responsable del
          emprendimiento.
        </p>

        <div className={styles.actionsBlock}>
          <div className={styles.primaryCtas}>
            <a
              href="https://biticraft.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaPrimary}
            >
              Ver sitio
            </a>
            <a
              href="https://github.com/nicoKaminski/biticraft"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaSecondary}
            >
              Ver repositorio
            </a>
          </div>
        </div>
      </section>

      {/* 2. Galería visual (Carrusel con peek y navegación lateral) */}
      <section
        className={styles.gallerySection}
        aria-label="Galería visual de BitiCraft"
      >
        <div className={styles.carouselContainer}>
          <div className={styles.carouselStage}>
            {/* Botón lateral anterior */}
            <button
              type="button"
              className={`${styles.navButton} ${styles.prevButton}`}
              onClick={handlePrev}
              aria-label="Ver imagen anterior de BitiCraft"
            >
              <span aria-hidden="true" className={styles.navIcon}>←</span>
            </button>

            <div className={styles.carouselViewport}>
              <div className={styles.carouselTrack}>
                {galleryImages.map((image, index) => {
                  const total = galleryImages.length;
                  let offset = (index - currentIndex) % total;
                  if (offset < -1) offset += total;
                  if (offset > 1) offset -= total;

                  const isActive = offset === 0;
                  const isPrev = offset === -1;
                  const isNext = offset === 1;

                  let positionClass = styles.slideHidden;
                  if (isActive) positionClass = styles.slideActive;
                  else if (isPrev) positionClass = styles.slidePrev;
                  else if (isNext) positionClass = styles.slideNext;

                  return (
                    <div
                      key={image.src}
                      className={`${styles.slide} ${positionClass}`}
                      aria-hidden={!isActive}
                      onClick={() => {
                        if (isPrev) handlePrev();
                        if (isNext) handleNext();
                      }}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={1440}
                        height={1000}
                        sizes="(max-width: 860px) 100vw, 680px"
                        className={styles.carouselImage}
                        priority={index === 0}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Botón lateral siguiente */}
            <button
              type="button"
              className={`${styles.navButton} ${styles.nextButton}`}
              onClick={handleNext}
              aria-label="Ver imagen siguiente de BitiCraft"
            >
              <span aria-hidden="true" className={styles.navIcon}>→</span>
            </button>
          </div>

          {/* Indicadores centrados debajo */}
          <div
            className={styles.indicatorsContainer}
            role="tablist"
            aria-label="Controles de imágenes de BitiCraft"
          >
            {galleryImages.map((_, index) => {
              const isActive = index === currentIndex;
              return (
                <button
                  key={index}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`${styles.indicatorDot} ${isActive ? styles.activeDot : ""}`}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Ver imagen ${index + 1} de BitiCraft`}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. El objetivo */}
      <section className={styles.editorialSection}>
        <h3 className={styles.sectionTitle}>El objetivo</h3>
        <p className={styles.paragraph}>
          El objetivo fue transformar la propuesta de BitiCraft en una
          experiencia web clara y fácil de recorrer, donde los productos y
          servicios pudieran entenderse rápidamente y las personas tuvieran una
          vía directa para consultar por trabajos personalizados.
        </p>
      </section>

      {/* 4. Mi participación */}
      <section className={styles.editorialSection}>
        <h3 className={styles.sectionTitle}>Mi participación</h3>
        <p className={styles.paragraph}>
          Me ocupé de todo el trabajo relacionado con la web: estructura, UX/UI,
          desarrollo de la interfaz y funcionamiento del contacto. Las
          decisiones de diseño fueron propuestas por mí y validadas con la
          responsable de BitiCraft antes de incorporarlas al sitio.
        </p>
      </section>

      {/* 5. Estado actual */}
      <section className={styles.statusSection}>
        <h3 className={styles.sectionTitle}>Estado actual</h3>
        <p className={styles.paragraph}>
          El sitio está publicado y continúa evolucionando. La siguiente etapa
          prevista es integrar Shopify para seguir ampliando la experiencia de
          BitiCraft.
        </p>
      </section>

      {/* 7. Tecnologías */}
      <section className={styles.techSection}>
        <h3 className={styles.techTitle}>Tecnologías</h3>
        <ul className={styles.techList}>
          {technologies.map((tech) => (
            <li key={tech} className={styles.techTag}>
              {tech}
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
