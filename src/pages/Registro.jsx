import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.jsx'
import Campo from '../components/Campo.jsx'
import MarcoAcceso from '../components/MarcoAcceso.jsx'
import { areasDePractica } from '../data/colegio.js'

const INICIAL = {
  nombre: '',
  correo: '',
  telefono: '',
  cedula: '',
  area: '',
  contrasena: '',
  confirmacion: '',
  acepta: false,
}

function validar(v) {
  const e = {}
  if (v.nombre.trim().length < 3) e.nombre = 'Escribe tu nombre completo.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.correo.trim())) {
    e.correo = 'Escribe un correo válido, por ejemplo nombre@dominio.com.'
  }
  if (v.telefono.replace(/\D/g, '').length !== 10) e.telefono = 'El teléfono debe tener 10 dígitos.'
  if (!/^\d{7,8}$/.test(v.cedula.trim())) e.cedula = 'La cédula profesional tiene 7 u 8 dígitos.'
  if (!v.area) e.area = 'Selecciona tu área de práctica.'
  if (v.contrasena.length < 8) e.contrasena = 'Usa al menos 8 caracteres.'
  if (v.confirmacion !== v.contrasena) e.confirmacion = 'Las contraseñas no coinciden.'
  if (!v.acepta) e.acepta = 'Acepta el tratamiento de tus datos para continuar.'
  return e
}

export default function Registro() {
  const { afiliada, registrar } = useAuth()
  const navigate = useNavigate()
  const [valores, setValores] = useState(INICIAL)
  const [errores, setErrores] = useState({})
  const [errorGeneral, setErrorGeneral] = useState('')
  const [enviando, setEnviando] = useState(false)

  if (afiliada && !enviando) return <Navigate to="/afiliadas" replace />

  const enlazar = (campo) => ({
    value: valores[campo],
    error: errores[campo],
    onChange: (e) => setValores((v) => ({ ...v, [campo]: e.target.value })),
  })

  async function alEnviar(evento) {
    evento.preventDefault()
    const encontrados = validar(valores)
    setErrores(encontrados)
    setErrorGeneral('')
    if (Object.keys(encontrados).length > 0) {
      setErrorGeneral('Revisa los campos marcados.')
      return
    }
    setEnviando(true)
    try {
      await registrar(valores)
      navigate('/afiliadas', { replace: true })
    } catch (e) {
      if (e.campo) setErrores({ [e.campo]: e.message })
      else setErrorGeneral(e.message)
      setEnviando(false)
    }
  }

  return (
    <MarcoAcceso
      titulo="Solicitar afiliación"
      entrada="Para abogadas tituladas. El Consejo Directivo revisa cada solicitud antes de activarla."
    >
      <form className="forma" onSubmit={alEnviar} noValidate>
        {errorGeneral && (
          <p className="aviso aviso--error" role="alert">
            {errorGeneral}
          </p>
        )}
        <Campo etiqueta="Nombre completo" autoComplete="name" {...enlazar('nombre')} />
        <div className="forma__par">
          <Campo
            etiqueta="Correo electrónico"
            type="email"
            autoComplete="email"
            {...enlazar('correo')}
          />
          <Campo
            etiqueta="Teléfono"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            ayuda="10 dígitos"
            {...enlazar('telefono')}
          />
        </div>
        <div className="forma__par">
          <Campo
            etiqueta="Cédula profesional"
            inputMode="numeric"
            ayuda="Licenciatura en Derecho"
            {...enlazar('cedula')}
          />
          <Campo etiqueta="Área de práctica" opciones={areasDePractica} {...enlazar('area')} />
        </div>
        <div className="forma__par">
          <Campo
            etiqueta="Contraseña"
            type="password"
            autoComplete="new-password"
            ayuda="Al menos 8 caracteres"
            {...enlazar('contrasena')}
          />
          <Campo
            etiqueta="Confirmar contraseña"
            type="password"
            autoComplete="new-password"
            {...enlazar('confirmacion')}
          />
        </div>
        <div className="casilla">
          <input
            id="acepta"
            type="checkbox"
            checked={valores.acepta}
            aria-invalid={errores.acepta ? 'true' : undefined}
            aria-describedby={errores.acepta ? 'acepta-error' : undefined}
            onChange={(e) => setValores((v) => ({ ...v, acepta: e.target.checked }))}
          />
          <label htmlFor="acepta">
            Acepto que el Colegio use mis datos para gestionar mi afiliación.
          </label>
          {errores.acepta && (
            <span className="error" id="acepta-error">
              {errores.acepta}
            </span>
          )}
        </div>
        <button className="boton boton--ancho" type="submit" disabled={enviando}>
          {enviando ? 'Enviando solicitud…' : 'Enviar solicitud'}
        </button>
      </form>
      <p className="acceso__alterna">
        ¿Ya tienes cuenta? <Link to="/afiliadas/ingresar">Ingresar</Link>
      </p>
    </MarcoAcceso>
  )
}
