import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.jsx'
import { contacto } from '../data/colegio.js'
import Icono from './Icono.jsx'

const SECCIONES = [
  { href: '/#colegio', texto: 'El Colegio' },
  { href: '/#vinculacion', texto: 'Vinculación' },
  { href: '/#trayectoria', texto: 'Trayectoria' },
  { href: '/#actividades', texto: 'Actividades' },
  { href: '/#afiliacion', texto: 'Colegiación' },
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
    <>
      <div className="franja-superior">
        <div className="contenedor franja-superior__fila">
          <p className="franja-superior__lema">
            <span>{contacto.siglas}</span>
            <span className="separador" aria-hidden="true">
              ·
            </span>
            <span>Asociación Civil de mujeres juristas fundada en {contacto.fundacion}</span>
            <span className="separador franja-superior__extra" aria-hidden="true">
              ·
            </span>
            <span className="franja-superior__extra">Monterrey, N.L.</span>
          </p>
          <div className="franja-superior__enlaces">
            <a href={`tel:${contacto.telefonoEnlace}`}>
              <Icono nombre="telefono" tamano={15} />
              <span>{contacto.telefono}</span>
            </a>
            <a
              href={contacto.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram del Colegio"
            >
              <Icono nombre="instagram" tamano={15} />
              <span>{contacto.usuarioRedes}</span>
            </a>
            <a
              href={contacto.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook del Colegio"
            >
              <Icono nombre="facebook" tamano={15} />
            </a>
            <a
              href={contacto.tiktok}
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok del Colegio"
            >
              <Icono nombre="tiktok" tamano={15} />
            </a>
          </div>
        </div>
      </div>

      <header className="encabezado">
        <div className="contenedor encabezado__fila">
        <Link
          to="/"
          className="marca"
          onClick={cerrarMenu}
          aria-label="Colegio de Ciencias Jurídicas en Nuevo León, A.C. — Ir al inicio"
        >
          <span className="marca__escudo">
            <img src="/img/logo.jpg" alt="" width="54" height="54" />
          </span>
          <span className="marca__texto">
            <span className="marca__siglas">CCJNL · Desde 1995</span>
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
                  <Icono nombre="afiliada" tamano={17} />
                  Mi espacio
                </Link>
                <button type="button" className="boton boton--linea" onClick={cerrarSesion}>
                  Salir
                </button>
              </>
            ) : (
              <>
                <Link className="boton boton--linea" to="/afiliadas/ingresar" onClick={cerrarMenu}>
                  Ingresar
                </Link>
                <Link className="boton" to="/afiliadas/registro" onClick={cerrarMenu}>
                  Afiliarme
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
      </header>
    </>
  )
}
