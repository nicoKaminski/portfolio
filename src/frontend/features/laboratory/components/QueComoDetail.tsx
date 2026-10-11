"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ActionLink } from "@/frontend/components/ActionLink";
import labStyles from "./LaboratoryDetail.module.css";
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
  const [isViewerNear, setIsViewerNear] = useState(false);
  const [activeSlot, setActiveSlot] = useState(0);
  const [slotPages, setSlotPages] = useState<[number | null, number | null]>([
    1,
    null,
  ]);
  const [slotRequests, setSlotRequests] = useState<[number, number]>([0, 0]);
  const [pendingPage, setPendingPage] = useState<number | null>(null);
  const [loadError, setLoadError] = useState(false);
  const viewerRef = useRef<HTMLDivElement>(null);
  const slotPagesRef = useRef<[number | null, number | null]>([1, null]);
  const slotRequestRefs = useRef<[number, number]>([0, 0]);
  const loadedPagesRef = useRef<[number | null, number | null]>([null, null]);
  const pendingPageRef = useRef<number | null>(null);
  const failedPagesRef = useRef<[number | null, number | null]>([null, null]);

  const setSlotPage = (slot: number, page: number | null) => {
    const nextPages: [number | null, number | null] = [...slotPagesRef.current];
    nextPages[slot] = page;
    slotPagesRef.current = nextPages;
    loadedPagesRef.current[slot] = null;
    failedPagesRef.current[slot] = null;

    const nextRequests: [number, number] = [...slotRequestRefs.current];
    nextRequests[slot] += 1;
    slotRequestRefs.current = nextRequests;
    setSlotPages(nextPages);
    setSlotRequests(nextRequests);
  };

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;

    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setIsViewerNear(true);
        observer.disconnect();
      },
      { rootMargin: "200px 0px" }
    );

    observer.observe(viewer);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isViewerNear) return;
    const inactiveSlot = 1 - activeSlot;
    const nextPage = currentPage < TOTAL_PAGES ? currentPage + 1 : null;
    if (
      nextPage !== null &&
      slotPagesRef.current[inactiveSlot] === null
    ) {
      setSlotPage(inactiveSlot, nextPage);
    }
  }, [activeSlot, currentPage, isViewerNear]);

  const promotePage = (slot: number, page: number) => {
    const previousSlot = activeSlot;
    pendingPageRef.current = null;
    setPendingPage(null);
    setCurrentPage(page);
    setActiveSlot(slot);
    setSlotPage(
      previousSlot,
      isViewerNear && page < TOTAL_PAGES ? page + 1 : null
    );
  };

  const handleSlotLoad = (slot: number, page: number, request: number) => {
    if (
      slotPagesRef.current[slot] !== page ||
      slotRequestRefs.current[slot] !== request
    ) return;

    loadedPagesRef.current[slot] = page;
    failedPagesRef.current[slot] = null;

    if (pendingPageRef.current === page) {
      setLoadError(false);
      promotePage(slot, page);
      return;
    }

    if (slot === activeSlot && page === currentPage) {
      setLoadError(false);
    }
  };

  const handleSlotError = (slot: number, page: number, request: number) => {
    if (
      slotPagesRef.current[slot] !== page ||
      slotRequestRefs.current[slot] !== request
    ) return;

    failedPagesRef.current[slot] = page;
    if (pendingPageRef.current === page) {
      setLoadError(true);
      pendingPageRef.current = null;
      setPendingPage(null);
      return;
    }

    if (slot === activeSlot && page === currentPage) setLoadError(true);
  };

  const moveToPage = (page: number) => {
    if (page < 1 || page > TOTAL_PAGES || pendingPageRef.current !== null) return;

    setLoadError(false);
    const inactiveSlot = 1 - activeSlot;
    if (
      slotPagesRef.current[inactiveSlot] === page &&
      loadedPagesRef.current[inactiveSlot] === page
    ) {
      promotePage(inactiveSlot, page);
      return;
    }

    pendingPageRef.current = page;
    setPendingPage(page);

    if (slotPagesRef.current[inactiveSlot] !== page) {
      setSlotPage(inactiveSlot, page);
    } else if (failedPagesRef.current[inactiveSlot] === page) {
      setSlotPage(inactiveSlot, page);
    }
  };

  const handlePrevPage = () => {
    moveToPage(currentPage - 1);
  };

  const handleNextPage = () => {
    moveToPage(currentPage + 1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      if (pendingPageRef.current !== null) return;
      handlePrevPage();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      if (pendingPageRef.current !== null) return;
      handleNextPage();
    }
  };

  return (
    <article className={`${labStyles.container} ${styles.container}`}>
      {/* 1. Introducción + CTA Ver prototipo */}
      <section className={labStyles.introSection}>
        <p className={`${labStyles.intro} ${styles.introParagraph}`}>
          Qué Como fue un proyecto de UX/UI que hicimos en equipo a partir de una
          pregunta bastante cotidiana: ¿qué cocino con lo que tengo en casa?
        </p>
        <p className={`${labStyles.intro} ${styles.introParagraph}`}>
          La idea fue diseñar una app móvil que ayudara a decidir qué preparar
          según los ingredientes disponibles, especialmente cuando hay poco
          tiempo, pocas ideas o terminamos cayendo siempre en las mismas comidas.
        </p>
        <p className={`${labStyles.intro} ${styles.introParagraph}`}>
          El proyecto nos llevó por un proceso bastante completo: investigación,
          entrevistas, arquitectura de información, prototipado y pruebas con
          usuarios antes de llegar al diseño final.
        </p>

        <div className={`${labStyles.actionsBlock} ${styles.actionsBlock}`}>
          <ActionLink
            href={FIGMA_PROTOTYPE_URL}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            className={styles.prototypeAction}
          >
            Ver prototipo
          </ActionLink>
        </div>
      </section>

      {/* 2. El proceso */}
      <section
        className={styles.processSection}
        aria-labelledby="que-como-proceso-title"
      >
        <h3
          id="que-como-proceso-title"
          className={`${labStyles.sectionTitle} ${styles.sectionTitle}`}
        >
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
          <h3
            id="que-como-viewer-title"
            className={`${labStyles.sectionTitle} ${styles.sectionTitle}`}
          >
            Recorré el proyecto completo
          </h3>
          <p className={styles.viewerText}>
            Las 39 páginas originales reúnen todo el proceso de Qué Como. Podés
            recorrerlas como una presentación y detenerte en la etapa que
            quieras.
          </p>
        </header>

        <div
          ref={viewerRef}
          className={styles.viewerContainer}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          role="region"
          aria-label="Visor de presentación de Qué Como. Usá las flechas izquierda y derecha para cambiar de página."
        >
          <div className={styles.viewerStage}>
            {slotPages.map((page, slot) =>
              page === null ? null : (
                <Image
                  key={`${slot}-${slotRequests[slot]}`}
                  src={`/projects/laboratory/que-como/${page}.png`}
                  alt={
                    slot === activeSlot
                      ? `Página ${page} de 39 del documento de diseño de Qué Como`
                      : ""
                  }
                  width={1920}
                  height={1080}
                  sizes="(max-width: 860px) 100vw, 840px"
                  className={
                    slot === activeSlot
                      ? styles.viewerImage
                      : styles.preparedViewerImage
                  }
                  priority={page === 1 && slot === 0 && currentPage === 1}
                  loading={slot === activeSlot ? undefined : "eager"}
                  aria-hidden={slot !== activeSlot}
                  onLoad={() =>
                    handleSlotLoad(slot, page, slotRequests[slot])
                  }
                  onError={() =>
                    handleSlotError(slot, page, slotRequests[slot])
                  }
                />
              )
            )}
          </div>

          <span className={styles.visuallyHidden} role="status" aria-live="polite">
            {loadError ? "No se pudo cargar la página. Volvé a intentar." : ""}
          </span>

          <div
            className={styles.viewerControls}
            aria-label="Controles del visor de páginas"
          >
            <button
              type="button"
              className={styles.navButton}
              onClick={handlePrevPage}
              disabled={currentPage <= 1 || pendingPage !== null}
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
              disabled={currentPage >= TOTAL_PAGES || pendingPage !== null}
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
      <section className={labStyles.techSection}>
        <h3 className={`${labStyles.techTitle} ${styles.toolsTitle}`}>
          Herramientas
        </h3>
        <ul className={labStyles.techList}>
          {tools.map((tool) => (
            <li key={tool} className={`${labStyles.techTag} ${styles.toolTag}`}>
              {tool}
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
