// PATRON MOCK. Misma firma que la query real. Ver BACKEND.md.
export type Reserva = {
  id: string
  cliente: string
  hora: string
  personas: number
  mesa: string
  estado: "confirmada" | "pendiente" | "cancelada"
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export async function getReservas(): Promise<Reserva[]> {
  await sleep(300)
  return [
    { id: "1", cliente: "Valentina Ferro", hora: "20:00", personas: 4, mesa: "Mesa 7", estado: "confirmada" },
    { id: "2", cliente: "Martin Aguirre", hora: "20:30", personas: 2, mesa: "Mesa 3", estado: "confirmada" },
    { id: "3", cliente: "Familia Roldan", hora: "21:00", personas: 6, mesa: "Salon 12", estado: "pendiente" },
    { id: "4", cliente: "Carla Benitez", hora: "21:15", personas: 3, mesa: "Mesa 5", estado: "confirmada" },
    { id: "5", cliente: "Julieta Campos", hora: "21:30", personas: 2, mesa: "Barra 2", estado: "cancelada" },
    { id: "6", cliente: "Ezequiel Paz", hora: "22:00", personas: 5, mesa: "Salon 9", estado: "pendiente" },
  ]
}
