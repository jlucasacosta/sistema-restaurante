import { theme } from "./theme"
import { iconoDeFuego, rellenoDeFuego, rotuloDeFuego, tintaDeFuego, type Nivel } from "./fuego"

// Leyenda de los tiempos de cocina. Los umbrales salen de theme.fuego: si Lucas los cambia en
// la Configuracion, la leyenda se corrige sola. Va junto a cada lugar donde aparece un ticket.
export function LeyendaFuego() {
  const { ok, demora } = theme.fuego
  const tramos: [Nivel, string][] = [
    ["ok", `menos de ${ok} min`],
    ["ambar", `de ${ok} a ${demora} min`],
    ["tarde", `${demora} min o más`],
  ]
  return (
    <div className="space-y-1">
      <p className="text-xs text-muted">El borde y el cronómetro cambian según el tiempo que lleva el ticket en cocina:</p>
      <ul aria-label="Cómo se marca el tiempo de cocina" className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted">
        {tramos.map(([nivel, rango]) => {
          const Icono = iconoDeFuego[nivel]
          return (
            <li key={nivel} className="flex items-center gap-1.5">
              <span aria-hidden="true" className={"h-3 w-1.5 rounded-sm " + rellenoDeFuego[nivel]} />
              <Icono size={14} aria-hidden="true" className={tintaDeFuego[nivel]} />
              <span>
                <span className="font-medium text-fg">{rotuloDeFuego[nivel]}</span> · {rango}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
