"use server";

import nodemailer from "nodemailer";
import {
  ContactField,
  ContactFormState,
  EMAIL_MAX_LENGTH,
  MENSAJE_MAX_LENGTH,
  MENSAJE_MIN_LENGTH,
  NOMBRE_MAX_LENGTH,
  NOMBRE_MIN_LENGTH,
} from "@/shared/contact";

const SUCCESS_MESSAGE =
  "¡Gracias! Tu mensaje fue enviado. Te respondo apenas pueda.";
const GENERIC_ERROR_MESSAGE =
  "No pude enviar el mensaje. Revisá los datos e intentá nuevamente.";
const TURNSTILE_ERROR_MESSAGE =
  "No pude verificar el envío. Intentá nuevamente.";

const ALLOWED_FIELDS = new Set([
  "nombre",
  "email",
  "mensaje",
  "website",
  "turnstileToken",
]);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendContactMessage(
  _previousState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  for (const key of formData.keys()) {
    if (key.startsWith("$ACTION_")) {
      continue;
    }

    if (!ALLOWED_FIELDS.has(key)) {
      return {
        status: "error",
        message: GENERIC_ERROR_MESSAGE,
        invalidFields: [],
      };
    }

    if (formData.getAll(key).length !== 1) {
      return {
        status: "error",
        message: GENERIC_ERROR_MESSAGE,
        invalidFields: [],
      };
    }
  }

  const rawNombre = formData.get("nombre");
  const rawEmail = formData.get("email");
  const rawMensaje = formData.get("mensaje");
  const rawWebsite = formData.get("website");
  const rawTurnstileToken = formData.get("turnstileToken");

  if (
    typeof rawNombre !== "string" ||
    typeof rawEmail !== "string" ||
    typeof rawMensaje !== "string" ||
    (rawWebsite !== null && typeof rawWebsite !== "string") ||
    (rawTurnstileToken !== null && typeof rawTurnstileToken !== "string")
  ) {
    return {
      status: "error",
      message: GENERIC_ERROR_MESSAGE,
      invalidFields: [],
    };
  }

  const website = (rawWebsite ?? "").trim();

  // Honeypot check
  if (website.length > 0) {
    return {
      status: "success",
      message: SUCCESS_MESSAGE,
      invalidFields: [],
    };
  }

  const nombre = rawNombre.trim();
  const email = rawEmail.trim();
  const mensaje = rawMensaje.trim();
  const turnstileToken = (rawTurnstileToken ?? "").trim();

  const invalidFields: ContactField[] = [];

  if (nombre.length < NOMBRE_MIN_LENGTH || nombre.length > NOMBRE_MAX_LENGTH) {
    invalidFields.push("nombre");
  }

  if (
    email.length === 0 ||
    email.length > EMAIL_MAX_LENGTH ||
    !EMAIL_REGEX.test(email)
  ) {
    invalidFields.push("email");
  }

  if (
    mensaje.length < MENSAJE_MIN_LENGTH ||
    mensaje.length > MENSAJE_MAX_LENGTH
  ) {
    invalidFields.push("mensaje");
  }

  if (invalidFields.length > 0) {
    return {
      status: "error",
      message: GENERIC_ERROR_MESSAGE,
      invalidFields,
    };
  }

  const turnstileSecretKey = process.env.TURNSTILE_SECRET_KEY;

  if (!turnstileSecretKey || !turnstileToken) {
    return {
      status: "error",
      message: TURNSTILE_ERROR_MESSAGE,
      invalidFields: [],
    };
  }

  try {
    const turnstileFormData = new FormData();
    turnstileFormData.append("secret", turnstileSecretKey);
    turnstileFormData.append("response", turnstileToken);

    const turnstileResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body: turnstileFormData,
      }
    );

    if (!turnstileResponse.ok) {
      return {
        status: "error",
        message: TURNSTILE_ERROR_MESSAGE,
        invalidFields: [],
      };
    }

    const turnstileData = (await turnstileResponse.json()) as {
      success?: boolean;
    };

    if (turnstileData?.success !== true) {
      return {
        status: "error",
        message: TURNSTILE_ERROR_MESSAGE,
        invalidFields: [],
      };
    }
  } catch {
    return {
      status: "error",
      message: TURNSTILE_ERROR_MESSAGE,
      invalidFields: [],
    };
  }

  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_PASS;

  if (!gmailUser || !gmailPass) {
    return {
      status: "error",
      message: GENERIC_ERROR_MESSAGE,
      invalidFields: [],
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    await transporter.sendMail({
      from: `Portfolio Nico Kaminski <${gmailUser}>`,
      to: gmailUser,
      replyTo: email,
      subject: "Nuevo contacto desde Portfolio",
      text: `Nombre: ${nombre}\nEmail: ${email}\n\nMensaje:\n${mensaje}`,
    });

    return {
      status: "success",
      message: SUCCESS_MESSAGE,
      invalidFields: [],
    };
  } catch {
    return {
      status: "error",
      message: GENERIC_ERROR_MESSAGE,
      invalidFields: [],
    };
  }
}
