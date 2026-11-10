// Íconos en línea; heredan el color del texto que los contiene.
const TRAZOS = {
  facebook: (
    <path
      fill="currentColor"
      stroke="none"
      d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.5V4.4c-.3 0-1.2-.1-2.200-.1-2.300 0-3.800 1.400-3.800 3.900v2.300H8v3h2.600V21z"
    />
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  correo: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.500 7 8.500 6.500L20.500 7" />
    </>
  ),
  afiliada: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4.500 20.500c.8-3.800 3.800-6 7.500-6s6.700 2.200 7.500 6" />
    </>
  ),
}

export default function Icono({ nombre }) {
  return (
    <svg
      className="icono"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {TRAZOS[nombre]}
    </svg>
  )
}
