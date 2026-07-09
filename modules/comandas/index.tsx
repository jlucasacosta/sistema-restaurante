"use client"
import { useEffect, useState } from "react"
import { getEstados, getComandas, type Estado, type EstadoCocina, type Comanda } from "./api"

// Mapas literales: Tailwind necesita ver la clase completa en el fuente.
// Estado de cocina bien legible: pendiente=warning, preparacion=info, servida=success, cancelada=danger.
const dot: Record<EstadoCocina, string> = {
  pendiente: "bg-warning",
  preparacion: "bg-info",
  servida: "bg-success",
  cancelada: "bg-danger",
}
const rail: Record<EstadoCocina, string> = {
  pendiente: "bg-warning",
  preparacion: "bg-info",
  servida: "bg-success",
  cancelada: "bg-danger",
}
const countPill: Record<EstadoCocina, string> = {
  pendiente: "bg-warning/15 text-warning",
  preparacion: "bg-info/15 text-info",
  servida: "bg-success/15 text-success",
  cancelada: "bg-danger/15 text-danger",
}

export function ComandasPage() {
  const [estados, setEstados] = useState<Estado[]>([])
  const [comandas, setComandas] = useState<Comanda[]>([])

  useEffect(() => {
    getEstados().then(setEstados)
    getComandas().then(setComandas)
  }, [])

  return (
    <div className="space-y-8">
      <h1 className="font-heading text-2xl font-semibold">Comandas</h1>
      <div className="flex gap-5 overflow-x-auto pb-2">
        {estados.map((e) => {
          const cards = comandas.filter((c) => c.estadoId === e.id)
          return (
            <div key={e.id} className="flex w-72 shrink-0 flex-col rounded-xl bg-subtle p-3">
              <div className="flex items-center justify-between px-1 pb-3">
                <span className="flex items-center gap-2 text-sm font-medium">
                  <span className={"h-2 w-2 rounded-full " + dot[e.id]} />
                  {e.nombre}
                </span>
                <span className={"rounded-full px-2 py-0.5 text-xs font-semibold " + countPill[e.id]}>
                  {cards.length}
                </span>
              </div>
              <div className="space-y-3">
                {cards.map((c) => (
                  <div
                    key={c.id}
                    className={
                      "relative overflow-hidden rounded-lg bg-surface p-3 pl-4 shadow-card transition-shadow hover:shadow-pop " +
                      (c.estadoId === "cancelada" ? "opacity-60" : "")
                    }
                  >
                    <span className={"absolute inset-y-0 left-0 w-1 " + rail[c.estadoId]} />
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{c.mesa}</p>
                      <p className="text-sm font-semibold text-accent">{c.total}</p>
                    </div>
                    <ul className="mt-2 space-y-0.5 border-t border-border pt-2 text-xs text-muted">
                      {c.items.map((it, i) => (
                        <li key={i}>• {it}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
