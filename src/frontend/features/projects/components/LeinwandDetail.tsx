import Image from "next/image";
import { ActionLink } from "@/frontend/components/ActionLink";
import baseStyles from "./ProjectDetailBase.module.css";
import styles from "./LeinwandDetail.module.css";

const technologies = ["WordPress", "WooCommerce", "CSS", "Photoshop"];

export function LeinwandDetail() {
  return (
    <article className={baseStyles.container}>
      {/* 1. INTRODUCCIÓN */}
      <section className={baseStyles.introSection}>
        <p className={baseStyles.intro}>
          Leinwand Overland nació como una nueva propuesta dentro de Leinwand,
          una marca ya vinculada al camping y las actividades al aire libre. Me
          pidieron desarrollar el sitio para esta nueva línea, enfocada
          especialmente en aventura, 4x4 y off-road.
        </p>
        <p className={baseStyles.intro}>
          Me encargué de crear la web y la tienda online buscando mantener una
          relación clara con Leinwand, pero llevando la estética hacia el mundo
          overland y la identidad aventurera que querían transmitir.
        </p>

        <div className={baseStyles.actionsBlock}>
          <div className={baseStyles.primaryCtas}>
            <ActionLink
              href="https://leinwand-overland.com/"
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
            >
              Ver sitio
            </ActionLink>
          </div>
        </div>
      </section>

      {/* 2. PRESENTACIÓN VISUAL */}
      <section
        className={styles.visualSection}
        aria-label="Captura del sitio Leinwand Overland"
      >
        <div className={styles.mainCaptureWrapper}>
          <Image
            src="/projects/leinwand/captura-01.png"
            alt="Vista principal de la tienda Leinwand Overland"
            width={1892}
            height={831}
            sizes="(max-width: 860px) 100vw, 840px"
            className={styles.mainCaptureImage}
            priority
          />
        </div>
      </section>

      {/* 3. DE UNA BASE EXISTENTE A UNA PROPUESTA PROPIA */}
      <section className={baseStyles.editorialSection}>
        <h3 className={baseStyles.sectionTitle}>
          De una base existente a una propuesta propia
        </h3>
        <p className={baseStyles.paragraph}>
          El proyecto partió de WordPress y de una plantilla como base, pero fue
          necesario adaptarla para que Leinwand Overland tuviera una presencia
          propia. Trabajé sobre distintos estilos con CSS, ajustando páginas,
          composiciones y elementos visuales para acompañar mejor la estética
          4x4, off-road y de aventura que buscaba la marca.
        </p>
      </section>

      {/* 4. UNA TIENDA QUE TAMBIÉN TENÍA QUE VENDER */}
      <section className={baseStyles.editorialSection}>
        <h3 className={baseStyles.sectionTitle}>
          Una tienda que también tenía que vender
        </h3>
        <p className={baseStyles.paragraph}>
          Además de la parte visual, configuré la tienda con WooCommerce, los
          productos y las pasarelas de pago para que el sitio pudiera funcionar
          como un canal de venta completo y no solamente como una página de
          presentación.
        </p>
      </section>

      {/* 5. CONTENIDO VISUAL */}
      <section className={baseStyles.editorialSection}>
        <h3 className={baseStyles.sectionTitle}>Contenido visual</h3>
        <p className={baseStyles.paragraph}>
          También trabajé sobre parte de las imágenes utilizadas en el sitio,
          combinando herramientas de IA y Photoshop para generar y adaptar
          material acorde al universo visual de Leinwand Overland.
        </p>
      </section>

      {/* 6. PUBLICADO Y EN USO */}
      <section className={baseStyles.statusSection}>
        <h3 className={baseStyles.sectionTitle}>Publicado y en uso</h3>
        <p className={baseStyles.paragraph}>
          El sitio quedó publicado y continúa activo actualmente. Leinwand
          Overland sigue utilizándolo como parte de su presencia online y como
          canal de venta de sus productos.
        </p>
      </section>

      {/* 7. TECNOLOGÍAS Y HERRAMIENTAS */}
      <section className={baseStyles.techSection}>
        <h3 className={baseStyles.techTitle}>Tecnologías y herramientas</h3>
        <ul className={baseStyles.techList}>
          {technologies.map((tech) => (
            <li key={tech} className={baseStyles.techTag}>
              {tech}
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
