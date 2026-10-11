"use client"
import { useState, type FormEvent } from "react"
import { Send } from "lucide-react"
import { getThreads, getMessages, type Message } from "./api"
import { useCarga, Esqueleto, ErrorCarga } from "@/shell/carga"

// Master-detail: bandeja de pedidos y consultas entrantes.
// Es un flujo operativo (se lee y se responde), por eso no abre ficha lateral.

const iniciales = (n: string) =>
  n
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("")

const tints = [
  "bg-primary/15 text-primary-ink",
  "bg-info/15 text-info",
  "bg-success/15 text-success",
  "bg-accent/15 text-accent",
  "bg-warning/15 text-warning",
]
const tintOf = (id: string) => tints[Number(id) % tints.length]

// En celular la lista muestra los primeros hilos y "Ver todas" la expande en la misma página.
const HILOS_VISIBLES = 6

// Los mensajes de un hilo. Va con `key={threadId}`: al cambiar de hilo se monta de nuevo y carga el suyo.
function Mensajes({ threadId, enviados }: { threadId: string; enviados: Message[] }) {
  const { data, error, cargando, reintentar } = useCarga(() => getMessages(threadId))
  const msgs = [...(data ?? []), ...enviados]

  return (
    <div role="log" aria-label="Mensajes" aria-busy={cargando} className="min-h-[14rem] flex-1 space-y-3 overflow-y-auto p-4 sm:p-6">
      {error ? (
        <ErrorCarga mensaje="No pudimos cargar los mensajes." onReintentar={reintentar} />
      ) : cargando ? (
        <div aria-hidden="true" className="space-y-3">
          <Esqueleto className="h-12 w-3/5" />
          <Esqueleto className="ml-auto h-12 w-1/2" />
          <Esqueleto className="h-12 w-2/3" />
        </div>
      ) : (
        msgs.map((m) => (
          <div
            key={m.id}
            className={
              "max-w-[85%] rounded-2xl px-4 py-2 text-sm sm:max-w-[70%] " +
              (m.from === "vos" ? "ml-auto bg-primary text-bg" : "bg-subtle")
            }
          >
            {m.text}
            <span className="mt-1 block text-xs opacity-90">{m.time}</span>
          </div>
        ))
      )}
    </div>
  )
}

export function ConversacionesPage() {
  const hilos = useCarga(getThreads)
  const [elegido, setElegido] = useState<string | null>(null)
  const [verTodas, setVerTodas] = useState(false)
  const [texto, setTexto] = useState("")
  // Mensajes que escribió el usuario en esta sesión: viven solo en memoria (F5 los borra).
  const [enviados, setEnviados] = useState<Record<string, Message[]>>({})

  const threads = hilos.data ?? []
  const activoId = elegido ?? threads[0]?.id ?? null
  const actual = threads.find((t) => t.id === activoId)

  const elegir = (id: string) => {
    setElegido(id)
    // En celular la conversación queda debajo de la lista: se lleva la vista hasta ella.
    if (window.matchMedia("(max-width: 1023px)").matches) {
      document.getElementById("conversacion")?.scrollIntoView({ block: "start" })
    }
  }

  const enviar = (e: FormEvent) => {
    e.preventDefault()
    const limpio = texto.trim()
    if (!limpio || !activoId) return
    const hora = new Date().toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" })
    setEnviados((p) => ({
      ...p,
      [activoId]: [...(p[activoId] ?? []), { id: `local-${Date.now()}`, from: "vos", text: limpio, time: hora }],
    }))
    setTexto("")
  }

  return (
    <div className="space-y-5 sm:space-y-6">
      <h1 className="font-heading text-3xl font-bold uppercase tracking-tight">Conversaciones</h1>

      <div className="flex flex-col gap-5 lg:h-[calc(100dvh-9rem)] lg:flex-row">
        <section
          aria-label="Lista de conversaciones"
          aria-busy={hilos.cargando}
          className="surface-card flex w-full shrink-0 flex-col p-2 lg:w-80 lg:overflow-y-auto"
        >
          {hilos.error ? (
            <ErrorCarga mensaje="No pudimos cargar las conversaciones." onReintentar={hilos.reintentar} />
          ) : hilos.cargando ? (
            <div aria-hidden="true" className="space-y-2 p-1">
              {Array.from({ length: HILOS_VISIBLES }, (_, i) => (
                <Esqueleto key={i} className="h-16" />
              ))}
            </div>
          ) : (
            <>
              {threads.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => elegir(t.id)}
                  aria-current={activoId === t.id ? "true" : undefined}
                  className={
                    "min-h-11 w-full items-start gap-3 rounded-xl p-3 text-left transition-colors " +
                    (i >= HILOS_VISIBLES && !verTodas ? "hidden lg:flex " : "flex ") +
                    (activoId === t.id ? "bg-subtle" : "hover:bg-subtle")
                  }
                >
                  <span
                    aria-hidden="true"
                    className={
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-heading text-xs font-bold " +
                      tintOf(t.id)
                    }
                  >
                    {iniciales(t.name)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{t.name}</p>
                    <p className="truncate text-sm text-muted">{t.last}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-xs text-muted">{t.time}</span>
                    {t.unread > 0 && (
                      <span className="chip bg-accent px-1.5 font-bold text-bg">
                        <span className="sr-only">Sin leer: </span>
                        {t.unread}
                      </span>
                    )}
                  </div>
                </button>
              ))}
              {threads.length > HILOS_VISIBLES && (
                <button
                  type="button"
                  onClick={() => setVerTodas((v) => !v)}
                  aria-expanded={verTodas}
                  className="tap mt-1 w-full rounded-xl p-3 text-sm font-medium text-primary-ink hover:bg-subtle lg:hidden"
                >
                  {verTodas ? "Ver menos" : `Ver todas (${threads.length})`}
                </button>
              )}
            </>
          )}
        </section>

        <section
          id="conversacion"
          aria-label="Conversación abierta"
          className="surface-card flex min-h-[28rem] min-w-0 flex-1 scroll-mt-4 flex-col overflow-hidden lg:min-h-0"
        >
          {hilos.cargando || !actual ? (
            <div className="border-b border-border px-4 py-4 sm:px-6">
              <Esqueleto className="h-10 w-2/5" />
            </div>
          ) : (
            <div className="flex items-center gap-3 border-b border-border px-4 py-4 sm:px-6">
              <span
                aria-hidden="true"
                className={
                  "flex h-10 w-10 items-center justify-center rounded-full font-heading text-xs font-bold " +
                  tintOf(actual.id)
                }
              >
                {iniciales(actual.name)}
              </span>
              <div>
                <p className="font-heading font-bold">{actual.name}</p>
                <p className="text-xs text-muted">Último mensaje · {actual.time}</p>
              </div>
            </div>
          )}

          {activoId ? (
            <Mensajes key={activoId} threadId={activoId} enviados={enviados[activoId] ?? []} />
          ) : (
            <div className="min-h-[14rem] flex-1 p-6">
              {hilos.cargando ? <Esqueleto className="h-12 w-3/5" /> : <p className="text-sm text-muted">No hay conversaciones.</p>}
            </div>
          )}

          <form onSubmit={enviar} className="border-t border-border p-3 sm:p-4">
            <div className="flex items-center gap-2">
              <input
                aria-label="Escribí un mensaje"
                placeholder="Escribí un mensaje..."
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                disabled={!activoId}
                className="w-full rounded-xl bg-subtle px-4 py-2.5 text-sm"
              />
              <button
                type="submit"
                aria-label="Enviar mensaje"
                disabled={!texto.trim()}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-bg transition-opacity hover:opacity-90 disabled:opacity-40"
              >
                <Send size={18} strokeWidth={2.5} aria-hidden="true" />
              </button>
            </div>
            <p className="mt-2 text-xs text-muted">Demo: el mensaje queda en pantalla pero no se envía ni se guarda.</p>
          </form>
        </section>
      </div>
    </div>
  )
}
