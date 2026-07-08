// PATRON MOCK. Misma firma que la query real. Reetiquetado para restaurante.
export type Thread = { id: string; name: string; last: string; time: string; unread: number }
export type Message = { id: string; from: "cliente" | "vos"; text: string; time: string }

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export async function getThreads(): Promise<Thread[]> {
  await sleep(300)
  return [
    { id: "1", name: "Valentina Ferro", last: "Genial, reservo mesa para 4 el sabado", time: "14:32", unread: 2 },
    { id: "2", name: "Martin Aguirre", last: "Tienen opciones sin TACC?", time: "13:10", unread: 0 },
    { id: "3", name: "Carla Benitez", last: "El menu del dia sigue disponible?", time: "11:45", unread: 0 },
    { id: "4", name: "Nicolas Roldan", last: "Hacen delivery a Belgrano?", time: "10:20", unread: 1 },
  ]
}

export async function getMessages(_threadId: string): Promise<Message[]> {
  await sleep(200)
  return [
    { id: "1", from: "cliente", text: "Hola! Quiero reservar una mesa para el sabado a la noche", time: "14:20" },
    { id: "2", from: "vos", text: "Hola Valentina! Para cuantas personas y a que hora?", time: "14:22" },
    { id: "3", from: "cliente", text: "Somos 4, tipo 21:30", time: "14:28" },
    { id: "4", from: "vos", text: "Perfecto, tengo mesa disponible. Te la reservo?", time: "14:30" },
    { id: "5", from: "cliente", text: "Genial, reservo mesa para 4 el sabado", time: "14:32" },
  ]
}
