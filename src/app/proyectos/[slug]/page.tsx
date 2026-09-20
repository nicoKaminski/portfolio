import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/frontend/features/projects/projectCatalog";
import styles from "./page.module.css";

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

  const Detail = project.Detail;

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
