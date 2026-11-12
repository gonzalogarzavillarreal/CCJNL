import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Icono from '../components/Icono.jsx'
import Sello from '../components/Sello.jsx'
import { useAuth } from '../auth/AuthContext.jsx'
import {
  actividades,
  afiliacion,
  areasDePractica,
  cifras,
  contacto,
  identidad,
  pilares,
  preguntasFrecuentes,
  trayectoria,
  vinculacion,
} from '../data/colegio.js'

const CATEGORIAS = ['Todas', 'Sesión ordinaria', 'Vida institucional', 'Conmemoración']

export default function Inicio() {
  const { afiliada } = useAuth()
  const [categoriaActiva, setCategoriaActiva] = useState('Todas')
  const [actividadAbierta, setActividadAbierta] = useState(null)

  const actividadesFiltradas =
    categoriaActiva === 'Todas'
      ? actividades
      : actividades.filter((a) => a.categoria === categoriaActiva)

  useEffect(() => {
    if (!actividadAbierta) return undefined
    function alTecla(e) {
      if (e.key === 'Escape') setActividadAbierta(null)
    }
    window.addEventListener('keydown', alTecla)
    return () => window.removeEventListener('keydown', alTecla)
  }, [actividadAbierta])

  return (
    <>
      <section className="portada">
        <div className="contenedor portada__fila">
          <div className="portada__texto">
            <p className="rubrica">
              <span className="rubrica__linea" aria-hidden="true" />
              <span>Asociación Civil · Fundada en {contacto.fundacion} · Monterrey, N.L.</span>
            </p>
            <h1>
              Mujeres juristas comprometidas con la <em>excelencia del Derecho</em> y la justicia en
              Nuevo León.
            </h1>
            <p className="portada__entrada">
              El <strong>{contacto.nombreCompleto}</strong> agrupa exclusivamente a abogadas del
              ejercicio libre, la función pública, la judicatura y la academia. Más de tres décadas
              de actualización continua, ética gremial e incidencia institucional.
            </p>
            <div className="portada__acciones">
              {afiliada ? (
                <Link className="boton" to="/afiliadas">
                  Ir a mi espacio de afiliada
                  <Icono nombre="flecha" tamano={18} />
                </Link>
              ) : (
                <Link className="boton" to="/afiliadas/registro">
                  Solicitar afiliación
                  <Icono nombre="flecha" tamano={18} />
                </Link>
              )}
              <a className="boton boton--linea" href="#colegio">
                Conocer el Colegio
              </a>
            </div>
          </div>

          <div className="portada__visual">
            <div className="portada__sello">
              <Sello
                imagen="/img/sesion-marzo.jpg"
                descripcion="Sesión ordinaria del Colegio de Ciencias Jurídicas en Nuevo León junto con la UDEM y la CEDHNL"
              />
            </div>
            <div className="portada__ficha">
              <p className="portada__ficha-etiqueta">Consejo Directivo {contacto.consejoActual}</p>
              <p className="portada__ficha-texto">
                Sesiones ordinarias mensuales en coordinación con poderes públicos, organismos
                autónomos y universidades de Nuevo León.
              </p>
            </div>
          </div>
        </div>

        <div className="contenedor">
          <dl className="cifras" aria-label="Indicadores institucionales">
            {cifras.map((item) => (
              <div key={item.etiqueta} className="cifras__bloque">
                <dt className="cifras__etiqueta">{item.etiqueta}</dt>
                <dd className="cifras__valor">{item.valor}</dd>
                <dd className="cifras__detalle">{item.detalle}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="colegio" className="seccion seccion--blanca">
        <div className="contenedor colegio">
          <header className="encabezado-seccion encabezado-seccion--dividido">
            <div>
              <p className="antetitulo">{identidad.antetitulo}</p>
              <h2>{identidad.titulo}</h2>
            </div>
            <p className="encabezado-seccion__texto">{identidad.resumen}</p>
          </header>

          <div className="mision-vision">
            <article className="bloque-doctrina">
              <p className="bloque-doctrina__indice">I · Misión Institucional</p>
              <h3>Superación jurídica y liderazgo con sentido social</h3>
              <p>{identidad.mision}</p>
            </article>
            <article className="bloque-doctrina">
              <p className="bloque-doctrina__indice">II · Visión Gremial</p>
              <h3>Referente de rigor técnico e incidencia democrática</h3>
              <p>{identidad.vision}</p>
            </article>
          </div>

          <div>
            <p className="subtitulo-bloque">Ejes rectores de nuestra labor colegiada</p>
            <ul className="pilares">
              {pilares.map((p) => (
                <li key={p.titulo} className="pilar">
                  <span className="pilar__icono">
                    <Icono nombre={p.icono} tamano={22} />
                  </span>
                  <h3>{p.titulo}</h3>
                  <p>{p.texto}</p>
                </li>
              ))}
            </ul>
          </div>

          <blockquote className="cita-institucional">
            <p>{identidad.lema}</p>
            <footer>{identidad.lemaAutor}</footer>
          </blockquote>

          <div className="ramas">
            <div className="ramas__cabeza">
              <h3>Especialidades jurídicas representadas en el Colegio</h3>
              <p>
                Nuestras afiliadas ejercen y aportan criterio especializado en las principales ramas
                del ordenamiento jurídico mexicano:
              </p>
            </div>
            <ul className="ramas__lista">
              {areasDePractica.slice(0, -1).map((rama) => (
                <li key={rama}>{rama}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="vinculacion" className="seccion">
        <div className="contenedor">
          <header className="encabezado-seccion encabezado-seccion--dividido">
            <div>
              <p className="antetitulo">Presencia Pública</p>
              <h2>Vinculación interinstitucional y académica</h2>
            </div>
            <p className="encabezado-seccion__texto">
              El Colegio mantiene diálogo técnico, convenios de colaboración y agendas conjuntas con
              instituciones del Estado de Nuevo León, organismos constitucionales autónomos y el
              sector universitario.
            </p>
          </header>

          <ul className="alianzas">
            {vinculacion.map((inst) => (
              <li key={inst.siglas} className="alianza">
                <div className="alianza__tope">
                  <span className="alianza__siglas">{inst.siglas}</span>
                  <span className="alianza__tipo">{inst.tipo}</span>
                </div>
                <h3>{inst.nombre}</h3>
                <p>{inst.descripcion}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="trayectoria" className="seccion seccion--lila">
        <div className="contenedor trayectoria">
          <header className="encabezado-seccion">
            <p className="antetitulo">Memoria y Continuidad</p>
            <h2>Más de tres décadas abriendo camino a las abogadas de Nuevo León</h2>
          </header>

          <ol className="linea">
            {trayectoria.map((hito) => (
              <li key={hito.fecha}>
                <span className="linea__etapa">{hito.etapa}</span>
                <p className="linea__fecha">{hito.fecha}</p>
                <h3>{hito.titulo}</h3>
                <p>{hito.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="actividades" className="seccion seccion--blanca">
        <div className="contenedor">
          <header className="encabezado-seccion encabezado-seccion--dividido">
            <div>
              <p className="antetitulo">Vida Colegiada</p>
              <h2>Sesiones ordinarias, foros y conmemoraciones</h2>
            </div>
            <p className="encabezado-seccion__texto">
              Registro de las actividades académicas, sesiones en recintos públicos y efemérides del
              Colegio. Las convocatorias oficiales se anuncian oportunamente en{' '}
              <a href={contacto.instagram} target="_blank" rel="noreferrer">
                Instagram ({contacto.usuarioRedes})
              </a>{' '}
              y{' '}
              <a href={contacto.facebook} target="_blank" rel="noreferrer">
                Facebook
              </a>
              .
            </p>
          </header>

          <div className="filtros" role="group" aria-label="Filtrar actividades por categoría">
            {CATEGORIAS.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`filtro ${categoriaActiva === cat ? 'filtro--activo' : ''}`}
                aria-pressed={categoriaActiva === cat}
                onClick={() => setCategoriaActiva(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <ul className="actividades">
            {actividadesFiltradas.map((a) => (
              <li key={a.id} className="actividad">
                <button
                  type="button"
                  className="actividad__media"
                  onClick={() => setActividadAbierta(a)}
                  aria-label={`Ampliar imagen de ${a.titulo}`}
                >
                  <img src={a.imagen} alt={a.alt} loading="lazy" />
                  <span className="actividad__insignia">{a.categoria}</span>
                  <span className="actividad__zoom" aria-hidden="true">
                    <Icono nombre="ampliar" tamano={16} />
                    Ver completo
                  </span>
                </button>

                <div className="actividad__texto">
                  <div className="actividad__meta">
                    <span>
                      <Icono nombre="calendario" tamano={15} />
                      {a.fecha}
                    </span>
                    {a.horario && (
                      <span>
                        <Icono nombre="reloj" tamano={15} />
                        {a.horario}
                      </span>
                    )}
                  </div>
                  <h3>{a.titulo}</h3>
                  <p>{a.texto}</p>
                  <p className="actividad__sede">
                    <Icono nombre="ubicacion" tamano={15} />
                    <span>{a.sede}</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="afiliacion" className="seccion seccion--ciruela" aria-labelledby="titulo-afiliacion">
        <div className="contenedor colegiacion">
          <div className="colegiacion__encabezado">
            <div>
              <p className="antetitulo antetitulo--claro">{afiliacion.antetitulo}</p>
              <h2 id="titulo-afiliacion">{afiliacion.titulo}</h2>
            </div>
            <p className="colegiacion__intro">{afiliacion.descripcion}</p>
          </div>

          <div className="colegiacion__columnas">
            <div className="colegiacion__panel">
              <h3>Beneficios de la membresía</h3>
              <ul className="beneficios">
                {afiliacion.beneficios.map((b) => (
                  <li key={b.titulo}>
                    <span className="beneficios__icono">
                      <Icono nombre="verificar" tamano={20} />
                    </span>
                    <div>
                      <h4>{b.titulo}</h4>
                      <p>{b.texto}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="colegiacion__panel colegiacion__panel--requisitos">
              <h3>Requisitos estatutarios de ingreso</h3>
              <ul className="requisitos">
                {afiliacion.requisitos.map((req) => (
                  <li key={req}>{req}</li>
                ))}
              </ul>

              <h3 className="colegiacion__subtitulo">Proceso de admisión</h3>
              <ol className="pasos">
                {afiliacion.pasos.map((p) => (
                  <li key={p.numero}>
                    <span className="pasos__numero">{p.numero}</span>
                    <div>
                      <strong>{p.titulo}.</strong> {p.texto}
                    </div>
                  </li>
                ))}
              </ol>

              <div className="colegiacion__acciones">
                {afiliada ? (
                  <Link className="boton boton--claro" to="/afiliadas">
                    Acceder a mi espacio de afiliada
                  </Link>
                ) : (
                  <>
                    <Link className="boton boton--claro" to="/afiliadas/registro">
                      Iniciar solicitud de afiliación
                    </Link>
                    <Link className="boton boton--contorno-claro" to="/afiliadas/ingresar">
                      Ya soy afiliada · Ingresar
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="preguntas" className="seccion">
        <div className="contenedor preguntas-layout">
          <div className="preguntas-layout__intro">
            <p className="antetitulo">Orientación</p>
            <h2>Preguntas frecuentes sobre el Colegio y la afiliación</h2>
            <p>
              Resolvemos las dudas habituales de abogadas interesadas en colegiarse, así como de
              instituciones públicas y académicas que desean vincularse con el CCJNL.
            </p>
          </div>

          <div className="acordeon">
            {preguntasFrecuentes.map((item, indice) => (
              <details key={item.pregunta} className="acordeon__item" open={indice === 0}>
                <summary>{item.pregunta}</summary>
                <p>{item.respuesta}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="contacto" className="seccion seccion--blanca">
        <div className="contenedor">
          <header className="encabezado-seccion encabezado-seccion--dividido">
            <div>
              <p className="antetitulo">Atención Institucional</p>
              <h2>Contacto y canales oficiales</h2>
            </div>
            <p className="encabezado-seccion__texto">
              Para confirmar asistencia a sesiones ordinarias, dar seguimiento a solicitudes de
              afiliación o presentar oficios de colaboración institucional, comunícate por nuestros
              medios directos.
            </p>
          </header>

          <dl className="contacto-tarjetas">
            <div className="contacto-tarjeta">
              <span className="contacto-tarjeta__icono">
                <Icono nombre="correo" tamano={22} />
              </span>
              <dt>Correo electrónico oficial</dt>
              <dd>
                <a href={`mailto:${contacto.correo}`}>
                  colegiodecienciasjuridicasac
                  <wbr />
                  @gmail.com
                </a>
              </dd>
              <dd className="contacto-tarjeta__nota">Secretaría y atención a oficios</dd>
            </div>

            <div className="contacto-tarjeta">
              <span className="contacto-tarjeta__icono">
                <Icono nombre="telefono" tamano={22} />
              </span>
              <dt>Línea de atención y registro</dt>
              <dd>
                <a href={`tel:${contacto.telefonoEnlace}`}>{contacto.telefono}</a>
              </dd>
              <dd className="contacto-tarjeta__nota">Confirmación de sesiones ordinarias</dd>
            </div>

            <div className="contacto-tarjeta">
              <span className="contacto-tarjeta__icono">
                <Icono nombre="ubicacion" tamano={22} />
              </span>
              <dt>Ámbito y sede institucional</dt>
              <dd>{contacto.ciudad}</dd>
              <dd className="contacto-tarjeta__nota">
                Sesiones en recintos oficiales y sedes conveniadas
              </dd>
            </div>

            <div className="contacto-tarjeta">
              <span className="contacto-tarjeta__icono">
                <Icono nombre="red" tamano={22} />
              </span>
              <dt>Redes oficiales verificadas</dt>
              <dd className="contacto__redes">
                <a href={contacto.instagram} target="_blank" rel="noreferrer">
                  <Icono nombre="instagram" tamano={17} />
                  Instagram ({contacto.usuarioRedes})
                </a>
                <a href={contacto.facebook} target="_blank" rel="noreferrer">
                  <Icono nombre="facebook" tamano={17} />
                  Facebook
                </a>
                <a href={contacto.tiktok} target="_blank" rel="noreferrer">
                  <Icono nombre="tiktok" tamano={17} />
                  TikTok ({contacto.usuarioRedes})
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {actividadAbierta && (
        <div
          className="visor"
          role="dialog"
          aria-modal="true"
          aria-labelledby="visor-titulo"
          onClick={() => setActividadAbierta(null)}
        >
          <div className="visor__caja" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="visor__cerrar"
              onClick={() => setActividadAbierta(null)}
              aria-label="Cerrar vista ampliada"
            >
              <Icono nombre="cerrar" tamano={20} />
            </button>
            <div className="visor__imagen">
              <img src={actividadAbierta.imagen} alt={actividadAbierta.alt} />
            </div>
            <div className="visor__detalle">
              <span className="visor__categoria">{actividadAbierta.categoria}</span>
              <h3 id="visor-titulo">{actividadAbierta.titulo}</h3>
              <p className="visor__fecha">
                {actividadAbierta.fecha}
                {actividadAbierta.horario ? ` · ${actividadAbierta.horario}` : ''}
              </p>
              <p>{actividadAbierta.texto}</p>
              <p className="visor__sede">
                <Icono nombre="ubicacion" tamano={16} />
                <span>{actividadAbierta.sede}</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
