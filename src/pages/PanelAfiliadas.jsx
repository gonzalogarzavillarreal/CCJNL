import { useState } from 'react'
import { useAuth } from '../auth/AuthContext.jsx'
import Campo from '../components/Campo.jsx'
import { actividades, areasDePractica, contacto } from '../data/colegio.js'

const PESTANAS = [
  { id: 'resumen', texto: 'Resumen' },
  { id: 'perfil', texto: 'Mis datos' },
  { id: 'sesiones', texto: 'Sesiones' },
  { id: 'directorio', texto: 'Directorio' },
]

const ESTADOS = {
  en_revision: { texto: 'Solicitud en revisión', clase: 'estado--revision' },
  activa: { texto: 'Afiliación activa', clase: 'estado--activa' },
}

const fechaLarga = new Intl.DateTimeFormat('es-MX', { dateStyle: 'long' })

function Resumen({ afiliada, irA }) {
  const reciente = actividades[0]
  return (
    <div className="panel__rejilla">
      <article className="tarjeta">
        <h2>Tu afiliación</h2>
        <dl className="ficha">
          <div>
            <dt>Estado</dt>
            <dd>{ESTADOS[afiliada.estado]?.texto ?? afiliada.estado}</dd>
          </div>
          <div>
            <dt>Solicitud enviada</dt>
            <dd>{fechaLarga.format(new Date(afiliada.fechaRegistro))}</dd>
          </div>
          <div>
            <dt>Cédula profesional</dt>
            <dd>{afiliada.cedula}</dd>
          </div>
          <div>
            <dt>Área de práctica</dt>
            <dd>{afiliada.area}</dd>
          </div>
        </dl>
        {afiliada.estado === 'en_revision' && (
          <p className="aviso">
            El Consejo Directivo revisará tu solicitud y te avisará por correo cuando quede
            activa.
          </p>
        )}
        <button type="button" className="boton boton--linea" onClick={() => irA('perfil')}>
          Actualizar mis datos
        </button>
      </article>

      <article className="tarjeta">
        <h2>Sesión más reciente</h2>
        <p className="tarjeta__fecha">{reciente.fecha}</p>
        <h3>{reciente.titulo}</h3>
        <p>{reciente.texto}</p>
        <button type="button" className="boton boton--linea" onClick={() => irA('sesiones')}>
          Ver todas las sesiones
        </button>
      </article>

      <article className="tarjeta tarjeta--ancha">
        <h2>Avisos del Consejo Directivo</h2>
        <p className="vacio">
          Aún no hay avisos. Cuando el Consejo publique una convocatoria o un comunicado,
          aparecerá aquí.
        </p>
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
      setMensaje({ tipo: 'exito', texto: 'Datos guardados.' })
    } catch (error) {
      setMensaje({ tipo: 'error', texto: error.message })
    } finally {
      setGuardando(false)
    }
  }

  return (
    <article className="tarjeta tarjeta--forma">
      <h2>Mis datos</h2>
      <form className="forma" onSubmit={alGuardar} noValidate>
        <Campo etiqueta="Nombre completo" autoComplete="name" {...enlazar('nombre')} />
        <Campo
          etiqueta="Correo electrónico"
          type="email"
          value={afiliada.correo}
          readOnly
          ayuda="Para cambiar tu correo, escribe al Colegio."
        />
        <div className="forma__par">
          <Campo etiqueta="Teléfono" type="tel" autoComplete="tel" {...enlazar('telefono')} />
          <Campo etiqueta="Cédula profesional" inputMode="numeric" {...enlazar('cedula')} />
        </div>
        <Campo etiqueta="Área de práctica" opciones={areasDePractica} {...enlazar('area')} />
        {mensaje && (
          <p className={`aviso aviso--${mensaje.tipo}`} role="status">
            {mensaje.texto}
          </p>
        )}
        <button className="boton" type="submit" disabled={guardando}>
          {guardando ? 'Guardando…' : 'Guardar cambios'}
        </button>
      </form>
    </article>
  )
}

function Sesiones() {
  return (
    <article className="tarjeta">
      <h2>Sesiones y actividades</h2>
      <ul className="sesiones">
        {actividades.map((a) => (
          <li key={a.titulo}>
            <img src={a.imagen} alt="" loading="lazy" />
            <div>
              <p className="tarjeta__fecha">{a.fecha}</p>
              <h3>{a.titulo}</h3>
              <p>{a.texto}</p>
            </div>
          </li>
        ))}
      </ul>
      <p className="tarjeta__nota">
        Para confirmar tu asistencia a una sesión, llama al{' '}
        <a href={`tel:${contacto.telefonoEnlace}`}>{contacto.telefono}</a> o escribe a{' '}
        <a href={`mailto:${contacto.correo}`}>{contacto.correo}</a>.
      </p>
    </article>
  )
}

function Directorio() {
  return (
    <article className="tarjeta">
      <h2>Directorio de afiliadas</h2>
      <p className="vacio">
        El directorio estará disponible próximamente. Aquí podrás buscar a tus colegas por
        nombre y área de práctica.
      </p>
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
          <div className="panel__saludo">
            <h1>Bienvenida, {primerNombre}</h1>
            {estado && <span className={`estado ${estado.clase}`}>{estado.texto}</span>}
          </div>
          <div className="pestanas" role="tablist" aria-label="Espacio de afiliadas">
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
