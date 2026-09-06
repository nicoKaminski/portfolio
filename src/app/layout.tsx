import type { Metadata } from "next";
import Script from "next/script";
import { themeInitScript } from "@/frontend/features/theme";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nico Kaminski | Portfolio",
  description:
    "Portfolio profesional de Nico Kaminski, desarrollador de software full stack con enfoque en frontend.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
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
