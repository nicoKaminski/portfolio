"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./QueComoDetail.module.css";

const TOTAL_PAGES = 39;

const processBlocks = [
  {
    title: "Investigación",
    imageSrc: "/projects/laboratory/que-como/15.png",
    alt: "Fase de investigación de Qué Como con hallazgos de entrevistas",
    paragraphs: [
      "Arrancamos investigando el problema y entrevistando a seis personas. Aparecieron patrones bastante claros: falta de tiempo, poca variedad, recurrir al delivery cuando faltaban ideas y la dificultad de aprovechar los ingredientes que ya estaban en casa.",
      "Esos hallazgos nos ayudaron a dejar de trabajar sobre supuestos y empezar a tomar decisiones con información real.",
    ],
  },
  {
    title: "Arquitectura",
    imageSrc: "/projects/laboratory/que-como/24.png",
    alt: "Arquitectura de información y mapa de sitio de Qué Como",
    paragraphs: [
      "Con el problema más claro, tocaba ordenar la experiencia. Usamos card sorting y sus resultados para definir la arquitectura, el mapa del sitio y el recorrido principal: ingresar, cargar lo disponible en la alacena, buscar y llegar a una receta.",
      "Esa parte fue clave para convertir muchas ideas y funcionalidades en un flujo que tuviera sentido.",
    ],
  },
  {
    title: "Validación",
    imageSrc: "/projects/laboratory/que-como/29.png",
    alt: "Pruebas de usabilidad y validación con usuarios de Qué Como",
    paragraphs: [
      "Cuando ya teníamos un prototipo funcional, lo probamos con usuarios para ver si el recorrido realmente era claro.",
      "Las pruebas sirvieron para validar gran parte del flujo y también para encontrar algo que en el diseño parecía simple pero no lo era tanto: algunos usuarios se confundían al seleccionar ingredientes en la ‘Alacena’. Justamente ahí estuvo el valor de probar antes de darlo por terminado.",
    ],
  },
  {
    title: "Resultado",
    imageSrc: "/projects/laboratory/que-como/39.png",
    alt: "Pantallas finales del prototipo de alta fidelidad de Qué Como",
    paragraphs: [
      "Después de pasar por wireframes, pruebas y la definición del sistema visual, llegamos al prototipo de alta fidelidad de Qué Como.",
      "El resultado no fue solamente un conjunto de pantallas: quedó documentado todo el recorrido que llevó desde el problema inicial hasta una propuesta de interfaz que podía recorrerse y ponerse a prueba.",
    ],
  },
];

const tools = ["Figma", "Optimal Workshop", "Whimsical", "Illustrator"];

const FIGMA_PROTOTYPE_URL =
  "https://www.figma.com/proto/dv90TWvQfxvkd6skX00sg9/prototipo-en-alta-fidelidad-QUE-COMO?node-id=106-7079&p=f&scaling=scale-down&content-scaling=fixed&page-id=69%3A88";

export function QueComoDetail() {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(TOTAL_PAGES, prev + 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrevPage();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNextPage();
    }
  };

  return (
    <article className={styles.container}>
      {/* 1. Introducción + CTA Ver prototipo */}
      <section className={styles.introSection}>
        <p className={styles.introParagraph}>
          Qué Como fue un proyecto de UX/UI que hicimos en equipo a partir de una
          pregunta bastante cotidiana: ¿qué cocino con lo que tengo en casa?
        </p>
        <p className={styles.introParagraph}>
          La idea fue diseñar una app móvil que ayudara a decidir qué preparar
          según los ingredientes disponibles, especialmente cuando hay poco
          tiempo, pocas ideas o terminamos cayendo siempre en las mismas comidas.
        </p>
        <p className={styles.introParagraph}>
          El proyecto nos llevó por un proceso bastante completo: investigación,
          entrevistas, arquitectura de información, prototipado y pruebas con
          usuarios antes de llegar al diseño final.
        </p>

        <div className={styles.actionsBlock}>
          <a
            href={FIGMA_PROTOTYPE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaPrimary}
          >
            Ver prototipo
          </a>
        </div>
      </section>

      {/* 2. El proceso */}
      <section
        className={styles.processSection}
        aria-labelledby="que-como-proceso-title"
      >
        <h3 id="que-como-proceso-title" className={styles.sectionTitle}>
          El proceso
        </h3>

        <div className={styles.processSequence}>
          {processBlocks.map((block) => (
            <article key={block.title} className={styles.processRow}>
              <div className={styles.rowImageWrapper}>
                <Image
                  src={block.imageSrc}
                  alt={block.alt}
                  width={1920}
                  height={1080}
                  sizes="(max-width: 768px) 100vw, 280px"
                  className={styles.rowImage}
                />
              </div>
              <div className={styles.rowContent}>
                <h4 className={styles.rowTitle}>{block.title}</h4>
                {block.paragraphs.map((paragraph, idx) => (
                  <p key={idx} className={styles.rowParagraph}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 3. Visor del proyecto completo */}
      <section
        className={styles.viewerSection}
        aria-labelledby="que-como-viewer-title"
      >
        <header className={styles.viewerHeader}>
          <h3 id="que-como-viewer-title" className={styles.sectionTitle}>
            Recorré el proyecto completo
          </h3>
          <p className={styles.viewerText}>
            Las 39 páginas originales reúnen todo el proceso de Qué Como. Podés
            recorrerlas como una presentación y detenerte en la etapa que
            quieras.
          </p>
        </header>

        <div
          className={styles.viewerContainer}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          role="region"
          aria-label="Visor de presentación de Qué Como. Usá las flechas izquierda y derecha para cambiar de página."
        >
          <div className={styles.viewerStage}>
            <Image
              key={currentPage}
              src={`/projects/laboratory/que-como/${currentPage}.png`}
              alt={`Página ${currentPage} de 39 del documento de diseño de Qué Como`}
              width={1920}
              height={1080}
              sizes="(max-width: 860px) 100vw, 840px"
              className={styles.viewerImage}
              priority={currentPage === 1}
            />
          </div>

          <div
            className={styles.viewerControls}
            aria-label="Controles del visor de páginas"
          >
            <button
              type="button"
              className={styles.navButton}
              onClick={handlePrevPage}
              disabled={currentPage <= 1}
              aria-label="Página anterior"
            >
              <span aria-hidden="true" className={styles.navIcon}>
                ←
              </span>
            </button>

            <span className={styles.pageCounter} aria-live="polite">
              {currentPage} / {TOTAL_PAGES}
            </span>

            <button
              type="button"
              className={styles.navButton}
              onClick={handleNextPage}
              disabled={currentPage >= TOTAL_PAGES}
              aria-label="Página siguiente"
            >
              <span aria-hidden="true" className={styles.navIcon}>
                →
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* 4. Herramientas */}
      <section className={styles.toolsSection}>
        <h3 className={styles.toolsTitle}>Herramientas</h3>
        <ul className={styles.toolsList}>
          {tools.map((tool) => (
            <li key={tool} className={styles.toolTag}>
              {tool}
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
