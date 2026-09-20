import type { Metadata } from "next";
import { Onest } from "next/font/google";
import Script from "next/script";
import { themeInitScript } from "@/frontend/features/theme";
import "./globals.css";

const onest = Onest({
  weight: "variable",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-onest",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nicokaminski.com"),
  title: "Nico Kaminski | Desarrollador Full Stack con enfoque en Frontend",
  description:
    "Portfolio de Nico Kaminski, desarrollador full stack con enfoque en frontend. Desarrollo productos web con React y TypeScript, cuidando especialmente la experiencia de usuario.",
  alternates: {
    canonical: "https://nicokaminski.com/",
  },
  openGraph: {
    type: "website",
    url: "https://nicokaminski.com/",
    siteName: "Nico Kaminski",
    locale: "es_AR",
    title: "Nico Kaminski | Desarrollador Full Stack con enfoque en Frontend",
    description:
      "Portfolio de Nico Kaminski, desarrollador full stack con enfoque en frontend. Desarrollo productos web con React y TypeScript, cuidando especialmente la experiencia de usuario.",
    images: "/opengraph-image.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nico Kaminski | Desarrollador Full Stack con enfoque en Frontend",
    description:
      "Portfolio de Nico Kaminski, desarrollador full stack con enfoque en frontend. Desarrollo productos web con React y TypeScript, cuidando especialmente la experiencia de usuario.",
    images: "/opengraph-image.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning className={onest.variable}>
      <body>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: themeInitScript,
          }}
        />
        {children}
      </body>
    </html>
  );
}
