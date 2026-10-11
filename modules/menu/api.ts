// PATRON MOCK. Misma firma que la query real. Ver BACKEND.md.
// La carta ES secciones: el arquetipo del modulo (acordeon) sale del dato, no al reves.
// Data en ./data.json (solo lectura; F5 restaura).
import raw from "./data.json"

export type Plato = {
  id: string
  nombre: string
  descripcion: string
  precio: string
  estado: "disponible" | "pocas porciones" | "agotado"
  vendidosHoy: number
}
export type Seccion = { id: string; nombre: string; platos: Plato[] }

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export async function getCarta(): Promise<Seccion[]> {
  await sleep(300)
  return structuredClone(raw.carta) as Seccion[]
}
