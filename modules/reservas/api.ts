// PATRON MOCK. Misma firma que la query real. Reetiquetado para restaurante.
export type Reserva = {
  id: string
  cliente: string
  turno: "almuerzo" | "cena"
  hora: string
  personas: number
  mesa: string
  estado: "confirmada" | "pendiente" | "no-show" | "cancelada"
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export async function getReservas(): Promise<Reserva[]> {
  await sleep(300)
  return [
    { id: "1", cliente: "Camila Duarte", turno: "almuerzo", hora: "12:30", personas: 2, mesa: "Mesa 4", estado: "confirmada" },
    { id: "2", cliente: "Martin Aguirre", turno: "almuerzo", hora: "13:00", personas: 4, mesa: "Mesa 8", estado: "confirmada" },
    { id: "3", cliente: "Ivana Cardozo", turno: "almuerzo", hora: "13:15", personas: 3, mesa: "Salon 11", estado: "pendiente" },
    { id: "4", cliente: "Gaston Uriarte", turno: "almuerzo", hora: "13:30", personas: 2, mesa: "Barra 1", estado: "confirmada" },
    { id: "5", cliente: "Julieta Campos", turno: "almuerzo", hora: "13:45", personas: 5, mesa: "Salon 9", estado: "no-show" },
    { id: "6", cliente: "Bruno Lattanzio", turno: "almuerzo", hora: "14:00", personas: 2, mesa: "Mesa 3", estado: "cancelada" },
    { id: "7", cliente: "Sofia Maidana", turno: "cena", hora: "20:00", personas: 4, mesa: "Mesa 7", estado: "confirmada" },
    { id: "8", cliente: "Nicolas Roldan", turno: "cena", hora: "20:15", personas: 2, mesa: "Mesa 5", estado: "confirmada" },
    { id: "9", cliente: "Familia Ferro", turno: "cena", hora: "20:30", personas: 6, mesa: "Salon 12", estado: "pendiente" },
    { id: "10", cliente: "Ramiro Aguirre", turno: "cena", hora: "20:30", personas: 2, mesa: "Barra 2", estado: "confirmada" },
    { id: "11", cliente: "Micaela Sarti", turno: "cena", hora: "21:00", personas: 4, mesa: "Mesa 10", estado: "confirmada" },
    { id: "12", cliente: "Ezequiel Paz", turno: "cena", hora: "21:00", personas: 5, mesa: "Salon 9", estado: "pendiente" },
    { id: "13", cliente: "Delfina Roldan", turno: "cena", hora: "21:15", personas: 3, mesa: "Mesa 6", estado: "confirmada" },
    { id: "14", cliente: "Valentin Ocampo", turno: "cena", hora: "21:30", personas: 2, mesa: "Mesa 2", estado: "no-show" },
    { id: "15", cliente: "Antonella Prado", turno: "cena", hora: "21:30", personas: 4, mesa: "Salon 14", estado: "confirmada" },
    { id: "16", cliente: "Lisandro Moyano", turno: "cena", hora: "21:45", personas: 2, mesa: "Mesa 1", estado: "cancelada" },
    { id: "17", cliente: "Guadalupe Tessa", turno: "cena", hora: "22:00", personas: 8, mesa: "Salon 12", estado: "confirmada" },
    { id: "18", cliente: "Benicio Lauria", turno: "cena", hora: "22:00", personas: 2, mesa: "Barra 3", estado: "pendiente" },
    { id: "19", cliente: "Mora Cantero", turno: "cena", hora: "22:15", personas: 4, mesa: "Mesa 9", estado: "confirmada" },
    { id: "20", cliente: "Ignacio Rivarola", turno: "cena", hora: "22:30", personas: 3, mesa: "Salon 10", estado: "confirmada" },
    { id: "21", cliente: "Abril Sanguinetti", turno: "cena", hora: "22:45", personas: 2, mesa: "Mesa 5", estado: "pendiente" },
  ]
}
