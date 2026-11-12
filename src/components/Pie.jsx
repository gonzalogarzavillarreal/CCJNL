import { Link } from 'react-router-dom'
import Icono from './Icono.jsx'
import { contacto } from '../data/colegio.js'

const ANIO_ACTUAL = new Date().getFullYear()

export default function Pie() {
  return (
    <footer className="pie">
      <div className="contenedor pie__cuerpo">
        <div className="pie__identidad">
          <div className="pie__sello">
            <img src="/img/logo.jpg" alt="" width="68" height="68" />
            <div>
              <p className="pie__siglas">{contacto.siglas} · Fundado en {contacto.fundacion}</p>
              <p className="pie__titulo">{contacto.nombreCompleto}</p>
            </div>
          </div>
          <p className="pie__descripcion">
            Asociación civil integrada exclusivamente por mujeres profesionales del Derecho.
            Dedicada a la actualización jurídica, la ética gremial, el liderazgo femenino y la
            justicia social en Nuevo León.
          </p>
          <div className="pie__sociales" aria-label="Redes sociales oficiales">
            <a href={contacto.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
              <Icono nombre="facebook" tamano={18} />
              <span>Facebook</span>
            </a>
            <a href={contacto.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
              <Icono nombre="instagram" tamano={18} />
              <span>Instagram</span>
            </a>
            <a href={contacto.tiktok} target="_blank" rel="noreferrer" aria-label="TikTok">
              <Icono nombre="tiktok" tamano={18} />
              <span>TikTok</span>
            </a>
          </div>
        </div>

        <nav className="pie__columna" aria-label="Secciones institucionales">
          <h2 className="pie__subtitulo">Institución</h2>
          <ul>
            <li>
              <a href="/#colegio">Identidad, misión y visión</a>
            </li>
            <li>
              <a href="/#vinculacion">Vinculación interinstitucional</a>
            </li>
            <li>
              <a href="/#trayectoria">Trayectoria desde 1995</a>
            </li>
            <li>
              <a href="/#actividades">Sesiones y actividades</a>
            </li>
          </ul>
        </nav>

        <nav className="pie__columna" aria-label="Colegiación y afiliadas">
          <h2 className="pie__subtitulo">Colegiación</h2>
          <ul>
            <li>
              <a href="/#afiliacion">Beneficios y requisitos</a>
            </li>
            <li>
              <Link to="/afiliadas/registro">Solicitar afiliación</Link>
            </li>
            <li>
              <Link to="/afiliadas/ingresar">Portal de afiliadas</Link>
            </li>
            <li>
              <a href="/#preguntas">Preguntas frecuentes</a>
            </li>
          </ul>
        </nav>

        <div className="pie__columna">
          <h2 className="pie__subtitulo">Contacto oficial</h2>
          <ul className="pie__contacto">
            <li>
              <Icono nombre="ubicacion" tamano={17} />
              <span>{contacto.ciudad}</span>
            </li>
            <li>
              <Icono nombre="telefono" tamano={17} />
              <a href={`tel:${contacto.telefonoEnlace}`}>{contacto.telefono}</a>
            </li>
            <li>
              <Icono nombre="correo" tamano={17} />
              <a href={`mailto:${contacto.correo}`}>
                colegiodecienciasjuridicasac
                <wbr />
                @gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="pie__base">
        <div className="contenedor pie__base-fila">
          <p>
            © {ANIO_ACTUAL} {contacto.nombreCompleto} Todos los derechos reservados.
          </p>
          <p>Consejo Directivo {contacto.consejoActual} · Monterrey, Nuevo León</p>
        </div>
      </div>
    </footer>
  )
}
