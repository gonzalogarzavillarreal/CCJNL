import { useId } from 'react'

// Campo de formulario con etiqueta, ayuda y error enlazados para lectores de pantalla.
export default function Campo({ etiqueta, ayuda, error, opciones, ...props }) {
  const id = useId()
  const descripcion = [ayuda && `${id}-ayuda`, error && `${id}-error`].filter(Boolean).join(' ')
  const comunes = {
    id,
    'aria-invalid': error ? 'true' : undefined,
    'aria-describedby': descripcion || undefined,
    ...props,
  }

  return (
    <div className="campo">
      <label htmlFor={id}>{etiqueta}</label>
      {opciones ? (
        <select {...comunes}>
          <option value="">Selecciona una opción</option>
          {opciones.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : (
        <input {...comunes} />
      )}
      {ayuda && !error && (
        <span className="ayuda" id={`${id}-ayuda`}>
          {ayuda}
        </span>
      )}
      {error && (
        <span className="error" id={`${id}-error`}>
          {error}
        </span>
      )}
    </div>
  )
}
