// theme.ts · Brasa Cocina (sistema restaurante)
// LA PALANCA DE DISEÑO. Nada se hardcodea: todo lee de aca.
// Ficha de Diseño: ver DISENO.md. Cliche rechazado: la trattoria rustica
// (pizarron de tiza, madera envejecida, rojo tomate). Esto es una sala de
// operaciones a las 21:30 con la cocina al rojo.

export type Theme = {
  brand: { name: string; logo?: string }
  mode: "light" | "dark"
  nav: "sidebar" | "topbar" | "rail"
  elevation: "raised" | "outlined" | "flat"
  badge: "pill" | "square"
  radius: "sharp" | "soft" | "round"
  density: "compact" | "comfortable"
  font: { heading: string; body: string }
  colors: {
    primary: string
    accent: string
    bg: string
    surface: string
    fg: string
    muted: string
    border: string
    subtle: string
    success: string
    warning: string
    danger: string
    info: string
  }
  // Umbrales de coccion, en minutos. El Riel del Pase envejece con esto.
  // Tambien viven aca: ningun componente inventa un numero magico.
  fuego: { ok: number; demora: number }
}

export const brasa: Theme = {
  brand: { name: "Brasa Cocina" },
  mode: "dark",
  nav: "rail",
  elevation: "raised",
  badge: "pill",
  radius: "round",
  density: "comfortable",
  font: { heading: "Archivo", body: "Manrope" },
  colors: {
    primary: "#e2603b", // ceniza-brasa: sostiene sin gritar
    accent: "#ff7a1a", // glow-orange: lo urgente
    bg: "#16110f", // carbon-ceniza
    surface: "#231b17",
    fg: "#f6efe9",
    muted: "#a1928a",
    border: "#372b25",
    subtle: "#2b211c",
    success: "#4fb28c", // verde frio DESATURADO: no compite con el ambar
    warning: "#f2a63c",
    danger: "#e2483d", // rojo aji
    info: "#6fa8bd",
  },
  fuego: { ok: 6, demora: 12 },
}

export const theme: Theme = brasa
