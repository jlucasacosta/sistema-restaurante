"use client"
import { useEffect, useState } from "react"
import { getEstados, getComandas, type Estado, type Comanda } from "./api"

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
                <span className="text-sm font-medium">{e.nombre}</span>
                <span className="rounded-full bg-surface px-2 py-0.5 text-xs text-muted shadow-sm">{cards.length}</span>
              </div>
              <div className="space-y-3">
                {cards.map((c) => (
                  <div
                    key={c.id}
                    className="rounded-lg bg-surface p-3 shadow-card transition-shadow hover:shadow-pop"
                  >
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
