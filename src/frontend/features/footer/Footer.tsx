import styles from "./Footer.module.css";

const FOOTER_LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/nkaminski-profile/",
  },
  {
    label: "GitHub",
    href: "https://github.com/nicoKaminski",
  },
  {
    label: "Descargar CV",
    href: "https://drive.google.com/file/d/1QMCkkZUyxp57YlQR5wZT-rhBv8ZTDkQd/view?usp=sharing",
  },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <span className={styles.brand}>Nico Kaminski</span>

        <nav aria-label="Enlaces profesionales y contacto">
          <ul className={styles.linksList}>
            {FOOTER_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
