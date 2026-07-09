"use client"
import { useEffect, useState } from "react"
import { Flame, Utensils, BellRing } from "lucide-react"
import { getComandas, avanzarComanda, type Comanda } from "./api"
import { nivelDeFuego, bordeDeFuego, textoDeFuego, rellenoDeFuego, mmss } from "@/shell/fuego"

// KDS board. El cocinero mira a 3 metros con las manos ocupadas:
// reconoce por color y posicion, no lee. Numero de mesa gigante, cronometro grande,
// borde de 6px que se calienta con los minutos.

type Estado = Comanda["estado"]

const COLUMNAS: { estado: Estado; titulo: string; icon: typeof Flame }[] = [
  { estado: "en cocina", titulo: "En cocina", icon: Flame },
  { estado: "emplatando", titulo: "Emplatando", icon: Utensils },
  { estado: "listo", titulo: "Listo", icon: BellRing },
]

const estacionChip: Record<Comanda["estacion"], string> = {
  parrilla: "bg-primary/15 text-primary",
  fria: "bg-info/15 text-info",
  salsas: "bg-warning/15 text-warning",
  postres: "bg-success/15 text-success",
}

function Ticket({ c, tick, onAvanzar }: { c: Comanda; tick: number; onAvanzar: (id: string) => void }) {
  const [saliendo, setSaliendo] = useState(false)
  const segundos = c.firedHace + tick
  const nivel = nivelDeFuego(segundos)
  const progreso = Math.min(segundos / c.objetivo, 1)

  const salir = () => {
    setSaliendo(true)
    onAvanzar(c.id)
  }

  return (
    <div
      className={
        "surface-card border-l-[6px] p-4 " +
        bordeDeFuego[nivel] +
        (nivel === "tarde" && c.estado !== "listo" ? " late" : "") +
        (saliendo ? " saliendo" : "") +
        (c.estado === "listo" ? " flash-listo" : "")
      }
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted">Mesa</p>
          <p className="mesa-num text-6xl font-bold">{c.mesa}</p>
        </div>
        <div className="text-right">
          <p className={"mesa-num text-4xl " + textoDeFuego[nivel]}>{mmss(segundos)}</p>
          <span className={"chip mt-1 " + estacionChip[c.estacion]}>{c.estacion}</span>
        </div>
      </div>

      {/* dot-timer: se rellena contra el objetivo del plato */}
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-subtle">
        <div
          className={"h-full rounded-full transition-all " + rellenoDeFuego[nivel]}
          style={{ width: progreso * 100 + "%" }}
        />
      </div>

      <ul className="mt-4 space-y-2">
        {c.items.map((it, i) => (
          <li key={i} className="text-sm">
            <span className="font-heading font-bold">{it.qty}×</span> {it.nombre}
            {it.mod && <p className="pl-6 text-xs italic text-warning">{it.mod}</p>}
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
        <span className="text-xs text-muted">{c.mozo}</span>
        <button
          onClick={salir}
          className="rounded-lg bg-primary px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-bg transition-opacity hover:opacity-90"
        >
          {c.estado === "listo" ? "Salio" : "Avanzar"}
        </button>
      </div>
    </div>
  )
}

export function ComandasPage() {
  const [rows, setRows] = useState<Comanda[]>([])
  const [tick, setTick] = useState(0)

  useEffect(() => {
    getComandas().then(setRows)
  }, [])

  // El cronometro corre en vivo. Es lo que hace que la cocina se sienta encendida.
  useEffect(() => {
    const t = setInterval(() => setTick((s) => s + 1), 1000)
    return () => clearInterval(t)
  }, [])

  const quitar = (id: string) => {
    avanzarComanda(id)
    setTimeout(() => setRows((rs) => rs.filter((r) => r.id !== id)), 560)
  }

  const demoradas = rows.filter((c) => nivelDeFuego(c.firedHace + tick) === "tarde" && c.estado !== "listo").length

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-heading text-3xl font-bold uppercase tracking-tight">Cocina</h1>
        <div className="flex items-center gap-2">
          <span className="chip bg-subtle text-muted">{rows.length} tickets abiertos</span>
          {demoradas > 0 && <span className="chip bg-danger/15 text-danger">{demoradas} demorados</span>}
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {COLUMNAS.map(({ estado, titulo, icon: Icon }) => {
          const cols = rows.filter((c) => c.estado === estado)
          return (
            <section key={estado}>
              <header className="mb-3 flex items-center gap-2 px-1">
                <Icon size={18} strokeWidth={2.5} className="text-muted" />
                <h2 className="font-heading text-sm font-bold uppercase tracking-widest">{titulo}</h2>
                <span className="ml-auto mesa-num text-xl text-muted">{cols.length}</span>
              </header>
              <div className="space-y-4">
                {cols.map((c) => (
                  <Ticket key={c.id} c={c} tick={tick} onAvanzar={quitar} />
                ))}
                {cols.length === 0 && (
                  <p className="rounded-xl border border-dashed border-border p-6 text-center text-xs text-muted">
                    sin tickets
                  </p>
                )}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
