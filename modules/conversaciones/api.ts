// PATRON MOCK. Misma firma que la query real. Reetiquetado para restaurante.
export type Thread = { id: string; name: string; last: string; time: string; unread: number }
export type Message = { id: string; from: "cliente" | "vos"; text: string; time: string }

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export async function getThreads(): Promise<Thread[]> {
  await sleep(300)
  return [
    { id: "1", name: "Valentina Ferro", last: "Genial, reservo mesa para 4 el sabado", time: "16:12", unread: 2 },
    { id: "2", name: "Martin Aguirre", last: "Tienen opciones sin TACC?", time: "15:47", unread: 0 },
    { id: "3", name: "Carla Benitez", last: "El menu del dia sigue disponible?", time: "14:30", unread: 1 },
    { id: "4", name: "Nicolas Roldan", last: "Hacen delivery a Belgrano?", time: "13:58", unread: 3 },
    { id: "5", name: "Micaela Sarti", last: "Se puede llevar torta para un cumple?", time: "13:12", unread: 0 },
    { id: "6", name: "Ivana Cardozo", last: "Quiero cambiar la reserva a las 22", time: "12:40", unread: 1 },
    { id: "7", name: "Ezequiel Paz", last: "Aceptan tarjeta o solo efectivo?", time: "12:05", unread: 0 },
    { id: "8", name: "Sofia Maidana", last: "Cuanto tarda el delivery mas o menos?", time: "11:22", unread: 0 },
    { id: "9", name: "Bruno Lattanzio", last: "Necesito la factura del consumo de ayer", time: "10:48", unread: 1 },
    { id: "10", name: "Julieta Naranjo", last: "Tienen mesa afuera para fumar?", time: "10:15", unread: 0 },
    { id: "11", name: "Gaston Uriarte", last: "El bife de chorizo viene con guarnicion?", time: "09:40", unread: 0 },
    { id: "12", name: "Mora Cantero", last: "Mi reserva quedo confirmada?", time: "09:05", unread: 2 },
    { id: "13", name: "Delfina Roldan", last: "Hay opciones veganas en la carta?", time: "Ayer", unread: 0 },
    { id: "14", name: "Emanuel Prieto", last: "Gracias! Estuvo todo espectacular", time: "Ayer", unread: 0 },
  ]
}

const conversaciones: Record<string, Message[]> = {
  "1": [
    { id: "1", from: "cliente", text: "Hola! Quiero reservar una mesa para el sabado a la noche", time: "15:52" },
    { id: "2", from: "vos", text: "Hola Valentina! Para cuantas personas y a que hora?", time: "15:58" },
    { id: "3", from: "cliente", text: "Somos 4, tipo 21:30", time: "16:04" },
    { id: "4", from: "vos", text: "Perfecto, tengo la Mesa 7 disponible. Te la reservo?", time: "16:08" },
    { id: "5", from: "cliente", text: "Genial, reservo mesa para 4 el sabado", time: "16:12" },
  ],
  "3": [
    { id: "1", from: "cliente", text: "Buenas! El menu del dia de hoy cual es?", time: "14:10" },
    { id: "2", from: "vos", text: "Hola Carla! Hoy es milanesa napolitana con papas + postre y bebida", time: "14:18" },
    { id: "3", from: "cliente", text: "Que precio tiene?", time: "14:24" },
    { id: "4", from: "vos", text: "$ 9.400 el menu completo, hasta las 15hs", time: "14:27" },
    { id: "5", from: "cliente", text: "El menu del dia sigue disponible?", time: "14:30" },
  ],
  "4": [
    { id: "1", from: "cliente", text: "Hola, hacen delivery a Belgrano?", time: "13:30" },
    { id: "2", from: "vos", text: "Hola Nicolas! Si, llegamos a Belgrano. El envio ronda los 30-40 min", time: "13:38" },
    { id: "3", from: "cliente", text: "Buenisimo. Tienen minimo de pedido?", time: "13:44" },
    { id: "4", from: "vos", text: "Minimo $ 5.000. Te paso el link del menu para pedir?", time: "13:50" },
    { id: "5", from: "cliente", text: "Hacen delivery a Belgrano?", time: "13:58" },
  ],
  "6": [
    { id: "1", from: "cliente", text: "Hola! Tenia reserva a las 21 pero se nos complico", time: "12:20" },
    { id: "2", from: "vos", text: "Hola Ivana! Sin problema, a que hora te queda mejor?", time: "12:28" },
    { id: "3", from: "cliente", text: "Podria ser a las 22?", time: "12:34" },
    { id: "4", from: "vos", text: "Listo, te muevo la reserva a las 22. Sigue para 6 personas?", time: "12:37" },
    { id: "5", from: "cliente", text: "Quiero cambiar la reserva a las 22", time: "12:40" },
  ],
  "12": [
    { id: "1", from: "cliente", text: "Hola, hice una reserva por la web recien", time: "08:40" },
    { id: "2", from: "vos", text: "Hola Mora! La veo: viernes 21:00, 4 personas. Quedo confirmada", time: "08:52" },
    { id: "3", from: "cliente", text: "Perfecto! Se puede pedir mesa en el salon del fondo?", time: "08:58" },
    { id: "4", from: "vos", text: "Te dejo anotada la preferencia, la confirmamos ese dia segun ocupacion", time: "09:01" },
    { id: "5", from: "cliente", text: "Mi reserva quedo confirmada?", time: "09:05" },
  ],
}

const generico: Message[] = [
  { id: "1", from: "cliente", text: "Hola! Consulta rapida sobre el restaurante", time: "09:10" },
  { id: "2", from: "vos", text: "Hola! Contame, te ayudo", time: "09:14" },
  { id: "3", from: "cliente", text: "Que horario tienen de cocina?", time: "09:20" },
  { id: "4", from: "vos", text: "De martes a domingo, de 20 a 00:30. Los lunes cerramos", time: "09:26" },
  { id: "5", from: "cliente", text: "Perfecto, gracias!", time: "09:31" },
]

export async function getMessages(threadId: string): Promise<Message[]> {
  await sleep(200)
  return conversaciones[threadId] ?? generico
}
