import Image from "next/image";
import { InlineLink } from "@/frontend/components/InlineLink";
import { ThemeToggle } from "@/frontend/features/theme";
import styles from "./NotFoundPage.module.css";

export function NotFoundPage() {
  return (
    <main className={styles.page}>
      <div className={styles.scene} aria-hidden="true">
        <Image
          src="/images/404-dev-claro.png"
          alt=""
          width={2032}
          height={774}
          sizes="(max-aspect-ratio: 8/3) 270vh, 100vw"
          fetchPriority="high"
          className={`${styles.image} ${styles.lightImage}`}
        />
        <Image
          src="/images/404-dev-oscuro.png"
          alt=""
          width={2048}
          height={768}
          sizes="(max-aspect-ratio: 8/3) 270vh, 100vw"
          fetchPriority="high"
          className={`${styles.image} ${styles.darkImage}`}
        />
      </div>

      <div className={styles.themeControl}>
        <ThemeToggle />
      </div>

      <div className={styles.content}>
        <p className={styles.code} aria-label="Error 404">
          404
        </p>
        <h1 className={styles.title}>
          Esta ruta se perdió en el <span className={styles.highlight}>deploy</span>
        </h1>
        <p className={styles.description}>
          Pero tranqui, entre interfaces, componentes y algunas ideas en proceso,{" "}
          <InlineLink href="/" className={styles.returnLink}>
            siempre hay un buen lugar para volver.
          </InlineLink>
        </p>
        <p className={styles.signature}>
          Nico Kaminski, manteniendo la mirada siempre positiva en los objetivos
        </p>
      </div>
    </main>
  );
}
