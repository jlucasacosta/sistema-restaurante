// PATRON MOCK. Misma firma que la query real. Reetiquetado para restaurante.
export type Contact = {
  id: string
  name: string
  phone: string
  email: string
  status: "activo" | "nuevo" | "perdido"
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export async function getContacts(): Promise<Contact[]> {
  await sleep(300)
  return [
    { id: "1", name: "Valentina Ferro", phone: "+54 11 5555 1234", email: "valentina@mail.com", status: "activo" },
    { id: "2", name: "Martin Aguirre", phone: "+54 11 5555 2233", email: "martin@mail.com", status: "nuevo" },
    { id: "3", name: "Carla Benitez", phone: "+54 11 5555 7788", email: "carla@mail.com", status: "activo" },
    { id: "4", name: "Nicolas Roldan", phone: "+54 11 5555 3311", email: "nicolas@mail.com", status: "nuevo" },
    { id: "5", name: "Julieta Campos", phone: "+54 11 5555 9021", email: "julieta@mail.com", status: "perdido" },
  ]
}
