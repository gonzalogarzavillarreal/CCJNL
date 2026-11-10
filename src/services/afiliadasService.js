/*
  Servicio de afiliadas.

  PENDIENTE: BASE DE DATOS
  ------------------------
  Todavía no hay backend. Este archivo es el único punto que toca el
  almacenamiento: mientras tanto guarda los registros en el navegador
  (localStorage) para que el flujo de registro, ingreso y perfil se pueda
  probar de principio a fin.

  Al conectar la base de datos, reemplaza el cuerpo de cada función por la
  llamada a la API y conserva las firmas; el resto del sitio no cambia.

    registrar(datos)            -> POST   /api/afiliadas
    iniciarSesion(correo, pwd)  -> POST   /api/sesion
    obtenerSesion()             -> GET    /api/sesion
    actualizarPerfil(id, datos) -> PATCH  /api/afiliadas/:id
    cerrarSesion()              -> DELETE /api/sesion

  El almacenamiento local NO es seguro para producción: las contraseñas
  deben validarse y guardarse en el servidor.
*/

const CLAVE_AFILIADAS = 'ccjnl.afiliadas'
const CLAVE_SESION = 'ccjnl.sesion'

export class ErrorDeAfiliadas extends Error {
  constructor(mensaje, campo) {
    super(mensaje)
    this.campo = campo
  }
}

function leerAfiliadas() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_AFILIADAS)) ?? []
  } catch {
    return []
  }
}

function guardarAfiliadas(lista) {
  localStorage.setItem(CLAVE_AFILIADAS, JSON.stringify(lista))
}

async function huella(texto) {
  const bytes = new TextEncoder().encode(texto)
  const digest = await crypto.subtle.digest('SHA-256', bytes)
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

function sinSecreto(afiliada) {
  const { secreto: _secreto, ...publica } = afiliada
  return publica
}

const normalizar = (correo) => correo.trim().toLowerCase()

export async function registrar({ nombre, correo, telefono, cedula, area, contrasena }) {
  const lista = leerAfiliadas()
  const correoNormal = normalizar(correo)

  if (lista.some((a) => a.correo === correoNormal)) {
    throw new ErrorDeAfiliadas(
      'Ya existe una cuenta con este correo. Ingresa con tu contraseña.',
      'correo',
    )
  }

  const afiliada = {
    id: crypto.randomUUID(),
    nombre: nombre.trim(),
    correo: correoNormal,
    telefono: telefono.trim(),
    cedula: cedula.trim(),
    area,
    // El Consejo Directivo valida cada solicitud; hasta entonces queda en revisión.
    estado: 'en_revision',
    fechaRegistro: new Date().toISOString(),
    secreto: await huella(`${correoNormal}:${contrasena}`),
  }

  guardarAfiliadas([...lista, afiliada])
  sessionStorage.setItem(CLAVE_SESION, afiliada.id)
  return sinSecreto(afiliada)
}

export async function iniciarSesion(correo, contrasena) {
  const correoNormal = normalizar(correo)
  const afiliada = leerAfiliadas().find((a) => a.correo === correoNormal)
  const secreto = await huella(`${correoNormal}:${contrasena}`)

  if (!afiliada || afiliada.secreto !== secreto) {
    throw new ErrorDeAfiliadas('El correo o la contraseña no coinciden. Revísalos e intenta de nuevo.')
  }

  sessionStorage.setItem(CLAVE_SESION, afiliada.id)
  return sinSecreto(afiliada)
}

export async function obtenerSesion() {
  const id = sessionStorage.getItem(CLAVE_SESION)
  if (!id) return null
  const afiliada = leerAfiliadas().find((a) => a.id === id)
  return afiliada ? sinSecreto(afiliada) : null
}

export async function actualizarPerfil(id, { nombre, telefono, cedula, area }) {
  const lista = leerAfiliadas()
  const indice = lista.findIndex((a) => a.id === id)
  if (indice === -1) {
    throw new ErrorDeAfiliadas('No encontramos tu cuenta. Ingresa de nuevo.')
  }
  lista[indice] = {
    ...lista[indice],
    nombre: nombre.trim(),
    telefono: telefono.trim(),
    cedula: cedula.trim(),
    area,
  }
  guardarAfiliadas(lista)
  return sinSecreto(lista[indice])
}

export async function cerrarSesion() {
  sessionStorage.removeItem(CLAVE_SESION)
}
