// Marco compartido por las pantallas de ingreso y registro.
export default function MarcoAcceso({ titulo, entrada, children }) {
  return (
    <section className="acceso">
      <div className="contenedor acceso__fila">
        <aside className="acceso__lado">
          <img src="/img/logo.jpg" alt="" width="112" height="112" />
          <p className="acceso__lema">Espacio de afiliadas</p>
          <p>
            Sesiones del Colegio, tus datos de afiliación y los avisos del Consejo Directivo, en un
            solo lugar.
          </p>
        </aside>
        <div className="acceso__forma">
          <h1>{titulo}</h1>
          <p className="acceso__entrada">{entrada}</p>
          {children}
        </div>
      </div>
    </section>
  )
}
