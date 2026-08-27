import { sendContactMessage } from "@/backend/contact/actions";
import { ContactForm } from "./ContactForm";
import styles from "./Contact.module.css";

export function Contact() {
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  return (
    <section
      id="contacto"
      className={styles.contactSection}
      aria-labelledby="contact-title"
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 id="contact-title" className={styles.title}>
            Contacto
          </h2>
          <p className={styles.intro}>
            Si querés hablar sobre un proyecto, una idea o simplemente
            intercambiar opiniones sobre desarrollo de software, escribime.
          </p>
        </header>

        <ContactForm
          action={sendContactMessage}
          siteKey={turnstileSiteKey}
        />
      </div>
    </section>
  );
}
