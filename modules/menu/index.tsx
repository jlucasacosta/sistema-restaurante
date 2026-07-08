"use client"
import { useEffect, useState } from "react"
import { UtensilsCrossed } from "lucide-react"
import { getPlatos, type Plato, type Categoria } from "./api"

const filtros: ("todas" | Categoria)[] = ["todas", "entradas", "principales", "postres", "bebidas"]

export function MenuPage() {
  const [items, setItems] = useState<Plato[]>([])
  const [filtro, setFiltro] = useState<"todas" | Categoria>("todas")

  useEffect(() => {
    getPlatos().then(setItems)
  }, [])

  const visibles = items.filter((p) => filtro === "todas" || p.categoria === filtro)

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-heading text-2xl font-semibold">Menu</h1>
        <div className="flex flex-wrap gap-1 rounded-xl bg-subtle p-1">
          {filtros.map((f) => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              className={
                "rounded-lg px-3 py-1.5 text-sm capitalize transition-colors " +
                (filtro === f ? "bg-surface font-medium text-primary shadow-sm" : "text-muted hover:text-fg")
              }
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibles.map((p) => (
          <div
            key={p.id}
            className="overflow-hidden rounded-xl bg-surface shadow-card transition-shadow hover:shadow-pop"
          >
            <div className="flex h-32 items-center justify-center bg-subtle">
              <UtensilsCrossed size={38} className="text-muted" />
            </div>
            <div className="space-y-2 p-5">
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs uppercase tracking-wide text-bg">{p.categoria}</span>
                <span
                  className={
                    "rounded-full px-2.5 py-0.5 text-xs " +
                    (p.disponible ? "bg-subtle text-accent" : "bg-subtle text-muted")
                  }
                >
                  {p.disponible ? "disponible" : "agotado"}
                </span>
              </div>
              <h3 className="font-medium">{p.nombre}</h3>
              <p className="text-sm text-muted">{p.descripcion}</p>
              <p className="text-lg font-semibold">{p.precio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
