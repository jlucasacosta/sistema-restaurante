"use client"
import { useEffect, useState } from "react"
import { getContacts, type Comensal } from "./api"

// Galeria de fichas, no tabla densa (esa es de inmobiliaria).
// El comensal se reconoce por su plato, no por su fila.

const tipoChip: Record<Comensal["tipo"], string> = {
  vip: "bg-accent/15 text-accent",
  frecuente: "bg-success/15 text-success",
  nuevo: "bg-info/15 text-info",
  inactivo: "bg-danger/15 text-danger",
}

const iniciales = (n: string) =>
  n
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("")

export function ContactosPage() {
  const [rows, setRows] = useState<Comensal[]>([])
  const [filtro, setFiltro] = useState<Comensal["tipo"] | "todos">("todos")

  useEffect(() => {
    getContacts().then(setRows)
  }, [])

  const visibles = filtro === "todos" ? rows : rows.filter((r) => r.tipo === filtro)

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-heading text-3xl font-bold uppercase tracking-tight">Contactos</h1>
        <div className="flex flex-wrap gap-2">
          {(["todos", "vip", "frecuente", "nuevo", "inactivo"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFiltro(t)}
              className={
                "chip transition-colors " +
                (filtro === t ? "bg-primary text-bg" : "bg-subtle text-muted hover:text-fg")
              }
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {visibles.map((c) => (
          <article key={c.id} className="surface-card p-5">
            <div className="flex items-start gap-4">
              <span
                className={
                  "flex h-14 w-14 shrink-0 items-center justify-center rounded-full font-heading text-lg font-bold " +
                  tipoChip[c.tipo]
                }
              >
                {iniciales(c.name)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-heading text-lg font-bold">{c.name}</p>
                <p className="truncate text-xs text-muted">{c.email}</p>
                <p className="text-xs text-muted">{c.phone}</p>
              </div>
              <span className={"chip " + tipoChip[c.tipo]}>{c.tipo}</span>
            </div>

            <div className="mt-5 flex items-end justify-between border-t border-border pt-4">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted">Plato favorito</p>
                <p className="text-sm font-medium">{c.favorito}</p>
                <p className="mt-1 text-xs text-muted">ultima visita {c.ultima}</p>
              </div>
              <div className="text-right">
                <p className="mesa-num text-4xl text-primary">{c.visitas}</p>
                <p className="text-[10px] uppercase tracking-widest text-muted">visitas</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
