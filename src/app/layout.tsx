import type { Metadata } from "next";
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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: themeInitScript,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
