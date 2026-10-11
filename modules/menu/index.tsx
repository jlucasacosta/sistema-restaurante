"use client"
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { getCarta, type Plato } from "./api"
import { useCarga, Esqueleto, ErrorCarga } from "@/shell/carga"
import { FichaLateral, DatoFicha, AvisoDemo, botonPrimario, botonSecundario } from "@/shell/ficha-lateral"

// Acordeón: la carta ES secciones colapsables. No una tabla de productos.
// Cada plato abre su ficha (botón en el nombre; el clic en la fila es un extra para el mouse).

const estadoChip: Record<Plato["estado"], string> = {
  disponible: "bg-success/15 text-success",
  "pocas porciones": "bg-warning/15 text-warning",
  agotado: "bg-danger/15 text-danger-ink",
}

// "$ 24.500" -> 24500. El precio viaja como texto formateado desde el api.
const aNumero = (precio: string) => parseInt(precio.replace(/\D/g, ""), 10) || 0
const plata = (n: number) => "$ " + n.toLocaleString("es-AR")

export function MenuPage() {
  const { data, error, cargando, reintentar } = useCarga(getCarta)
  // Estado local de la demo: qué secciones el usuario abrió/cerró y qué platos marcó (nada se guarda).
  const [abiertasPorUsuario, setAbiertas] = useState<Record<string, boolean>>({})
  const [estados, setEstados] = useState<Record<string, Plato["estado"]>>({})
  const [seleccionado, setSeleccionado] = useState<string | null>(null)
  const [aviso, setAviso] = useState<string | null>(null)

  const secciones = (data ?? []).map((s) => ({
    ...s,
    platos: s.platos.map((p) => ({ ...p, estado: estados[p.id] ?? p.estado })),
  }))
  const agotados = secciones.flatMap((s) => s.platos).filter((p) => p.estado === "agotado").length
  const sel = secciones.flatMap((s) => s.platos.map((p) => ({ plato: p, seccion: s.nombre }))).find((x) => x.plato.id === seleccionado)

  const abrir = (id: string) => {
    setSeleccionado(id)
    setAviso(null)
  }
  const cerrar = () => {
    setSeleccionado(null)
    setAviso(null)
  }
  const marcar = (p: Plato, estado: Plato["estado"], texto: string) => {
    setEstados((e) => ({ ...e, [p.id]: estado }))
    setAviso(`Demo: no se guardó nada. ${texto} Al recargar vuelve a como estaba.`)
  }

  return (
    <div className="space-y-5 sm:space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <h1 className="font-heading text-3xl font-bold uppercase tracking-tight">Menú</h1>
        <span className="text-sm text-muted">
          {cargando || !data ? "—" : agotados} {agotados === 1 ? "plato agotado" : "platos agotados"}
        </span>
      </div>

      {error ? (
        <ErrorCarga mensaje="No pudimos cargar la carta." onReintentar={reintentar} />
      ) : cargando || !data ? (
        <div aria-busy="true" className="space-y-3">
          {Array.from({ length: 5 }, (_, i) => (
            <Esqueleto key={i} className={i < 2 ? "h-64" : "h-16"} />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {secciones.map((s, idx) => {
            const abierta = abiertasPorUsuario[s.id] ?? idx < 2
            return (
              <div key={s.id} className="surface-card overflow-hidden">
                <button
                  type="button"
                  onClick={() => setAbiertas((a) => ({ ...a, [s.id]: !abierta }))}
                  aria-expanded={abierta}
                  aria-controls={"carta-" + s.id}
                  className="flex min-h-11 w-full items-center justify-between px-4 py-4 text-left transition-colors hover:bg-subtle focus-visible:-outline-offset-2 sm:px-6"
                >
                  <span className="flex items-baseline gap-3">
                    <span className="font-heading text-xl font-bold uppercase tracking-tight">{s.nombre}</span>
                    <span className="text-xs text-muted">{s.platos.length} platos</span>
                  </span>
                  <ChevronDown
                    size={20}
                    strokeWidth={2.5}
                    aria-hidden="true"
                    className={"text-muted " + (abierta ? "rotate-180" : "")}
                  />
                </button>

                {abierta && (
                  <ul id={"carta-" + s.id} className="border-t border-border">
                    {s.platos.map((p) => (
                      <li
                        key={p.id}
                        onClick={() => abrir(p.id)}
                        className="flex cursor-pointer flex-wrap items-center gap-x-4 gap-y-2 border-b border-border px-4 py-4 last:border-0 hover:bg-subtle sm:flex-nowrap sm:px-6"
                      >
                        <div className="w-full min-w-0 sm:w-auto sm:flex-1">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              abrir(p.id)
                            }}
                            aria-haspopup="dialog"
                            className="text-left font-heading font-bold hover:text-primary-ink"
                          >
                            {p.nombre}
                          </button>
                          <p className="text-sm text-muted sm:truncate">{p.descripcion}</p>
                        </div>
                        <span className="hidden text-xs text-muted sm:block">{p.vendidosHoy} hoy</span>
                        <span className={"chip " + estadoChip[p.estado]}>{p.estado}</span>
                        <span className="mesa-num ml-auto w-28 text-right text-2xl">{p.precio}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )
          })}
        </div>
      )}

      <FichaLateral
        abierta={!!sel}
        titulo={sel?.plato.nombre ?? ""}
        subtitulo={sel ? `${sel.seccion} · código ${sel.plato.id.toUpperCase()}` : undefined}
        onCerrar={cerrar}
        acciones={
          sel && (
            <>
              {sel.plato.estado === "agotado" ? (
                <button
                  type="button"
                  className={botonPrimario}
                  onClick={() => marcar(sel.plato, "disponible", `${sel.plato.nombre} volvió a figurar como disponible.`)}
                >
                  Volver a disponible
                </button>
              ) : (
                <button
                  type="button"
                  className={botonPrimario}
                  onClick={() => marcar(sel.plato, "agotado", `${sel.plato.nombre} figura como no disponible.`)}
                >
                  Marcar como no disponible
                </button>
              )}
              {sel.plato.estado === "disponible" && (
                <button
                  type="button"
                  className={botonSecundario}
                  onClick={() => marcar(sel.plato, "pocas porciones", `${sel.plato.nombre} figura con pocas porciones.`)}
                >
                  Marcar pocas porciones
                </button>
              )}
              <button
                type="button"
                className={botonSecundario}
                onClick={() => setAviso("Demo: no se guardó nada. El menú no se envió a nadie.")}
              >
                Enviar menú
              </button>
            </>
          )
        }
      >
        {sel && (
          <>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-4">
              <DatoFicha etiqueta="Precio">
                <span className="mesa-num text-2xl">{sel.plato.precio}</span>
              </DatoFicha>
              <DatoFicha etiqueta="Estado">
                <span className={"chip " + estadoChip[sel.plato.estado]}>{sel.plato.estado}</span>
              </DatoFicha>
              <DatoFicha etiqueta="Vendidos hoy">{sel.plato.vendidosHoy}</DatoFicha>
              <DatoFicha etiqueta="Ventas de hoy">{plata(sel.plato.vendidosHoy * aNumero(sel.plato.precio))}</DatoFicha>
              <DatoFicha etiqueta="Sección">{sel.seccion}</DatoFicha>
              <DatoFicha etiqueta="Código">{sel.plato.id.toUpperCase()}</DatoFicha>
            </dl>
            <div className="mt-4">
              <p className="text-xs text-muted">Descripción</p>
              <p className="mt-0.5 text-sm">{sel.plato.descripcion}</p>
            </div>
            <AvisoDemo texto={aviso} />
          </>
        )}
      </FichaLateral>
    </div>
  )
}
