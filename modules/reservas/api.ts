// PATRON MOCK. Misma firma que la query real. Ver BACKEND.md.
// El salon es un plano, no una lista: cada mesa tiene posicion fisica (x,y en %),
// forma y estado. En el backend real x/y/forma viven en la tabla `mesas` (layout del salon)
// y el estado sale del join con `reservas` del turno.
// Data en ./data.json (solo lectura; F5 restaura).
import raw from "./data.json"

export type Mesa = {
  id: string
  numero: string
  x: number // % del ancho del salon
  y: number // % del alto
  forma: "cuadrada" | "redonda" | "larga"
  capacidad: number
  estado: "libre" | "sentada" | "por liberar" | "reservada"
  cliente?: string
  hora?: string // hora de la reserva, o de sentada
  minutos?: number // minutos que lleva ocupada
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export async function getMesas(): Promise<Mesa[]> {
  await sleep(300)
  return structuredClone(raw.mesas) as Mesa[]
}

export type ProximaLlegada = { id: string; hora: string; cliente: string; personas: number; nota?: string }

export async function getProximas(): Promise<ProximaLlegada[]> {
  await sleep(200)
  return structuredClone(raw.proximas) as ProximaLlegada[]
}
