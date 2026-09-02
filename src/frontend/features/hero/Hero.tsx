import { AbstractVisual } from "./components/AbstractVisual";
import styles from "./Hero.module.css";

function LinkedInIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={styles.socialIcon}
    >
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={styles.socialIcon}
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function QuoteIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={styles.quoteIcon}
    >
      <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function ChatIcon({ className }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
      <path d="M8 12h.01" />
      <path d="M12 12h.01" />
      <path d="M16 12h.01" />
    </svg>
  );
}

export function Hero() {
  return (
    <section id="inicio" className={styles.heroSection} aria-label="Introducción">
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Desarrollador de software <span className={styles.nowrap}>full stack</span> con enfoque en frontend
          </h1>
          <p className={styles.description}>
            Desarrollo interfaces y aplicaciones web poniendo especial atención en
            la experiencia de usuario, sin limitarme al frontend: también trabajo
            con backend, datos e integración cuando el producto lo necesita.
          </p>
          <div className={styles.actions}>
            <a href="#proyectos" className={styles.primaryButton}>
              <span>Ver proyectos</span>
              <ArrowRightIcon className={styles.arrowIcon} />
            </a>
            <a href="#contacto" className={styles.secondaryButton}>
              <span>Conversemos</span>
              <ChatIcon className={styles.chatIcon} />
            </a>
          </div>
          <div className={styles.social}>
            <span className={styles.socialPrompt}>También podés encontrarme en</span>
            <div className={styles.socialLinks}>
              <a
                href="https://www.linkedin.com/in/nkaminski-profile/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://github.com/nicoKaminski"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="GitHub"
              >
                <GitHubIcon />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>

        <div className={styles.visualColumn}>
          <div className={styles.visualWrapper}>
            <AbstractVisual />
            <aside className={styles.statementBadge} aria-label="Criterio de trabajo">
              <QuoteIcon />
              <p className={styles.statementText}>
                Me interesa crear productos que resuelvan problemas y sean claros para quienes los usan.
              </p>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
