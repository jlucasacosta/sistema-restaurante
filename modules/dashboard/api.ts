// PATRON MOCK. Misma firma que la query real. Ver BACKEND.md.
// El dashboard RESUME la noche, no la opera. Arranca siempre en "este turno":
// no hay selector de periodo (ver DISENO.md §8, componente eliminado).
// Data en ./data.json (solo lectura; F5 restaura).
import raw from "./data.json"

// Indicadores del turno (fila fija arriba del dashboard). `alerta` = algo que pide atención (rojo).
export type TickerItem = { id: string; label: string; valor: string; tono: "neutro" | "alerta" }
// Curva de servicio: cubiertos sentados cada 30 minutos ("19:30" = de 19:30 a 19:59).
export type HoraPunto = { hora: string; cubiertos: number }
// Cada comanda en curso (en cocina o emplatando) del Riel del Pase.
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
