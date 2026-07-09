// PATRON MOCK. Misma firma que la query real. Ver BACKEND.md.
// La comanda es la unidad de trabajo de la cocina. `firedHace` son los segundos
// transcurridos desde que se disparo: el cronometro arranca de ahi y sigue
// corriendo en el cliente. En el backend real sale de now() - fired_at.
export type Item = { qty: number; nombre: string; mod?: string }
export type Comanda = {
  id: string
  mesa: string
  mozo: string
  estado: "en cocina" | "emplatando" | "listo"
  estacion: "parrilla" | "fria" | "salsas" | "postres"
  firedHace: number
  objetivo: number
  items: Item[]
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export async function getComandas(): Promise<Comanda[]> {
  await sleep(300)
  return [
    { id: "1", mesa: "14", mozo: "Ivo", estado: "en cocina", estacion: "parrilla", firedHace: 723, objetivo: 720, items: [
      { qty: 2, nombre: "Bife de chorizo", mod: "uno jugoso, uno a punto" },
      { qty: 1, nombre: "Provoleta" },
      { qty: 2, nombre: "Papas rusticas" },
    ] },
    { id: "2", mesa: "07", mozo: "Nadia", estado: "en cocina", estacion: "parrilla", firedHace: 512, objetivo: 720, items: [
      { qty: 1, nombre: "Entraña", mod: "sin sal" },
      { qty: 1, nombre: "Ensalada de estacion" },
    ] },
    { id: "3", mesa: "22", mozo: "Ivo", estado: "en cocina", estacion: "salsas", firedHace: 388, objetivo: 600, items: [
      { qty: 3, nombre: "Sorrentinos de osobuco" },
      { qty: 1, nombre: "Ñoquis", mod: "sin manteca" },
    ] },
    { id: "4", mesa: "03", mozo: "Ruben", estado: "en cocina", estacion: "fria", firedHace: 141, objetivo: 300, items: [
      { qty: 2, nombre: "Burrata de la casa" },
      { qty: 1, nombre: "Tartar de trucha", mod: "sin cebolla" },
    ] },
    { id: "5", mesa: "18", mozo: "Nadia", estado: "en cocina", estacion: "parrilla", firedHace: 61, objetivo: 720, items: [
      { qty: 4, nombre: "Asado de tira" },
      { qty: 2, nombre: "Chorizo criollo" },
    ] },
    { id: "6", mesa: "11", mozo: "Ivo", estado: "emplatando", estacion: "salsas", firedHace: 640, objetivo: 600, items: [
      { qty: 2, nombre: "Risotto de hongos" },
      { qty: 1, nombre: "Pesca del dia", mod: "coccion media" },
    ] },
    { id: "7", mesa: "09", mozo: "Ruben", estado: "emplatando", estacion: "fria", firedHace: 274, objetivo: 300, items: [
      { qty: 3, nombre: "Rabas" },
      { qty: 1, nombre: "Ceviche de la casa" },
    ] },
    { id: "8", mesa: "25", mozo: "Nadia", estado: "emplatando", estacion: "parrilla", firedHace: 810, objetivo: 720, items: [
      { qty: 1, nombre: "Ojo de bife", mod: "bien cocido" },
      { qty: 1, nombre: "Batatas al romero" },
    ] },
    { id: "9", mesa: "02", mozo: "Ivo", estado: "listo", estacion: "postres", firedHace: 205, objetivo: 240, items: [
      { qty: 2, nombre: "Flan casero", mod: "doble dulce" },
    ] },
    { id: "10", mesa: "16", mozo: "Ruben", estado: "listo", estacion: "fria", firedHace: 190, objetivo: 300, items: [
      { qty: 2, nombre: "Empanadas de carne" },
      { qty: 1, nombre: "Humita" },
    ] },
    { id: "11", mesa: "05", mozo: "Nadia", estado: "listo", estacion: "postres", firedHace: 168, objetivo: 240, items: [
      { qty: 1, nombre: "Volcan de chocolate" },
      { qty: 2, nombre: "Helado artesanal" },
    ] },
    { id: "12", mesa: "31", mozo: "Ivo", estado: "listo", estacion: "salsas", firedHace: 402, objetivo: 600, items: [
      { qty: 2, nombre: "Cazuela de mariscos" },
    ] },
  ]
}

// Firma estable: contra el backend real esto es un UPDATE + evento realtime.
export async function avanzarComanda(_id: string): Promise<void> {
  await sleep(120)
}
