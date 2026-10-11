// fuego.ts · El reloj de la cocina, en un solo lugar.
// Un ticket envejece por tiempo: en tiempo -> atencion -> demorado.
// Los umbrales viven en theme.fuego. Ningun componente inventa un numero magico
// ni escribe un color: solo pide la clase.
//
// Decision 2026-10-11 (critica Impeccable): "en tiempo" deja de ser primary (brasa) y pasa a
// info. La brasa (#e2603b) y el rojo ají (#e2483d) son casi la misma familia: un ticket en
// tiempo se leia como uno demorado. El estado ademas lleva rotulo de texto + icono, nunca
// solo color.
import { AlertTriangle, Clock, Timer, type LucideIcon } from "lucide-react"
import { theme } from "./theme"

export type Nivel = "ok" | "ambar" | "tarde"

export function nivelDeFuego(segundos: number): Nivel {
  const min = segundos / 60
  if (min >= theme.fuego.demora) return "tarde"
  if (min >= theme.fuego.ok) return "ambar"
  return "ok"
}

// Mapas literales: Tailwind no ve clases armadas por concatenacion.
export const bordeDeFuego: Record<Nivel, string> = {
  ok: "border-info",
  ambar: "border-warning",
  tarde: "border-danger",
}
// Numeros grandes (cronometro): el color crudo alcanza.
export const textoDeFuego: Record<Nivel, string> = {
  ok: "text-info",
  ambar: "text-warning",
  tarde: "text-danger",
}
// Texto chico (rotulos): la tinta de danger llega a 4.5:1.
export const tintaDeFuego: Record<Nivel, string> = {
  ok: "text-info",
  ambar: "text-warning",
  tarde: "text-danger-ink",
}
export const rellenoDeFuego: Record<Nivel, string> = {
  ok: "bg-info",
  ambar: "bg-warning",
  tarde: "bg-danger",
}
export const rotuloDeFuego: Record<Nivel, string> = {
  ok: "En tiempo",
  ambar: "Atención",
  tarde: "Demorado",
}
export const iconoDeFuego: Record<Nivel, LucideIcon> = {
  ok: Timer,
  ambar: Clock,
  tarde: AlertTriangle,
}

export function mmss(segundos: number) {
  const m = Math.floor(segundos / 60)
  const s = segundos % 60
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
}
