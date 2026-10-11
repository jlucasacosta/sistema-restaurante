"use client"
import { useState } from "react"
import { getContacts, type Comensal } from "./api"
import { useCarga, Esqueleto, ErrorCarga } from "@/shell/carga"
import { FichaLateral, DatoFicha, AvisoDemo, botonPrimario, botonSecundario } from "@/shell/ficha-lateral"

// Galería de fichas, no tabla densa (esa es de inmobiliaria).
// El comensal se reconoce por su plato, no por su fila. Cada tarjeta abre su ficha.

// "Inactivo" no es un error ni una alerta: va neutro (texto + rótulo), el rojo queda para lo que falla.
const tipoChip: Record<Comensal["tipo"], string> = {
  vip: "bg-accent/15 text-accent",
  frecuente: "bg-success/15 text-success",
  nuevo: "bg-info/15 text-info",
  inactivo: "border border-border bg-subtle text-muted",
}

const tipoLabel: Record<Comensal["tipo"], string> = {
  vip: "VIP",
  frecuente: "Frecuente",
  nuevo: "Nuevo",
  inactivo: "Inactivo",
}

const filtros: { valor: Comensal["tipo"] | "todos"; label: string }[] = [
  { valor: "todos", label: "Todos" },
  { valor: "vip", label: "VIP" },
  { valor: "frecuente", label: "Frecuentes" },
  { valor: "nuevo", label: "Nuevos" },
  { valor: "inactivo", label: "Inactivos" },
]

const iniciales = (n: string) =>
  n
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("")

export function ContactosPage() {
  const { data, error, cargando, reintentar } = useCarga(getContacts)
  const [filtro, setFiltro] = useState<Comensal["tipo"] | "todos">("todos")
  const [seleccionado, setSeleccionado] = useState<string | null>(null)
  const [aviso, setAviso] = useState<string | null>(null)

  const rows = data ?? []
  const visibles = filtro === "todos" ? rows : rows.filter((r) => r.tipo === filtro)
  const sel = rows.find((r) => r.id === seleccionado)
  const cuenta = (v: Comensal["tipo"] | "todos") => (cargando || !data ? "—" : v === "todos" ? rows.length : rows.filter((r) => r.tipo === v).length)

  const abrir = (id: string) => {
    setSeleccionado(id)
    setAviso(null)
  }

  return (
    <div className="space-y-5 sm:space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
        <h1 className="font-heading text-3xl font-bold uppercase tracking-tight">Contactos</h1>
        <div role="group" aria-label="Filtrar por tipo de comensal" className="flex flex-wrap gap-2">
          {filtros.map(({ valor, label }) => (
            <button
              key={valor}
              type="button"
              onClick={() => setFiltro(valor)}
              aria-pressed={filtro === valor}
              className={
                "chip chip-btn transition-colors " +
                (filtro === valor ? "bg-primary text-bg" : "bg-subtle text-muted hover:text-fg")
              }
            >
              {label} · {cuenta(valor)}
            </button>
          ))}
        </div>
      </div>

      {error ? (
        <ErrorCarga mensaje="No pudimos cargar los contactos." onReintentar={reintentar} />
      ) : cargando || !data ? (
        <div aria-busy="true" className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
          {Array.from({ length: 6 }, (_, i) => (
            <Esqueleto key={i} className="h-44" />
          ))}
        </div>
      ) : visibles.length === 0 ? (
        <p className="surface-card p-6 text-center text-sm text-muted">No hay comensales de este tipo.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
          {visibles.map((c) => (
            <article
              key={c.id}
              onClick={() => abrir(c.id)}
              className="surface-card min-w-0 cursor-pointer p-4 hover:bg-subtle sm:p-5"
            >
              <div className="flex items-start gap-4">
                <span
                  aria-hidden="true"
                  className={
                    "flex h-14 w-14 shrink-0 items-center justify-center rounded-full font-heading text-lg font-bold " +
                    tipoChip[c.tipo]
                  }
                >
                  {iniciales(c.name)}
                </span>
                <div className="min-w-0 flex-1">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      abrir(c.id)
                    }}
                    aria-haspopup="dialog"
                    className="block max-w-full break-words text-left font-heading text-lg font-bold leading-tight hover:text-primary-ink"
                  >
                    {c.name}
                  </button>
                  <span className={"chip mt-1 " + tipoChip[c.tipo]}>{tipoLabel[c.tipo]}</span>
                  <p className="mt-1 truncate text-xs text-muted">{c.email}</p>
                  <p className="text-xs text-muted">{c.phone}</p>
                </div>
              </div>

              <div className="mt-4 flex items-end justify-between gap-3 border-t border-border pt-4 sm:mt-5">
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-widest text-muted">Plato favorito</p>
                  <p className="text-sm font-medium">{c.favorito}</p>
                  <p className="mt-1 text-xs text-muted">última visita {c.ultima}</p>
                </div>
                <div className="text-right">
                  <p className="mesa-num text-4xl text-primary">{c.visitas}</p>
                  <p className="text-xs uppercase tracking-widest text-muted">visitas</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <FichaLateral
        abierta={!!sel}
        titulo={sel?.name ?? ""}
        subtitulo={sel ? `${tipoLabel[sel.tipo]} · ${sel.visitas} ${sel.visitas === 1 ? "visita" : "visitas"}` : undefined}
        onCerrar={() => {
          setSeleccionado(null)
          setAviso(null)
        }}
        acciones={
          sel && (
            <>
              <button
                type="button"
                className={botonPrimario}
                onClick={() => setAviso(`Demo: no se guardó nada. No se reservó mesa para ${sel.name}.`)}
              >
                Reservar mesa
              </button>
              <button
                type="button"
                className={botonSecundario}
                onClick={() => setAviso(`Demo: no se guardó nada. El menú no se envió a ${sel.name}.`)}
              >
                Enviar menú
              </button>
              <button
                type="button"
                className={botonSecundario}
                onClick={() => setAviso(`Demo: no se guardó nada. No se envió ningún mensaje a ${sel.name}.`)}
              >
                Enviar mensaje
              </button>
            </>
          )
        }
      >
        {sel && (
          <>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-4">
              <DatoFicha etiqueta="Tipo">
                <span className={"chip " + tipoChip[sel.tipo]}>{tipoLabel[sel.tipo]}</span>
              </DatoFicha>
              <DatoFicha etiqueta="Visitas">{sel.visitas}</DatoFicha>
              <DatoFicha etiqueta="Última visita">{sel.ultima}</DatoFicha>
              <DatoFicha etiqueta="Plato favorito">{sel.favorito}</DatoFicha>
              <DatoFicha etiqueta="Teléfono">{sel.phone}</DatoFicha>
              <DatoFicha etiqueta="Email">
                <span className="break-all">{sel.email}</span>
              </DatoFicha>
            </dl>
            <AvisoDemo texto={aviso} />
          </>
        )}
      </FichaLateral>
    </div>
  )
}
