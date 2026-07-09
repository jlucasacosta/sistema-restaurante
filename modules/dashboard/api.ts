// PATRON MOCK. Misma firma que la query real. Ver BACKEND.md.
// El dashboard RESUME la noche, no la opera. Arranca siempre en "este turno":
// no hay selector de periodo (ver DISENO.md §8, componente eliminado).

// El ticker corre: la cocina vive el ahora.
export type TickerItem = { id: string; label: string; valor: string; tono: "primary" | "accent" | "success" | "warning" | "danger" | "info" }
// Curva de servicio: cubiertos por hora.
export type HoraPunto = { hora: string; cubiertos: number }
// Cada orden viva en el Riel del Pase.
export type OrdenPase = { id: string; mesa: string; firedHace: number; objetivo: number; resumen: string }

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export async function getTicker(): Promise<TickerItem[]> {
  await sleep(250)
  return [
    { id: "1", label: "Cubiertos", valor: "128", tono: "primary" },
    { id: "2", label: "Ticket promedio", valor: "$ 32.400", tono: "success" },
    { id: "3", label: "Rotacion de mesa", valor: "74 min", tono: "info" },
    { id: "4", label: "Tickets abiertos", valor: "12", tono: "accent" },
    { id: "5", label: "Demorados", valor: "2", tono: "danger" },
    { id: "6", label: "Mesas ocupadas", valor: "13 / 20", tono: "warning" },
    { id: "7", label: "Platos agotados", valor: "3", tono: "danger" },
    { id: "8", label: "Reservas pendientes", valor: "6", tono: "info" },
  ]
}

// El hero-number: el tiempo promedio de fuego de la noche.
export async function getTiempoFuego(): Promise<{ promedio: string; objetivo: string; delta: number }> {
  await sleep(200)
  return { promedio: "9:12", objetivo: "8:00", delta: 14 }
}

export async function getCurvaServicio(): Promise<HoraPunto[]> {
  await sleep(300)
  return [
    { hora: "19", cubiertos: 8 },
    { hora: "20", cubiertos: 24 },
    { hora: "21", cubiertos: 47 },
    { hora: "22", cubiertos: 31 },
    { hora: "23", cubiertos: 14 },
    { hora: "00", cubiertos: 4 },
  ]
}

export async function getPase(): Promise<OrdenPase[]> {
  await sleep(300)
  return [
    { id: "1", mesa: "25", firedHace: 810, objetivo: 720, resumen: "Ojo de bife · Batatas" },
    { id: "2", mesa: "14", firedHace: 723, objetivo: 720, resumen: "2 Bife chorizo · Provoleta" },
    { id: "3", mesa: "11", firedHace: 640, objetivo: 600, resumen: "2 Risotto · Pesca del dia" },
    { id: "4", mesa: "07", firedHace: 512, objetivo: 720, resumen: "Entraña · Ensalada" },
    { id: "5", mesa: "31", firedHace: 402, objetivo: 600, resumen: "2 Cazuela de mariscos" },
    { id: "6", mesa: "22", firedHace: 388, objetivo: 600, resumen: "3 Sorrentinos · Ñoquis" },
    { id: "7", mesa: "09", firedHace: 274, objetivo: 300, resumen: "3 Rabas · Ceviche" },
    { id: "8", mesa: "02", firedHace: 205, objetivo: 240, resumen: "2 Flan casero" },
    { id: "9", mesa: "03", firedHace: 141, objetivo: 300, resumen: "2 Burrata · Tartar" },
    { id: "10", mesa: "18", firedHace: 61, objetivo: 720, resumen: "4 Asado de tira · 2 Chorizo" },
  ]
}
