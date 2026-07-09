// fonts.ts · La voz de Brasa Cocina.
// Archivo (casi condensada, bold) = tablero de cocina. Manrope = la corrida, legible.
// Bebas_Neue esta RESERVADA: solo el numero de mesa gigante del ticket. Nunca como cuerpo.
import { Archivo, Manrope, Bebas_Neue } from "next/font/google"

export const headingFont = Archivo({ subsets: ["latin"], display: "swap", variable: "--font-heading-src" })
export const bodyFont = Manrope({ subsets: ["latin"], display: "swap", variable: "--font-body-src" })
export const numberFont = Bebas_Neue({ subsets: ["latin"], weight: "400", display: "swap", variable: "--font-number-src" })

export const fontClass = `${headingFont.variable} ${bodyFont.variable} ${numberFont.variable}`
