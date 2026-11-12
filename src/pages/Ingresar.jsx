import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.jsx'
import Campo from '../components/Campo.jsx'
import MarcoAcceso from '../components/MarcoAcceso.jsx'

export default function Ingresar() {
  const { afiliada, ingresar } = useAuth()
  const navigate = useNavigate()
  const destino = useLocation().state?.desde ?? '/afiliadas'

  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [error, setError] = useState('')
  const [enviando, setEnviando] = useState(false)

  if (afiliada) return <Navigate to={destino} replace />

  async function alEnviar(evento) {
    evento.preventDefault()
    if (!correo.trim() || !contrasena) {
      setError('Escribe tu correo y tu contraseña.')
      return
    }
    setError('')
    setEnviando(true)
    try {
      await ingresar(correo, contrasena)
      navigate(destino, { replace: true })
    } catch (e) {
      setError(e.message)
      setEnviando(false)
    }
  }

  return (
    <MarcoAcceso
      titulo="Acceso al portal"
      entrada="Ingresa con el correo electrónico registrado en tu expediente de afiliación."
    >
      <form className="forma" onSubmit={alEnviar} noValidate>
        {error && (
          <p className="aviso aviso--error" role="alert">
            {error}
          </p>
        )}
        <Campo
          etiqueta="Correo electrónico"
          type="email"
          autoComplete="email"
          placeholder="licenciada@ejemplo.com"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
        <Campo
          etiqueta="Contraseña"
          type="password"
          autoComplete="current-password"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
        />
        <button className="boton boton--ancho" type="submit" disabled={enviando}>
          {enviando ? 'Verificando credenciales…' : 'Ingresar a mi espacio'}
        </button>
      </form>
      <p className="acceso__alterna">
        ¿Aún no eres integrante del Colegio?{' '}
        <Link to="/afiliadas/registro">Inicia tu solicitud de afiliación</Link>
      </p>
    </MarcoAcceso>
  )
}
