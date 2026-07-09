"use client"
import { useEffect, useState } from "react"
import { getTicker, getPase, getCurvaServicio, getTiempoFuego, type TickerItem, type OrdenPase, type HoraPunto } from "./api"
import { nivelDeFuego, bordeDeFuego, textoDeFuego, rellenoDeFuego, mmss } from "@/shell/fuego"

// El dashboard NO opera: resume la noche. Sin selector de periodo (ver DISENO.md).
// Hero: el Riel del Pase, ordenado por antiguedad. Arriba, el ticker corriendo.

const tono: Record<TickerItem["tono"], string> = {
  primary: "text-primary",
  accent: "text-accent",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
  info: "text-info",
}

function Ticker({ items }: { items: TickerItem[] }) {
  if (!items.length) return <div className="h-16 animate-pulse rounded-xl bg-subtle" />
  // Se duplica la tira para que el loop sea continuo.
  const tira = [...items, ...items]
  return (
    <div className="ticker-mask surface-card overflow-hidden py-4">
      <div className="ticker-track">
        {tira.map((t, i) => (
          <div key={i} className="flex shrink-0 items-baseline gap-3 border-r border-border px-8">
            <span className="text-xs uppercase tracking-widest text-muted">{t.label}</span>
            <span className={"mesa-num text-3xl " + tono[t.tono]}>{t.valor}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function TarjetaPase({ o, tick }: { o: OrdenPase; tick: number }) {
  const segundos = o.firedHace + tick
  const nivel = nivelDeFuego(segundos)
  const progreso = Math.min(segundos / o.objetivo, 1)

  return (
    <div
      className={
        "surface-card w-56 shrink-0 border-l-[6px] p-4 " +
        bordeDeFuego[nivel] +
        (nivel === "tarde" ? " late" : "")
      }
    >
      <div className="flex items-baseline justify-between">
        <span className="mesa-num text-5xl font-bold">{o.mesa}</span>
        <span className={"mesa-num text-2xl " + textoDeFuego[nivel]}>{mmss(segundos)}</span>
      </div>
      <p className="mt-2 h-9 text-xs leading-tight text-muted">{o.resumen}</p>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-subtle">
        <div className={"h-full rounded-full " + rellenoDeFuego[nivel]} style={{ width: progreso * 100 + "%" }} />
      </div>
    </div>
  )
}

export function DashboardPage() {
  const [items, setItems] = useState<TickerItem[]>([])
  const [pase, setPase] = useState<OrdenPase[]>([])
  const [curva, setCurva] = useState<HoraPunto[]>([])
  const [fuego, setFuego] = useState<{ promedio: string; objetivo: string; delta: number } | null>(null)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    getTicker().then(setItems)
    getPase().then(setPase)
    getCurvaServicio().then(setCurva)
    getTiempoFuego().then(setFuego)
  }, [])

  useEffect(() => {
    const t = setInterval(() => setTick((s) => s + 1), 1000)
    return () => clearInterval(t)
  }, [])

  const max = Math.max(...curva.map((c) => c.cubiertos), 1)
  const ordenado = [...pase].sort((a, b) => b.firedHace - a.firedHace)

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h1 className="font-heading text-3xl font-bold uppercase tracking-tight">Panel general</h1>
        <span className="chip bg-primary/15 text-primary">en vivo</span>
      </div>

      <Ticker items={items} />

      {/* COMPONENTE ESTRELLA: el Riel del Pase. La mas vieja, a la izquierda. */}
      <section className="surface-card p-5">
        <header className="mb-4 flex items-baseline justify-between">
          <h2 className="font-heading text-sm font-bold uppercase tracking-widest">Comandas en curso</h2>
          <span className="text-xs text-muted">la mas antigua primero</span>
        </header>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {ordenado.map((o) => (
            <TarjetaPase key={o.id} o={o} tick={tick} />
          ))}
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-3">
        {/* Curva de servicio: barras por hora. El rush se ve, no se calcula. */}
        <div className="surface-card p-6 lg:col-span-2">
          <h2 className="mb-6 font-heading text-sm font-bold uppercase tracking-widest">Servicio por hora</h2>
          <div className="flex h-44 gap-4">
            {curva.map((c) => (
              <div key={c.hora} className="group flex h-full flex-1 flex-col items-center gap-2">
                <span className="mesa-num text-sm text-muted">{c.cubiertos}</span>
                <div className="flex w-full flex-1 items-end">
                  <div
                    className={"w-full rounded-t-lg transition-all " + (c.cubiertos === max ? "bg-accent" : "bg-primary/60")}
                    style={{ height: (c.cubiertos / max) * 100 + "%" }}
                  />
                </div>
                <span className="mesa-num text-lg text-muted">{c.hora}h</span>
              </div>
            ))}
          </div>
        </div>

        {/* hero-number: el tiempo de fuego de la noche. Un numero, no cuatro tiles. */}
        <div className="surface-card flex flex-col justify-center p-6">
          <h2 className="font-heading text-sm font-bold uppercase tracking-widest text-muted">Tiempo de preparacion</h2>
          {fuego && (
            <>
              <p className="mesa-num mt-4 text-7xl text-accent">{fuego.promedio}</p>
              <p className="mt-2 text-sm text-muted">
                objetivo <span className="mesa-num text-base text-fg">{fuego.objetivo}</span>
              </p>
              <span className="chip mt-4 self-start bg-danger/15 text-danger">
                {fuego.delta}% por encima del objetivo
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
