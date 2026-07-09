"use client"
import { useEffect, useState } from "react"
import { Clock, Users } from "lucide-react"
import { getReservas, type Reserva } from "./api"

// Mapas literales: Tailwind necesita ver la clase completa en el fuente.
const estadoBadge: Record<Reserva["estado"], string> = {
  confirmada: "bg-success/15 text-success",
  pendiente: "bg-warning/15 text-warning",
  "no-show": "bg-danger/15 text-danger",
  cancelada: "bg-info/15 text-info",
}

const horaTint: Record<Reserva["estado"], string> = {
  confirmada: "bg-success/10 text-success",
  pendiente: "bg-warning/10 text-warning",
  "no-show": "bg-danger/10 text-danger",
  cancelada: "bg-info/10 text-info",
}

export function ReservasPage() {
  const [rows, setRows] = useState<Reserva[]>([])
  useEffect(() => {
    getReservas().then(setRows)
  }, [])

  const activas = rows.filter((r) => r.estado === "confirmada" || r.estado === "pendiente")
  const cubiertos = activas.reduce((n, r) => n + r.personas, 0)
  const noShows = rows.filter((r) => r.estado === "no-show").length

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-heading text-2xl font-semibold">Reservas de hoy</h1>
        <div className="flex gap-2 text-sm">
          <span className="rounded-lg bg-surface px-3 py-1.5 shadow-sm">
            <span className="font-semibold text-success">{activas.length}</span> <span className="text-muted">activas</span>
          </span>
          <span className="rounded-lg bg-surface px-3 py-1.5 shadow-sm">
            <span className="font-semibold">{cubiertos}</span> <span className="text-muted">cubiertos</span>
          </span>
          <span className="rounded-lg bg-surface px-3 py-1.5 shadow-sm">
            <span className="font-semibold text-danger">{noShows}</span> <span className="text-muted">no-shows</span>
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {rows.map((r) => (
          <div
            key={r.id}
            className={
              "flex items-center gap-5 rounded-xl bg-surface p-4 shadow-card transition-shadow hover:shadow-pop " +
              (r.estado === "cancelada" || r.estado === "no-show" ? "opacity-60" : "")
            }
          >
            <div className={"flex w-16 shrink-0 flex-col items-center rounded-lg py-2 " + horaTint[r.estado]}>
              <Clock size={16} />
              <span className="mt-1 text-sm font-semibold">{r.hora}</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium">{r.cliente}</p>
              <p className="text-sm capitalize text-muted">
                {r.turno} · {r.mesa}
              </p>
            </div>
            <span className="flex w-14 items-center justify-end gap-1.5 text-sm text-muted">
              <Users size={15} />
              {r.personas}
            </span>
            <span className={"w-24 shrink-0 rounded-full px-2.5 py-0.5 text-center text-xs " + estadoBadge[r.estado]}>
              {r.estado}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
