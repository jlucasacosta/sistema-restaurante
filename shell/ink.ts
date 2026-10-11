// ink.ts · "Tinta" para texto sobre tinte.
// Un color saturado (primary, danger) sirve de relleno y de borde, pero como texto
// sobre su propio tinte (`bg-danger/15 text-danger`) no llega a 4.5:1 en un theme oscuro.
// En vez de tocar el hex del theme (cambiaria la identidad), derivamos la tinta: el mismo
// color aclarado hacia `fg` SOLO lo necesario para llegar a 4.5:1 sobre su tinte (hasta
// /20) en bg, surface y subtle. Si el color ya pasa, queda igual.
import { theme } from "./theme"

type RGB = [number, number, number]

const parse = (hex: string): RGB => {
  const h = hex.replace("#", "")
  const full = h.length === 3 ? h.split("").map((ch) => ch + ch).join("") : h
  const n = parseInt(full, 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

const channel = (v: number) => {
  const s = v / 255
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
}
const luminance = (c: RGB) => 0.2126 * channel(c[0]) + 0.7152 * channel(c[1]) + 0.0722 * channel(c[2])
const ratio = (a: RGB, b: RGB) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}
const mix = (from: RGB, to: RGB, t: number): RGB => [
  Math.round(from[0] * t + to[0] * (1 - t)),
  Math.round(from[1] * t + to[1] * (1 - t)),
  Math.round(from[2] * t + to[2] * (1 - t)),
]

const TINTE_MAX = 0.2
const MIN = 4.5

// Devuelve la tinta como triplete "R G B" (lo que esperan las variables CSS).
export function ink(hex: string): string {
  const color = parse(hex)
  const fg = parse(theme.colors.fg)
  const fondos = [theme.colors.bg, theme.colors.surface, theme.colors.subtle].map(parse)
  for (let i = 0; i <= 100; i++) {
    const candidata = mix(fg, color, i / 100)
    const pasa = fondos.every(
      (f) => ratio(candidata, f) >= MIN && ratio(candidata, mix(color, f, TINTE_MAX)) >= MIN,
    )
    if (pasa) return candidata.join(" ")
  }
  return fg.join(" ")
}
