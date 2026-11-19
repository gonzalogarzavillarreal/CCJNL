import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.jsx'
import Campo from '../components/Campo.jsx'
import MarcoAcceso from '../components/MarcoAcceso.jsx'

export default function IngresarAdmin() {
  const { admin, ingresarAdmin } = useAuth()
  const navigate = useNavigate()

  const [usuario, setUsuario] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [error, setError] = useState('')
  const [enviando, setEnviando] = useState(false)

  if (admin) return <Navigate to="/admin" replace />

  async function alEnviar(evento) {
    evento.preventDefault()
    if (!usuario.trim() || !contrasena) {
      setError('Escribe el usuario y la contraseña.')
      return
    }
    setError('')
    setEnviando(true)
    try {
      await ingresarAdmin(usuario, contrasena)
      navigate('/admin', { replace: true })
    } catch (e) {
      setError(e.message)
      setEnviando(false)
    }
  }

  return (
    <MarcoAcceso
      antetitulo="Administración del sitio"
      titulo="Acceso de administración"
      entrada="Ingresa para publicar convocatorias, próximos eventos y comunicados del Colegio."
    >
      <form className="forma" onSubmit={alEnviar} noValidate>
        {error && (
          <p className="aviso aviso--error" role="alert">
            {error}
          </p>
        )}
        <Campo
          etiqueta="Usuario"
          autoComplete="username"
          autoCapitalize="none"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />
        <Campo
          etiqueta="Contraseña"
          type="password"
          autoComplete="current-password"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
        />
        <button className="boton boton--ancho" type="submit" disabled={enviando}>
          {enviando ? 'Verificando…' : 'Ingresar al panel'}
        </button>
      </form>
    </MarcoAcceso>
  )
}
