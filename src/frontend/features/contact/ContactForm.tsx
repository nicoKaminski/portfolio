"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import Script from "next/script";
import {
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

export function ContactForm({ action, siteKey }: ContactFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState);
  const [dismissedSuccessState, setDismissedSuccessState] =
    useState<ContactFormState | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const showSuccess =
    state.status === "success" && state !== dismissedSuccessState;

  useEffect(() => {
    if (state.status === "success" && state !== dismissedSuccessState) {
      const timer = setTimeout(() => {
        setDismissedSuccessState(state);
        formRef.current?.reset();
        const turnstileWindow = window as TurnstileWindow;
        turnstileWindow.turnstile?.reset();
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    } else if (state.status === "error" && state.invalidFields.length === 0) {
      const turnstileWindow = window as TurnstileWindow;
      turnstileWindow.turnstile?.reset();
    }
  }, [state, dismissedSuccessState]);

  const isNombreInvalid = state.invalidFields.includes("nombre");
  const isEmailInvalid = state.invalidFields.includes("email");
  const isMensajeInvalid = state.invalidFields.includes("mensaje");

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
            required
            minLength={NOMBRE_MIN_LENGTH}
            maxLength={NOMBRE_MAX_LENGTH}
            disabled={isPending || !siteKey}
            aria-invalid={isNombreInvalid ? "true" : undefined}
            aria-describedby={isNombreInvalid ? "nombre-error" : undefined}
          />
          {isNombreInvalid && (
            <span id="nombre-error" className={styles.fieldError}>
              Revisá este campo.
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
            required
            maxLength={EMAIL_MAX_LENGTH}
            disabled={isPending || !siteKey}
            aria-invalid={isEmailInvalid ? "true" : undefined}
            aria-describedby={isEmailInvalid ? "email-error" : undefined}
          />
          {isEmailInvalid && (
            <span id="email-error" className={styles.fieldError}>
              Revisá este campo.
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
            required
            minLength={MENSAJE_MIN_LENGTH}
            maxLength={MENSAJE_MAX_LENGTH}
            disabled={isPending || !siteKey}
            aria-invalid={isMensajeInvalid ? "true" : undefined}
            aria-describedby={isMensajeInvalid ? "mensaje-error" : undefined}
          />
          {isMensajeInvalid && (
            <span id="mensaje-error" className={styles.fieldError}>
              Revisá este campo.
            </span>
          )}
        </div>

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
          className={styles.submitButton}
          disabled={isPending || !siteKey}
        >
          {isPending ? "Enviando..." : "Enviar mensaje"}
        </button>
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
