import "./globals.css"
import type { ReactNode, CSSProperties } from "react"
import { theme } from "@/shell/theme"
import { fontClass } from "@/shell/fonts"
import { Nav } from "@/shell/nav"
import { ink } from "@/shell/ink"

const radiusMap = { sharp: "4px", soft: "10px", round: "16px" }
const densityMap = { compact: "12px", comfortable: "20px" }
const badgeMap = { pill: "9999px", square: "4px" }

const shadow = {
  light: {
    sm: "0 1px 2px rgb(15 23 42 / 0.04), 0 1px 3px rgb(15 23 42 / 0.06)",
    card: "0 1px 3px rgb(15 23 42 / 0.06), 0 6px 16px rgb(15 23 42 / 0.05)",
    pop: "0 6px 16px rgb(15 23 42 / 0.08), 0 16px 32px rgb(15 23 42 / 0.10)",
  },
  dark: {
    sm: "0 1px 2px rgb(0 0 0 / 0.4)",
    card: "0 1px 3px rgb(0 0 0 / 0.45), 0 8px 24px rgb(0 0 0 / 0.35)",
    pop: "0 2px 6px rgb(0 0 0 / 0.5), 0 18px 40px rgb(0 0 0 / 0.45)",
  },
}

function elevationVars(): Record<string, string> {
  const s = shadow[theme.mode]
  if (theme.elevation === "raised") {
    return { "--shadow-sm": s.sm, "--shadow-card": s.card, "--shadow-pop": s.pop, "--card-border": "0 solid transparent" }
  }
  if (theme.elevation === "outlined") {
    return { "--shadow-sm": "none", "--shadow-card": "none", "--shadow-pop": s.sm, "--card-border": "1px solid rgb(var(--border))" }
  }
  return { "--shadow-sm": "none", "--shadow-card": "none", "--shadow-pop": "none", "--card-border": "0 solid transparent" }
}

function rgb(hex: string) {
  const h = hex.replace("#", "")
  const full = h.length === 3 ? h.split("").map((ch) => ch + ch).join("") : h
  const n = parseInt(full, 16)
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`
}

export const metadata = { title: theme.brand.name, description: "Demo frontend con datos de ejemplo" }

export default function RootLayout({ children }: { children: ReactNode }) {
  const c = theme.colors
  const vars = {
    "--primary": rgb(c.primary),
    "--accent": rgb(c.accent),
    "--bg": rgb(c.bg),
    "--surface": rgb(c.surface),
    "--fg": rgb(c.fg),
    "--muted": rgb(c.muted),
    "--border": rgb(c.border),
    "--subtle": rgb(c.subtle),
    "--success": rgb(c.success),
    "--warning": rgb(c.warning),
    "--danger": rgb(c.danger),
    "--info": rgb(c.info),
    // Tinta: texto sobre tinte (bg-primary/15 text-primary-ink). Ver shell/ink.ts.
    "--primary-ink": ink(c.primary),
    "--danger-ink": ink(c.danger),
    "--radius": radiusMap[theme.radius],
    "--pad": densityMap[theme.density],
    "--badge-radius": badgeMap[theme.badge],
    "--font-heading": "var(--font-heading-src), system-ui, sans-serif",
    "--font-body": "var(--font-body-src), system-ui, sans-serif",
    "--font-number": "var(--font-number-src), var(--font-heading-src), sans-serif",
    ...elevationVars(),
  } as CSSProperties

  const stacked = theme.nav === "topbar"

  return (
    <html lang="es">
      <body className={fontClass} style={vars}>
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-bg"
        >
          Saltar al contenido
        </a>
        <div className={"min-h-screen bg-bg text-fg " + (stacked ? "flex flex-col" : "flex")}>
          <Nav />
          <main id="contenido" tabIndex={-1} className="min-w-0 flex-1 overflow-x-hidden px-3 py-4 focus:outline-none sm:p-[var(--pad)]">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
