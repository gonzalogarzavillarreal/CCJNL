import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import * as servicio from '../services/afiliadasService.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [afiliada, setAfiliada] = useState(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    let vigente = true
    servicio
      .obtenerSesion()
      .then((sesion) => vigente && setAfiliada(sesion))
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

  const valor = useMemo(
    () => ({ afiliada, cargando, ingresar, registrar, actualizarPerfil, salir }),
    [afiliada, cargando, ingresar, registrar, actualizarPerfil, salir],
  )

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const contexto = useContext(AuthContext)
  if (!contexto) throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  return contexto
}
