// PATRON MOCK. Misma firma que la query real. Reetiquetado para restaurante.
export type EstadoCocina = "pendiente" | "preparacion" | "servida" | "cancelada"
export type Estado = { id: EstadoCocina; nombre: string }
export type Comanda = {
  id: string
  mesa: string
  items: string[]
  total: string
  estadoId: EstadoCocina
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export async function getEstados(): Promise<Estado[]> {
  await sleep(200)
  return [
    { id: "pendiente", nombre: "Pendiente" },
    { id: "preparacion", nombre: "En preparacion" },
    { id: "servida", nombre: "Servida" },
    { id: "cancelada", nombre: "Cancelada" },
  ]
}

export async function getComandas(): Promise<Comanda[]> {
  await sleep(300)
  return [
    { id: "1", mesa: "Mesa 7", items: ["Bife de chorizo", "Provoleta", "Malbec x2"], total: "$ 22.700", estadoId: "pendiente" },
    { id: "2", mesa: "Mesa 3", items: ["Milanesa napo", "Limonada"], total: "$ 12.200", estadoId: "pendiente" },
    { id: "3", mesa: "Delivery #418", items: ["Empanadas x6", "Flan casero"], total: "$ 11.100", estadoId: "pendiente" },
    { id: "4", mesa: "Salon 12", items: ["Asado de tira", "Rabas", "Agua x2"], total: "$ 24.500", estadoId: "pendiente" },
    { id: "5", mesa: "Barra 1", items: ["Sorrentinos", "Cerveza pinta"], total: "$ 11.700", estadoId: "pendiente" },
    { id: "6", mesa: "Mesa 10", items: ["Pollo al horno", "Bruschettas"], total: "$ 12.800", estadoId: "pendiente" },
    { id: "7", mesa: "Mesa 5", items: ["Ravioles", "Agua con gas"], total: "$ 9.900", estadoId: "preparacion" },
    { id: "8", mesa: "Salon 9", items: ["Bife x2", "Provoleta", "Vino botella"], total: "$ 38.400", estadoId: "preparacion" },
    { id: "9", mesa: "Delivery #421", items: ["Milanesa napo", "Gaseosa"], total: "$ 11.500", estadoId: "preparacion" },
    { id: "10", mesa: "Mesa 8", items: ["Bondiola braseada", "Tabla de fiambres"], total: "$ 18.900", estadoId: "preparacion" },
    { id: "11", mesa: "Barra 2", items: ["Risotto de hongos", "Limonada"], total: "$ 12.500", estadoId: "preparacion" },
    { id: "12", mesa: "Mesa 4", items: ["Mollejas", "Asado de tira", "Malbec copa"], total: "$ 23.100", estadoId: "preparacion" },
    { id: "13", mesa: "Mesa 6", items: ["Volcan de chocolate", "Cafe x2"], total: "$ 6.300", estadoId: "servida" },
    { id: "14", mesa: "Salon 14", items: ["Sorrentinos x2", "Agua saborizada"], total: "$ 19.100", estadoId: "servida" },
    { id: "15", mesa: "Mesa 1", items: ["Milanesa napo", "Flan"], total: "$ 13.300", estadoId: "servida" },
    { id: "16", mesa: "Barra 3", items: ["Tiramisu", "Cafe"], total: "$ 5.600", estadoId: "servida" },
    { id: "17", mesa: "Mesa 2", items: ["Provoleta", "Empanadas x3", "Cerveza"], total: "$ 10.900", estadoId: "servida" },
    { id: "18", mesa: "Mesa 9", items: ["Ojo de bife", "Papas"], total: "$ 15.400", estadoId: "cancelada" },
    { id: "19", mesa: "Delivery #417", items: ["Salmon grillado"], total: "$ 14.200", estadoId: "cancelada" },
    { id: "20", mesa: "Salon 10", items: ["Ravioles", "Vino copa"], total: "$ 11.600", estadoId: "cancelada" },
  ]
}
