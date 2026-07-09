// PATRON MOCK. Misma firma que la query real. Reetiquetado para restaurante.
export type Tone = "primary" | "accent" | "success" | "warning" | "danger" | "info"
export type Kpi = { label: string; value: string; delta: number; tone: Tone }
export type SalesPoint = { label: string; value: number }
export type Activity = { id: string; text: string; time: string; tone: Tone }

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export async function getKpis(): Promise<Kpi[]> {
  await sleep(300)
  return [
    { label: "Reservas hoy", value: "34", delta: 9, tone: "primary" },
    { label: "Cubiertos hoy", value: "112", delta: 15, tone: "info" },
    { label: "Ticket promedio", value: "$ 8.400", delta: 6, tone: "success" },
    { label: "No-shows", value: "4", delta: -2, tone: "danger" },
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
    { id: "1", text: "Nueva reserva: mesa para 4 a las 21:30", time: "hace 3 min", tone: "success" },
    { id: "2", text: "Comanda lista: Milanesa napolitana (Mesa 7)", time: "hace 12 min", tone: "info" },
    { id: "3", text: "Mesa 3 pidio la cuenta, mozo avisado", time: "hace 18 min", tone: "primary" },
    { id: "4", text: "Se agoto Ojo de bife: sacado de la carta", time: "hace 26 min", tone: "warning" },
    { id: "5", text: "No-show: reserva de Valentin Ocampo (2 pers)", time: "hace 34 min", tone: "danger" },
    { id: "6", text: "Pedido de delivery confirmado: $ 6.200", time: "hace 40 min", tone: "success" },
    { id: "7", text: "Comanda cancelada: Mesa 5 cambio el pedido", time: "hace 55 min", tone: "danger" },
    { id: "8", text: "Turno de las 22:00 completo (18/18 mesas)", time: "hace 1 h", tone: "info" },
    { id: "9", text: "Reseña nueva: 5 estrellas por la parrilla", time: "hace 2 h", tone: "accent" },
    { id: "10", text: "Stock bajo: quedan 3 botellas de Malbec de la casa", time: "hace 3 h", tone: "warning" },
    { id: "11", text: "Reserva confirmada: cumpleaños de 8 el viernes", time: "hace 4 h", tone: "success" },
    { id: "12", text: "Cocina abrio el turno noche con 6 comandas en cola", time: "hace 5 h", tone: "primary" },
  ]
}
