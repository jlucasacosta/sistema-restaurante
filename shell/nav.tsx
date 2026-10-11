"use client"
import { useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { nav, usuarioDemo } from "./nav-config"
import { theme } from "./theme"
import { usePistaScroll } from "./pista-scroll"

// Tres chasis distintos sobre el mismo nav-config. La palanca `theme.nav` decide.
// Cambiar de variante cambia la CARA del sistema, no solo su color.
//
// Brasa usa el riel angosto en todos los anchos. Verificado por código para 375x568:
// padding 32 + marca 36 + separación 24 + 7 ítems de 44 con 6 huecos de 8 (356) + pie ~64 = 512 px,
// entra. Si el alto del navegador es menor (barra del celular), el riel scrollea y muestra
// un degradé abajo (pista-y) para avisar que hay más ítems. El ítem activo se centra a la vista.

const esActivo = (path: string | null, href: string) => path === href || (!!path && path.startsWith(href + "/"))

function Marca({ compact = false }: { compact?: boolean }) {
  const iniciales = theme.brand.name
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
  if (compact) {
    return (
      <span
        aria-hidden="true"
        className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-sm font-bold text-bg"
      >
        {iniciales}
      </span>
    )
  }
  return <span className="font-heading text-lg font-semibold">{theme.brand.name}</span>
}

// Pie del menú: la marca ficticia y el usuario demo, para que se sienta producto.
function PieUsuario({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "flex flex-col items-center gap-1 text-center" : "flex items-center gap-3 px-3"}>
      <span
        aria-hidden="true"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-subtle font-heading text-xs font-bold text-fg"
      >
        {usuarioDemo.iniciales}
      </span>
      {compact ? (
        <span className="text-xs leading-tight text-muted">
          <span className="sr-only">{theme.brand.name}, </span>
          {usuarioDemo.etiqueta}
        </span>
      ) : (
        <span className="min-w-0 leading-tight">
          <span className="block truncate text-sm font-medium text-fg">{theme.brand.name}</span>
          <span className="block text-xs text-muted">{usuarioDemo.etiqueta}</span>
        </span>
      )}
    </div>
  )
}

// El ítem activo queda a la vista al cargar (si el menú scrollea).
function useActivoVisible(path: string | null) {
  useEffect(() => {
    document
      .querySelector<HTMLElement>('nav[aria-label="Principal"] [aria-current="page"]')
      ?.scrollIntoView({ inline: "center", block: "nearest" })
  }, [path])
}

// --- sidebar: herramienta de escritorio. Etiquetas siempre visibles. ---
function Sidebar({ path }: { path: string | null }) {
  const pista = usePistaScroll<HTMLElement>("y")
  return (
    <aside
      ref={pista.ref}
      className={
        "sticky top-0 flex h-dvh w-56 shrink-0 flex-col overflow-y-auto border-r border-border bg-surface p-[var(--pad)] " +
        pista.clase
      }
    >
      <div className="mb-8 px-3 pt-2">
        <Marca />
      </div>
      <nav aria-label="Principal" className="space-y-1">
        {nav.map(({ label, href, icon: Icon }) => {
          const active = esActivo(path, href)
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={
                "flex min-h-11 items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors " +
                (active ? "bg-subtle font-medium text-primary-ink" : "text-muted hover:bg-subtle hover:text-fg")
              }
            >
              <Icon size={18} aria-hidden="true" />
              {label}
            </Link>
          )
        })}
      </nav>
      <div className="mt-auto pt-6">
        <PieUsuario />
      </div>
    </aside>
  )
}

// --- topbar: app de consulta rápida. Pestañas arriba, lienzo ancho. ---
function Topbar({ path }: { path: string | null }) {
  const pista = usePistaScroll<HTMLElement>("x")
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-surface">
      <div className="flex items-center gap-8 px-[var(--pad)] py-3">
        <Marca />
        <nav
          ref={pista.ref}
          aria-label="Principal"
          className={"flex flex-1 items-center gap-1 overflow-x-auto " + pista.clase}
        >
          {nav.map(({ label, href, icon: Icon }) => {
            const active = esActivo(path, href)
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={
                  "flex min-h-11 shrink-0 items-center gap-2 whitespace-nowrap border-b-2 px-3 py-2 text-sm transition-colors " +
                  (active
                    ? "border-primary font-medium text-fg"
                    : "border-transparent text-muted hover:border-border hover:text-fg")
                }
              >
                <Icon size={16} aria-hidden="true" />
                {label}
              </Link>
            )
          })}
        </nav>
        <PieUsuario compact />
      </div>
    </header>
  )
}

// --- rail: solo iconos. Máxima superficie para el contenido. ---
function Rail({ path }: { path: string | null }) {
  const pista = usePistaScroll<HTMLElement>("y")
  return (
    <aside
      ref={pista.ref}
      className={
        "sticky top-0 flex h-dvh w-16 shrink-0 flex-col items-center gap-2 overflow-y-auto border-r border-border bg-surface py-4 " +
        pista.clase
      }
    >
      <div className="mb-6">
        <Marca compact />
      </div>
      <nav aria-label="Principal" className="flex flex-col items-center gap-2">
        {nav.map(({ label, href, icon: Icon }) => {
          const active = esActivo(path, href)
          return (
            <Link
              key={href}
              href={href}
              title={label}
              aria-label={label}
              aria-current={active ? "page" : undefined}
              className={
                "group relative flex h-11 w-11 shrink-0 items-center justify-center rounded-lg transition-colors " +
                (active ? "bg-primary text-bg" : "text-muted hover:bg-subtle hover:text-fg")
              }
            >
              <Icon size={20} strokeWidth={2.5} aria-hidden="true" />
              {/* El tooltip es decoración visual: el nombre accesible ya lo da aria-label. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-12 z-20 hidden whitespace-nowrap rounded-md bg-fg px-2 py-1 text-xs text-bg group-hover:block group-focus-visible:block"
              >
                {label}
              </span>
            </Link>
          )
        })}
      </nav>
      <div className="mt-auto px-1 pt-4">
        <PieUsuario compact />
      </div>
    </aside>
  )
}

export function Nav() {
  const path = usePathname()
  useActivoVisible(path)
  if (theme.nav === "topbar") return <Topbar path={path} />
  if (theme.nav === "rail") return <Rail path={path} />
  return <Sidebar path={path} />
}
