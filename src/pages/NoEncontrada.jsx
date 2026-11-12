import { Link } from 'react-router-dom'

export default function NoEncontrada() {
  return (
    <section className="seccion">
      <div className="contenedor no-encontrada">
        <p className="antetitulo">Código 404 · Página no disponible</p>
        <h1>No fue posible encontrar la sección solicitada</h1>
        <p>
          El enlace puede haber sido actualizado o la dirección escrita no corresponde a una página
          vigente del Colegio de Ciencias Jurídicas en Nuevo León, A.C.
        </p>
        <Link className="boton" to="/">
          Regresar a la página principal
        </Link>
      </div>
    </section>
  )
}
