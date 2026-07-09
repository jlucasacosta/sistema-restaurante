// PATRON MOCK. Misma firma que la query real. Ver BACKEND.md.
// El salon es un plano, no una lista: cada mesa tiene posicion fisica (x,y en %),
// forma y estado. En el backend real x/y/forma viven en la tabla `mesas` (layout del salon)
// y el estado sale del join con `reservas` del turno.
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
  return [
    { id: "1", numero: "01", x: 8, y: 12, forma: "cuadrada", capacidad: 2, estado: "sentada", cliente: "Ferreyra", hora: "21:10", minutos: 38 },
    { id: "2", numero: "02", x: 24, y: 12, forma: "cuadrada", capacidad: 2, estado: "libre" },
    { id: "3", numero: "03", x: 40, y: 12, forma: "redonda", capacidad: 4, estado: "sentada", cliente: "Bilbao", hora: "21:25", minutos: 23 },
    { id: "4", numero: "05", x: 58, y: 12, forma: "redonda", capacidad: 4, estado: "por liberar", cliente: "Zunino", hora: "20:15", minutos: 93 },
    { id: "5", numero: "07", x: 76, y: 12, forma: "cuadrada", capacidad: 2, estado: "sentada", cliente: "Alcaraz", hora: "21:40", minutos: 8 },
    { id: "6", numero: "09", x: 90, y: 14, forma: "cuadrada", capacidad: 2, estado: "reservada", cliente: "Etchevers", hora: "22:00" },
    { id: "7", numero: "11", x: 10, y: 38, forma: "redonda", capacidad: 4, estado: "sentada", cliente: "Bustamante", hora: "21:00", minutos: 48 },
    { id: "8", numero: "12", x: 28, y: 40, forma: "larga", capacidad: 8, estado: "sentada", cliente: "Grupo Pizarro", hora: "20:45", minutos: 63 },
    { id: "9", numero: "14", x: 52, y: 40, forma: "redonda", capacidad: 4, estado: "sentada", cliente: "Recalde", hora: "21:30", minutos: 18 },
    { id: "10", numero: "16", x: 72, y: 38, forma: "cuadrada", capacidad: 2, estado: "libre" },
    { id: "11", numero: "18", x: 88, y: 40, forma: "redonda", capacidad: 4, estado: "sentada", cliente: "Ledesma", hora: "21:15", minutos: 33 },
    { id: "12", numero: "20", x: 12, y: 64, forma: "cuadrada", capacidad: 2, estado: "libre" },
    { id: "13", numero: "22", x: 30, y: 66, forma: "redonda", capacidad: 6, estado: "sentada", cliente: "Iturralde", hora: "21:05", minutos: 43 },
    { id: "14", numero: "24", x: 50, y: 66, forma: "cuadrada", capacidad: 2, estado: "por liberar", cliente: "Sanz", hora: "20:20", minutos: 88 },
    { id: "15", numero: "25", x: 66, y: 64, forma: "larga", capacidad: 10, estado: "reservada", cliente: "Cumpleaños Aristi", hora: "22:15" },
    { id: "16", numero: "28", x: 88, y: 66, forma: "redonda", capacidad: 4, estado: "libre" },
    { id: "17", numero: "30", x: 16, y: 88, forma: "cuadrada", capacidad: 2, estado: "sentada", cliente: "Nogueira", hora: "21:50", minutos: 3 },
    { id: "18", numero: "31", x: 36, y: 88, forma: "redonda", capacidad: 4, estado: "reservada", cliente: "Del Valle", hora: "22:30" },
    { id: "19", numero: "33", x: 58, y: 88, forma: "cuadrada", capacidad: 2, estado: "libre" },
    { id: "20", numero: "35", x: 80, y: 88, forma: "larga", capacidad: 8, estado: "sentada", cliente: "Grupo Otamendi", hora: "20:55", minutos: 53 },
  ]
}

export type ProximaLlegada = { id: string; hora: string; cliente: string; personas: number; nota?: string }

export async function getProximas(): Promise<ProximaLlegada[]> {
  await sleep(200)
  return [
    { id: "1", hora: "22:00", cliente: "Etchevers", personas: 2, nota: "mesa junto a la ventana" },
    { id: "2", hora: "22:15", cliente: "Cumpleaños Aristi", personas: 10, nota: "traen torta" },
    { id: "3", hora: "22:30", cliente: "Del Valle", personas: 4 },
    { id: "4", hora: "22:45", cliente: "Mendiburu", personas: 3, nota: "un celiaco" },
    { id: "5", hora: "23:00", cliente: "Ottonello", personas: 2 },
    { id: "6", hora: "23:15", cliente: "Grupo Vaccaro", personas: 6, nota: "llegan tarde, avisaron" },
  ]
}
