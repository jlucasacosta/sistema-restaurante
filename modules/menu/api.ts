// PATRON MOCK. Misma firma que la query real. Ver BACKEND.md.
export type Categoria = "entradas" | "principales" | "postres" | "bebidas"
export type Plato = {
  id: string
  nombre: string
  categoria: Categoria
  precio: string
  descripcion: string
  disponible: boolean
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export async function getPlatos(): Promise<Plato[]> {
  await sleep(300)
  return [
    { id: "1", nombre: "Provoleta a la parrilla", categoria: "entradas", precio: "$ 4.200", descripcion: "Con oregano, aceite de oliva y pan de campo", disponible: true },
    { id: "2", nombre: "Empanadas de carne (x3)", categoria: "entradas", precio: "$ 3.600", descripcion: "Cortadas a cuchillo, masa casera", disponible: true },
    { id: "3", nombre: "Bife de chorizo", categoria: "principales", precio: "$ 11.900", descripcion: "400g a la brasa con guarnicion a eleccion", disponible: true },
    { id: "4", nombre: "Milanesa napolitana", categoria: "principales", precio: "$ 9.400", descripcion: "Con jamon, queso y salsa, papas fritas", disponible: true },
    { id: "5", nombre: "Ravioles de ricota y nuez", categoria: "principales", precio: "$ 8.200", descripcion: "Salsa a eleccion: fileto, crema o mixta", disponible: false },
    { id: "6", nombre: "Flan casero con dulce", categoria: "postres", precio: "$ 3.900", descripcion: "Con dulce de leche y crema", disponible: true },
    { id: "7", nombre: "Volcan de chocolate", categoria: "postres", precio: "$ 4.500", descripcion: "Tibio, con helado de crema americana", disponible: true },
    { id: "8", nombre: "Limonada de jengibre", categoria: "bebidas", precio: "$ 2.800", descripcion: "Jarra de 500ml, menta y jengibre", disponible: true },
    { id: "9", nombre: "Vino Malbec (copa)", categoria: "bebidas", precio: "$ 3.400", descripcion: "Seleccion de la casa, Valle de Uco", disponible: true },
  ]
}
