# Ficha de Diseño — Sistema Restaurante

**Marca ficticia:** Brasa Cocina
**Nicho:** Restaurante (parrilla / cocina de servicio, LATAM)
**Estado del debate:** CERRADO. Veredicto PASA. Correcciones del Abogado aplicadas.

---

## 1. Usuario y contexto de uso

Dos manos distintas, dos apuros distintos, una sola operación:

- **Cocinero (en cocina):** guantes grasosos, vapor, ruido, mira una pantalla a 2-3 metros. No toca, no lee párrafos: **reconoce por color y posición**. Necesita números grandes y estados que griten.
- **Mozo / host (en salón):** apurado entre servicio, celular en mano, confirma mesas y toma pedidos parado.

**La tarea x40/noche:** disparar y avanzar comandas. Entra pedido → cocina lo ve → "en fuego" → "listo" → sale. Cientos de veces por turno. Todo lo demás orbita eso.

**Qué se rompe si el dato llega tarde:** una comanda que no aparece = mesa esperando, plato frío, reseña de 1 estrella. El tiempo es el enemigo: un ticket de 18 min sin salir tiene que GRITAR en rojo sin que nadie lo lea.

**Qué mira de reojo:** cuántos tickets abiertos, cuál está viejo (verde→ámbar→rojo por antigüedad), qué estación está saturada.
**Qué lee de verdad:** los ítems del plato y sus modificaciones ("sin cebolla", "punto jugoso").

---

## 2. La pantalla que manda

**COMANDAS (KDS-board).** Es la pantalla que se graba y la que define el rubro. El resto es soporte:
- **Reservas** = segundo cerebro (plano de mesas, quién llega).
- **Menú y Contactos** = soporte.
- **Dashboard** = resume la noche, no la opera.
- **Conversaciones** = pedidos/consultas entrantes.

---

## 3. Dirección de arte

**El cliché rechazado — la trattoria rústica.** Pizarrón de tiza, papel kraft, madera envejecida, rojo tomate, gorro de chef como ícono. Se rechaza entero: eso es decoración de menú impreso, no una sala de operaciones en pleno servicio.

**La dirección elegida — el turno de las 21:30 con la cocina al rojo:**

- **DARK, no por moda.** Las pantallas KDS viven en oscuro: se leen a tres metros, bajo campana, con las manos ocupadas. El carbón-ceniza es el contexto real de uso.
- **Color = la BRASA misma**, no el rojo tomate. Naranja ámbar incandescente (carbón vivo) sobre fondo carbón-ceniza. El `accent` glow-orange marca lo urgente; el `primary` ceniza-brasa sostiene sin gritar. Un rojo ají para el estado "demorado" y un verde frío/desaturado para "listo" (bien separado del ámbar en saturación — corrección del Abogado).
- **Textura:** números GRANDES (el tiempo de un plato manda), pills redondeadas para estados, tarjetas que se levantan del fondo como papel físico en un riel.

---

## 4. Palancas del theme

| Palanca | Valor | Por qué |
|---|---|---|
| **mode** | `dark` | contexto real de una pantalla de cocina; ni light ni el verde-pino de inmobiliaria |
| **nav** | `rail` | riel icónico angosto: libera ancho para el pase y el plano de sala |
| **elevation** | `raised` | la comanda es papel físico en un riel; las tarjetas se levantan del fondo |
| **radius** | `round` | contraste total con el `sharp` construido de inmobiliaria; suaviza una UI oscura y densa |
| **density** | `comfortable` | mano grasosa en cocina: targets grandes, tocar rápido sin errar (congelado por el Abogado) |
| **badge** | `pill` | estados de mesa/ticket ("En fuego", "Listo") leen como etiquetas, no celdas |
| **fuentes** | `Archivo` (heading) / `Manrope` (body) | Archivo bold casi condensada = voz de tablero de cocina; Manrope neutro y legible en la corrida |

> **Resolución del conflicto de fuentes (corrección del Abogado):** Director decía Archivo/Manrope, Arquitecto decía Bebas/DM Sans, Productor decía Bebas. Se congela **UNA sola: Archivo + Manrope**. `Bebas_Neue` queda **reservado exclusivamente** para el número de mesa gigante del ticket si se quiere ese golpe visual — nunca como cuerpo.

**Paleta:** `primary = #E2603B` · `accent = #FF7A1A` · familia = brasa-ámbar sobre carbón.
**Semánticos:** libre = carbón · en-fuego = brasa · demorado = rojo-ají · listo = verde frío desaturado (todos ≥4.5:1 sobre carbón para texto grande; verde bien desaturado para no colisionar con el glow-orange).

---

## 5. Módulos → Arquetipo

| Módulo | Arquetipo | Componentes / tamaños / qué se ve |
|---|---|---|
| **comandas** (manda) | `kds-board` | Columnas por estado: EN COCINA / EMPLATANDO / LISTO. Tickets `raised` que migran de columna. Cada ticket: número de mesa gigante (media tarjeta), cronómetro MM:SS grande, ítems + modificaciones, borde 6px que late. Primero se ve la carga por estación. 8-10 tickets simultáneos = cocina viva. |
| **reservas** | `plano-mesas` | SVG de la sala; cada mesa un polígono coloreado por estado (libre=carbón, sentada=brasa, por-liberar=ají). Turn-timer por mesa. Primero: ocupación de un vistazo + reconstrucción de la topología física del salón. |
| **menu** | `acordeon` | La carta ES secciones colapsables (entradas / principales / postres). Cada fila un plato; precio destacado (Archivo bold, o Bebas si se activa el golpe). Recontextualizado del vertical, no la tabla de nadie. |
| **dashboard** | `hero-board` (Riel del Pase + ticker) | No opera, resume la noche. Hero horizontal = Riel del Pase de órdenes activas. Arriba: ticker vivo (cubiertos, ticket promedio, rotación) + barras por hora (curva de rush). Anillo/hero-number de tiempo promedio de fuego. Sin selector de período. |
| **conversaciones** | `master-detail` | Bandeja de pedidos/consultas entrantes (reservas por WhatsApp, delivery). Lista de hilos a la izquierda, conversación abierta a la derecha. Estados en pill. |
| **contactos** | `galeria` | Fichas de comensales frecuentes / VIP: card con avatar, visitas, plato favorito, última reserva. Distinto de la tabla-densa de inmobiliaria. |
| **config** | `paneles-de-seccion` | Ajustes en tarjetas agrupadas (marca, sala, integraciones, usuarios). Layout de secciones simples — NO acordeon (ya lo usa Menú), para no repetir arquetipo dentro del mismo sistema. |

---

## 6. KPI · Gráfico · Iconos · Estructura

- **KPI = `ticker`**: banda viva corriendo (cubiertos, ticket promedio, rotación). La cocina vive el AHORA. Hero-number para el tiempo promedio de fuego, no stat-tiles tímidos.
- **Gráfico principal = `barras-verticales`**: barras por hora = curva de servicio (rush). Combinación KPI+gráfico (ticker + barras-verticales) inédita en la colección.
- **Iconos = `lucide-grueso`**: trazo bold para lectura a distancia en piso. Distinto del `icon-chip` del vecino inmobiliaria.
- **Estructura de página = `tabs-de-seccion`**: Sala / Cocina / Turno. No `header-con-metricas` (ese es de inmobiliaria).
- **Se ELIMINA el gráfico de tendencia histórica**: la cocina vive el ahora, no el histórico. `heatmap` y `barra-metas` quedan reservados para otros sistemas.

---

## 7. Componente estrella — "Riel del Pase"

Hero horizontal en el dashboard. Cada orden activa es una tarjeta-ticket ordenada por tiempo de disparo.

**Para codearlo:**
- Contenedor: banda horizontal full-width, scroll horizontal si desborda, tarjetas ordenadas por `firedAt` ascendente (la más vieja a la izquierda).
- Cada tarjeta-ticket (`raised`, `radius=round`): número de mesa (Archivo bold grande, o Bebas gigante), lista de ítems, cronómetro MM:SS que corre en vivo.
- **Heat-aging:** el borde (6px) se calienta por minutos de prep — `ember → amber → rojo-ají` a medida que envejece. Umbrales desde `theme.ts` (ej. 0-6min ok, 6-12min ámbar, >12min rojo latiendo). El rojo pulsa (animación de "late").
- **Dot-timer:** un anillo/dot que se rellena proporcional al tiempo transcurrido vs. objetivo del plato.
- Al marcar "salió", la tarjeta **se desliza fuera del riel** (animación de salida a la derecha).
- **Todo el color sale de `theme.ts`.** Nadie más en la colección tiene un riel que envejece por temperatura.

---

## 8. Componente eliminado

**El date-range / period picker del dashboard.** El servicio es AHORA — esta noche, este turno. Seleccionar "Q3" no aporta nada en un piso de cocina. Se elimina el componente y desaparece el default de rango temporal. El dashboard arranca siempre en "este turno".

---

## 9. Frame-firma (lo grabable)

El **KDS-board a pantalla completa**: columnas EN COCINA / EMPLATANDO / LISTO con tickets gruesos que corren solos. En 9:16 a 2x: la **comanda de la mesa 14 latiendo en rojo a los 12:03** (borde de 6px pulsando), mientras en la columna de al lado otra tarjeta **salta a LISTO con flash verde frío**. Dos cambios de estado simultáneos en 3 segundos. Cronómetro MM:SS enorme, número de mesa ocupando media tarjeta, 8-10 tickets en pantalla = cocina saturada y viva. Imposible de confundir con la inmobiliaria (light, sharp, mapa de pins).

---

## 10. Diferenciación vs. sistemas ya decididos

**PIEL — 8/8 palancas distintas de inmobiliaria** (mínimo requerido: 3):
mode dark≠light · nav rail≠sidebar · elevation raised≠outlined · radius round≠sharp · density comfortable≠compact · badge pill≠square · familia Archivo/Manrope grotesca-condensada ≠ Fraunces serif · color brasa-ámbar ≠ verde-pino + terracota.

**ESQUELETO:**
- 2 arquetipos únicos que nadie más usa: `kds-board` y `plano-mesas`.
- Combo KPI+gráfico inédito: `ticker` + `barras-verticales` (inmobiliaria usa barra-metas + heatmap).
- Iconos `lucide-grueso` ≠ `icon-chip` del vecino.
- Estrella propia: "Riel del Pase" con heat-aging amber→rojo (nadie más tiene reloj vivo que envejece por temperatura).
- Componente por defecto eliminado: date-range/period picker.

Dos dashboards lado a lado, sin leer texto: inmobiliaria = light, sharp, mapa de pins; restaurante = dark, round, Riel del Pase + ticker corriendo. Se distinguen a un metro.

---

## 11. Veredicto

**PASA.** Piel 8/8 sobre el mínimo de 3. Esqueleto con 2 arquetipos únicos, combo KPI+gráfico inédito, estrella viva y componente eliminado real. Contraste de semánticos validado en dark (verde "listo" desaturado y frío para no colisionar con el ámbar). Conflicto de fuentes/densidad congelado: **Archivo + Manrope, comfortable**; Bebas solo para el número de mesa gigante.
