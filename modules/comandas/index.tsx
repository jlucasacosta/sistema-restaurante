"use client"
import { useEffect, useState, type ReactNode } from "react"
import {
  AlertTriangle,
  BellRing,
  CheckCircle2,
  CookingPot,
  Flame,
  IceCreamCone,
  Snowflake,
  Utensils,
  type LucideIcon,
} from "lucide-react"
import { getComandas, avanzarComanda, type Comanda } from "./api"
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

// KDS board. El cocinero mira a 3 metros con las manos ocupadas:
// reconoce por color y posición, no lee. Número de mesa gigante, cronómetro grande,
// borde de 6px que cambia con los minutos. Ningún estado se dice solo con color: lleva rótulo + ícono.

type Estado = Comanda["estado"]

const COLUMNAS: { estado: Estado; titulo: string; icon: LucideIcon }[] = [
  { estado: "en cocina", titulo: "En cocina", icon: Flame },
  { estado: "emplatando", titulo: "Emplatando", icon: Utensils },
  { estado: "listo", titulo: "Listo", icon: BellRing },
]

// La estación es una categoría, no un estado: va neutra (texto + ícono), así no compite con los colores de estado.
const estacionIcono: Record<Comanda["estacion"], LucideIcon> = {
  parrilla: Flame,
  fria: Snowflake,
  salsas: CookingPot,
  postres: IceCreamCone,
}

// Etiqueta de display: el valor del enum (`fria`) lo compara el código y lo valida la DB.
const estacionLabel: Record<Comanda["estacion"], string> = {
  parrilla: "Parrilla",
  fria: "Fría",
  salsas: "Salsas",
  postres: "Postres",
}

// Qué hace el botón de cada ticket, dicho con el resultado y no con un verbo suelto.
const accion: Record<Estado, string> = {
  "en cocina": "Pasar a emplatado",
  emplatando: "Marcar lista",
  listo: "Salió",
}

// Cambios locales sobre la data (la demo no guarda nada: F5 vuelve al data.json).
// `salio` = el ticket ya salió al salón y deja el tablero.
type Cambio = { estado: Estado; listoEn?: number } | "salio"
type Fila = Comanda & { listoEn?: number }

function Ticket({ c, tick, onAvanzar }: { c: Fila; tick: number; onAvanzar: (c: Fila) => void }) {
  const lista = c.estado === "listo"
  // Una comanda lista ya no envejece: se muestra el tiempo que tardó en prepararse.
  const segundos = lista ? (c.listoEn ?? c.firedHace) : c.firedHace + tick
  const nivel = nivelDeFuego(segundos)
  const progreso = Math.min(segundos / c.objetivo, 1)
  const IconoNivel = iconoDeFuego[nivel]
  const IconoEstacion = estacionIcono[c.estacion]

  return (
    <article
      aria-label={"Mesa " + c.mesa}
      className={"surface-card border-l-[6px] p-4 " + (lista ? "border-success" : bordeDeFuego[nivel])}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted">Mesa</p>
          <p className="mesa-num text-6xl font-bold">{c.mesa}</p>
        </div>
        <div className="text-right">
          <p className={"mesa-num text-4xl " + (lista ? "text-success" : textoDeFuego[nivel])}>{mmss(segundos)}</p>
          {lista ? (
            <p className="mt-1 flex items-center justify-end gap-1 text-xs font-medium text-success">
              <CheckCircle2 size={14} aria-hidden="true" />
              Lista
            </p>
          ) : (
            <p className={"mt-1 flex items-center justify-end gap-1 text-xs font-medium " + tintaDeFuego[nivel]}>
              <IconoNivel size={14} aria-hidden="true" />
              {rotuloDeFuego[nivel]}
            </p>
          )}
        </div>
      </div>

      {/* Se llena contra el objetivo del plato; el objetivo está escrito al lado. */}
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-subtle">
        <div
          className={"h-full rounded-full " + (lista ? "bg-success" : rellenoDeFuego[nivel])}
          style={{ width: progreso * 100 + "%" }}
        />
      </div>
      <p className="mt-1 text-right text-xs text-muted">objetivo {mmss(c.objetivo)}</p>

      <ul className="mt-4 space-y-2">
        {c.items.map((it, i) => (
          <li key={i} className="text-sm">
            <span className="font-heading font-bold">{it.qty}×</span> {it.nombre}
            {it.mod && <p className="pl-6 text-xs italic text-warning">{it.mod}</p>}
          </li>
        ))}
      </ul>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3">
        <span className="flex min-w-0 flex-col gap-1">
          <span className="chip w-fit border border-border bg-subtle text-fg">
            <IconoEstacion size={14} aria-hidden="true" />
            {estacionLabel[c.estacion]}
          </span>
          <span className="text-xs text-muted">{c.mozo}</span>
        </span>
        <button
          type="button"
          onClick={() => onAvanzar(c)}
          aria-label={accion[c.estado] + ", mesa " + c.mesa}
          className="tap min-h-11 rounded-lg bg-primary px-4 py-2 text-xs font-bold uppercase tracking-wide text-bg transition-opacity hover:opacity-90"
        >
          {accion[c.estado]}
        </button>
      </div>
    </article>
  )
}

function Columna({ titulo, icon: Icon, cantidad, children }: { titulo: string; icon: LucideIcon; cantidad: ReactNode; children: ReactNode }) {
  return (
    <section>
      <header className="mb-3 flex items-center gap-2 px-1">
        <Icon size={18} strokeWidth={2.5} aria-hidden="true" className="text-muted" />
        <h2 className="font-heading text-sm font-bold uppercase tracking-widest">{titulo}</h2>
        <span className="ml-auto mesa-num text-xl text-muted">{cantidad}</span>
      </header>
      <div className="space-y-4">{children}</div>
    </section>
  )
}

export function ComandasPage() {
  const { data, error, cargando, reintentar } = useCarga(getComandas)
  const [cambios, setCambios] = useState<Record<string, Cambio>>({})
  const [aviso, setAviso] = useState("")
  const [tick, setTick] = useState(0)

  // El cronómetro corre en vivo: es dato (cuánto lleva cada ticket), no decoración.
  useEffect(() => {
    const t = setInterval(() => setTick((s) => s + 1), 1000)
    return () => clearInterval(t)
  }, [])

  const filas: Fila[] = (data ?? []).flatMap((c) => {
    const cambio = cambios[c.id]
    if (cambio === "salio") return []
    return [cambio ? { ...c, ...cambio } : c]
  })

  // Avanza el ticket a la columna siguiente; desde "listo" sale del tablero.
  const avanzar = (c: Fila) => {
    const previo = cambios[c.id]
    const siguiente: Cambio =
      c.estado === "en cocina"
        ? { estado: "emplatando" }
        : c.estado === "emplatando"
          ? { estado: "listo", listoEn: c.firedHace + tick }
          : "salio"
    setCambios((p) => ({ ...p, [c.id]: siguiente }))
    setAviso(
      siguiente === "salio"
        ? `Mesa ${c.mesa}: el ticket salió al salón.`
        : `Mesa ${c.mesa}: pasó a ${siguiente.estado === "listo" ? "listo" : "emplatando"}.`,
    )
    avanzarComanda(c.id).catch(() => {
      setCambios((p) => {
        const resto = { ...p }
        if (previo) resto[c.id] = previo
        else delete resto[c.id]
        return resto
      })
      setAviso(`No pudimos actualizar la mesa ${c.mesa}. Probá de nuevo.`)
    })
  }

  const demoradas = filas.filter((c) => c.estado !== "listo" && nivelDeFuego(c.firedHace + tick) === "tarde").length

  return (
    <div className="space-y-5 sm:space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <h1 className="font-heading text-3xl font-bold uppercase tracking-tight">Comandas</h1>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm text-muted">{cargando || !data ? "—" : filas.length} tickets abiertos</span>
          {demoradas > 0 && (
            <span className="chip bg-danger/15 text-danger-ink">
              <AlertTriangle size={14} aria-hidden="true" />
              {demoradas} {demoradas === 1 ? "demorado" : "demorados"}
            </span>
          )}
        </div>
      </div>

      <LeyendaFuego />

      <p role="status" aria-live="polite" className="sr-only">
        {aviso}
      </p>

      {error ? (
        <ErrorCarga mensaje="No pudimos cargar las comandas." onReintentar={reintentar} />
      ) : (
        <div aria-busy={cargando} className="grid gap-5 lg:grid-cols-3">
          {COLUMNAS.map(({ estado, titulo, icon }) => {
            const enColumna = filas.filter((c) => c.estado === estado)
            return (
              <Columna key={estado} titulo={titulo} icon={icon} cantidad={cargando || !data ? "—" : enColumna.length}>
                {cargando || !data ? (
                  <>
                    <Esqueleto className="h-56" />
                    <Esqueleto className="h-56" />
                  </>
                ) : (
                  <>
                    {enColumna.map((c) => (
                      <Ticket key={c.id} c={c} tick={tick} onAvanzar={avanzar} />
                    ))}
                    {enColumna.length === 0 && (
                      <p className="rounded-xl border border-dashed border-border p-6 text-center text-xs text-muted">
                        Sin tickets en esta columna
                      </p>
                    )}
                  </>
                )}
              </Columna>
            )
          })}
        </div>
      )}
    </div>
  )
}
