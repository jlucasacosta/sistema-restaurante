// PATRON MOCK. Misma firma que la query real. Ver BACKEND.md.
// La carta ES secciones: el arquetipo del modulo (acordeon) sale del dato, no al reves.
export type Plato = {
  id: string
  nombre: string
  descripcion: string
  precio: string
  estado: "disponible" | "pocas porciones" | "agotado"
  vendidosHoy: number
}
export type Seccion = { id: string; nombre: string; platos: Plato[] }

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export async function getCarta(): Promise<Seccion[]> {
  await sleep(300)
  return [
    {
      id: "entradas",
      nombre: "Entradas",
      platos: [
        { id: "e1", nombre: "Provoleta a la brasa", descripcion: "oregano, aceite de oliva, pan de campo", precio: "$ 7.400", estado: "disponible", vendidosHoy: 18 },
        { id: "e2", nombre: "Burrata de la casa", descripcion: "tomates asados, albahaca, focaccia", precio: "$ 9.200", estado: "disponible", vendidosHoy: 12 },
        { id: "e3", nombre: "Empanadas de carne", descripcion: "cortadas a cuchillo, tres unidades", precio: "$ 6.100", estado: "pocas porciones", vendidosHoy: 31 },
        { id: "e4", nombre: "Rabas", descripcion: "limon, alioli de ajo asado", precio: "$ 11.500", estado: "disponible", vendidosHoy: 9 },
        { id: "e5", nombre: "Tartar de trucha", descripcion: "palta, citricos, tostadas finas", precio: "$ 10.800", estado: "agotado", vendidosHoy: 14 },
        { id: "e6", nombre: "Humita en chala", descripcion: "receta del norte, queso de cabra", precio: "$ 6.900", estado: "disponible", vendidosHoy: 6 },
      ],
    },
    {
      id: "principales",
      nombre: "Principales",
      platos: [
        { id: "p1", nombre: "Bife de chorizo", descripcion: "400g, brasa de quebracho, chimichurri", precio: "$ 24.500", estado: "disponible", vendidosHoy: 27 },
        { id: "p2", nombre: "Ojo de bife", descripcion: "350g, sal parrillera, papas rusticas", precio: "$ 26.900", estado: "disponible", vendidosHoy: 21 },
        { id: "p3", nombre: "Entraña", descripcion: "corte fino, ensalada de estacion", precio: "$ 22.800", estado: "pocas porciones", vendidosHoy: 19 },
        { id: "p4", nombre: "Asado de tira", descripcion: "tres costillas, coccion lenta", precio: "$ 21.400", estado: "disponible", vendidosHoy: 16 },
        { id: "p5", nombre: "Sorrentinos de osobuco", descripcion: "salsa de tomate y vino tinto", precio: "$ 18.600", estado: "disponible", vendidosHoy: 24 },
        { id: "p6", nombre: "Risotto de hongos", descripcion: "portobello, parmesano, tomillo", precio: "$ 17.200", estado: "disponible", vendidosHoy: 11 },
        { id: "p7", nombre: "Pesca del dia", descripcion: "vegetales de estacion, manteca de limon", precio: "$ 23.100", estado: "pocas porciones", vendidosHoy: 8 },
        { id: "p8", nombre: "Ñoquis caseros", descripcion: "a eleccion: fileto, pesto o cuatro quesos", precio: "$ 15.900", estado: "disponible", vendidosHoy: 13 },
        { id: "p9", nombre: "Cazuela de mariscos", descripcion: "azafran, tomate, pan tostado", precio: "$ 25.300", estado: "agotado", vendidosHoy: 7 },
        { id: "p10", nombre: "Milanesa napolitana", descripcion: "ternera, jamon, mozzarella, pure", precio: "$ 19.700", estado: "disponible", vendidosHoy: 22 },
      ],
    },
    {
      id: "guarniciones",
      nombre: "Guarniciones",
      platos: [
        { id: "g1", nombre: "Papas rusticas", descripcion: "romero y ajo confitado", precio: "$ 5.200", estado: "disponible", vendidosHoy: 44 },
        { id: "g2", nombre: "Batatas al romero", descripcion: "miel de caña", precio: "$ 5.400", estado: "disponible", vendidosHoy: 17 },
        { id: "g3", nombre: "Ensalada de estacion", descripcion: "hojas verdes, tomate, cebolla morada", precio: "$ 4.800", estado: "disponible", vendidosHoy: 29 },
        { id: "g4", nombre: "Vegetales a la brasa", descripcion: "zucchini, morron, berenjena", precio: "$ 5.900", estado: "pocas porciones", vendidosHoy: 10 },
      ],
    },
    {
      id: "postres",
      nombre: "Postres",
      platos: [
        { id: "d1", nombre: "Flan casero", descripcion: "dulce de leche y crema", precio: "$ 6.300", estado: "disponible", vendidosHoy: 26 },
        { id: "d2", nombre: "Volcan de chocolate", descripcion: "corazon tibio, helado de vainilla", precio: "$ 7.100", estado: "disponible", vendidosHoy: 20 },
        { id: "d3", nombre: "Helado artesanal", descripcion: "tres bochas a eleccion", precio: "$ 5.600", estado: "disponible", vendidosHoy: 33 },
        { id: "d4", nombre: "Panqueque de manzana", descripcion: "canela, caramelo salado", precio: "$ 6.800", estado: "agotado", vendidosHoy: 12 },
      ],
    },
    {
      id: "bebidas",
      nombre: "Bebidas",
      platos: [
        { id: "b1", nombre: "Malbec de la casa", descripcion: "copa / botella", precio: "$ 4.900", estado: "disponible", vendidosHoy: 58 },
        { id: "b2", nombre: "Cerveza artesanal", descripcion: "IPA, rubia o negra, pinta", precio: "$ 4.200", estado: "disponible", vendidosHoy: 47 },
        { id: "b3", nombre: "Limonada de jengibre", descripcion: "menta fresca, jarra", precio: "$ 3.800", estado: "disponible", vendidosHoy: 21 },
        { id: "b4", nombre: "Agua con gas", descripcion: "500ml", precio: "$ 2.400", estado: "pocas porciones", vendidosHoy: 39 },
      ],
    },
  ]
}
