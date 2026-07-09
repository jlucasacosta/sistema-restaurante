// theme.ts · Brasa Cocina (sistema restaurante)
// LA PALANCA DE DISEÑO. Nada se hardcodea: todo lee de aca.
// Modo OSCURO: brasa, fuego, servicio de noche. En oscuro el surface
// es MAS CLARO que el bg para que la tarjeta flote sobre el fondo.
// Color de nicho: brasa (primary) + amarillo llama (accent).

export type Theme = {
  brand: { name: string; logo?: string }
  mode: "light" | "dark"
  colors: {
    primary: string
    accent: string
    bg: string
    surface: string
    fg: string
    muted: string
    border: string
    subtle: string
    // Semanticos: estados, badges, metricas. LOS CUATRO, SIEMPRE.
    success: string
    warning: string
    danger: string
    info: string
  }
  font: { heading: string; body: string }
  radius: "sharp" | "soft" | "round"
  density: "comfortable" | "compact"
}

export const brasa: Theme = {
  brand: { name: "Brasa Cocina" },
  mode: "dark",
  colors: {
    primary: "#ff5a36",
    accent: "#f5b301",
    bg: "#14100e",
    surface: "#1f1916",
    fg: "#f5f0ec",
    muted: "#9a8d85",
    border: "#2e2620",
    subtle: "#251e1a",
    success: "#34d399",
    warning: "#fbbf24",
    danger: "#fb7185",
    info: "#38bdf8",
  },
  font: { heading: "Inter", body: "Inter" },
  radius: "soft",
  density: "comfortable",
}

export const theme: Theme = brasa
