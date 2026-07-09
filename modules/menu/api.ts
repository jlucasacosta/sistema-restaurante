// PATRON MOCK. Misma firma que la query real. Reetiquetado para restaurante.
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
    { id: "3", nombre: "Rabas a la provenzal", categoria: "entradas", precio: "$ 6.900", descripcion: "Anillas de calamar, ajo y perejil, limon", disponible: true },
    { id: "4", nombre: "Tabla de fiambres", categoria: "entradas", precio: "$ 8.100", descripcion: "Para compartir: jamon crudo, salame y quesos", disponible: true },
    { id: "5", nombre: "Mollejas al verdeo", categoria: "entradas", precio: "$ 7.400", descripcion: "Doradas a la parrilla con salsa de verdeo", disponible: false },
    { id: "6", nombre: "Bruschettas de tomate", categoria: "entradas", precio: "$ 3.900", descripcion: "Pan tostado, tomate, albahaca y oliva", disponible: true },
    { id: "7", nombre: "Bife de chorizo", categoria: "principales", precio: "$ 11.900", descripcion: "400g a la brasa con guarnicion a eleccion", disponible: true },
    { id: "8", nombre: "Ojo de bife", categoria: "principales", precio: "$ 13.500", descripcion: "350g madurado, sal parrillera y chimichurri", disponible: false },
    { id: "9", nombre: "Milanesa napolitana", categoria: "principales", precio: "$ 9.400", descripcion: "Con jamon, queso y salsa, papas fritas", disponible: true },
    { id: "10", nombre: "Ravioles de ricota y nuez", categoria: "principales", precio: "$ 8.200", descripcion: "Salsa a eleccion: fileto, crema o mixta", disponible: false },
    { id: "11", nombre: "Sorrentinos de jamon y queso", categoria: "principales", precio: "$ 8.600", descripcion: "Rellenos, con salsa rosa de la casa", disponible: true },
    { id: "12", nombre: "Asado de tira", categoria: "principales", precio: "$ 12.300", descripcion: "Tira ancha a la parrilla con ensalada mixta", disponible: true },
    { id: "13", nombre: "Pollo al horno con papas", categoria: "principales", precio: "$ 8.900", descripcion: "Suprema jugosa, papas rusticas al romero", disponible: true },
    { id: "14", nombre: "Salmon grillado", categoria: "principales", precio: "$ 14.200", descripcion: "Con pure de calabaza y manteca de hierbas", disponible: false },
    { id: "15", nombre: "Risotto de hongos", categoria: "principales", precio: "$ 9.700", descripcion: "Arroz carnaroli, portobello y parmesano", disponible: true },
    { id: "16", nombre: "Bondiola braseada", categoria: "principales", precio: "$ 10.800", descripcion: "Cocinada 8 horas, reduccion de malbec", disponible: true },
    { id: "17", nombre: "Flan casero con dulce", categoria: "postres", precio: "$ 3.900", descripcion: "Con dulce de leche y crema", disponible: true },
    { id: "18", nombre: "Volcan de chocolate", categoria: "postres", precio: "$ 4.500", descripcion: "Tibio, con helado de crema americana", disponible: true },
    { id: "19", nombre: "Panqueque de dulce de leche", categoria: "postres", precio: "$ 3.700", descripcion: "Flameado en la mesa, clasico de la casa", disponible: true },
    { id: "20", nombre: "Tiramisu de la casa", categoria: "postres", precio: "$ 4.300", descripcion: "Mascarpone, cafe y cacao amargo", disponible: false },
    { id: "21", nombre: "Helado artesanal (2 bochas)", categoria: "postres", precio: "$ 3.400", descripcion: "Sabores del dia, consultar al mozo", disponible: true },
    { id: "22", nombre: "Limonada de jengibre", categoria: "bebidas", precio: "$ 2.800", descripcion: "Jarra de 500ml, menta y jengibre", disponible: true },
    { id: "23", nombre: "Vino Malbec (copa)", categoria: "bebidas", precio: "$ 3.400", descripcion: "Seleccion de la casa, Valle de Uco", disponible: true },
    { id: "24", nombre: "Vino Malbec (botella)", categoria: "bebidas", precio: "$ 12.900", descripcion: "Reserva, guarda 12 meses en roble", disponible: true },
    { id: "25", nombre: "Cerveza artesanal (pinta)", categoria: "bebidas", precio: "$ 3.100", descripcion: "Rubia o roja, elaboracion local", disponible: false },
    { id: "26", nombre: "Agua saborizada", categoria: "bebidas", precio: "$ 1.900", descripcion: "Pomelo o manzana, botella 500ml", disponible: true },
    { id: "27", nombre: "Gaseosa (500ml)", categoria: "bebidas", precio: "$ 2.100", descripcion: "Linea cola, lima-limon o naranja", disponible: true },
  ]
}
