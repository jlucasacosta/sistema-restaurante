"use client"
import { useState } from "react"
import { getMesas, getProximas, type Mesa, type ProximaLlegada } from "./api"
import { useCarga, Esqueleto, ErrorCarga } from "@/shell/carga"
import { FichaLateral, DatoFicha, AvisoDemo, botonPrimario, botonSecundario } from "@/shell/ficha-lateral"
import { usePistaScroll } from "@/shell/pista-scroll"
import { theme } from "@/shell/theme"

// Plano de mesas. El host mira la sala, no una tabla: reconstruye la topología
// física del salón y ve la ocupación de un vistazo.
//
// Colores (decisión 2026-10-11, ver DISENO.md): sentada = verde (en servicio, normal), por liberar = ámbar
// (pasó el aviso de rotación), reservada = info, libre = neutra. El rojo ají queda fuera del plano: la brasa
// (sentada antes) se parecía demasiado a él. Cada estado además se nombra con texto en el chip y en la ficha.

const relleno: Record<Mesa["estado"], string> = {
  libre: "bg-subtle text-muted border-border",
  sentada: "bg-success/15 text-success border-success",
  "por liberar": "bg-warning/15 text-warning border-warning",
  reservada: "bg-info/15 text-info border-info",
}

const punto: Record<Mesa["estado"], string> = {
  libre: "bg-muted",
  sentada: "bg-success",
  "por liberar": "bg-warning",
  reservada: "bg-info",
}

// Singular para el chip de la ficha, plural para la leyenda con conteo.
const estadoPlural: Record<Mesa["estado"], string> = {
  sentada: "sentadas",
  "por liberar": "por liberar",
  reservada: "reservadas",
  libre: "libres",
}

// La forma de la mesa es información: una larga es un grupo, una redonda una familia.
const forma: Record<Mesa["forma"], string> = {
  cuadrada: "h-16 w-16 rounded-lg",
  redonda: "h-20 w-20 rounded-full",
  larga: "h-16 w-32 rounded-xl",
}

type Seleccion = { tipo: "mesa" | "llegada"; id: string } | null

export function ReservasPage() {
  const mesasCarga = useCarga(getMesas)
  const proximasCarga = useCarga(getProximas)
  // Estado local de la demo: lo que el host cambió en el plano (nada se guarda; F5 restaura).
  const [cambios, setCambios] = useState<Record<string, Partial<Mesa>>>({})
  const [sel, setSel] = useState<Seleccion>(null)
  const [aviso, setAviso] = useState<string | null>(null)
  const pista = usePistaScroll<HTMLDivElement>("x", mesasCarga.data?.length)

  const mesas: Mesa[] = (mesasCarga.data ?? []).map((m) => ({ ...m, ...cambios[m.id] }))
  const proximas = proximasCarga.data ?? []
  const cargando = mesasCarga.cargando || proximasCarga.cargando

  const cuenta = (e: Mesa["estado"]) => mesas.filter((m) => m.estado === e).length
  // Plazas = lugares de las mesas ocupadas (no son cubiertos servidos: eso está en el Dashboard).
  const plazas = mesas.filter((m) => m.estado === "sentada" || m.estado === "por liberar").reduce((a, m) => a + m.capacidad, 0)

  const mesaSel = sel?.tipo === "mesa" ? mesas.find((m) => m.id === sel.id) : undefined
  const llegadaSel = sel?.tipo === "llegada" ? proximas.find((p) => p.id === sel.id) : undefined
  // Una llegada tiene mesa asignada si alguna mesa reservada lleva el mismo nombre.
  const mesaDeLlegada = (p: ProximaLlegada) => mesas.find((m) => m.estado === "reservada" && m.cliente === p.cliente)
  const llegadaDeMesa = (m: Mesa) => proximas.find((p) => p.cliente === m.cliente)

  const abrir = (s: NonNullable<Seleccion>) => {
    setSel(s)
    setAviso(null)
  }
  const cerrar = () => {
    setSel(null)
    setAviso(null)
  }
  const cambiar = (m: Mesa, cambio: Partial<Mesa>, texto: string) => {
    setCambios((c) => ({ ...c, [m.id]: { ...c[m.id], ...cambio } }))
    setAviso(`Demo: no se guardó nada. ${texto} Al recargar vuelve a como estaba.`)
  }

  const tituloFicha = mesaSel ? `Mesa ${mesaSel.numero}` : llegadaSel ? llegadaSel.cliente : ""
  const subtituloFicha = mesaSel
    ? `${mesaSel.capacidad} personas · mesa ${mesaSel.forma}`
    : llegadaSel
      ? `${llegadaSel.hora} · ${llegadaSel.personas} ${llegadaSel.personas === 1 ? "persona" : "personas"}`
      : undefined

  return (
    <div className="space-y-5 sm:space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
        <h1 className="font-heading text-3xl font-bold uppercase tracking-tight">Reservas</h1>
        <div className="flex flex-wrap items-center gap-2">
          {(["sentada", "por liberar", "reservada", "libre"] as Mesa["estado"][]).map((e) => (
            <span key={e} className={"chip border " + relleno[e]}>
              <span aria-hidden="true" className={"h-2 w-2 rounded-full " + punto[e]} />
              {cargando ? "—" : cuenta(e)} {estadoPlural[e]}
            </span>
          ))}
          <span className="text-sm text-muted">{cargando ? "—" : plazas} plazas ocupadas</span>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-4">
        {/* El plano: cada mesa está donde está en la sala real */}
        <section aria-busy={mesasCarga.cargando} className="min-w-0 space-y-2 lg:col-span-3">
          <p className="text-xs text-muted">
            Cada mesa está donde está en el salón. Tocá una para ver su ficha.
            <span className="md:hidden"> Deslizá para recorrer todo el plano.</span>
          </p>
          {mesasCarga.error ? (
            <ErrorCarga mensaje="No pudimos cargar el plano de mesas." onReintentar={mesasCarga.reintentar} />
          ) : mesasCarga.cargando ? (
            <Esqueleto className="h-[34rem]" />
          ) : (
            // El plano es un diagrama: conserva su proporción y se desplaza, no se reordena.
            <div ref={pista.ref} className={"surface-card overflow-x-auto " + pista.clase}>
              <div className="relative min-h-[34rem] min-w-[40rem] p-6">
                <span className="absolute left-6 top-4 text-xs uppercase tracking-[0.3em] text-muted">Salón principal</span>
                <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-md border border-dashed border-border px-3 py-1 text-xs uppercase tracking-widest text-muted">
                  Cocina
                </span>

                {mesas.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => abrir({ tipo: "mesa", id: m.id })}
                    style={{ left: m.x + "%", top: m.y + "%" }}
                    className={
                      "absolute -translate-x-1/2 -translate-y-1/2 border-2 hover:brightness-125 " +
                      forma[m.forma] +
                      " " +
                      relleno[m.estado] +
                      (mesaSel?.id === m.id ? " ring-2 ring-accent ring-offset-2 ring-offset-surface" : "")
                    }
                    title={`Mesa ${m.numero} · ${m.estado}`}
                    aria-label={`Mesa ${m.numero}, ${m.estado}, ${m.capacidad} personas`}
                    aria-haspopup="dialog"
                  >
                    <span className="mesa-num block text-2xl">{m.numero}</span>
                    {m.minutos !== undefined && <span className="block text-xs leading-none">{m.minutos} min</span>}
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Quién llega. Sin selector de período: el servicio es AHORA. */}
        <section aria-busy={proximasCarga.cargando} className="surface-card p-5">
          <h2 className="mb-4 font-heading text-sm font-bold uppercase tracking-widest">Próximas llegadas</h2>
          {proximasCarga.error ? (
            <ErrorCarga mensaje="No pudimos cargar las próximas llegadas." onReintentar={proximasCarga.reintentar} />
          ) : proximasCarga.cargando ? (
            <div aria-hidden="true" className="space-y-3">
              {Array.from({ length: 4 }, (_, i) => (
                <Esqueleto key={i} className="h-16" />
              ))}
            </div>
          ) : (
            <ul className="space-y-4">
              {proximas.map((p) => (
                <li
                  key={p.id}
                  onClick={() => abrir({ tipo: "llegada", id: p.id })}
                  className="cursor-pointer border-b border-border pb-3 last:border-0 last:pb-0"
                >
                  <div className="flex items-baseline justify-between">
                    <span className="mesa-num text-2xl">{p.hora}</span>
                    <span className="text-xs text-muted">{p.personas} {p.personas === 1 ? "persona" : "personas"}</span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      abrir({ tipo: "llegada", id: p.id })
                    }}
                    aria-haspopup="dialog"
                    className="text-left text-sm font-medium hover:text-primary-ink"
                  >
                    {p.cliente}
                  </button>
                  {p.nota && <p className="text-xs italic text-warning">{p.nota}</p>}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <FichaLateral
        abierta={!!(mesaSel || llegadaSel)}
        titulo={tituloFicha}
        subtitulo={subtituloFicha}
        onCerrar={cerrar}
        acciones={
          mesaSel ? (
            <>
              {mesaSel.estado === "reservada" && (
                <button
                  type="button"
                  className={botonPrimario}
                  onClick={() => cambiar(mesaSel, { estado: "sentada", minutos: 0 }, `Mesa ${mesaSel.numero}: se sentó ${mesaSel.cliente}.`)}
                >
                  Sentar clientes
                </button>
              )}
              {(mesaSel.estado === "sentada" || mesaSel.estado === "por liberar") && (
                <button
                  type="button"
                  className={botonPrimario}
                  onClick={() =>
                    cambiar(
                      mesaSel,
                      { estado: "libre", cliente: undefined, hora: undefined, minutos: undefined },
                      `Mesa ${mesaSel.numero} liberada.`,
                    )
                  }
                >
                  Liberar mesa
                </button>
              )}
              {mesaSel.estado === "libre" && (
                <button
                  type="button"
                  className={botonPrimario}
                  onClick={() => setAviso(`Demo: no se guardó nada. No se reservó la mesa ${mesaSel.numero}.`)}
                >
                  Reservar mesa
                </button>
              )}
              {mesaSel.estado === "reservada" && (
                <button
                  type="button"
                  className={botonSecundario}
                  onClick={() => setAviso(`Demo: no se guardó nada. No se envió ningún recordatorio a ${mesaSel.cliente}.`)}
                >
                  Enviar recordatorio
                </button>
              )}
              {(mesaSel.estado === "sentada" || mesaSel.estado === "por liberar") && (
                <button
                  type="button"
                  className={botonSecundario}
                  onClick={() => setAviso(`Demo: no se guardó nada. No se pidió la cuenta de la mesa ${mesaSel.numero}.`)}
                >
                  Pedir la cuenta
                </button>
              )}
            </>
          ) : llegadaSel ? (
            <>
              <button
                type="button"
                className={botonPrimario}
                onClick={() => setAviso(`Demo: no se guardó nada. No se asignó mesa a ${llegadaSel.cliente}.`)}
              >
                {mesaDeLlegada(llegadaSel) ? "Cambiar mesa" : "Asignar mesa"}
              </button>
              <button
                type="button"
                className={botonSecundario}
                onClick={() => setAviso(`Demo: no se guardó nada. No se confirmó la reserva de ${llegadaSel.cliente}.`)}
              >
                Confirmar reserva
              </button>
              <button
                type="button"
                className={botonSecundario}
                onClick={() => setAviso(`Demo: no se guardó nada. No se registró la llegada de ${llegadaSel.cliente}.`)}
              >
                Registrar llegada
              </button>
            </>
          ) : undefined
        }
      >
        {mesaSel && (
          <>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-4">
              <DatoFicha etiqueta="Estado">
                <span className={"chip border " + relleno[mesaSel.estado]}>{mesaSel.estado}</span>
              </DatoFicha>
              <DatoFicha etiqueta="Capacidad">{mesaSel.capacidad} personas</DatoFicha>
              <DatoFicha etiqueta="Mesa">
                <span className="mesa-num text-2xl">{mesaSel.numero}</span>
              </DatoFicha>
              <DatoFicha etiqueta="Forma">{mesaSel.forma}</DatoFicha>
              {mesaSel.cliente && <DatoFicha etiqueta="Cliente">{mesaSel.cliente}</DatoFicha>}
              {mesaSel.hora && (
                <DatoFicha etiqueta={mesaSel.estado === "reservada" ? "Hora de la reserva" : "Se sentó a las"}>
                  {mesaSel.hora}
                </DatoFicha>
              )}
              {mesaSel.estado === "reservada" && llegadaDeMesa(mesaSel) && (
                <DatoFicha etiqueta="Personas">{llegadaDeMesa(mesaSel)?.personas}</DatoFicha>
              )}
              {mesaSel.estado === "reservada" && llegadaDeMesa(mesaSel)?.nota && (
                <DatoFicha etiqueta="Nota">{llegadaDeMesa(mesaSel)?.nota}</DatoFicha>
              )}
            </dl>
            {mesaSel.minutos !== undefined && (
              <div className="mt-5">
                <p className="mb-1 flex justify-between text-xs">
                  <span className="text-muted">Rotación</span>
                  <span>
                    {mesaSel.minutos} / {theme.sala.rotacion} min
                  </span>
                </p>
                <div className="h-1.5 overflow-hidden rounded-full bg-subtle">
                  <div
                    className={"h-full rounded-full " + (mesaSel.minutos > theme.sala.aviso ? "bg-warning" : "bg-success")}
                    style={{ width: Math.min(mesaSel.minutos / theme.sala.rotacion, 1) * 100 + "%" }}
                  />
                </div>
                <p className="mt-1 text-xs text-muted">
                  {mesaSel.minutos >= theme.sala.rotacion
                    ? `Pasó el tiempo de rotación por ${mesaSel.minutos - theme.sala.rotacion} min.`
                    : `Faltan ${theme.sala.rotacion - mesaSel.minutos} min para el objetivo de rotación. Se avisa desde los ${theme.sala.aviso} min.`}
                </p>
              </div>
            )}
            <AvisoDemo texto={aviso} />
          </>
        )}
        {llegadaSel && (
          <>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-4">
              <DatoFicha etiqueta="Hora">
                <span className="mesa-num text-2xl">{llegadaSel.hora}</span>
              </DatoFicha>
              <DatoFicha etiqueta="Personas">{llegadaSel.personas}</DatoFicha>
              <DatoFicha etiqueta="Mesa asignada">
                {mesaDeLlegada(llegadaSel) ? `Mesa ${mesaDeLlegada(llegadaSel)?.numero}` : "Sin mesa asignada"}
              </DatoFicha>
              <DatoFicha etiqueta="Nota">{llegadaSel.nota ?? "—"}</DatoFicha>
            </dl>
            <AvisoDemo texto={aviso} />
          </>
        )}
      </FichaLateral>
    </div>
  )
}
