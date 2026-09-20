import type { MetadataRoute } from "next";
import { projects } from "@/frontend/features/projects/projectCatalog";

const SITE_URL = "https://nicokaminski.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/` },
    ...projects.map(({ slug }) => ({
      url: `${SITE_URL}/proyectos/${slug}`,
    })),
  ];
}
