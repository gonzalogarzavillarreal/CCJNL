import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.jsx'

export default function RutaProtegida({ children }) {
  const { afiliada, cargando } = useAuth()
  const ubicacion = useLocation()

  if (cargando) {
    return (
      <p className="contenedor cargando" role="status">
        Cargando tu espacio…
      </p>
    )
  }

  if (!afiliada) {
    return <Navigate to="/afiliadas/ingresar" replace state={{ desde: ubicacion.pathname }} />
  }

  return children
}
