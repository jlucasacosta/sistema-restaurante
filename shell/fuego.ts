// fuego.ts · El reloj de la cocina, en un solo lugar.
// Un ticket envejece por temperatura: brasa -> ambar -> rojo aji.
// Los umbrales viven en theme.fuego. Ningun componente inventa un numero magico
// ni escribe un color: solo pide la clase.
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
  ok: "border-primary",
  ambar: "border-warning",
  tarde: "border-danger",
}
export const textoDeFuego: Record<Nivel, string> = {
  ok: "text-primary",
  ambar: "text-warning",
  tarde: "text-danger",
}
export const rellenoDeFuego: Record<Nivel, string> = {
  ok: "bg-primary",
  ambar: "bg-warning",
  tarde: "bg-danger",
}

export function mmss(segundos: number) {
  const m = Math.floor(segundos / 60)
  const s = segundos % 60
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
}
