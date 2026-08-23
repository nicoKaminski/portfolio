import styles from "./Contact.module.css";

export function Contact() {
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

        <form className={styles.form} noValidate>
          <div className={styles.formGroup}>
            <label htmlFor="nombre" className={styles.label}>
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              className={styles.input}
              disabled
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={styles.input}
              disabled
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="mensaje" className={styles.label}>
              Mensaje
            </label>
            <textarea
              id="mensaje"
              name="mensaje"
              rows={5}
              className={styles.textarea}
              disabled
            />
          </div>

          <button type="button" className={styles.submitButton} disabled>
            Enviar mensaje
          </button>
        </form>
      </div>
    </section>
  );
}
