"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { ActionLink } from "@/frontend/components/ActionLink";
import { DownloadIcon } from "@/frontend/components/DownloadIcon";
import { ThemeToggle } from "@/frontend/features/theme";
import { CV_URL } from "@/shared/links";
import { BackToTop } from "./components/BackToTop";
import styles from "./Navbar.module.css";

function HamburgerIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={styles.menuIcon}
    >
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="18" x2="20" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={styles.menuIcon}
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

type NavKey = "inicio" | "como-trabajo" | "proyectos" | "contacto";

interface NavItem {
  key: NavKey;
  href: string;
  label: string;
}

const navItems: NavItem[] = [
  { key: "inicio", href: "#inicio", label: "Inicio" },
  { key: "como-trabajo", href: "#como-trabajo", label: "Cómo trabajo" },
  { key: "proyectos", href: "#proyectos", label: "Proyectos" },
  { key: "contacto", href: "#contacto", label: "Contacto" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<NavKey>("inicio");

  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  useEffect(() => {
    const sectionToNavKey: Record<string, NavKey> = {
      inicio: "inicio",
      "cazador-bugs": "inicio",
      "como-trabajo": "como-trabajo",
      proyectos: "proyectos",
      laboratorio: "proyectos",
      contacto: "contacto",
    };

    const sectionIds = Object.keys(sectionToNavKey);
    const visibleSections = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSections.set(entry.target.id, entry.intersectionRatio);
          } else {
            visibleSections.delete(entry.target.id);
          }
        });

        if (visibleSections.size === 0) {
          return;
        }

        // Elegir la sección visible que tenga mayor ratio de intersección o la primera visible en orden DOM
        let bestSectionId = "";
        let maxRatio = -1;

        for (const id of sectionIds) {
          const ratio = visibleSections.get(id);
          if (ratio !== undefined && ratio > maxRatio) {
            maxRatio = ratio;
            bestSectionId = id;
          }
        }

        if (bestSectionId && sectionToNavKey[bestSectionId]) {
          setActiveSection(sectionToNavKey[bestSectionId]);
        }
      },
      {
        rootMargin: "-15% 0px -40% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <a
            href="#inicio"
            className={styles.brand}
            onClick={closeMenu}
            aria-label="Nico Kaminski - Inicio"
          >
            <Image
              src="/branding/nk-logo.svg"
              alt=""
              width={40}
              height={26}
              className={styles.brandLogo}
              priority
            />
            <span className={styles.brandName}>Nico Kaminski</span>
          </a>

          {/* Navegación desktop */}
          <div className={styles.navGroup}>
            <nav aria-label="Navegación principal">
              <ul className={styles.navList}>
                {navItems.map((item) => {
                  const isActive = activeSection === item.key;
                  return (
                    <li key={item.key}>
                      <a
                        href={item.href}
                        className={`${styles.navLink} ${isActive ? styles.activeNavLink : ""}`}
                        aria-current={isActive ? "location" : undefined}
                      >
                        <span>{item.label}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <ThemeToggle />

            <ActionLink
              href={CV_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              size="compact"
              startIcon={<DownloadIcon />}
              aria-label="Descargar CV (abre en nueva pestaña)"
            >
              Descargar CV
            </ActionLink>
          </div>

          {/* Acciones mobile: ThemeToggle + Botón Hamburguesa */}
          <div className={styles.mobileActions}>
            <ThemeToggle />

            <button
              type="button"
              className={styles.menuToggle}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav-menu"
              aria-label={
                isMenuOpen
                  ? "Cerrar menú de navegación"
                  : "Abrir menú de navegación"
              }
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              {isMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
            </button>
          </div>
        </div>

        {/* Menú desplegable mobile */}
        {isMenuOpen && (
          <nav
            id="mobile-nav-menu"
            className={styles.mobileMenu}
            aria-label="Navegación móvil"
          >
            <ul className={styles.mobileNavList}>
              {navItems.map((item) => {
                const isActive = activeSection === item.key;
                return (
                  <li key={item.key}>
                    <a
                      href={item.href}
                      className={`${styles.mobileNavLink} ${isActive ? styles.activeMobileNavLink : ""}`}
                      aria-current={isActive ? "location" : undefined}
                      onClick={closeMenu}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
              <li className={styles.mobileCvItem}>
                <ActionLink
                  href={CV_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  size="compact"
                  startIcon={<DownloadIcon />}
                  className={styles.mobileCvAction}
                  onClick={closeMenu}
                  aria-label="Descargar CV (abre en nueva pestaña)"
                >
                  Descargar CV
                </ActionLink>
              </li>
            </ul>
          </nav>
        )}
      </header>

      <BackToTop isVisible={activeSection !== "inicio"} />
    </>
  );
}
