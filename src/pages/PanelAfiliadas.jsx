import { useState } from 'react'
import { useAuth } from '../auth/AuthContext.jsx'
import Campo from '../components/Campo.jsx'
import Icono from '../components/Icono.jsx'
import { actividades, areasDePractica, avisosConsejo, contacto } from '../data/colegio.js'

const PESTANAS = [
  { id: 'resumen', texto: 'Resumen y constancia' },
  { id: 'perfil', texto: 'Expediente profesional' },
  { id: 'sesiones', texto: 'Sesiones y agenda' },
  { id: 'directorio', texto: 'Directorio colegiado' },
]

const ESTADOS = {
  en_revision: { texto: 'Solicitud en validación', clase: 'estado--revision' },
  activa: { texto: 'Colegiada activa', clase: 'estado--activa' },
}

const fechaLarga = new Intl.DateTimeFormat('es-MX', { dateStyle: 'long' })

function Resumen({ afiliada, irA }) {
  const reciente = actividades[0]
  const folioCorto = afiliada.id.slice(0, 8).toUpperCase()

  return (
    <div className="panel__rejilla">
      <article className="tarjeta tarjeta--credencial">
        <div className="credencial-encabezado">
          <img src="/img/logo.jpg" alt="" width="48" height="48" />
          <div>
            <p className="credencial-encabezado__siglas">
              {contacto.siglas} · Consejo {contacto.consejoActual}
            </p>
            <h2>Ficha de Colegiación</h2>
          </div>
        </div>

        <dl className="ficha">
          <div>
            <dt>Titular</dt>
            <dd className="ficha__destacado">Lic. {afiliada.nombre}</dd>
          </div>
          <div>
            <dt>Folio de registro</dt>
            <dd>CCJNL-{folioCorto}</dd>
          </div>
          <div>
            <dt>Cédula profesional</dt>
            <dd>{afiliada.cedula}</dd>
          </div>
          <div>
            <dt>Especialidad declarada</dt>
            <dd>{afiliada.area}</dd>
          </div>
          <div>
            <dt>Estatus estatutario</dt>
            <dd>{ESTADOS[afiliada.estado]?.texto ?? afiliada.estado}</dd>
          </div>
          <div>
            <dt>Fecha de solicitud</dt>
            <dd>{fechaLarga.format(new Date(afiliada.fechaRegistro))}</dd>
          </div>
        </dl>

        {afiliada.estado === 'en_revision' && (
          <p className="aviso">
            Tu expediente fue recibido correctamente. La Secretaría y el Consejo Directivo
            verificarán tus datos profesionales y te notificarán por correo electrónico cuando tu
            membresía quede activa.
          </p>
        )}

        <button type="button" className="boton boton--linea" onClick={() => irA('perfil')}>
          Actualizar mi expediente
        </button>
      </article>

      <article className="tarjeta">
        <p className="antetitulo">Actividad destacada</p>
        <h2>{reciente.titulo}</h2>
        <p className="tarjeta__fecha">
          <Icono nombre="calendario" tamano={15} /> {reciente.fecha}
          {reciente.horario ? ` · ${reciente.horario}` : ''}
        </p>
        <p>{reciente.texto}</p>
        <p className="tarjeta__nota">
          <Icono nombre="ubicacion" tamano={15} /> {reciente.sede}
        </p>
        <div className="tarjeta__acciones">
          <button type="button" className="boton boton--linea" onClick={() => irA('sesiones')}>
            Ver agenda completa
          </button>
          <a className="boton" href={`tel:${contacto.telefonoEnlace}`}>
            Confirmar asistencia
          </a>
        </div>
      </article>

      <article className="tarjeta tarjeta--ancha">
        <h2>Comunicados del Consejo Directivo {contacto.consejoActual}</h2>
        <ul className="comunicados">
          {avisosConsejo.map((aviso) => (
            <li key={aviso.id} className="comunicado">
              <div className="comunicado__meta">
                <span className="comunicado__etiqueta">{aviso.etiqueta}</span>
                <span>{aviso.fecha}</span>
              </div>
              <h3>{aviso.titulo}</h3>
              <p>{aviso.texto}</p>
            </li>
          ))}
        </ul>
      </article>
    </div>
  )
}

function Perfil({ afiliada }) {
  const { actualizarPerfil } = useAuth()
  const [valores, setValores] = useState({
    nombre: afiliada.nombre,
    telefono: afiliada.telefono,
    cedula: afiliada.cedula,
    area: afiliada.area,
  })
  const [errores, setErrores] = useState({})
  const [mensaje, setMensaje] = useState(null)
  const [guardando, setGuardando] = useState(false)

  const enlazar = (campo) => ({
    value: valores[campo],
    error: errores[campo],
    onChange: (e) => {
      setMensaje(null)
      setValores((v) => ({ ...v, [campo]: e.target.value }))
    },
  })

  async function alGuardar(evento) {
    evento.preventDefault()
    const e = {}
    if (valores.nombre.trim().length < 3) e.nombre = 'Escribe tu nombre completo.'
    if (valores.telefono.replace(/\D/g, '').length !== 10) {
      e.telefono = 'El teléfono debe tener 10 dígitos.'
    }
    if (!/^\d{7,8}$/.test(valores.cedula.trim())) {
      e.cedula = 'La cédula profesional tiene 7 u 8 dígitos.'
    }
    if (!valores.area) e.area = 'Selecciona tu área de práctica.'
    setErrores(e)
    if (Object.keys(e).length > 0) return

    setGuardando(true)
    try {
      await actualizarPerfil(valores)
      setMensaje({ tipo: 'exito', texto: 'Tu expediente profesional ha sido actualizado.' })
    } catch (error) {
      setMensaje({ tipo: 'error', texto: error.message })
    } finally {
      setGuardando(false)
    }
  }

  return (
    <article className="tarjeta tarjeta--forma">
      <div>
        <p className="antetitulo">Padrón de Socias</p>
        <h2>Expediente profesional</h2>
        <p className="tarjeta__nota">
          Mantén al día tus datos de contacto y especialidad para recibir convocatorias y participar
          en las comisiones de estudio del Colegio.
        </p>
      </div>
      <form className="forma" onSubmit={alGuardar} noValidate>
        <Campo etiqueta="Nombre completo (como aparece en tu título)" autoComplete="name" {...enlazar('nombre')} />
        <Campo
          etiqueta="Correo electrónico registrado"
          type="email"
          value={afiliada.correo}
          readOnly
          ayuda="Para solicitar cambio de correo institucional, escribe a la Secretaría del Colegio."
        />
        <div className="forma__par">
          <Campo etiqueta="Teléfono móvil (10 dígitos)" type="tel" autoComplete="tel" {...enlazar('telefono')} />
          <Campo etiqueta="Cédula profesional" inputMode="numeric" {...enlazar('cedula')} />
        </div>
        <Campo etiqueta="Rama principal de práctica jurídica" opciones={areasDePractica} {...enlazar('area')} />
        {mensaje && (
          <p className={`aviso aviso--${mensaje.tipo}`} role="status">
            {mensaje.texto}
          </p>
        )}
        <button className="boton" type="submit" disabled={guardando}>
          {guardando ? 'Guardando cambios…' : 'Guardar expediente'}
        </button>
      </form>
    </article>
  )
}

function Sesiones() {
  return (
    <article className="tarjeta">
      <div>
        <p className="antetitulo">Registro Académico e Institucional</p>
        <h2>Sesiones ordinarias y actividades del Colegio</h2>
      </div>
      <ul className="sesiones">
        {actividades.map((a) => (
          <li key={a.id}>
            <img src={a.imagen} alt="" loading="lazy" />
            <div className="sesiones__info">
              <p className="tarjeta__fecha">
                {a.categoria} · {a.fecha} {a.horario ? `(${a.horario})` : ''}
              </p>
              <h3>{a.titulo}</h3>
              <p>{a.texto}</p>
              <p className="sesiones__sede">
                <Icono nombre="ubicacion" tamano={14} /> {a.sede}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <p className="tarjeta__nota">
        Para confirmar tu asistencia protocolaria a la próxima sesión ordinaria, comunícate al{' '}
        <a href={`tel:${contacto.telefonoEnlace}`}>{contacto.telefono}</a> o escribe a{' '}
        <a href={`mailto:${contacto.correo}`}>{contacto.correo}</a>.
      </p>
    </article>
  )
}

function Directorio() {
  return (
    <article className="tarjeta">
      <div>
        <p className="antetitulo">Red Gremial</p>
        <h2>Directorio de colegiadas por especialidad</h2>
      </div>
      <div className="vacio">
        <p>
          <strong>Padrón digital en proceso de integración ({contacto.consejoActual}).</strong>
        </p>
        <p>
          Una vez concluida la validación de expedientes activos por parte de la Secretaría, en esta
          sección podrás consultar a tus colegas por rama de especialidad para colaboración
          profesional y referenciación ética.
        </p>
      </div>
    </article>
  )
}

export default function PanelAfiliadas() {
  const { afiliada } = useAuth()
  const [pestana, setPestana] = useState('resumen')
  const estado = ESTADOS[afiliada.estado]
  const primerNombre = afiliada.nombre.split(' ')[0]

  return (
    <section className="panel">
      <div className="panel__cabeza">
        <div className="contenedor">
          <p className="antetitulo">Portal de Colegiadas · {contacto.siglas}</p>
          <div className="panel__saludo">
            <h1>Bienvenida, Lic. {primerNombre}</h1>
            {estado && <span className={`estado ${estado.clase}`}>{estado.texto}</span>}
          </div>
          <div className="pestanas" role="tablist" aria-label="Secciones del espacio de afiliadas">
            {PESTANAS.map((p) => (
              <button
                key={p.id}
                type="button"
                role="tab"
                id={`pestana-${p.id}`}
                aria-selected={pestana === p.id}
                aria-controls="panel-contenido"
                className="pestana"
                onClick={() => setPestana(p.id)}
              >
                {p.texto}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        className="contenedor panel__cuerpo"
        id="panel-contenido"
        role="tabpanel"
        aria-labelledby={`pestana-${pestana}`}
      >
        {pestana === 'resumen' && <Resumen afiliada={afiliada} irA={setPestana} />}
        {pestana === 'perfil' && <Perfil afiliada={afiliada} />}
        {pestana === 'sesiones' && <Sesiones />}
        {pestana === 'directorio' && <Directorio />}
      </div>
    </section>
  )
}
