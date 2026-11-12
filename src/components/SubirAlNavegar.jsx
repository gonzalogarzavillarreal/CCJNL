import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Al cambiar de página, vuelve al inicio (salvo que el enlace apunte a una sección).
export default function SubirAlNavegar() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])
  return null
}
