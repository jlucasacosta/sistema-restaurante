// PATRON MOCK. Misma firma que la query real. Ver BACKEND.md.
// La comanda es la unidad de trabajo de la cocina. `firedHace` son los segundos
// transcurridos desde que se disparo: el cronometro arranca de ahi y sigue
// corriendo en el cliente. En el backend real sale de now() - fired_at.
// Data en ./data.json (solo lectura; F5 restaura).
import raw from "./data.json"

export type Item = { qty: number; nombre: string; mod?: string }
export type Comanda = {
  id: string
  mesa: string
  mozo: string
  estado: "en cocina" | "emplatando" | "listo"
  estacion: "parrilla" | "fria" | "salsas" | "postres"
  firedHace: number
  objetivo: number
  items: Item[]
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export async function getComandas(): Promise<Comanda[]> {
  await sleep(300)
  return structuredClone(raw.comandas) as Comanda[]
}

// Firma estable: contra el backend real esto es un UPDATE + evento realtime.
export async function avanzarComanda(_id: string): Promise<void> {
  await sleep(120)
}
