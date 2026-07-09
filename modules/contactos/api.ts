// PATRON MOCK. Misma firma que la query real. Reetiquetado para restaurante (comensales).
// Datos ficticios: emails de patron VARIADO (ver CLAUDE.md §8), telefonos AR con
// prefijos de distintas ciudades (11, 351, 341, 261). Cero PII real.
export type Contact = {
  id: string
  name: string
  phone: string
  email: string
  visitas: number
  status: "frecuente" | "nuevo" | "vip" | "inactivo"
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export async function getContacts(): Promise<Contact[]> {
  await sleep(300)
  return [
    { id: "1", name: "Valentina Ferro", phone: "+54 9 11 4783-2610", email: "valentina.ferro@gmail.com", visitas: 24, status: "vip" },
    { id: "2", name: "Martin Aguirre", phone: "+54 9 11 6294-1187", email: "jaguirre@outlook.com", visitas: 9, status: "frecuente" },
    { id: "3", name: "Carla Benitez", phone: "+54 9 351 620-1934", email: "benitez.carla@hotmail.com", visitas: 12, status: "frecuente" },
    { id: "4", name: "Nicolas Roldan", phone: "+54 9 11 5840-3962", email: "nico.roldan90@gmail.com", visitas: 2, status: "nuevo" },
    { id: "5", name: "Julieta Campos", phone: "+54 9 341 902-6614", email: "julieta_campos@yahoo.com", visitas: 1, status: "nuevo" },
    { id: "6", name: "Ezequiel Paz", phone: "+54 9 11 7013-5528", email: "ezequielpaz@gmail.com", visitas: 0, status: "inactivo" },
    { id: "7", name: "Micaela Sarti", phone: "+54 9 261 801-7352", email: "msarti77@hotmail.com", visitas: 18, status: "vip" },
    { id: "8", name: "Bruno Lattanzio", phone: "+54 9 11 6672-2049", email: "reservas@brasacocina.com", visitas: 7, status: "frecuente" },
    { id: "9", name: "Selena Ojeda", phone: "+54 9 11 3390-7715", email: "selena.ojeda@gmail.com", visitas: 3, status: "nuevo" },
    { id: "10", name: "Priscila Godoy", phone: "+54 9 351 417-8820", email: "pgodoy@outlook.com", visitas: 15, status: "frecuente" },
    { id: "11", name: "Nahuel Zabala", phone: "+54 9 11 8842-3057", email: "nahuel_zabala@yahoo.com", visitas: 0, status: "inactivo" },
    { id: "12", name: "Ivana Cardozo", phone: "+54 9 11 4550-7268", email: "cardozo.ivana@hotmail.com", visitas: 21, status: "vip" },
    { id: "13", name: "Gaston Uriarte", phone: "+54 9 341 336-5029", email: "gastonuriarte@gmail.com", visitas: 6, status: "frecuente" },
    { id: "14", name: "Delfina Roldan", phone: "+54 9 11 6134-8890", email: "delfi.roldan88@gmail.com", visitas: 2, status: "nuevo" },
    { id: "15", name: "Ramiro Aguirre", phone: "+54 9 261 550-4417", email: "raguirre@outlook.com", visitas: 11, status: "frecuente" },
    { id: "16", name: "Ludmila Ferrari", phone: "+54 9 11 2117-4903", email: "ferrari.ludmila@hotmail.com", visitas: 1, status: "nuevo" },
    { id: "17", name: "Emanuel Prieto", phone: "+54 9 11 7446-2085", email: "emanuel_prieto@yahoo.com", visitas: 19, status: "vip" },
    { id: "18", name: "Sofia Maidana", phone: "+54 9 351 728-3364", email: "sofimaidana@gmail.com", visitas: 8, status: "frecuente" },
    { id: "19", name: "Alan Corvalan", phone: "+54 9 11 5739-1264", email: "acorvalan@outlook.com", visitas: 0, status: "inactivo" },
    { id: "20", name: "Julieta Naranjo", phone: "+54 9 341 615-8072", email: "juli.naranjo01@gmail.com", visitas: 3, status: "nuevo" },
    { id: "21", name: "Ezequiel Barrios", phone: "+54 9 11 6708-4429", email: "eze_barrios@yahoo.com", visitas: 13, status: "frecuente" },
    { id: "22", name: "Mora Cantero", phone: "+54 9 11 5240-9976", email: "mcantero90@hotmail.com", visitas: 27, status: "vip" },
    { id: "23", name: "Ignacio Rivarola", phone: "+54 9 261 803-1129", email: "nacho.rivarola@gmail.com", visitas: 5, status: "frecuente" },
    { id: "24", name: "Abril Sanguinetti", phone: "+54 9 11 3623-5108", email: "asanguinetti@outlook.com", visitas: 1, status: "nuevo" },
    { id: "25", name: "Lisandro Moyano", phone: "+54 9 351 490-2731", email: "lisandromoyano@gmail.com", visitas: 0, status: "inactivo" },
    { id: "26", name: "Guadalupe Tessa", phone: "+54 9 11 1439-6650", email: "guada_tessa@yahoo.com", visitas: 16, status: "vip" },
    { id: "27", name: "Benicio Lauria", phone: "+54 9 341 706-3384", email: "blauria@hotmail.com", visitas: 4, status: "frecuente" },
    { id: "28", name: "Antonella Prado", phone: "+54 9 11 2851-9047", email: "prado.antonella@gmail.com", visitas: 2, status: "nuevo" },
    { id: "29", name: "Valentin Ocampo", phone: "+54 9 261 639-1720", email: "vocampo85@yahoo.com", visitas: 0, status: "inactivo" },
    { id: "30", name: "Camila Duarte", phone: "+54 9 11 4718-8562", email: "camila.duarte@gmail.com", visitas: 22, status: "vip" },
  ]
}
