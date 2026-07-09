// PATRON MOCK. Misma firma que la query real. Ver BACKEND.md.
// El comensal no es una fila de tabla: es una ficha con historia.
// Emails de patron variado y telefonos plausibles (CLAUDE.md §8).
export type Comensal = {
  id: string
  name: string
  phone: string
  email: string
  visitas: number
  favorito: string
  ultima: string
  tipo: "vip" | "frecuente" | "nuevo" | "inactivo"
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export async function getContacts(): Promise<Comensal[]> {
  await sleep(300)
  return [
    { id: "1", name: "Mariana Ferreyra", phone: "+54 9 11 4783-2610", email: "mariana.ferreyra@gmail.com", visitas: 34, favorito: "Bife de chorizo", ultima: "hace 4 dias", tipo: "vip" },
    { id: "2", name: "Ignacio Bilbao", phone: "+54 9 11 6294-1187", email: "ibilbao@outlook.com", visitas: 21, favorito: "Sorrentinos de osobuco", ultima: "hace 9 dias", tipo: "vip" },
    { id: "3", name: "Lorena Zunino", phone: "+54 9 11 3126-8074", email: "zunino.lorena@hotmail.com", visitas: 17, favorito: "Risotto de hongos", ultima: "ayer", tipo: "frecuente" },
    { id: "4", name: "Emilio Alcaraz", phone: "+54 9 11 5840-3962", email: "emi.alcaraz90@gmail.com", visitas: 12, favorito: "Entraña", ultima: "hace 2 dias", tipo: "frecuente" },
    { id: "5", name: "Sabrina Etchevers", phone: "+54 9 11 2957-6431", email: "sabri_etchevers@yahoo.com", visitas: 9, favorito: "Pesca del dia", ultima: "hace 3 semanas", tipo: "frecuente" },
    { id: "6", name: "Hernan Bustamante", phone: "+54 9 351 620-1934", email: "hbustamante77@hotmail.com", visitas: 28, favorito: "Asado de tira", ultima: "hace 6 dias", tipo: "vip" },
    { id: "7", name: "Cecilia Pizarro", phone: "+54 9 11 7013-5528", email: "ceciliapizarro@gmail.com", visitas: 15, favorito: "Provoleta", ultima: "hace 11 dias", tipo: "frecuente" },
    { id: "8", name: "Diego Recalde", phone: "+54 9 11 4406-9173", email: "recalde.diego@outlook.com", visitas: 6, favorito: "Milanesa napolitana", ultima: "hace 5 dias", tipo: "frecuente" },
    { id: "9", name: "Valeria Ledesma", phone: "+54 9 11 6672-2049", email: "vale.ledesma@gmail.com", visitas: 3, favorito: "Burrata de la casa", ultima: "hace 8 dias", tipo: "nuevo" },
    { id: "10", name: "Ramiro Iturralde", phone: "+54 9 341 902-6614", email: "riturralde@gmail.com", visitas: 41, favorito: "Ojo de bife", ultima: "hoy", tipo: "vip" },
    { id: "11", name: "Paula Sanz", phone: "+54 9 11 5217-4486", email: "paula_sanz@yahoo.com", visitas: 2, favorito: "Rabas", ultima: "hace 2 dias", tipo: "nuevo" },
    { id: "12", name: "Joaquin Nogueira", phone: "+54 9 11 8842-3057", email: "joaconogueira@gmail.com", visitas: 19, favorito: "Cazuela de mariscos", ultima: "hace 4 dias", tipo: "frecuente" },
    { id: "13", name: "Andrea Del Valle", phone: "+54 9 11 4550-7268", email: "adelvalle@hotmail.com", visitas: 8, favorito: "Flan casero", ultima: "hace 16 dias", tipo: "frecuente" },
    { id: "14", name: "Martin Otamendi", phone: "+54 9 261 801-7352", email: "martin.otamendi@gmail.com", visitas: 24, favorito: "Bife de chorizo", ultima: "hace 7 dias", tipo: "vip" },
    { id: "15", name: "Silvina Aristi", phone: "+54 9 11 6134-8890", email: "silvi.aristi@outlook.com", visitas: 5, favorito: "Volcan de chocolate", ultima: "hace mes y medio", tipo: "inactivo" },
    { id: "16", name: "Federico Mendiburu", phone: "+54 9 11 2117-4903", email: "fmendiburu@gmail.com", visitas: 11, favorito: "Ñoquis caseros", ultima: "hace 12 dias", tipo: "frecuente" },
    { id: "17", name: "Carla Ottonello", phone: "+54 9 11 7446-2085", email: "carla_ottonello@yahoo.com", visitas: 1, favorito: "Empanadas de carne", ultima: "hace 3 dias", tipo: "nuevo" },
    { id: "18", name: "Nicolas Vaccaro", phone: "+54 9 11 3852-6640", email: "nico.vaccaro@gmail.com", visitas: 14, favorito: "Ceviche de la casa", ultima: "hace 2 meses", tipo: "inactivo" },
    { id: "19", name: "Rocio Bilbao", phone: "+54 9 11 5739-1264", email: "rociobilbao@hotmail.com", visitas: 7, favorito: "Tartar de trucha", ultima: "hace 10 dias", tipo: "frecuente" },
    { id: "20", name: "Tomas Larrosa", phone: "+54 9 11 2965-8317", email: "tomilarrosa88@gmail.com", visitas: 4, favorito: "Humita en chala", ultima: "hace 6 dias", tipo: "nuevo" },
    { id: "21", name: "Julia Mansilla", phone: "+54 9 11 6708-4429", email: "mansilla.julia@outlook.com", visitas: 31, favorito: "Pesca del dia", ultima: "hace 3 dias", tipo: "vip" },
    { id: "22", name: "Gabriel Sarasola", phone: "+54 9 11 5240-9976", email: "gabosarasola@gmail.com", visitas: 2, favorito: "Cerveza artesanal", ultima: "hace 2 meses", tipo: "inactivo" },
    { id: "23", name: "Belen Casartelli", phone: "+54 9 11 3623-5108", email: "belu_casartelli@yahoo.com", visitas: 16, favorito: "Malbec de la casa", ultima: "ayer", tipo: "frecuente" },
    { id: "24", name: "Alejo Zubiaurre", phone: "+54 9 11 9584-2731", email: "azubiaurre@gmail.com", visitas: 23, favorito: "Asado de tira", ultima: "hace 5 dias", tipo: "vip" },
  ]
}
