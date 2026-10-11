"use client"
import { useCallback, useEffect, useRef, useState } from "react"

// pista-scroll.ts · Avisa que hay mas contenido por scrollear (critica Impeccable, punto 3).
// Devuelve un ref para el contenedor scrolleable y la clase `.pista-x` / `.pista-y` (degrade
// en el borde, definido en globals.css) mientras quede contenido fuera de vista.
// `dep` vuelve a medir cuando cambia el contenido (por ejemplo la cantidad de tarjetas).
export function usePistaScroll<T extends HTMLElement>(eje: "x" | "y", dep?: unknown) {
  const ref = useRef<T>(null)
  const [hayMas, setHayMas] = useState(false)

  const medir = useCallback(() => {
    const el = ref.current
    if (!el) return
    const resto =
      eje === "x"
        ? el.scrollWidth - el.clientWidth - el.scrollLeft
        : el.scrollHeight - el.clientHeight - el.scrollTop
    setHayMas(resto > 4)
  }, [eje])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    medir()
    el.addEventListener("scroll", medir, { passive: true })
    window.addEventListener("resize", medir)
    return () => {
      el.removeEventListener("scroll", medir)
      window.removeEventListener("resize", medir)
    }
  }, [medir, dep])

  const clase = hayMas ? (eje === "x" ? "pista-x" : "pista-y") : ""
  return { ref, clase }
}
