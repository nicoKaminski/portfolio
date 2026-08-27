"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import Script from "next/script";
import {
  ContactField,
  ContactFormState,
  EMAIL_MAX_LENGTH,
  MENSAJE_MAX_LENGTH,
  MENSAJE_MIN_LENGTH,
  NOMBRE_MAX_LENGTH,
  NOMBRE_MIN_LENGTH,
} from "@/shared/contact";
import styles from "./Contact.module.css";

interface TurnstileWindow extends Window {
  turnstile?: {
    reset: () => void;
  };
}

interface ContactFormProps {
  action: (
    prevState: ContactFormState,
    formData: FormData
  ) => Promise<ContactFormState>;
  siteKey?: string;
}

const initialState: ContactFormState = {
  status: "idle",
  message: "",
  invalidFields: [],
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm({ action, siteKey }: ContactFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState);
  const [dismissedSuccessState, setDismissedSuccessState] =
    useState<ContactFormState | null>(null);
  const [clientErrors, setClientErrors] = useState<
    Record<ContactField, string>
  >({
    nombre: "",
    email: "",
    mensaje: "",
  });
  const formRef = useRef<HTMLFormElement>(null);

  const showSuccess =
    state.status === "success" && state !== dismissedSuccessState;

  useEffect(() => {
    if (state.status === "success" && state !== dismissedSuccessState) {
      const timer = setTimeout(() => {
        setDismissedSuccessState(state);
        setClientErrors({ nombre: "", email: "", mensaje: "" });
        formRef.current?.reset();
        const turnstileWindow = window as TurnstileWindow;
        turnstileWindow.turnstile?.reset();
      }, 7000);

      return () => {
        clearTimeout(timer);
      };
    } else if (state.status === "error" && state.invalidFields.length === 0) {
      const turnstileWindow = window as TurnstileWindow;
      turnstileWindow.turnstile?.reset();
    }
  }, [state, dismissedSuccessState]);

  const handleFieldChange = (field: ContactField) => {
    if (clientErrors[field]) {
      setClientErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    const formData = new FormData(form);
    const nombre = ((formData.get("nombre") as string) ?? "").trim();
    const email = ((formData.get("email") as string) ?? "").trim();
    const mensaje = ((formData.get("mensaje") as string) ?? "").trim();

    const errors: Record<ContactField, string> = {
      nombre: "",
      email: "",
      mensaje: "",
    };

    let hasError = false;

    if (nombre.length === 0) {
      errors.nombre = "Ingresá tu nombre.";
      hasError = true;
    } else if (
      nombre.length < NOMBRE_MIN_LENGTH ||
      nombre.length > NOMBRE_MAX_LENGTH
    ) {
      errors.nombre = "Revisá la longitud del nombre.";
      hasError = true;
    }

    if (email.length === 0) {
      errors.email = "Ingresá tu email.";
      hasError = true;
    } else if (email.length > EMAIL_MAX_LENGTH || !EMAIL_REGEX.test(email)) {
      errors.email = "Ingresá un email válido.";
      hasError = true;
    }

    if (mensaje.length === 0) {
      errors.mensaje = "Escribí un mensaje.";
      hasError = true;
    } else if (
      mensaje.length < MENSAJE_MIN_LENGTH ||
      mensaje.length > MENSAJE_MAX_LENGTH
    ) {
      errors.mensaje = "Revisá la longitud del mensaje.";
      hasError = true;
    }

    if (hasError) {
      e.preventDefault();
      setClientErrors(errors);
      return;
    }

    setClientErrors({ nombre: "", email: "", mensaje: "" });
  };

  const nombreError =
    clientErrors.nombre ||
    (state.invalidFields.includes("nombre") ? "Revisá este campo." : "");
  const emailError =
    clientErrors.email ||
    (state.invalidFields.includes("email") ? "Revisá este campo." : "");
  const mensajeError =
    clientErrors.mensaje ||
    (state.invalidFields.includes("mensaje") ? "Revisá este campo." : "");

  const isNombreInvalid = Boolean(nombreError);
  const isEmailInvalid = Boolean(emailError);
  const isMensajeInvalid = Boolean(mensajeError);

  return (
    <>
      {siteKey && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive"
        />
      )}

      <div className={styles.formWrapper}>
        <form
          ref={formRef}
          action={formAction}
          onSubmit={handleSubmit}
          noValidate
          aria-busy={isPending}
          className={`${styles.form} ${showSuccess ? styles.formHidden : ""}`}
          aria-hidden={showSuccess ? "true" : undefined}
          inert={showSuccess ? true : undefined}
        >
          <div className={styles.honeypot} aria-hidden="true">
            <label htmlFor="website">Sitio web</label>
            <input
              type="text"
              id="website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {state.status === "error" && state.message && (
            <div className={styles.generalError} role="alert">
              {state.message}
            </div>
          )}

          <div className={styles.formGroup}>
            <label htmlFor="nombre" className={styles.label}>
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              className={styles.input}
              maxLength={NOMBRE_MAX_LENGTH}
              disabled={isPending || !siteKey}
              aria-invalid={isNombreInvalid ? "true" : undefined}
              aria-describedby={isNombreInvalid ? "nombre-error" : undefined}
              onChange={() => handleFieldChange("nombre")}
            />
            {isNombreInvalid && (
              <span id="nombre-error" className={styles.fieldError}>
                {nombreError}
              </span>
            )}
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
              maxLength={EMAIL_MAX_LENGTH}
              disabled={isPending || !siteKey}
              aria-invalid={isEmailInvalid ? "true" : undefined}
              aria-describedby={isEmailInvalid ? "email-error" : undefined}
              onChange={() => handleFieldChange("email")}
            />
            {isEmailInvalid && (
              <span id="email-error" className={styles.fieldError}>
                {emailError}
              </span>
            )}
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
              maxLength={MENSAJE_MAX_LENGTH}
              disabled={isPending || !siteKey}
              aria-invalid={isMensajeInvalid ? "true" : undefined}
              aria-describedby={isMensajeInvalid ? "mensaje-error" : undefined}
              onChange={() => handleFieldChange("mensaje")}
            />
            {isMensajeInvalid && (
              <span id="mensaje-error" className={styles.fieldError}>
                {mensajeError}
              </span>
            )}
          </div>

          <div className={styles.actions}>
            {siteKey ? (
              <div
                className={`cf-turnstile ${styles.turnstile}`}
                data-sitekey={siteKey}
                data-response-field-name="turnstileToken"
                data-theme="auto"
                data-language="es"
              />
            ) : (
              <p className={styles.unavailableMessage} role="alert">
                El formulario no está disponible temporalmente.
              </p>
            )}

            <button
              type="submit"
              className={`${styles.submitButton} ${isPending ? styles.submitButtonPending : ""}`}
              disabled={isPending || !siteKey}
            >
              {isPending ? (
                <>
                  <span className={styles.srOnly}>Enviando mensaje...</span>
                  <span aria-hidden="true" className={styles.pendingText}>
                    <span>Enviando mensaje</span>
                    <span className={styles.loadingDots}>
                      <span className={styles.dot}>.</span>
                      <span className={styles.dot}>.</span>
                      <span className={styles.dot}>.</span>
                    </span>
                  </span>
                </>
              ) : (
                "Enviar mensaje"
              )}
            </button>
          </div>
        </form>

        {showSuccess && (
          <div className={styles.successOverlay} role="status">
            <div className={styles.successContent}>
              <div className={styles.successIcon} aria-hidden="true" />
              <h3 className={styles.successTitle}>Mensaje enviado</h3>
              <p className={styles.successMessage}>{state.message}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
