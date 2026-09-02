interface BrandLogoProps {
  className?: string;
  size?: number;
}

export function BrandLogo({ className, size = 28 }: BrandLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      {/* Columna izquierda de N */}
      <rect x="4" y="6" width="4.5" height="28" rx="2" fill="var(--color-text)" />
      {/* Diagonal de N */}
      <path
        d="M6 7.5L20 32.5"
        stroke="var(--color-text)"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Columna compartida / central */}
      <rect x="17.5" y="6" width="4.5" height="28" rx="2" fill="var(--color-text)" />

      {/* Brazos de K con acento (--color-accent) */}
      <path
        d="M21 20.5L34.5 7"
        stroke="var(--color-accent)"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <path
        d="M23 18.5L35.5 33"
        stroke="var(--color-accent)"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
