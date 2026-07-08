// PATRON MOCK. Misma firma que la query real. Ver BACKEND.md.
export type Estado = { id: string; nombre: string }
export type Comanda = {
  id: string
  mesa: string
  items: string[]
  total: string
  estadoId: string
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export async function getEstados(): Promise<Estado[]> {
  await sleep(200)
  return [
    { id: "recepcion", nombre: "Recibida" },
    { id: "cocina", nombre: "En cocina" },
    { id: "listo", nombre: "Lista" },
    { id: "entregado", nombre: "Entregada" },
  ]
}

export async function getComandas(): Promise<Comanda[]> {
  await sleep(300)
  return [
    { id: "1", mesa: "Mesa 7", items: ["Bife de chorizo", "Provoleta", "Malbec x2"], total: "$ 22.700", estadoId: "recepcion" },
    { id: "2", mesa: "Mesa 3", items: ["Milanesa napo", "Limonada"], total: "$ 12.200", estadoId: "recepcion" },
    { id: "3", mesa: "Delivery #418", items: ["Empanadas x6", "Flan casero"], total: "$ 11.100", estadoId: "cocina" },
    { id: "4", mesa: "Mesa 5", items: ["Ravioles", "Agua con gas"], total: "$ 9.900", estadoId: "cocina" },
    { id: "5", mesa: "Barra 2", items: ["Volcan de chocolate", "Cafe"], total: "$ 6.300", estadoId: "listo" },
    { id: "6", mesa: "Salon 12", items: ["Bife x2", "Provoleta", "Vino botella"], total: "$ 38.400", estadoId: "listo" },
    { id: "7", mesa: "Mesa 1", items: ["Milanesa napo", "Flan"], total: "$ 13.300", estadoId: "entregado" },
  ]
}
