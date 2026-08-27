import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";
import styles from "./TracamDetail.module.css";

interface ZoomImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  id: "captura-01" | "captura-02";
}

const technologies = [
  "React",
  "TypeScript",
  "Vite",
  "React Router",
  "CSS Modules",
  "NestJS",
  "PostgreSQL",
  "TypeORM",
  "JWT",
];

export function TracamDetail() {
  const [zoomedImage, setZoomedImage] = useState<ZoomImage | null>(null);
  const btn01Ref = useRef<HTMLButtonElement>(null);
  const btn02Ref = useRef<HTMLButtonElement>(null);
  const zoomCloseBtnRef = useRef<HTMLButtonElement>(null);

  const handleCloseZoom = useCallback(() => {
    if (!zoomedImage) return;
    const closedId = zoomedImage.id;
    setZoomedImage(null);
    if (closedId === "captura-01") {
      btn01Ref.current?.focus();
    } else if (closedId === "captura-02") {
      btn02Ref.current?.focus();
    }
  }, [zoomedImage]);

  useEffect(() => {
    if (!zoomedImage) return;

    zoomCloseBtnRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        e.preventDefault();
        handleCloseZoom();
      }
    };

    window.addEventListener("keydown", handleKeyDown, { capture: true });
    return () => {
      window.removeEventListener("keydown", handleKeyDown, { capture: true });
    };
  }, [zoomedImage, handleCloseZoom]);

  return (
    <article className={styles.container}>
      {/* 1. INTRODUCCIÓN */}
      <section className={styles.introSection}>
        <p className={styles.intro}>
          TRACAM es un MVP desarrollado por Grupo6S para centralizar la gestión
          operativa y la trazabilidad de viajes de camiones. El proyecto busca
          reemplazar progresivamente procesos distribuidos entre papel, Excel,
          capturas de pantalla, WhatsApp y llamadas por una herramienta única para
          organizar la operación diaria.
        </p>

        <div className={styles.actionsBlock}>
          <div className={styles.primaryCtas}>
            <a
              href="https://tracam.grupo6s.com/login"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaPrimary}
            >
              Ver aplicación
            </a>
          </div>

          <div className={styles.teamInfo}>
            <span>Desarrollado en equipo por Grupo6s</span>
            <span className={styles.dotSeparator} aria-hidden="true">
              ·
            </span>
            <a
              href="https://grupo6s.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.teamLink}
            >
              Conocer Grupo6s
            </a>
          </div>
        </div>
      </section>

      {/* 2. PRESENTACIÓN VISUAL */}
      <section
        className={styles.visualSection}
        aria-label="Capturas de TRACAM"
      >
        <div className={styles.mediaGrid}>
          <button
            ref={btn01Ref}
            type="button"
            className={`${styles.imageButton} ${styles.primaryImageButton}`}
            onClick={() =>
              setZoomedImage({
                src: "/projects/tracam/captura-01.jpg",
                alt: "Vista principal de TRACAM",
                width: 1901,
                height: 866,
                id: "captura-01",
              })
            }
            aria-label="Ampliar vista principal de TRACAM"
          >
            <div className={styles.primaryImageWrapper}>
              <Image
                src="/projects/tracam/captura-01.jpg"
                alt="Vista principal de TRACAM"
                width={1901}
                height={866}
                sizes="(max-width: 860px) 100vw, 560px"
                className={styles.captureImage}
                priority
              />
              <span className={styles.zoomHint} aria-hidden="true">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </span>
            </div>
          </button>

          <button
            ref={btn02Ref}
            type="button"
            className={`${styles.imageButton} ${styles.secondaryImageButton}`}
            onClick={() =>
              setZoomedImage({
                src: "/projects/tracam/captura-02.jpg",
                alt: "Vista operativa de TRACAM",
                width: 1893,
                height: 865,
                id: "captura-02",
              })
            }
            aria-label="Ampliar vista operativa de TRACAM"
          >
            <div className={styles.secondaryImageWrapper}>
              <Image
                src="/projects/tracam/captura-02.jpg"
                alt="Vista operativa de TRACAM"
                width={1893}
                height={865}
                sizes="(max-width: 860px) 100vw, 360px"
                className={styles.captureImage}
              />
              <span className={styles.zoomHint} aria-hidden="true">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </span>
            </div>
          </button>
        </div>
      </section>

      {/* MODAL DE AMPLIACIÓN (LIGHTBOX LOCAL) */}
      {zoomedImage && (
        <div
          className={styles.zoomOverlay}
          onClick={handleCloseZoom}
          role="dialog"
          aria-modal="true"
          aria-label={`Ampliación: ${zoomedImage.alt}`}
        >
          <div
            className={styles.zoomDialog}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={zoomCloseBtnRef}
              type="button"
              className={styles.zoomCloseButton}
              onClick={handleCloseZoom}
              aria-label="Cerrar ampliación de imagen"
            >
              <span aria-hidden="true">✕</span>
            </button>
            <div className={styles.zoomImageContainer}>
              <Image
                src={zoomedImage.src}
                alt={zoomedImage.alt}
                width={zoomedImage.width}
                height={zoomedImage.height}
                sizes="(max-width: 960px) 96vw, 920px"
                className={styles.zoomedImage}
                priority
              />
            </div>
          </div>
        </div>
      )}

      {/* 3. UN PROBLEMA OPERATIVO DISTRIBUIDO */}
      <section className={styles.editorialSection}>
        <h3 className={styles.sectionTitle}>Un problema operativo distribuido</h3>
        <p className={styles.paragraph}>
          La operación que TRACAM busca ordenar no sucede en un único lugar.
          Viajes, camiones, choferes, prioridades y datos operativos pueden
          terminar repartidos entre distintos medios y requieren seguimiento
          constante. El objetivo del MVP es concentrar esa información y hacer
          más clara la operación diaria.
        </p>
      </section>

      {/* 4. MI PARTICIPACIÓN */}
      <section className={styles.editorialSection}>
        <h3 className={styles.sectionTitle}>Mi participación</h3>
        <div className={styles.participationContent}>
          <div className={styles.roleSummary}>
            <span className={styles.roleBadge}>UX/UI</span>
            <span className={styles.rolePlus} aria-hidden="true">+</span>
            <span className={styles.roleBadge}>Frontend</span>
            <span className={styles.rolePlus} aria-hidden="true">+</span>
            <span className={styles.roleBadge}>Backend</span>
          </div>
          <p className={styles.paragraph}>
            Participo en el desarrollo full stack de TRACAM dentro de Grupo6S,
            trabajando tanto sobre la interfaz con React y TypeScript como sobre el
            backend con NestJS y PostgreSQL.
          </p>
          <p className={styles.paragraph}>
            Además, tengo un rol especialmente fuerte en UX/UI. Desarrollo las
            propuestas de diseño y los patrones visuales que sirven como
            referencia para que el resto del equipo pueda mantener coherencia al
            construir nuevas vistas y módulos.
          </p>
        </div>
      </section>

      {/* 5. DISEÑO QUE PUEDE CRECER CON EL PRODUCTO */}
      <section className={styles.editorialSection}>
        <h3 className={styles.sectionTitle}>
          Diseño que puede crecer con el producto
        </h3>
        <p className={styles.paragraph}>
          Como el sistema continúa incorporando flujos y funcionalidades, una
          parte importante del trabajo de diseño consiste en establecer patrones
          que puedan repetirse sin que cada nueva pantalla parezca pertenecer a
          una aplicación diferente. La interfaz todavía está en evolución y el
          refinamiento visual forma parte del trabajo pendiente del MVP.
        </p>
      </section>

      {/* 6. ESTADO ACTUAL */}
      <section className={styles.statusSection}>
        <h3 className={styles.statusTitle}>Estado actual</h3>
        <p className={styles.paragraph}>
          TRACAM se encuentra actualmente en etapa de MVP y está siendo probado
          por el cliente. El proyecto todavía no está finalizado: seguimos
          ajustando funcionalidades, flujos de uso y la experiencia general a
          partir de su utilización real.
        </p>
        <p className={styles.paragraph}>
          La interfaz también continúa evolucionando y todavía requiere trabajo
          de refinamiento visual antes de considerar el producto cerrado.
        </p>
      </section>

      {/* 7. TECNOLOGÍAS */}
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
