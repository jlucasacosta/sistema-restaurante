// PATRON MOCK. Misma firma que la query real. Ver BACKEND.md.
// El comensal no es una fila de tabla: es una ficha con historia.
// Emails de patron variado y telefonos plausibles (CLAUDE.md §8).
// Data en ./data.json (solo lectura; F5 restaura).
import raw from "./data.json"

export type Comensal = {
  id: string
  name: string
  phone: string
  email: string
  visitas: number
  favorito: string
  ultima: string
  tipo: "vip" | "frecuente" | "nuevo" | "inactivo"
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export async function getContacts(): Promise<Comensal[]> {
  await sleep(300)
  return structuredClone(raw.contacts) as Comensal[]
}
