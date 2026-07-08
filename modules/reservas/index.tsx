"use client"
import { useEffect, useState } from "react"
import { Clock, Users } from "lucide-react"
import { getReservas, type Reserva } from "./api"

const estadoBadge: Record<Reserva["estado"], string> = {
  confirmada: "bg-primary text-bg",
  pendiente: "bg-subtle text-accent",
  cancelada: "bg-subtle text-muted",
}

export function ReservasPage() {
  const [rows, setRows] = useState<Reserva[]>([])
  useEffect(() => {
    getReservas().then(setRows)
  }, [])

  const activas = rows.filter((r) => r.estado !== "cancelada")
  const cubiertos = activas.reduce((n, r) => n + r.personas, 0)

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-heading text-2xl font-semibold">Reservas de hoy</h1>
        <div className="flex gap-3 text-sm">
          <span className="rounded-lg bg-surface px-3 py-1.5 shadow-sm">
            <span className="font-semibold">{activas.length}</span> <span className="text-muted">reservas</span>
          </span>
          <span className="rounded-lg bg-surface px-3 py-1.5 shadow-sm">
            <span className="font-semibold">{cubiertos}</span> <span className="text-muted">cubiertos</span>
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {rows.map((r) => (
          <div
            key={r.id}
            className="flex items-center gap-5 rounded-xl bg-surface p-4 shadow-card transition-shadow hover:shadow-pop"
          >
            <div className="flex w-16 shrink-0 flex-col items-center rounded-lg bg-subtle py-2">
              <Clock size={16} className="text-muted" />
              <span className="mt-1 text-sm font-semibold">{r.hora}</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium">{r.cliente}</p>
              <p className="text-sm text-muted">{r.mesa}</p>
            </div>
            <span className="flex items-center gap-1 text-sm text-muted">
              <Users size={15} />
              {r.personas}
            </span>
            <span className={"rounded-full px-2.5 py-0.5 text-xs " + estadoBadge[r.estado]}>{r.estado}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
