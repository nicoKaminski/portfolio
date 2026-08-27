export type ContactField = "nombre" | "email" | "mensaje";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message: string;
  invalidFields: ContactField[];
};

export const NOMBRE_MIN_LENGTH = 2;
export const NOMBRE_MAX_LENGTH = 80;

export const EMAIL_MAX_LENGTH = 254;

export const MENSAJE_MIN_LENGTH = 20;
export const MENSAJE_MAX_LENGTH = 3000;
