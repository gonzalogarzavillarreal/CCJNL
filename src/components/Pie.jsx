import { Link } from 'react-router-dom'
import Icono from './Icono.jsx'
import { contacto } from '../data/colegio.js'

export default function Pie() {
  return (
    <footer className="pie">
      <div className="contenedor pie__fila">
        <div className="pie__marca">
          <img src="/img/logo.jpg" alt="" width="64" height="64" />
          <p>
            Colegio de Ciencias Jurídicas en Nuevo León, A.C.
            <br />
            Abogadas colegiadas desde 1995.
          </p>
        </div>
        <ul className="pie__enlaces">
          <li>
            <a href={contacto.facebook} target="_blank" rel="noreferrer">
              <Icono nombre="facebook" />
              Facebook
            </a>
          </li>
          <li>
            <a href={contacto.instagram} target="_blank" rel="noreferrer">
              <Icono nombre="instagram" />
              Instagram
            </a>
          </li>
          <li>
            <a href={`mailto:${contacto.correo}`}>
              <Icono nombre="correo" />
              Correo
            </a>
          </li>
          <li>
            <Link to="/afiliadas/ingresar">
              <Icono nombre="afiliada" />
              Afiliadas
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  )
}
