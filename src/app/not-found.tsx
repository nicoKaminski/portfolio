import type { Metadata } from "next";
import { NotFoundPage } from "@/frontend/features/not-found/NotFoundPage";

export const metadata: Metadata = {
  title: "404 | Esta ruta se perdió en el deploy | Nico Kaminski",
  description: "Esta ruta se perdió en el deploy. Siempre hay un buen lugar para volver.",
  alternates: { canonical: null },
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <NotFoundPage />;
}
