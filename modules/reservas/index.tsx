"use client"
import { useEffect, useState } from "react"
import { getMesas, getProximas, type Mesa, type ProximaLlegada } from "./api"

// Plano de mesas. El host mira la sala, no una tabla: reconstruye la topologia
// fisica del salon y ve la ocupacion de un vistazo.

const relleno: Record<Mesa["estado"], string> = {
  libre: "bg-subtle text-muted border-border",
  sentada: "bg-primary/20 text-primary border-primary",
  "por liberar": "bg-danger/20 text-danger border-danger",
  reservada: "bg-info/15 text-info border-info",
}

const punto: Record<Mesa["estado"], string> = {
  libre: "bg-muted",
  sentada: "bg-primary",
  "por liberar": "bg-danger",
  reservada: "bg-info",
}

// La forma de la mesa es informacion: una larga es un grupo, una redonda una familia.
const forma: Record<Mesa["forma"], string> = {
  cuadrada: "h-16 w-16 rounded-lg",
  redonda: "h-20 w-20 rounded-full",
  larga: "h-16 w-32 rounded-xl",
}

export function ReservasPage() {
  const [mesas, setMesas] = useState<Mesa[]>([])
  const [proximas, setProximas] = useState<ProximaLlegada[]>([])
  const [sel, setSel] = useState<Mesa | null>(null)

  useEffect(() => {
    getMesas().then(setMesas)
    getProximas().then(setProximas)
  }, [])

  const cuenta = (e: Mesa["estado"]) => mesas.filter((m) => m.estado === e).length
  const cubiertos = mesas.filter((m) => m.estado === "sentada" || m.estado === "por liberar").reduce((a, m) => a + m.capacidad, 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-heading text-3xl font-bold uppercase tracking-tight">Sala</h1>
        <div className="flex flex-wrap gap-2">
          {(["sentada", "por liberar", "reservada", "libre"] as Mesa["estado"][]).map((e) => (
            <span key={e} className="chip bg-subtle text-fg">
              <span className={"h-2 w-2 rounded-full " + punto[e]} />
              {cuenta(e)} {e}
            </span>
          ))}
          <span className="chip bg-primary/15 text-primary">{cubiertos} cubiertos</span>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-4">
        {/* El plano: cada mesa esta donde esta en la sala real */}
        <div className="surface-card relative min-h-[34rem] overflow-hidden p-6 lg:col-span-3">
          <span className="absolute left-6 top-4 text-[10px] uppercase tracking-[0.3em] text-muted">Salon principal</span>
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-md border border-dashed border-border px-3 py-1 text-[10px] uppercase tracking-widest text-muted">
            Cocina / Pase
          </span>

          {mesas.map((m) => (
            <button
              key={m.id}
              onClick={() => setSel(m)}
              style={{ left: m.x + "%", top: m.y + "%" }}
              className={
                "absolute -translate-x-1/2 -translate-y-1/2 border-2 transition-transform hover:scale-105 " +
                forma[m.forma] +
                " " +
                relleno[m.estado] +
                (sel?.id === m.id ? " ring-2 ring-accent ring-offset-2 ring-offset-surface" : "")
              }
              title={`Mesa ${m.numero} · ${m.estado}`}
            >
              <span className="mesa-num block text-2xl">{m.numero}</span>
              {m.minutos !== undefined && <span className="block text-[10px] leading-none">{m.minutos}min</span>}
            </button>
          ))}
        </div>

        {/* Quien llega. Sin selector de periodo: el servicio es AHORA. */}
        <div className="space-y-5">
          <div className="surface-card p-5">
            <h2 className="mb-4 font-heading text-sm font-bold uppercase tracking-widest">
              {sel ? `Mesa ${sel.numero}` : "Proximas llegadas"}
            </h2>

            {sel ? (
              <div className="space-y-3 text-sm">
                <p className="flex justify-between">
                  <span className="text-muted">Estado</span>
                  <span className={"chip " + relleno[sel.estado]}>{sel.estado}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-muted">Capacidad</span>
                  <span>{sel.capacidad} personas</span>
                </p>
                {sel.cliente && (
                  <p className="flex justify-between">
                    <span className="text-muted">Cliente</span>
                    <span className="font-medium">{sel.cliente}</span>
                  </p>
                )}
                {sel.hora && (
                  <p className="flex justify-between">
                    <span className="text-muted">Hora</span>
                    <span className="mesa-num text-lg">{sel.hora}</span>
                  </p>
                )}
                {sel.minutos !== undefined && (
                  <div>
                    <p className="mb-1 flex justify-between text-xs">
                      <span className="text-muted">Rotacion</span>
                      <span>{sel.minutos} / 90 min</span>
                    </p>
                    <div className="h-1.5 overflow-hidden rounded-full bg-subtle">
                      <div
                        className={"h-full rounded-full " + (sel.minutos > 80 ? "bg-danger" : "bg-primary")}
                        style={{ width: Math.min(sel.minutos / 90, 1) * 100 + "%" }}
                      />
                    </div>
                  </div>
                )}
                <button onClick={() => setSel(null)} className="w-full pt-2 text-xs text-muted underline">
                  ver proximas llegadas
                </button>
              </div>
            ) : (
              <ul className="space-y-4">
                {proximas.map((p) => (
                  <li key={p.id} className="border-b border-border pb-3 last:border-0 last:pb-0">
                    <div className="flex items-baseline justify-between">
                      <span className="mesa-num text-2xl">{p.hora}</span>
                      <span className="chip bg-subtle text-muted">{p.personas}p</span>
                    </div>
                    <p className="text-sm font-medium">{p.cliente}</p>
                    {p.nota && <p className="text-xs italic text-warning">{p.nota}</p>}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
