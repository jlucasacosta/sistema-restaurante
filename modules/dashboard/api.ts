// PATRON MOCK. Misma firma que la query real. Ver BACKEND.md.
// El dashboard RESUME la noche, no la opera. Arranca siempre en "este turno":
// no hay selector de periodo (ver DISENO.md §8, componente eliminado).
// Data en ./data.json (solo lectura; F5 restaura).
import raw from "./data.json"

// El ticker corre: la cocina vive el ahora.
export type TickerItem = { id: string; label: string; valor: string; tono: "primary" | "accent" | "success" | "warning" | "danger" | "info" }
// Curva de servicio: cubiertos por hora.
export type HoraPunto = { hora: string; cubiertos: number }
// Cada orden viva en el Riel del Pase.
export type OrdenPase = { id: string; mesa: string; firedHace: number; objetivo: number; resumen: string }

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export async function getTicker(): Promise<TickerItem[]> {
  await sleep(250)
  return structuredClone(raw.ticker) as TickerItem[]
}

// El hero-number: el tiempo promedio de fuego de la noche.
export async function getTiempoFuego(): Promise<{ promedio: string; objetivo: string; delta: number }> {
  await sleep(200)
  return structuredClone(raw.tiempoFuego)
}

export async function getCurvaServicio(): Promise<HoraPunto[]> {
  await sleep(300)
  return structuredClone(raw.curvaServicio) as HoraPunto[]
}

export async function getPase(): Promise<OrdenPase[]> {
  await sleep(300)
  return structuredClone(raw.pase) as OrdenPase[]
}
