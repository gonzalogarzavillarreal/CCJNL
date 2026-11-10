// El sello del Colegio como marco: anillo lila, leyenda en círculo y el
// borde ondulado del logo rodeando una fotografía.

function bordeOndulado(radio, amplitud, ondas) {
  const pasos = ondas * 16
  let d = ''
  for (let i = 0; i <= pasos; i++) {
    const angulo = (i / pasos) * Math.PI * 2
    const r = radio + amplitud * Math.sin(angulo * ondas)
    const x = (200 + r * Math.cos(angulo)).toFixed(2)
    const y = (200 + r * Math.sin(angulo)).toFixed(2)
    d += `${i === 0 ? 'M' : 'L'}${x} ${y}`
  }
  return `${d}Z`
}

const ONDA = bordeOndulado(142, 2.6, 22)

export default function Sello({ imagen, descripcion }) {
  return (
    <svg className="sello" viewBox="0 0 400 400" role="img" aria-label={descripcion}>
      <defs>
        <clipPath id="sello-recorte">
          <circle cx="200" cy="200" r="132" />
        </clipPath>
        {/* Arco superior e inferior para que ambas leyendas se lean de frente */}
        <path id="sello-arriba" d="M 42 200 A 158 158 0 0 1 358 200" />
        <path id="sello-abajo" d="M 28 200 A 172 172 0 0 0 372 200" />
      </defs>

      <circle cx="200" cy="200" r="190" fill="var(--blanco)" />
      <circle cx="200" cy="200" r="190" fill="none" stroke="var(--lila)" strokeWidth="18" />

      <text className="sello__leyenda">
        <textPath href="#sello-arriba" startOffset="50%" textAnchor="middle">
          Colegio de Ciencias Jurídicas
        </textPath>
      </text>
      <text className="sello__leyenda">
        <textPath href="#sello-abajo" startOffset="50%" textAnchor="middle">
          Nuevo León · desde 1995
        </textPath>
      </text>

      <path d={ONDA} fill="none" stroke="var(--tinta)" strokeWidth="1.4" />
      <image
        href={imagen}
        x="68"
        y="68"
        width="264"
        height="264"
        preserveAspectRatio="xMidYMid slice"
        clipPath="url(#sello-recorte)"
      />
      <circle cx="200" cy="200" r="132" fill="none" stroke="var(--tinta)" strokeWidth="2.2" />
    </svg>
  )
}
