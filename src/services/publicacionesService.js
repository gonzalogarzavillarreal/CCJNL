/*
  Servicio de publicaciones (convocatorias, eventos, sesiones y comunicados).

  PENDIENTE: BASE DE DATOS
  ------------------------
  Igual que afiliadasService.js, este archivo es el único punto que toca el
  almacenamiento. Mientras no haya backend guarda todo en el navegador
  (localStorage): lo que se publique desde el panel de administración SOLO se
  ve en el navegador donde se capturó.

  Al conectar la base de datos, reemplaza el cuerpo de cada función por la
  llamada a la API y conserva las firmas; el resto del sitio no cambia.

    listar()                     -> GET    /api/publicaciones
    crear(datos)                 -> POST   /api/publicaciones
    actualizar(id, datos)        -> PATCH  /api/publicaciones/:id
    eliminar(id)                 -> DELETE /api/publicaciones/:id
    iniciarSesionAdmin(usr, pwd) -> POST   /api/admin/sesion
    obtenerSesionAdmin()         -> GET    /api/admin/sesion
    cerrarSesionAdmin()          -> DELETE /api/admin/sesion
*/

import { actividades, avisosConsejo } from '../data/colegio.js'

const CLAVE_PUBLICACIONES = 'ccjnl.publicaciones'
const CLAVE_SESION_ADMIN = 'ccjnl.admin'

// USUARIO DE PRUEBAS. Estas credenciales viajan en el código del sitio y cualquiera
// puede leerlas: sirven solo para la demostración. En producción el acceso se valida
// en el servidor y este bloque desaparece.
const ADMIN_PRUEBAS = { usuario: 'admin', contrasena: 'ccjnl2026' }

export const TIPO_COMUNICADO = 'Comunicado'

export const TIPOS = [
  'Convocatoria',
  'Evento',
  'Sesión ordinaria',
  'Vida institucional',
  'Conmemoración',
  TIPO_COMUNICADO,
]

export class ErrorDePublicaciones extends Error {}

function semilla() {
  const creada = new Date().toISOString()
  return [
    ...actividades.map((a) => ({
      id: a.id,
      tipo: a.categoria,
      titulo: a.titulo,
      texto: a.texto,
      fecha: a.fechaISO,
      fechaTexto: a.fecha,
      horario: a.horario,
      sede: a.sede,
      imagen: a.imagen,
      alt: a.alt,
      publicada: true,
      creada,
    })),
    ...avisosConsejo.map((a) => ({
      id: a.id,
      tipo: TIPO_COMUNICADO,
      etiqueta: a.etiqueta,
      titulo: a.titulo,
      texto: a.texto,
      fecha: '',
      fechaTexto: a.fecha,
      horario: '',
      sede: '',
      imagen: '',
      alt: '',
      publicada: true,
      creada,
    })),
  ]
}

function leer() {
  try {
    const guardado = JSON.parse(localStorage.getItem(CLAVE_PUBLICACIONES))
    if (Array.isArray(guardado)) return guardado
  } catch {
    // Almacenamiento ilegible o no disponible: se parte del contenido inicial.
  }
  return semilla()
}

function guardar(lista) {
  try {
    localStorage.setItem(CLAVE_PUBLICACIONES, JSON.stringify(lista))
  } catch {
    throw new ErrorDePublicaciones(
      'No hay espacio en el navegador para guardar la publicación. Usa una imagen más ligera o elimina publicaciones antiguas.',
    )
  }
}

function limpiar({ tipo, titulo, texto, fecha, horario, sede, imagen, publicada }) {
  return {
    tipo,
    titulo: titulo.trim(),
    texto: texto.trim(),
    fecha: fecha || '',
    horario: (horario ?? '').trim(),
    sede: (sede ?? '').trim(),
    imagen: imagen || '',
    publicada: Boolean(publicada),
  }
}

export async function listar() {
  return leer()
}

export async function crear(datos) {
  const publicacion = {
    id: crypto.randomUUID(),
    ...limpiar(datos),
    creada: new Date().toISOString(),
  }
  guardar([publicacion, ...leer()])
  return publicacion
}

export async function actualizar(id, datos) {
  const lista = leer()
  const indice = lista.findIndex((p) => p.id === id)
  if (indice === -1) {
    throw new ErrorDePublicaciones('La publicación ya no existe. Actualiza la página.')
  }
  const previa = lista[indice]
  const cambios = limpiar({ ...previa, ...datos })
  lista[indice] = {
    ...previa,
    ...cambios,
    // El texto libre de fecha del contenido inicial solo vale mientras la fecha no cambie.
    fechaTexto: cambios.fecha === previa.fecha ? previa.fechaTexto : undefined,
    alt: cambios.imagen === previa.imagen ? previa.alt : undefined,
  }
  guardar(lista)
  return lista[indice]
}

export async function eliminar(id) {
  guardar(leer().filter((p) => p.id !== id))
}

export async function iniciarSesionAdmin(usuario, contrasena) {
  if (
    usuario.trim().toLowerCase() !== ADMIN_PRUEBAS.usuario ||
    contrasena !== ADMIN_PRUEBAS.contrasena
  ) {
    throw new ErrorDePublicaciones('El usuario o la contraseña no coinciden.')
  }
  sessionStorage.setItem(CLAVE_SESION_ADMIN, ADMIN_PRUEBAS.usuario)
  return { usuario: ADMIN_PRUEBAS.usuario }
}

export async function obtenerSesionAdmin() {
  const usuario = sessionStorage.getItem(CLAVE_SESION_ADMIN)
  return usuario ? { usuario } : null
}

export async function cerrarSesionAdmin() {
  sessionStorage.removeItem(CLAVE_SESION_ADMIN)
}

/* Utilidades de presentación compartidas por el sitio público y los paneles. */

const formatoFecha = new Intl.DateTimeFormat('es-MX', { dateStyle: 'long' })

function aFechaLocal(iso) {
  const [anio, mes, dia] = iso.split('-').map(Number)
  return new Date(anio, mes - 1, dia)
}

export function hoyISO() {
  const hoy = new Date()
  const dos = (n) => String(n).padStart(2, '0')
  return `${hoy.getFullYear()}-${dos(hoy.getMonth() + 1)}-${dos(hoy.getDate())}`
}

export function fechaLegible(p) {
  if (p.fechaTexto) return p.fechaTexto
  if (p.fecha) return formatoFecha.format(aFechaLocal(p.fecha))
  return formatoFecha.format(new Date(p.creada))
}

export function partesDeFecha(iso) {
  const fecha = aFechaLocal(iso)
  return {
    dia: fecha.getDate(),
    mes: fecha.toLocaleDateString('es-MX', { month: 'short' }).replace('.', ''),
    anio: fecha.getFullYear(),
  }
}

export const esProxima = (p) => Boolean(p.fecha) && p.fecha >= hoyISO()

// Separa lo publicado en las tres vistas que usa el sitio.
export function clasificar(publicaciones) {
  const visibles = publicaciones.filter((p) => p.publicada)
  const conFecha = visibles.filter((p) => p.tipo !== TIPO_COMUNICADO && p.fecha)
  return {
    proximas: conFecha.filter(esProxima).sort((a, b) => a.fecha.localeCompare(b.fecha)),
    pasadas: conFecha.filter((p) => !esProxima(p)).sort((a, b) => b.fecha.localeCompare(a.fecha)),
    comunicados: visibles.filter((p) => p.tipo === TIPO_COMUNICADO),
  }
}
