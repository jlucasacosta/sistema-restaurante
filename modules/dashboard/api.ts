// PATRON MOCK. Misma firma que la query real. Reetiquetado para restaurante.
export type Kpi = { label: string; value: string; delta: number }
export type SalesPoint = { label: string; value: number }
export type Activity = { id: string; text: string; time: string }

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export async function getKpis(): Promise<Kpi[]> {
  await sleep(300)
  return [
    { label: "Reservas hoy", value: "34", delta: 9 },
    { label: "Cubiertos hoy", value: "112", delta: 15 },
    { label: "Ticket promedio", value: "$ 8.400", delta: 6 },
    { label: "Comandas activas", value: "8", delta: -3 },
  ]
}

export async function getSales(): Promise<SalesPoint[]> {
  await sleep(300)
  return [
    { label: "Lun", value: 62 },
    { label: "Mar", value: 74 },
    { label: "Mie", value: 58 },
    { label: "Jue", value: 96 },
    { label: "Vie", value: 138 },
    { label: "Sab", value: 152 },
    { label: "Dom", value: 121 },
  ]
}

export async function getActivity(): Promise<Activity[]> {
  await sleep(300)
  return [
    { id: "1", text: "Nueva reserva: mesa para 4 a las 21:30", time: "hace 3 min" },
    { id: "2", text: "Comanda lista: Milanesa napolitana (Mesa 7)", time: "hace 12 min" },
    { id: "3", text: "Pedido de delivery confirmado: $ 6.200", time: "hace 40 min" },
    { id: "4", text: "Reseña nueva: 5 estrellas por la parrilla", time: "hace 2 h" },
  ]
}
