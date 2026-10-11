import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import { getProject, projects } from "@/frontend/features/projects/projectCatalog";
import type { ProjectSlug } from "@/frontend/features/projects/projectCatalog";
import { BitiCraftDetail } from "@/frontend/features/projects/components/BitiCraftDetail";
import { GeClauDetail } from "@/frontend/features/projects/components/GeClauDetail";
import { HorasClarasDetail } from "@/frontend/features/projects/components/HorasClarasDetail";
import { LeinwandDetail } from "@/frontend/features/projects/components/LeinwandDetail";
import { TracamDetail } from "@/frontend/features/projects/components/TracamDetail";
import styles from "./page.module.css";

const PROJECT_DETAILS: Record<ProjectSlug, ComponentType> = {
  geclau: GeClauDetail,
  "horas-claras": HorasClarasDetail,
  biticraft: BitiCraftDetail,
  tracam: TracamDetail,
  "leinwand-overland": LeinwandDetail,
};

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const project = getProject((await params).slug);

  if (!project) {
    notFound();
  }

  const url = `https://nicokaminski.com/proyectos/${project.slug}`;
  const title = `${project.title} | Nico Kaminski`;

  return {
    title,
    description: project.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      url,
      siteName: "Nico Kaminski",
      locale: "es_AR",
      title,
      description: project.description,
      images: "/opengraph-image.png",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.description,
      images: "/opengraph-image.png",
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = getProject((await params).slug);

  if (!project) {
    notFound();
  }

  const Detail = PROJECT_DETAILS[project.slug];

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <header className={styles.header}>
          <h1 className={styles.title}>{project.title}</h1>
        </header>
        <Detail />
      </div>
    </main>
  );
}
