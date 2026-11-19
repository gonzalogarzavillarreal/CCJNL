import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import * as servicio from '../services/afiliadasService.js'
import * as publicaciones from '../services/publicacionesService.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [afiliada, setAfiliada] = useState(null)
  const [admin, setAdmin] = useState(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    let vigente = true
    Promise.all([servicio.obtenerSesion(), publicaciones.obtenerSesionAdmin()])
      .then(([sesion, sesionAdmin]) => {
        if (!vigente) return
        setAfiliada(sesion)
        setAdmin(sesionAdmin)
      })
      .finally(() => vigente && setCargando(false))
    return () => {
      vigente = false
    }
  }, [])

  const ingresar = useCallback(async (correo, contrasena) => {
    setAfiliada(await servicio.iniciarSesion(correo, contrasena))
  }, [])

  const registrar = useCallback(async (datos) => {
    setAfiliada(await servicio.registrar(datos))
  }, [])

  const actualizarPerfil = useCallback(
    async (datos) => {
      setAfiliada(await servicio.actualizarPerfil(afiliada.id, datos))
    },
    [afiliada],
  )

  const salir = useCallback(async () => {
    await servicio.cerrarSesion()
    setAfiliada(null)
  }, [])

  const ingresarAdmin = useCallback(async (usuario, contrasena) => {
    setAdmin(await publicaciones.iniciarSesionAdmin(usuario, contrasena))
  }, [])

  const salirAdmin = useCallback(async () => {
    await publicaciones.cerrarSesionAdmin()
    setAdmin(null)
  }, [])

  const valor = useMemo(
    () => ({
      afiliada,
      admin,
      cargando,
      ingresar,
      registrar,
      actualizarPerfil,
      salir,
      ingresarAdmin,
      salirAdmin,
    }),
    [afiliada, admin, cargando, ingresar, registrar, actualizarPerfil, salir, ingresarAdmin, salirAdmin],
  )

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const contexto = useContext(AuthContext)
  if (!contexto) throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  return contexto
}
