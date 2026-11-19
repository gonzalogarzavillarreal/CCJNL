import { useCallback, useEffect, useState } from 'react'
import { listar } from '../services/publicacionesService.js'

// Carga las publicaciones del servicio; `recargar` las vuelve a pedir tras un cambio.
export default function usePublicaciones() {
  const [publicaciones, setPublicaciones] = useState([])
  const [cargando, setCargando] = useState(true)

  const recargar = useCallback(async () => {
    setPublicaciones(await listar())
    setCargando(false)
  }, [])

  useEffect(() => {
    let vigente = true
    listar().then((lista) => {
      if (!vigente) return
      setPublicaciones(lista)
      setCargando(false)
    })
    return () => {
      vigente = false
    }
  }, [])

  return { publicaciones, cargando, recargar }
}
