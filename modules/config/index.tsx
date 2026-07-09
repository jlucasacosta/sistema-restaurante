import { theme } from "@/shell/theme"

// paneles-de-seccion: tarjetas agrupadas. NO acordeon (ese arquetipo ya lo usa Menu:
// dentro de un mismo sistema tampoco se repite un arquetipo).

function Fila({ label, value, swatch }: { label: string; value: string; swatch?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted">{label}</span>
      <span className="flex items-center gap-2 text-sm font-medium">
        {swatch && <span className="h-4 w-4 rounded-full border border-border" style={{ background: value }} />}
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
      <h1 className="font-heading text-3xl font-bold uppercase tracking-tight">Configuracion</h1>

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel titulo="Marca">
          <Fila label="Nombre" value={theme.brand.name} />
          <Fila label="Titulos" value={theme.font.heading} />
          <Fila label="Cuerpo" value={theme.font.body} />
        </Panel>

        <Panel titulo="Forma">
          <Fila label="Modo" value={theme.mode} />
          <Fila label="Navegacion" value={theme.nav} />
          <Fila label="Elevacion" value={theme.elevation} />
          <Fila label="Bordes" value={theme.radius} />
          <Fila label="Densidad" value={theme.density} />
          <Fila label="Chips" value={theme.badge} />
        </Panel>

        <Panel titulo="Paleta">
          <Fila label="Brasa (primario)" value={c.primary} swatch />
          <Fila label="Glow (acento)" value={c.accent} swatch />
          <Fila label="Listo" value={c.success} swatch />
          <Fila label="Atencion" value={c.warning} swatch />
          <Fila label="Demorado" value={c.danger} swatch />
          <Fila label="Info" value={c.info} swatch />
        </Panel>

        <Panel titulo="Cocina">
          <Fila label="Umbral ambar" value={`${theme.fuego.ok} min`} />
          <Fila label="Umbral demorado" value={`${theme.fuego.demora} min`} />
          <p className="pt-2 text-xs text-muted">
            El Riel del Pase envejece con estos dos numeros. Cambialos y toda la cocina cambia de temperatura.
          </p>
        </Panel>
      </div>

      <Panel titulo="Estados">
        <div className="flex flex-wrap gap-2">
          <span className="chip bg-success/15 text-success">listo</span>
          <span className="chip bg-warning/15 text-warning">atencion</span>
          <span className="chip bg-danger/15 text-danger">demorado</span>
          <span className="chip bg-info/15 text-info">reservada</span>
          <span className="chip bg-primary/15 text-primary">en fuego</span>
          <span className="chip bg-accent/15 text-accent">vip</span>
        </div>
        <p className="pt-2 text-xs text-muted">
          Todo esto sale de shell/theme.ts. Cambias un archivo y muta el sistema entero.
        </p>
      </Panel>
    </div>
  )
}
