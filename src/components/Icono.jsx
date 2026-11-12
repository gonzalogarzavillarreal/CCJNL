// Íconos institucionales y de interfaz; heredan el color del texto que los contiene.
const TRAZOS = {
  facebook: (
    <path
      fill="currentColor"
      stroke="none"
      d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H8v3h2.6V21z"
    />
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  tiktok: (
    <path
      fill="currentColor"
      stroke="none"
      d="M16.6 5.8A4.1 4.1 0 0 1 15.2 3h-2.7v11.3a2.4 2.4 0 1 1-1.7-2.3V9.2a5.2 5.2 0 1 0 4.4 5.1V8.6a6.8 6.8 0 0 0 3.8 1.2V7.1c-.9 0-1.8-.5-2.4-1.3Z"
    />
  ),
  correo: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 7 8.5 6.5L20.5 7" />
    </>
  ),
  telefono: (
    <path d="M5.4 4h2.9l1.3 3.7-1.8 1.4a12.6 12.6 0 0 0 5.1 5.1l1.4-1.8L18 13.7v2.9a1.8 1.8 0 0 1-2 1.8A14.6 14.6 0 0 1 3.6 6a1.8 1.8 0 0 1 1.8-2Z" />
  ),
  ubicacion: (
    <>
      <path d="M12 21s-6.5-5.6-6.5-10.5a6.5 6.5 0 1 1 13 0C18.5 15.4 12 21 12 21Z" />
      <circle cx="12" cy="10.5" r="2.3" />
    </>
  ),
  calendario: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M8 3.5v3M16 3.5v3M3.5 9.5h17" />
    </>
  ),
  reloj: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  afiliada: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 20.5c.8-3.8 3.8-6 7.5-6s6.7 2.2 7.5 6" />
    </>
  ),
  balanza: (
    <>
      <path d="M12 3v17M8 20h8M5 7h14" />
      <path d="M5.5 7 3 13h5L5.5 7ZM18.5 7 16 13h5L18.5 7Z" />
      <path d="M3 13a2.5 2.5 0 0 0 5 0M16 13a2.5 2.5 0 0 0 5 0" />
    </>
  ),
  libro: (
    <>
      <path d="M12 6.2C10.4 5 8.2 4.5 5.5 4.5A1.5 1.5 0 0 0 4 6v11.5c0 .8.7 1.5 1.5 1.5 2.7 0 4.9.5 6.5 1.8 1.6-1.3 3.8-1.8 6.5-1.8.8 0 1.5-.7 1.5-1.5V6c0-.8-.7-1.5-1.5-1.5-2.7 0-4.9.5-6.5 1.7Z" />
      <path d="M12 6.2V20.8" />
    </>
  ),
  columna: (
    <>
      <path d="M3.5 7 12 3l8.5 4H3.5ZM5 20h14M6.5 17h11" />
      <path d="M7.5 7v10M12 7v10M16.5 7v10" />
    </>
  ),
  escudo: (
    <>
      <path d="M12 3 5 6v5.5C5 16.2 8 19.8 12 21c4-1.2 7-4.8 7-9.5V6l-7-3Z" />
      <path d="m9.2 12 2 2 3.8-4" />
    </>
  ),
  convenio: (
    <>
      <path d="M8 11.5 11 8.5a2.8 2.8 0 0 1 4 0l3 3a2.8 2.8 0 0 1 0 4l-3.5 3.5a2.8 2.8 0 0 1-4 0L6 14.5a2.8 2.8 0 0 1 0-4L8.5 8" />
      <path d="m10.5 13.5 3-3" />
    </>
  ),
  red: (
    <>
      <circle cx="12" cy="6" r="2.5" />
      <circle cx="6" cy="17" r="2.5" />
      <circle cx="18" cy="17" r="2.5" />
      <path d="m10.7 8.2-3.4 6.5M13.3 8.2l3.4 6.5M8.5 17h7" />
    </>
  ),
  verificar: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m8.6 12.2 2.3 2.3 4.6-4.8" />
    </>
  ),
  credencial: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.2" />
      <circle cx="8.5" cy="11" r="2.1" />
      <path d="M5.8 16.2c.6-1.6 1.6-2.3 2.7-2.3s2.1.7 2.7 2.3M13.5 10h4.5M13.5 13.5h3.2" />
    </>
  ),
  flecha: (
    <>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  ampliar: (
    <>
      <path d="M15 4h5v5M9 20H4v-5M20 4l-6 6M4 20l6-6" />
    </>
  ),
  cerrar: (
    <>
      <path d="M6 6l12 12M18 6 6 18" />
    </>
  ),
}

export default function Icono({ nombre, tamano = 20 }) {
  return (
    <svg
      className="icono"
      viewBox="0 0 24 24"
      width={tamano}
      height={tamano}
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
