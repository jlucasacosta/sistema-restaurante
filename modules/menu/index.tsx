"use client"
import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"
import { getCarta, type Seccion, type Plato } from "./api"

// Acordeon: la carta ES secciones colapsables. No una tabla de productos.

const estadoChip: Record<Plato["estado"], string> = {
  disponible: "bg-success/15 text-success",
  "pocas porciones": "bg-warning/15 text-warning",
  agotado: "bg-danger/15 text-danger",
}

export function MenuPage() {
  const [secciones, setSecciones] = useState<Seccion[]>([])
  const [abiertas, setAbiertas] = useState<string[]>([])

  useEffect(() => {
    getCarta().then((s) => {
      setSecciones(s)
      setAbiertas(s.slice(0, 2).map((x) => x.id))
    })
  }, [])

  const toggle = (id: string) => setAbiertas((a) => (a.includes(id) ? a.filter((x) => x !== id) : [...a, id]))

  const agotados = secciones.flatMap((s) => s.platos).filter((p) => p.estado === "agotado").length

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-heading text-3xl font-bold uppercase tracking-tight">Carta</h1>
        {agotados > 0 && <span className="chip bg-danger/15 text-danger">{agotados} platos agotados</span>}
      </div>

      <div className="space-y-3">
        {secciones.map((s) => {
          const abierta = abiertas.includes(s.id)
          return (
            <div key={s.id} className="surface-card overflow-hidden">
              <button
                onClick={() => toggle(s.id)}
                className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-subtle"
              >
                <span className="flex items-baseline gap-3">
                  <span className="font-heading text-xl font-bold uppercase tracking-tight">{s.nombre}</span>
                  <span className="text-xs text-muted">{s.platos.length} platos</span>
                </span>
                <ChevronDown
                  size={20}
                  strokeWidth={2.5}
                  className={"text-muted transition-transform " + (abierta ? "rotate-180" : "")}
                />
              </button>

              {abierta && (
                <ul className="border-t border-border">
                  {s.platos.map((p) => (
                    <li
                      key={p.id}
                      className="flex items-center gap-4 border-b border-border px-6 py-4 last:border-0 hover:bg-subtle"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="font-heading font-bold">{p.nombre}</p>
                        <p className="truncate text-sm text-muted">{p.descripcion}</p>
                      </div>
                      <span className="hidden text-xs text-muted sm:block">{p.vendidosHoy} hoy</span>
                      <span className={"chip " + estadoChip[p.estado]}>{p.estado}</span>
                      <span className="mesa-num w-28 text-right text-2xl">{p.precio}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
