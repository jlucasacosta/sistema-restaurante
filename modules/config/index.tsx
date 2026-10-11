import { theme } from "@/shell/theme"

// paneles-de-seccion: tarjetas agrupadas. NO acordeon (ese arquetipo ya lo usa Menu:
// dentro de un mismo sistema tampoco se repite un arquetipo).

// Los valores del theme son identificadores en inglés (dark, rail...): acá se muestran en castellano.
const modo = { light: "claro", dark: "oscuro" } as const
const navegacion = { sidebar: "barra lateral", topbar: "barra superior", rail: "riel angosto" } as const
const elevacion = { raised: "tarjetas elevadas", outlined: "tarjetas con borde", flat: "sin sombra" } as const
const bordes = { sharp: "rectos", soft: "suaves", round: "redondeados" } as const
const densidad = { compact: "compacta", comfortable: "cómoda" } as const
const chips = { pill: "píldora", square: "cuadrado" } as const

function Fila({ label, value, swatch }: { label: string; value: string; swatch?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted">{label}</span>
      <span className="flex items-center gap-2 text-sm font-medium">
        {swatch && <span aria-hidden className="h-4 w-4 rounded-full border border-border" style={{ background: value }} />}
        {value}
      </span>
    </div>
  )
}

function Panel({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="surface-card space-y-4 p-6">
      <h2 className="font-heading text-sm font-bold uppercase tracking-widest">{titulo}</h2>
      {children}
    </section>
  )
}

export function ConfigPage() {
  const c = theme.colors
  return (
    <div className="space-y-6">
      <h1 className="font-heading text-3xl font-bold uppercase tracking-tight">Configuración</h1>

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel titulo="Marca">
          <Fila label="Nombre" value={theme.brand.name} />
          <Fila label="Títulos" value={theme.font.heading} />
          <Fila label="Cuerpo" value={theme.font.body} />
        </Panel>

        <Panel titulo="Forma">
          <Fila label="Modo" value={modo[theme.mode]} />
          <Fila label="Navegación" value={navegacion[theme.nav]} />
          <Fila label="Elevación" value={elevacion[theme.elevation]} />
          <Fila label="Bordes" value={bordes[theme.radius]} />
          <Fila label="Densidad" value={densidad[theme.density]} />
          <Fila label="Chips" value={chips[theme.badge]} />
        </Panel>

        <Panel titulo="Paleta">
          <Fila label="Brasa (primario)" value={c.primary} swatch />
          <Fila label="Glow (acento)" value={c.accent} swatch />
          <Fila label="Listo y sentada" value={c.success} swatch />
          <Fila label="Atención y por liberar" value={c.warning} swatch />
          <Fila label="Demorado y agotado" value={c.danger} swatch />
          <Fila label="En tiempo y reservada" value={c.info} swatch />
        </Panel>

        <Panel titulo="Cocina y sala">
          <Fila label="Atención desde" value={`${theme.fuego.ok} min`} />
          <Fila label="Demorado desde" value={`${theme.fuego.demora} min`} />
          <Fila label="Rotación de mesa" value={`${theme.sala.rotacion} min`} />
          <Fila label="Aviso de rotación" value={`${theme.sala.aviso} min`} />
          <p className="pt-2 text-xs text-muted">
            Las comandas usan los dos primeros números para marcar los tiempos y las mesas usan los otros dos.
            Cambialos en shell/theme.ts y se ajusta todo el sistema.
          </p>
        </Panel>
      </div>

      <Panel titulo="Estados">
        <div className="flex flex-wrap gap-2">
          <span className="chip bg-info/15 text-info">en tiempo · reservada</span>
          <span className="chip bg-warning/15 text-warning">atención · por liberar</span>
          <span className="chip bg-danger/15 text-danger-ink">demorado · agotado</span>
          <span className="chip bg-success/15 text-success">listo · sentada</span>
          <span className="chip bg-accent/15 text-accent">VIP</span>
          <span className="chip border border-border bg-subtle text-muted">inactivo · libre</span>
        </div>
        <p className="pt-2 text-xs text-muted">
          El rojo queda para lo que falla o se pasó de tiempo. La brasa es la identidad del sistema (botones y menú),
          no un estado. Todo esto sale de shell/theme.ts.
        </p>
      </Panel>
    </div>
  )
}
