import { Link } from 'react-router-dom'

export default function NoEncontrada() {
  return (
    <section className="seccion">
      <div className="contenedor no-encontrada">
        <h1>Esta página no existe</h1>
        <p>La dirección pudo haber cambiado o estar mal escrita.</p>
        <Link className="boton" to="/">
          Volver al inicio
        </Link>
      </div>
    </section>
  )
}
