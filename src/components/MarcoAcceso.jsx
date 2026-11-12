import Icono from './Icono.jsx'
import { contacto } from '../data/colegio.js'

// Marco compartido por las pantallas de ingreso y solicitud de afiliación.
export default function MarcoAcceso({ titulo, entrada, children }) {
  return (
    <section className="acceso">
      <div className="contenedor acceso__fila">
        <aside className="acceso__lado">
          <div className="acceso__insignia">
            <img src="/img/logo.jpg" alt="" width="88" height="88" />
            <div>
              <p className="acceso__siglas">CCJNL · Desde {contacto.fundacion}</p>
              <p className="acceso__lema">Portal Institucional de Afiliadas</p>
            </div>
          </div>

          <p className="acceso__resumen">
            Un entorno digital diseñado para las abogadas colegiadas del Estado de Nuevo León:
            consulta convocatorias, gestiona tu expediente profesional y mantén comunicación directa
            con el Consejo Directivo {contacto.consejoActual}.
          </p>

          <ul className="acceso__puntos">
            <li>
              <Icono nombre="verificar" tamano={18} />
              <span>Agenda de sesiones ordinarias y sedes oficiales</span>
            </li>
            <li>
              <Icono nombre="verificar" tamano={18} />
              <span>Expediente de colegiación y cédula verificada</span>
            </li>
            <li>
              <Icono nombre="verificar" tamano={18} />
              <span>Avisos y comunicados de Secretaría</span>
            </li>
          </ul>

          <div className="acceso__soporte">
            <p>¿Necesitas asistencia con tu registro?</p>
            <a href={`mailto:${contacto.correo}`}>{contacto.correo}</a>
          </div>
        </aside>

        <div className="acceso__forma">
          <p className="antetitulo">Espacio de Colegiadas</p>
          <h1>{titulo}</h1>
          <p className="acceso__entrada">{entrada}</p>
          {children}
        </div>
      </div>
    </section>
  )
}
