import { Navbar } from "@/frontend/features/navigation";
import { Hero } from "@/frontend/features/hero";
import { About } from "@/frontend/features/about";
import { Workflow } from "@/frontend/features/workflow";
import { Projects } from "@/frontend/features/projects";
import { Laboratory } from "@/frontend/features/laboratory";
import { Contact } from "@/frontend/features/contact";
import { Footer } from "@/frontend/features/footer";
import { GITHUB_URL, LINKEDIN_URL } from "@/shared/links";
import styles from "./page.module.css";

const profileJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: "https://nicokaminski.com/",
  name: "Nico Kaminski | Desarrollador Full Stack con enfoque en Frontend",
  description:
    "Portfolio de Nico Kaminski, desarrollador full stack con enfoque en frontend. Desarrollo productos web con React y TypeScript, cuidando especialmente la experiencia de usuario.",
  mainEntity: {
    "@type": "Person",
    name: "Nico Kaminski",
    alternateName: "Nicolas Kaminski",
    url: "https://nicokaminski.com/",
    sameAs: [LINKEDIN_URL, GITHUB_URL],
  },
};

const serializedProfileJsonLd = JSON.stringify(profileJsonLd).replace(
  /</g,
  "\\u003c",
);

export default function Home() {
  return (
    <div className={styles.layout}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializedProfileJsonLd }}
      />
      <Navbar />
      <main className={styles.main}>
        <Hero />
        <About />
        <Workflow />
        <Projects />
        <Laboratory />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
