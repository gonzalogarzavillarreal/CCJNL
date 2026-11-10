import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.jsx'

const SECCIONES = [
  { href: '/#colegio', texto: 'El Colegio' },
  { href: '/#trayectoria', texto: 'Trayectoria' },
  { href: '/#actividades', texto: 'Actividades' },
  { href: '/#contacto', texto: 'Contacto' },
]

export default function Encabezado() {
  const { afiliada, salir } = useAuth()
  const [abierto, setAbierto] = useState(false)
  const navigate = useNavigate()

  const cerrarMenu = () => setAbierto(false)

  async function cerrarSesion() {
    cerrarMenu()
    await salir()
    navigate('/')
  }

  return (
    <header className="encabezado">
      <div className="contenedor encabezado__fila">
        <Link to="/" className="marca" onClick={cerrarMenu} aria-label="Colegio de Ciencias Jurídicas en Nuevo León, inicio">
          <img src="/img/logo.jpg" alt="" width="52" height="52" />
          <span className="marca__texto">
            <span className="marca__nombre">Colegio de Ciencias Jurídicas</span>
            <span className="marca__lugar">en Nuevo León, A.C.</span>
          </span>
        </Link>

        <button
          type="button"
          className="encabezado__menu"
          aria-expanded={abierto}
          aria-controls="navegacion"
          onClick={() => setAbierto((v) => !v)}
        >
          {abierto ? 'Cerrar' : 'Menú'}
        </button>

        <nav id="navegacion" className={`nav ${abierto ? 'nav--abierta' : ''}`} aria-label="Principal">
          <ul className="nav__lista">
            {SECCIONES.map((s) => (
              <li key={s.href}>
                <a href={s.href} onClick={cerrarMenu}>
                  {s.texto}
                </a>
              </li>
            ))}
          </ul>
          <div className="nav__acciones">
            {afiliada ? (
              <>
                <Link className="boton" to="/afiliadas" onClick={cerrarMenu}>
                  Mi espacio
                </Link>
                <button type="button" className="boton boton--linea" onClick={cerrarSesion}>
                  Cerrar sesión
                </button>
              </>
            ) : (
              <Link className="boton" to="/afiliadas/ingresar" onClick={cerrarMenu}>
                Afiliadas
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}
