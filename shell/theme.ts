// theme.ts · Brasa Cocina (sistema restaurante)
// LA PALANCA DE DISEÑO. Nada se hardcodea: todo lee de aca.
// Lenguaje visual: tech / SaaS (elevacion, radio, aire). Marca: espresso + terracota.

export type Theme = {
  brand: { name: string; logo?: string }
  colors: {
    primary: string
    accent: string
    bg: string
    surface: string
    fg: string
    muted: string
    border: string
    subtle: string
  }
  font: { heading: string; body: string }
  radius: "sharp" | "soft" | "round"
  density: "comfortable" | "compact"
}

export const brasa: Theme = {
  brand: { name: "Brasa Cocina" },
  colors: {
    primary: "#2b2320",
    accent: "#e2703a",
    bg: "#faf6f1",
    surface: "#ffffff",
    fg: "#241d1a",
    muted: "#8a7d74",
    border: "#ece3d9",
    subtle: "#f4ede4",
  },
  font: { heading: "Inter", body: "Inter" },
  radius: "round",
  density: "comfortable",
}

export const theme: Theme = brasa
