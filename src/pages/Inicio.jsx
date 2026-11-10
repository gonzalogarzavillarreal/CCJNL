import { Link } from 'react-router-dom'
import Icono from '../components/Icono.jsx'
import Sello from '../components/Sello.jsx'
import { useAuth } from '../auth/AuthContext.jsx'
import { actividades, contacto, pilares, trayectoria } from '../data/colegio.js'

export default function Inicio() {
  const { afiliada } = useAuth()

  return (
    <>
      <section className="portada">
        <div className="contenedor portada__fila">
          <div className="portada__texto">
            <h1>Abogadas de Nuevo León, colegiadas desde 1995.</h1>
            <p className="portada__entrada">
              El Colegio de Ciencias Jurídicas en Nuevo León es un colegio de profesionales del
              Derecho conformado exclusivamente por mujeres. Aquí nos capacitamos, nos
              respaldamos y trabajamos por la justicia en el estado.
            </p>
            <div className="portada__acciones">
              <a className="boton" href="#colegio">
                Conocer el Colegio
              </a>
              <Link className="boton boton--linea" to="/afiliadas/registro">
                Solicitar afiliación
              </Link>
            </div>
          </div>
          <div className="portada__sello">
            <Sello
              imagen="/img/sesion-marzo.jpg"
              descripcion="Sesión ordinaria del Colegio en marzo de 2026: cinco ponentes presentan un libro ante las socias"
            />
          </div>
        </div>
      </section>

      <section id="colegio" className="seccion">
        <div className="contenedor colegio">
          <div className="colegio__intro">
            <h2>Un colegio de mujeres para el ejercicio del Derecho</h2>
            <p>
              Somos una asociación civil que integra a profesionistas de las diversas ramas del
              Derecho, del ámbito público y del privado. Nuestra misión es fortalecer el
              liderazgo femenino, la capacitación y la justicia social en Nuevo León.
            </p>
          </div>
          <ul className="pilares">
            {pilares.map((p) => (
              <li key={p.titulo}>
                <h3>{p.titulo}</h3>
                <p>{p.texto}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="trayectoria" className="seccion seccion--lila">
        <div className="contenedor trayectoria">
          <h2>Treinta y un años de trayectoria</h2>
          <ol className="linea">
            {trayectoria.map((hito) => (
              <li key={hito.fecha}>
                <p className="linea__fecha">{hito.fecha}</p>
                <h3>{hito.titulo}</h3>
                <p>{hito.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="actividades" className="seccion">
        <div className="contenedor">
          <div className="actividades__cabeza">
            <h2>Actividades recientes</h2>
            <p>
              Sesiones ordinarias, conferencias y conmemoraciones del Colegio. Las convocatorias
              se publican primero en{' '}
              <a href={contacto.instagram} target="_blank" rel="noreferrer">
                Instagram
              </a>{' '}
              y{' '}
              <a href={contacto.facebook} target="_blank" rel="noreferrer">
                Facebook
              </a>
              .
            </p>
          </div>
          <ul className="actividades">
            {actividades.map((a) => (
              <li key={a.titulo} className="actividad">
                <img src={a.imagen} alt={a.alt} loading="lazy" />
                <div className="actividad__texto">
                  <p className="actividad__fecha">{a.fecha}</p>
                  <h3>{a.titulo}</h3>
                  <p>{a.texto}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="seccion seccion--ciruela" aria-labelledby="titulo-afiliadas">
        <div className="contenedor llamado">
          <div>
            <h2 id="titulo-afiliadas">Espacio de afiliadas</h2>
            <p>
              Consulta las sesiones del Colegio, mantén tus datos al día y da seguimiento a tu
              afiliación desde un solo lugar.
            </p>
          </div>
          <div className="llamado__acciones">
            {afiliada ? (
              <Link className="boton boton--claro" to="/afiliadas">
                Ir a mi espacio
              </Link>
            ) : (
              <>
                <Link className="boton boton--claro" to="/afiliadas/ingresar">
                  Ingresar
                </Link>
                <Link className="boton boton--contorno-claro" to="/afiliadas/registro">
                  Solicitar afiliación
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      <section id="contacto" className="seccion">
        <div className="contenedor contacto">
          <h2>Contacto</h2>
          <dl className="contacto__datos">
            <div>
              <dt>Correo</dt>
              <dd>
                <a href={`mailto:${contacto.correo}`}>{contacto.correo}</a>
              </dd>
            </div>
            <div>
              <dt>Teléfono</dt>
              <dd>
                <a href={`tel:${contacto.telefonoEnlace}`}>{contacto.telefono}</a>
              </dd>
            </div>
            <div>
              <dt>Sede</dt>
              <dd>{contacto.ciudad}</dd>
            </div>
            <div>
              <dt>Redes</dt>
              <dd className="contacto__redes">
                <a href={contacto.facebook} target="_blank" rel="noreferrer">
                  <Icono nombre="facebook" />
                  Facebook
                </a>
                <a href={contacto.instagram} target="_blank" rel="noreferrer">
                  <Icono nombre="instagram" />
                  Instagram (@ccjnlac)
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </>
  )
}
