import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.jsx'
import Campo from '../components/Campo.jsx'
import Icono from '../components/Icono.jsx'
import usePublicaciones from '../hooks/usePublicaciones.js'
import { contacto } from '../data/colegio.js'
import {
  TIPOS,
  TIPO_COMUNICADO,
  actualizar,
  crear,
  eliminar,
  esProxima,
  fechaLegible,
  hoyISO,
} from '../services/publicacionesService.js'

const FILTROS = [
  { id: 'todas', texto: 'Todas', prueba: () => true },
  { id: 'proximas', texto: 'Próximas', prueba: (p) => p.tipo !== TIPO_COMUNICADO && esProxima(p) },
  { id: 'pasadas', texto: 'Pasadas', prueba: (p) => p.tipo !== TIPO_COMUNICADO && !esProxima(p) },
  { id: 'comunicados', texto: 'Comunicados', prueba: (p) => p.tipo === TIPO_COMUNICADO },
  { id: 'ocultas', texto: 'Ocultas', prueba: (p) => !p.publicada },
]

const VACIA = {
  tipo: 'Convocatoria',
  titulo: '',
  texto: '',
  fecha: '',
  horario: '',
  sede: '',
  imagen: '',
  publicada: true,
}

const LADO_MAXIMO = 1280

// Reduce la imagen antes de guardarla: el almacenamiento del navegador es limitado.
async function reducirImagen(archivo) {
  const mapa = await createImageBitmap(archivo)
  const escala = Math.min(1, LADO_MAXIMO / Math.max(mapa.width, mapa.height))
  const lienzo = document.createElement('canvas')
  lienzo.width = Math.round(mapa.width * escala)
  lienzo.height = Math.round(mapa.height * escala)
  lienzo.getContext('2d').drawImage(mapa, 0, 0, lienzo.width, lienzo.height)
  mapa.close()
  return lienzo.toDataURL('image/jpeg', 0.82)
}

// Ordena por fecha del evento, la más lejana en el futuro primero; los comunicados, por alta.
const claveDeOrden = (p) => p.fecha || p.creada.slice(0, 10)

function Formulario({ inicial, alTerminar }) {
  const editando = Boolean(inicial)
  const [valores, setValores] = useState(() => (inicial ? { ...VACIA, ...inicial } : VACIA))
  const [errores, setErrores] = useState({})
  const [fallo, setFallo] = useState('')
  const [guardando, setGuardando] = useState(false)

  const esComunicado = valores.tipo === TIPO_COMUNICADO

  const fijar = (campo, valor) => {
    setFallo('')
    setValores((v) => ({ ...v, [campo]: valor }))
  }
  const enlazar = (campo) => ({
    value: valores[campo],
    error: errores[campo],
    onChange: (e) => fijar(campo, e.target.value),
  })

  async function alElegirImagen(evento) {
    const archivo = evento.target.files[0]
    evento.target.value = ''
    if (!archivo) return
    try {
      fijar('imagen', await reducirImagen(archivo))
      setErrores((e) => ({ ...e, imagen: undefined }))
    } catch {
      setErrores((e) => ({ ...e, imagen: 'No pudimos leer el archivo. Usa una imagen JPG o PNG.' }))
    }
  }

  async function alGuardar(evento) {
    evento.preventDefault()
    const e = {}
    if (!valores.tipo) e.tipo = 'Selecciona el tipo de publicación.'
    if (valores.titulo.trim().length < 5) e.titulo = 'Escribe un título de al menos 5 caracteres.'
    if (valores.texto.trim().length < 10) e.texto = 'Describe la publicación en al menos una frase.'
    if (!esComunicado && !valores.fecha) e.fecha = 'Indica la fecha de la actividad.'
    setErrores(e)
    if (Object.keys(e).length > 0) return

    const datos = esComunicado
      ? { ...valores, fecha: '', horario: '', sede: '', imagen: '' }
      : valores

    setGuardando(true)
    try {
      if (editando) await actualizar(inicial.id, datos)
      else await crear(datos)
      alTerminar(editando ? 'Los cambios se guardaron.' : 'La publicación fue creada.')
    } catch (error) {
      setFallo(error.message)
      setGuardando(false)
    }
  }

  return (
    <article className="tarjeta tarjeta--forma">
      <div>
        <p className="antetitulo">{editando ? 'Editar publicación' : 'Nueva publicación'}</p>
        <h2>{editando ? inicial.titulo : 'Difunde una actividad del Colegio'}</h2>
      </div>

      <form className="forma" onSubmit={alGuardar} noValidate>
        <Campo
          etiqueta="Tipo de publicación"
          opciones={TIPOS}
          ayuda={
            esComunicado
              ? 'Los comunicados se muestran solo a las afiliadas, dentro de su portal.'
              : 'Se muestra en la página de inicio y en la agenda del portal de afiliadas.'
          }
          {...enlazar('tipo')}
        />
        <Campo etiqueta="Título" maxLength={120} {...enlazar('titulo')} />
        <Campo etiqueta="Descripción" multilinea maxLength={600} {...enlazar('texto')} />

        {!esComunicado && (
          <>
            <div className="forma__par">
              <Campo
                etiqueta="Fecha"
                type="date"
                ayuda="Desde hoy en adelante aparece como próxima; después pasa al archivo."
                {...enlazar('fecha')}
              />
              <Campo
                etiqueta="Horario (opcional)"
                placeholder="19:00 h"
                maxLength={40}
                {...enlazar('horario')}
              />
            </div>
            <Campo
              etiqueta="Sede o lugar (opcional)"
              placeholder="Recinto, calle y número"
              maxLength={140}
              {...enlazar('sede')}
            />

            <div className="campo">
              <span className="etiqueta">Cartel o fotografía (opcional)</span>
              <div className="adjunto">
                {valores.imagen && <img src={valores.imagen} alt="Vista previa de la imagen" />}
                <div className="adjunto__acciones">
                  <label className="boton boton--linea adjunto__elegir">
                    {valores.imagen ? 'Cambiar imagen' : 'Elegir imagen'}
                    <input type="file" accept="image/*" onChange={alElegirImagen} />
                  </label>
                  {valores.imagen && (
                    <button type="button" className="enlace-boton" onClick={() => fijar('imagen', '')}>
                      Quitar
                    </button>
                  )}
                </div>
              </div>
              {errores.imagen && <span className="error">{errores.imagen}</span>}
            </div>
          </>
        )}

        <label className="casilla">
          <input
            type="checkbox"
            checked={valores.publicada}
            onChange={(e) => fijar('publicada', e.target.checked)}
          />
          <span>
            <strong>Visible en el sitio.</strong> Desmárcala para guardarla como borrador oculto.
          </span>
        </label>

        {fallo && (
          <p className="aviso aviso--error" role="alert">
            {fallo}
          </p>
        )}

        <div className="tarjeta__acciones">
          <button className="boton" type="submit" disabled={guardando}>
            {guardando ? 'Guardando…' : editando ? 'Guardar cambios' : 'Publicar'}
          </button>
          <button type="button" className="boton boton--linea" onClick={() => alTerminar()}>
            Cancelar
          </button>
        </div>
      </form>
    </article>
  )
}

function Fila({ publicacion: p, alEditar, alCambiar }) {
  const [confirmando, setConfirmando] = useState(false)
  const esComunicado = p.tipo === TIPO_COMUNICADO
  const proxima = !esComunicado && esProxima(p)

  return (
    <li className={`publicacion ${p.publicada ? '' : 'publicacion--oculta'}`}>
      {p.imagen ? (
        <img className="publicacion__miniatura" src={p.imagen} alt="" loading="lazy" />
      ) : (
        <span className="publicacion__miniatura publicacion__miniatura--vacia" aria-hidden="true">
          <Icono nombre={esComunicado ? 'correo' : 'calendario'} tamano={22} />
        </span>
      )}

      <div className="publicacion__info">
        <p className="publicacion__meta">
          <span className="comunicado__etiqueta">{p.tipo}</span>
          <span>
            {fechaLegible(p)}
            {p.horario ? ` · ${p.horario}` : ''}
          </span>
        </p>
        <h3>{p.titulo}</h3>
        <p className="publicacion__estados">
          <span className={`estado ${p.publicada ? 'estado--activa' : 'estado--oculta'}`}>
            {p.publicada ? 'Visible' : 'Oculta'}
          </span>
          {proxima && <span className="estado estado--revision">Próxima</span>}
        </p>
      </div>

      <div className="publicacion__acciones">
        {confirmando ? (
          <>
            <span className="publicacion__pregunta">¿Eliminar definitivamente?</span>
            <button
              type="button"
              className="enlace-boton enlace-boton--peligro"
              onClick={() => alCambiar(() => eliminar(p.id), 'La publicación fue eliminada.')}
            >
              Sí, eliminar
            </button>
            <button type="button" className="enlace-boton" onClick={() => setConfirmando(false)}>
              Conservar
            </button>
          </>
        ) : (
          <>
            <button type="button" className="enlace-boton" onClick={() => alEditar(p)}>
              Editar
            </button>
            <button
              type="button"
              className="enlace-boton"
              onClick={() =>
                alCambiar(
                  () => actualizar(p.id, { publicada: !p.publicada }),
                  p.publicada ? 'La publicación quedó oculta.' : 'La publicación ya es visible.',
                )
              }
            >
              {p.publicada ? 'Ocultar' : 'Mostrar'}
            </button>
            <button
              type="button"
              className="enlace-boton enlace-boton--peligro"
              onClick={() => setConfirmando(true)}
            >
              Eliminar
            </button>
          </>
        )}
      </div>
    </li>
  )
}

export default function PanelAdmin() {
  const { salirAdmin } = useAuth()
  const navigate = useNavigate()
  const { publicaciones, cargando, recargar } = usePublicaciones()
  const [filtro, setFiltro] = useState('todas')
  // null: lista · 'nueva': alta · objeto: edición de esa publicación
  const [enEdicion, setEnEdicion] = useState(null)
  const [mensaje, setMensaje] = useState(null)

  const activo = FILTROS.find((f) => f.id === filtro)
  const visibles = publicaciones
    .filter(activo.prueba)
    .sort((a, b) => claveDeOrden(b).localeCompare(claveDeOrden(a)))

  async function alCambiar(accion, exito) {
    try {
      await accion()
      setMensaje({ tipo: 'exito', texto: exito })
    } catch (error) {
      setMensaje({ tipo: 'error', texto: error.message })
    }
    await recargar()
  }

  async function alTerminarFormulario(exito) {
    setEnEdicion(null)
    if (exito) {
      setMensaje({ tipo: 'exito', texto: exito })
      await recargar()
    }
    window.scrollTo(0, 0)
  }

  async function cerrarSesion() {
    await salirAdmin()
    navigate('/')
  }

  return (
    <section className="panel">
      <div className="panel__cabeza">
        <div className="contenedor">
          <p className="antetitulo">Administración · {contacto.siglas}</p>
          <div className="panel__saludo panel__saludo--admin">
            <h1>Difusión de actividades</h1>
            <div className="tarjeta__acciones">
              <a className="boton boton--linea" href="/#actividades">
                Ver el sitio
              </a>
              <button type="button" className="boton boton--linea" onClick={cerrarSesion}>
                Cerrar sesión
              </button>
            </div>
          </div>

          {!enEdicion && (
            <div className="pestanas" role="group" aria-label="Filtrar publicaciones">
              {FILTROS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  className="pestana"
                  aria-pressed={filtro === f.id}
                  onClick={() => setFiltro(f.id)}
                >
                  {f.texto} ({publicaciones.filter(f.prueba).length})
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="contenedor panel__cuerpo admin">
        <p className="aviso admin__modo">
          <strong>Modo de pruebas.</strong> Aún no hay base de datos: lo que publiques se guarda y
          se ve únicamente en este navegador.
        </p>

        {enEdicion ? (
          <Formulario
            key={enEdicion === 'nueva' ? 'nueva' : enEdicion.id}
            inicial={enEdicion === 'nueva' ? null : enEdicion}
            alTerminar={alTerminarFormulario}
          />
        ) : (
          <article className="tarjeta">
            <div className="admin__barra">
              <div>
                <p className="antetitulo">Publicaciones</p>
                <h2>{activo.texto}</h2>
              </div>
              <button
                type="button"
                className="boton"
                onClick={() => {
                  setMensaje(null)
                  setEnEdicion('nueva')
                }}
              >
                Nueva publicación
              </button>
            </div>

            {mensaje && (
              <p className={`aviso aviso--${mensaje.tipo}`} role="status">
                {mensaje.texto}
              </p>
            )}

            {cargando ? (
              <p className="cargando" role="status">
                Cargando publicaciones…
              </p>
            ) : visibles.length === 0 ? (
              <div className="vacio">
                <p>
                  <strong>No hay publicaciones en esta vista.</strong>
                </p>
                <p>
                  {filtro === 'proximas'
                    ? `Crea una convocatoria o evento con fecha a partir de hoy (${fechaLegible({ fecha: hoyISO() })}) para anunciarlo en el inicio.`
                    : 'Usa «Nueva publicación» para agregar una.'}
                </p>
              </div>
            ) : (
              <ul className="publicaciones">
                {visibles.map((p) => (
                  <Fila
                    key={p.id}
                    publicacion={p}
                    alCambiar={alCambiar}
                    alEditar={(pub) => {
                      setMensaje(null)
                      setEnEdicion(pub)
                    }}
                  />
                ))}
              </ul>
            )}
          </article>
        )}
      </div>
    </section>
  )
}
