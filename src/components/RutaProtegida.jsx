import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.jsx'

// Con `admin` protege el panel de administración; sin él, el espacio de afiliadas.
export default function RutaProtegida({ children, admin: soloAdmin = false }) {
  const { afiliada, admin, cargando } = useAuth()
  const ubicacion = useLocation()

  if (cargando) {
    return (
      <p className="contenedor cargando" role="status">
        Cargando…
      </p>
    )
  }

  if (soloAdmin) {
    return admin ? children : <Navigate to="/admin/ingresar" replace />
  }

  if (!afiliada) {
    return <Navigate to="/afiliadas/ingresar" replace state={{ desde: ubicacion.pathname }} />
  }

  return children
}
