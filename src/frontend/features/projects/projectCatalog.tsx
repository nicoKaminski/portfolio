import type { ComponentType } from "react";
import { BitiCraftDetail } from "./components/BitiCraftDetail";
import { GeClauDetail } from "./components/GeClauDetail";
import { HorasClarasDetail } from "./components/HorasClarasDetail";
import { LeinwandDetail } from "./components/LeinwandDetail";
import { TracamDetail } from "./components/TracamDetail";

export type ProjectSlug =
  | "geclau"
  | "horas-claras"
  | "biticraft"
  | "tracam"
  | "leinwand-overland";

export interface Project {
  slug: ProjectSlug;
  title: string;
  logo: string;
  mockup: string;
  mockupAlt: string;
  description: string;
  externalCta: string;
  externalHref: string;
  Detail: ComponentType;
}

export const projects: readonly Project[] = [
  {
    slug: "geclau",
    title: "GeClAu",
    logo: "/projects/geclau/logo.png",
    mockup: "/projects/geclau/mockup.png",
    mockupAlt: "Vista de la aplicación GeClAu",
    description:
      "Un sistema de gestión académica para organizar aulas, horarios y clases, reduciendo errores y superposiciones.",
    externalCta: "Ver despliegue",
    externalHref: "https://aulas.mdp.utn.edu.ar/",
    Detail: GeClauDetail,
  },
  {
    slug: "horas-claras",
    title: "Horas Claras",
    logo: "/projects/horas-claras/logo.png",
    mockup: "/projects/horas-claras/mockup.png",
    mockupAlt: "Vista de la aplicación Horas Claras",
    description:
      "Una herramienta para registrar horas de trabajo, controlar pendientes y mantener ordenada la carga en Jira.",
    externalCta: "Abrir app",
    externalHref: "https://horas-claras.vercel.app/",
    Detail: HorasClarasDetail,
  },
  {
    slug: "biticraft",
    title: "BitiCraft",
    logo: "/projects/biticraft/logo.png",
    mockup: "/projects/biticraft/mockup.png",
    mockupAlt: "Vista del sitio web de BitiCraft",
    description:
      "Sitio web para un emprendimiento de papelería personalizada, con foco en UX/UI, presentación de productos y contacto.",
    externalCta: "Visitar sitio",
    externalHref: "https://biticraft.vercel.app/",
    Detail: BitiCraftDetail,
  },
  {
    slug: "tracam",
    title: "TRACAM",
    logo: "/projects/tracam/logo.png",
    mockup: "/projects/tracam/mockup.png",
    mockupAlt: "Vista de la aplicación TRACAM",
    description:
      "Un MVP orientado a mejorar la trazabilidad de camiones, la gestión de viajes y la organización de documentación.",
    externalCta: "Abrir app",
    externalHref: "https://tracam.grupo6s.com/login",
    Detail: TracamDetail,
  },
  {
    slug: "leinwand-overland",
    title: "Leinwand Overland",
    logo: "/projects/leinwand/logo.png",
    mockup: "/projects/leinwand/captura-01.png",
    mockupAlt: "Vista de la tienda Leinwand Overland",
    description:
      "E-commerce desarrollado con WordPress y WooCommerce para una empresa de equipamiento overland.",
    externalCta: "Visitar sitio",
    externalHref: "https://leinwand-overland.com/",
    Detail: LeinwandDetail,
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
