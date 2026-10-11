"use client"
import { useEffect, useState } from "react"
import { TrendingDown, TrendingUp } from "lucide-react"
import { getTicker, getPase, getCurvaServicio, getTiempoFuego, type OrdenPase } from "./api"
import {
  nivelDeFuego,
  bordeDeFuego,
  textoDeFuego,
  rellenoDeFuego,
  tintaDeFuego,
  rotuloDeFuego,
  iconoDeFuego,
  mmss,
} from "@/shell/fuego"
import { useCarga, Esqueleto, ErrorCarga } from "@/shell/carga"
import { LeyendaFuego } from "@/shell/leyenda-fuego"
import { usePistaScroll } from "@/shell/pista-scroll"

// El dashboard NO opera: resume la noche. Sin selector de periodo (ver DISENO.md).
// Hero: el Riel del Pase, ordenado por antigüedad. Arriba, los indicadores del turno en una fila fija
// (antes era una cinta que se desplazaba sola; ver DISENO.md, nota del 2026-10-11).

function Indicadores() {
  const { data, error, cargando, reintentar } = useCarga(getTicker)
  const pista = usePistaScroll<HTMLUListElement>("x", data?.length)
  if (error) return <ErrorCarga mensaje="No pudimos cargar los indicadores del turno." onReintentar={reintentar} />
  return (
    <section aria-label="Indicadores del turno" aria-busy={cargando} className="surface-card p-4 sm:p-5">
      {cargando || !data ? (
        <div aria-hidden="true" className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {Array.from({ length: 8 }, (_, i) => (
            <Esqueleto key={i} className="h-14" />
          ))}
        </div>
      ) : (
        <ul
          ref={pista.ref}
          tabIndex={0}
          aria-label="Indicadores del turno, deslizá para ver todos"
          className={"flex gap-6 overflow-x-auto md:grid md:grid-cols-4 md:gap-x-6 md:gap-y-5 " + pista.clase}
        >
          {data.map((t) => (
            <li key={t.id} className="min-w-[7.5rem] shrink-0 md:min-w-0">
              <p className="text-xs uppercase tracking-wider text-muted">{t.label}</p>
              <p className={"mesa-num mt-1 text-3xl " + (t.tono === "alerta" ? "text-danger" : "text-fg")}>{t.valor}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

function TarjetaPase({ o, tick }: { o: OrdenPase; tick: number }) {
  const segundos = o.firedHace + tick
  const nivel = nivelDeFuego(segundos)
  const progreso = Math.min(segundos / o.objetivo, 1)
  const Icono = iconoDeFuego[nivel]

  return (
    <li className={"surface-card relative flex w-56 shrink-0 flex-col border-l-[6px] p-4 " + bordeDeFuego[nivel]}>
      <div className="flex items-baseline justify-between">
        <span className="mesa-num text-5xl font-bold">
          <span className="sr-only">Mesa </span>
          {o.mesa}
        </span>
        <span className={"mesa-num text-2xl " + textoDeFuego[nivel]}>{mmss(segundos)}</span>
      </div>
      <p className={"mt-1 flex items-center justify-end gap-1 text-xs font-medium " + tintaDeFuego[nivel]}>
        <Icono size={14} aria-hidden="true" />
        {rotuloDeFuego[nivel]}
      </p>
      <p className="mt-2 flex-1 text-xs leading-tight text-muted">{o.resumen}</p>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-subtle">
        <div className={"h-full rounded-full " + rellenoDeFuego[nivel]} style={{ width: progreso * 100 + "%" }} />
      </div>
      <p className="mt-1 text-xs text-muted">objetivo {mmss(o.objetivo)}</p>
    </li>
  )
}

function RielDelPase({ tick }: { tick: number }) {
  const { data, error, cargando, reintentar } = useCarga(getPase)
  const pista = usePistaScroll<HTMLUListElement>("x", data?.length)
  const ordenado = [...(data ?? [])].sort((a, b) => b.firedHace - a.firedHace)

  return (
    <section aria-busy={cargando} className="surface-card space-y-4 p-4 sm:p-5">
      <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 className="font-heading text-sm font-bold uppercase tracking-widest">Comandas en curso</h2>
        <span className="text-xs text-muted">
          {cargando ? "—" : data ? data.length : "—"} en cocina o emplatando · la más antigua primero
        </span>
      </header>
      <LeyendaFuego />
      {error ? (
        <ErrorCarga mensaje="No pudimos cargar las comandas en curso." onReintentar={reintentar} />
      ) : cargando ? (
        <div aria-hidden="true" className="flex gap-4 overflow-hidden">
          {Array.from({ length: 4 }, (_, i) => (
            <Esqueleto key={i} className="h-40 w-56 shrink-0" />
          ))}
        </div>
      ) : (
        <ul
          ref={pista.ref}
          tabIndex={0}
          aria-label="Comandas en curso, la más antigua primero"
          className={"flex gap-4 overflow-x-auto pb-2 " + pista.clase}
        >
          {ordenado.map((o) => (
            <TarjetaPase key={o.id} o={o} tick={tick} />
          ))}
        </ul>
      )}
    </section>
  )
}

function CurvaDeServicio() {
  const { data, error, cargando, reintentar } = useCarga(getCurvaServicio)
  const max = Math.max(...(data ?? []).map((c) => c.cubiertos), 1)

  return (
    <section aria-busy={cargando} className="surface-card p-5 sm:p-6 lg:col-span-2">
      <header className="mb-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
        <h2 className="font-heading text-sm font-bold uppercase tracking-widest">Servicio por franja</h2>
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted" aria-label="Referencias del gráfico">
          <li className="flex items-center gap-1.5">
            <span aria-hidden="true" className="h-3 w-3 rounded-sm bg-accent" /> franja pico
          </li>
          <li className="flex items-center gap-1.5">
            <span aria-hidden="true" className="h-3 w-3 rounded-sm bg-primary/50" /> resto de la noche
          </li>
        </ul>
      </header>
      <p className="mb-4 text-xs text-muted">Cubiertos sentados cada 30 minutos. La última franja está en curso.</p>
      {error ? (
        <ErrorCarga mensaje="No pudimos cargar el servicio por franja." onReintentar={reintentar} />
      ) : cargando || !data ? (
        <Esqueleto className="h-44" />
      ) : (
        <div role="group" aria-label="Cubiertos sentados cada 30 minutos" className="flex h-44 gap-2 sm:gap-4">
          {data.map((c) => (
            <div key={c.hora} className="flex h-full min-w-0 flex-1 flex-col items-center gap-2">
              <span className="mesa-num text-base text-fg">{c.cubiertos}</span>
              <div className="flex w-full flex-1 items-end">
                <div
                  className={"w-full rounded-t-lg " + (c.cubiertos === max ? "bg-accent" : "bg-primary/50")}
                  style={{ height: (c.cubiertos / max) * 100 + "%" }}
                />
              </div>
              <span className="mesa-num text-sm text-muted sm:text-base">{c.hora}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

// hero-number: el tiempo de preparación de la noche. Un número, no cuatro tiles.
function TiempoDePreparacion() {
  const { data, error, cargando, reintentar } = useCarga(getTiempoFuego)
  const delta = data?.delta ?? 0
  const Icono = delta > 0 ? TrendingUp : TrendingDown
  let texto = "en el objetivo"
  if (delta > 0) texto = "por encima del objetivo"
  if (delta < 0) texto = "por debajo del objetivo"

  return (
    <section aria-busy={cargando} className="surface-card flex flex-col justify-center p-5 sm:p-6">
      <h2 className="font-heading text-sm font-bold uppercase tracking-widest text-muted">Tiempo de preparación</h2>
      {error ? (
        <div className="mt-4">
          <ErrorCarga mensaje="No pudimos cargar el tiempo de preparación." onReintentar={reintentar} />
        </div>
      ) : (
        <>
          <p className="mesa-num mt-4 text-7xl text-accent">{cargando || !data ? "—" : data.promedio}</p>
          <p className="mt-2 text-sm text-muted">
            promedio de la noche · objetivo{" "}
            <span className="mesa-num text-base text-fg">{cargando || !data ? "—" : data.objetivo}</span>
          </p>
          {data && delta !== 0 && (
            <span
              className={
                "chip mt-4 self-start " + (delta > 0 ? "bg-warning/15 text-warning" : "bg-success/15 text-success")
              }
            >
              <Icono size={14} aria-hidden="true" />
              {Math.abs(delta)} % {texto}
            </span>
          )}
        </>
      )}
    </section>
  )
}

export function DashboardPage() {
  // Un solo reloj para toda la pantalla: lo que cambia cada segundo es el cronómetro de las comandas (dato, no decoración).
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setTick((s) => s + 1), 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="space-y-5 sm:space-y-6">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h1 className="font-heading text-3xl font-bold uppercase tracking-tight">Dashboard</h1>
        <span className="text-sm text-muted">Resumen del turno de hoy</span>
      </div>

      <Indicadores />
      <RielDelPase tick={tick} />

      <div className="grid gap-5 lg:grid-cols-3">
        <CurvaDeServicio />
        <TiempoDePreparacion />
      </div>
    </div>
  )
}
