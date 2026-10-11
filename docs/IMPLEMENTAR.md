# Guía de implementación — Brasa Cocina (sistema para restaurantes)

Esta guía te lleva de "tengo el demo corriendo" a "tengo un sistema de restaurante con base de datos, login, tareas en segundo plano y publicado en internet".

> **Qué es esto y qué no es.** El repo es un **demo frontend con datos de ejemplo** (mock) y **sin backend conectado**. Esta guía **describe** cómo armar el backend real; el código de backend que aparece acá son bloques de ejemplo para copiar en TU proyecto. Nada de esto está instalado ni conectado en el repo, y no hace falta tocar el demo para seguir mirándolo.
>
> **Antes de empezar.** Este repo es **público**. Cuando conectes datos reales, trabajá en tu propia copia **privada** (fork privado o repo nuevo) y nunca subas ahí claves ni datos de clientes. Más en la [etapa 7](#7-checklist-de-seguridad-antes-de-publicar-con-datos-reales).

---

## 0. Qué vas a lograr, orden recomendado y tiempos

| # | Etapa | Qué lográs | Tiempo estimado* |
|---|---|---|---|
| 1 | Clonar y correr local | El demo andando en tu computadora | 15-30 min |
| 2 | Mapa del sistema | Entender qué archivo se reemplaza por qué | 15 min de lectura |
| 3 | Supabase | Base de datos + login + datos de ejemplo cargados + un módulo conectado | 2-4 h |
| 5 | Vercel | El sistema publicado con tu link | 30-45 min |
| 4 | Railway | Tareas en segundo plano (recordatorios de reservas, avisos) | 1-2 h |
| 6 | IA | Borradores de respuesta para Conversaciones | 1-2 h |
| 7 | Checklist de seguridad | Listo para datos reales | 1 h |

\*Para una persona que nunca lo hizo. El orden recomendado es **1 → 2 → 3 → 5 → 4 → 6 → 7**: publicá en Vercel apenas el primer módulo ande contra Supabase, así probás todo en un entorno real desde temprano. Las etapas 4 y 6 son opcionales: el sistema funciona sin ellas.

Cuentas que vas a necesitar (todas tienen plan gratis o de prueba; revisá los precios vigentes en cada sitio antes de usar datos reales): GitHub, Supabase, Vercel, Railway (solo etapa 4) y OpenAI o Google AI (solo etapa 6).

---

## 1. Clonar y correr local

**Necesitás** (gratis):

- **Node.js 18.18 o mayor** (recomendado la versión LTS actual): https://nodejs.org
- **Git**: https://git-scm.com

**Verificá que quedaron instalados** (abrí una terminal nueva):

```bash
node -v
git --version
```

Si los dos devuelven un número de versión, seguí.

**Clonar y correr:**

```bash
git clone https://github.com/jlucasacosta/sistema-restaurante.git
cd sistema-restaurante
npm install
npm run dev
```

Abrí http://localhost:3000. Tenés que ver el Dashboard de Brasa Cocina con los indicadores del turno y las comandas en curso.

**Si algo falla, los 3 errores típicos:**

| Qué ves | Qué significa | Cómo se arregla |
|---|---|---|
| `node: command not found` / `"node" no se reconoce` | Node no está instalado o la terminal se abrió antes de instalarlo | Instalá Node desde https://nodejs.org, **cerrá la terminal y abrí una nueva** |
| `EADDRINUSE: address already in use :::3000` | Ya hay algo usando el puerto 3000 (otro proyecto) | Cerrá el otro programa, o corré `npm run dev -- -p 3001` y abrí http://localhost:3001 |
| `npm install` falla con errores de versión / `Unsupported engine` | Tu Node es muy viejo | Actualizá Node a la versión LTS, borrá la carpeta `node_modules` y volvé a correr `npm install` |

---

## 2. Mapa de este sistema

El demo está hecho para que conectar el backend sea **cambiar el cuerpo de las funciones de cada `api.ts`**, nunca su firma (nombre, parámetros y tipo de lo que devuelven). Las pantallas no se tocan.

| Módulo (`modules/…`) | Funciones de `api.ts` | Datos de ejemplo (`data.json`) | Tablas sugeridas |
|---|---|---|---|
| `dashboard` | `getTicker`, `getTiempoFuego`, `getCurvaServicio`, `getPase` | `ticker`, `tiempoFuego`, `curvaServicio`, `pase` | Sin tablas propias: **vistas** `v_pase`, `v_tiempo_fuego`, `v_curva_servicio` + conteos para los indicadores del turno |
| `menu` | `getCarta` | `carta` (secciones con `platos`) | `secciones_carta`, `platos` |
| `conversaciones` | `getThreads`, `getMessages` | `threads`, `conversaciones`, `generico` | `conversaciones`, `mensajes` |
| `reservas` | `getMesas`, `getProximas` | `mesas`, `proximas` | `mesas`, `reservas` |
| `comandas` | `getComandas`, `avanzarComanda` | `comandas` (con `items`) | `comandas`, `comanda_items` |
| `contactos` | `getContacts` | `contacts` | `contactos` |
| `config` | (no tiene `api.ts`) | (no tiene) | Ninguna: el diseño vive en `shell/theme.ts` |

Cada módulo trae además un `BACKEND.md` con notas cortas. Esta guía las desarrolla y, donde el demo y esas notas se distinguían, manda lo que dicen los tipos de `api.ts`.

**Cómo se traducen los campos** (lo que devuelve `api.ts` ↔ la columna en la base). Lo vas a usar al reescribir cada función:

| Tipo en `api.ts` | Campo | Columna en la base | Cómo se calcula |
|---|---|---|---|
| `Comanda` | `firedHace` (segundos) | `comandas.fired_at` | `(now() - fired_at)` en segundos |
| `Comanda` | `objetivo` (segundos) | `comandas.objetivo_seg` | directo |
| `Comanda` | `items[]` | `comanda_items` (`qty`, `nombre`, `mod`) | relación 1 a N |
| `Comensal` | `ultima` ("hace 4 días") | `contactos.ultima_visita` | lo formateás en `api.ts` |
| `Plato` | `precio` ("$ 7.400") | `platos.precio` (número) | lo formateás en `api.ts` |
| `Plato` | `vendidosHoy` | `platos.vendidos_hoy` | columna simple (en producción: conteo sobre `comanda_items`) |
| `Mesa` | `estado`, `cliente`, `hora`, `minutos` | `reservas` (`estado`, `cliente`, `inicio`, `sentada_at`) | join con la reserva activa de la mesa; `minutos = now() - sentada_at`; mesa sin reserva activa = `libre` |
| `ProximaLlegada` | `hora`, `cliente`, `personas`, `nota` | `reservas` (`inicio`, `cliente`, `personas`, `nota`) | reservas con `estado = 'reservada'` y `inicio` futuro |
| `Thread` | `last`, `time`, `unread` | `conversaciones.last`, `last_at`, `unread` | directo (`time` lo formateás) |
| `Message` | `from`, `text`, `time` | `mensajes.autor`, `texto`, `created_at` | `from` es palabra reservada de SQL, por eso la columna se llama `autor` |

Los indicadores del turno del dashboard (`getTicker`, una fila fija de 8 números) no tienen tabla: los armás con consultas cortas de conteo o suma. `tono: "alerta"` pinta el valor de rojo (por ejemplo `Demorados`, `Platos agotados`); el resto va neutro:

| Tile del demo | Cómo sacarlo |
|---|---|
| Cubiertos | suma de `personas` de `reservas` con `sentada_at` de hoy |
| Rotación de mesa | promedio de minutos entre `sentada_at` y `fin` en reservas `finalizada` |
| Tickets abiertos | conteo de `comandas` con `estado` distinto de `entregada` |
| Demorados | conteo de `comandas` abiertas con `fired_at` anterior a 12 min (el umbral está en `theme.fuego.demora`) |
| Mesas ocupadas | conteo de `reservas` `sentada` o `por liberar` sobre el total de `mesas` |
| Platos agotados | conteo de `platos` con `estado = 'agotado'` |
| Reservas pendientes | conteo de `reservas` con `estado = 'reservada'` y `inicio` futuro |
| Ticket promedio | **este demo no modela cuentas**: cuando definas el cobro, agregá una columna `total` y promediala |

---

## 3. Supabase (base de datos + Auth)

### 3.1 Crear el proyecto

1. Entrá a https://supabase.com y creá una cuenta.
2. **New project**. Elegí un nombre (por ejemplo `brasa-cocina`), una contraseña de base de datos (guardala en tu gestor de contraseñas: **no la pegues en ningún archivo del repo**) y la región más cercana a tus clientes.
3. Esperá a que termine de crearse. En **Project Settings → API** vas a ver la **URL** del proyecto y las claves. Las vas a usar en el paso 3.5.

### 3.2 Crear las tablas

En el panel de Supabase abrí **SQL Editor → New query**, pegá **todo** el bloque siguiente y apretá **Run**. Está derivado de los tipos reales de cada `api.ts` y de las claves de cada `data.json`:

- Los `id` son `text` con un valor por defecto aleatorio. Es el mismo tipo `string` que usa `api.ts` y permite cargar los ids de los `data.json` tal cual.
- Los estados reales del demo están como `check` (por ejemplo `en cocina`, `emplatando`, `listo`). Se agregan `entregada` (el ticket que "Salió"), y `finalizada` / `cancelada` en reservas, que el demo no muestra pero un restaurante real necesita.
- Las **vistas** reemplazan al dashboard: `v_pase` devuelve exactamente la forma de `OrdenPase`.

```sql
-- ============================================================
-- Brasa Cocina · esquema base (Supabase / Postgres)
-- Pegalo completo en Supabase > SQL Editor > New query > Run.
-- Derivado de los tipos de modules/*/api.ts y las claves de data.json
-- ============================================================

-- Para que una mesa no pueda tener dos reservas que se pisan.
create extension if not exists btree_gist with schema extensions;

-- ---------- CONTACTOS (modules/contactos) ----------
create table public.contactos (
  id            text primary key default gen_random_uuid()::text,
  name          text not null,
  phone         text,
  email         text,
  visitas       integer not null default 0 check (visitas >= 0),
  favorito      text,                       -- nombre del plato favorito
  ultima_visita timestamptz,                -- api.ts lo devuelve como "hace 4 días"
  tipo          text not null default 'nuevo'
                check (tipo in ('vip', 'frecuente', 'nuevo', 'inactivo')),
  created_at    timestamptz not null default now()
);
create index contactos_tipo_idx on public.contactos (tipo);
create index contactos_email_idx on public.contactos (lower(email));

-- ---------- MENU (modules/menu) ----------
create table public.secciones_carta (
  id     text primary key,                  -- 'entradas', 'principales', ...
  nombre text not null,
  orden  integer not null default 0
);

create table public.platos (
  id           text primary key default gen_random_uuid()::text,
  seccion_id   text not null references public.secciones_carta (id) on update cascade,
  nombre       text not null,
  descripcion  text,
  precio       numeric(10, 2) not null check (precio >= 0),   -- data.json: "$ 7.400"
  estado       text not null default 'disponible'
               check (estado in ('disponible', 'pocas porciones', 'agotado')),
  vendidos_hoy integer not null default 0 check (vendidos_hoy >= 0),
  created_at   timestamptz not null default now()
);
create index platos_seccion_idx on public.platos (seccion_id);

-- ---------- MESAS Y RESERVAS (modules/reservas) ----------
create table public.mesas (
  id        text primary key default gen_random_uuid()::text,
  numero    text not null unique,           -- '01', '14', '35'
  x         numeric(5, 2) not null check (x between 0 and 100),   -- % del ancho del salon
  y         numeric(5, 2) not null check (y between 0 and 100),   -- % del alto del salon
  forma     text not null check (forma in ('cuadrada', 'redonda', 'larga')),
  capacidad integer not null check (capacidad > 0)
);

create table public.reservas (
  id          text primary key default gen_random_uuid()::text,
  mesa_id     text references public.mesas (id) on delete set null,  -- null = sin mesa asignada
  contacto_id text references public.contactos (id) on delete set null,
  cliente     text not null,                -- como se lee en el plano: 'Ferreyra'
  personas    integer not null check (personas > 0),
  inicio      timestamptz not null,         -- hora de la reserva
  fin         timestamptz not null,         -- inicio + duracion estimada (ej. 90 min)
  sentada_at  timestamptz,                  -- cuando se sentaron: de aca sale "minutos"
  nota        text,
  estado      text not null default 'reservada'
              check (estado in ('reservada', 'sentada', 'por liberar', 'finalizada', 'cancelada')),
  recordatorio_24h_at timestamptz,          -- los completa el worker (etapa 4)
  recordatorio_2h_at  timestamptz,
  created_at  timestamptz not null default now(),
  check (fin > inicio),
  -- una mesa no puede tener dos reservas activas que se pisan
  constraint reservas_sin_solapamiento
    exclude using gist (mesa_id with =, tstzrange(inicio, fin) with &&)
    where (estado in ('reservada', 'sentada', 'por liberar'))
);
create index reservas_inicio_idx on public.reservas (inicio);
create index reservas_mesa_idx on public.reservas (mesa_id);

-- ---------- COMANDAS (modules/comandas) ----------
create table public.comandas (
  id           text primary key default gen_random_uuid()::text,
  mesa         text not null references public.mesas (numero) on update cascade,
  mozo         text not null,
  estado       text not null default 'en cocina'
               check (estado in ('en cocina', 'emplatando', 'listo', 'entregada')),
  estacion     text not null check (estacion in ('parrilla', 'fria', 'salsas', 'postres')),
  fired_at     timestamptz not null default now(),   -- api.ts: firedHace = now() - fired_at
  objetivo_seg integer not null default 720 check (objetivo_seg > 0),
  listo_at     timestamptz,
  created_at   timestamptz not null default now()
);
create index comandas_estado_fired_idx on public.comandas (estado, fired_at);

create table public.comanda_items (
  id         text primary key default gen_random_uuid()::text,
  comanda_id text not null references public.comandas (id) on delete cascade,
  plato_id   text references public.platos (id) on delete set null,
  orden      integer not null default 0,    -- posicion dentro del ticket
  qty        integer not null check (qty > 0),
  nombre     text not null,                 -- copia del nombre al momento de pedir
  mod        text                           -- 'uno jugoso, uno a punto'
);
create index comanda_items_comanda_idx on public.comanda_items (comanda_id);

-- ---------- CONVERSACIONES (modules/conversaciones) ----------
create table public.conversaciones (
  id          text primary key default gen_random_uuid()::text,
  contacto_id text references public.contactos (id) on delete set null,
  name        text not null,
  last        text,                         -- ultimo mensaje (para la lista)
  last_at     timestamptz not null default now(),
  unread      integer not null default 0 check (unread >= 0),
  created_at  timestamptz not null default now()
);
create index conversaciones_last_at_idx on public.conversaciones (last_at desc);

create table public.mensajes (
  id              text primary key default gen_random_uuid()::text,
  conversacion_id text not null references public.conversaciones (id) on delete cascade,
  autor           text not null check (autor in ('cliente', 'vos')),  -- api.ts: "from"
  texto           text not null,
  created_at      timestamptz not null default now()
);
create index mensajes_conv_idx on public.mensajes (conversacion_id, created_at);

-- ---------- DASHBOARD (modules/dashboard): sin tablas, solo vistas ----------
create view public.v_pase with (security_invoker = true) as
select c.id,
       c.mesa,
       extract(epoch from (now() - c.fired_at))::int as "firedHace",
       c.objetivo_seg                                as objetivo,
       string_agg(
         case when i.qty > 1 then i.qty || ' ' else '' end || i.nombre,
         ' · ' order by i.orden
       )                                             as resumen
from public.comandas c
left join public.comanda_items i on i.comanda_id = c.id
where c.estado in ('en cocina', 'emplatando')
group by c.id;

create view public.v_tiempo_fuego with (security_invoker = true) as
select avg(extract(epoch from (listo_at - fired_at)))::int as promedio_seg,
       avg(objetivo_seg)::int                              as objetivo_seg,
       round(100 * (avg(extract(epoch from (listo_at - fired_at)))
                    / nullif(avg(objetivo_seg), 0) - 1))::int as delta_pct
from public.comandas
where listo_at >= now() - interval '12 hours';

-- Cubiertos sentados cada 30 minutos: "19:30" = de 19:30 a 19:59 (date_bin pide Postgres 14 o más; Supabase lo cumple).
-- Cambia 'America/Argentina/Buenos_Aires' por la zona horaria de tu restaurante.
create view public.v_curva_servicio with (security_invoker = true) as
select to_char(date_bin('30 minutes', sentada_at at time zone 'America/Argentina/Buenos_Aires', timestamp '2000-01-01'), 'HH24:MI') as hora,
       sum(personas)::int                                                                                                    as cubiertos,
       min(sentada_at)                                                                                                       as desde
from public.reservas
where sentada_at >= now() - interval '12 hours'
group by 1
order by min(sentada_at);

-- ============================================================
-- SEGURIDAD: RLS en TODAS las tablas
-- ============================================================
alter table public.contactos       enable row level security;
alter table public.secciones_carta enable row level security;
alter table public.platos          enable row level security;
alter table public.mesas           enable row level security;
alter table public.reservas        enable row level security;
alter table public.comandas        enable row level security;
alter table public.comanda_items   enable row level security;
alter table public.conversaciones  enable row level security;
alter table public.mensajes        enable row level security;

-- Politicas de EJEMPLO: cualquier usuario logueado (el personal) lee y escribe.
-- Sirve para UN restaurante. Para varios, agrega restaurante_id a cada tabla y
-- cambia `true` por una condicion que lo compare con el del usuario.
do $$
declare
  t text;
begin
  foreach t in array array[
    'contactos', 'secciones_carta', 'platos', 'mesas', 'reservas',
    'comandas', 'comanda_items', 'conversaciones', 'mensajes'
  ]
  loop
    execute format('create policy %I on public.%I for select to authenticated using (true)', 'personal_lee_' || t, t);
    execute format('create policy %I on public.%I for insert to authenticated with check (true)', 'personal_crea_' || t, t);
    execute format('create policy %I on public.%I for update to authenticated using (true) with check (true)', 'personal_edita_' || t, t);
    execute format('create policy %I on public.%I for delete to authenticated using (true)', 'personal_borra_' || t, t);
  end loop;
end $$;

-- Opcional: si tu sitio publico muestra la carta sin login, deja leerla a anonimos.
-- create policy "carta_publica_secciones" on public.secciones_carta for select to anon using (true);
-- create policy "carta_publica_platos" on public.platos for select to anon using (true);
```

> Las políticas de arriba son un **ejemplo para un solo restaurante**: cualquier persona logueada (tu personal) lee y escribe todo. Si algún día lo vas a usar para varios restaurantes, cada tabla necesita una columna `restaurante_id` y las políticas tienen que comparar esa columna con la del usuario. Sin eso, un restaurante vería los datos del otro.
>
> Con RLS activado y **sin** sesión (rol `anon`), las consultas devuelven listas vacías: es lo esperado, no un error.

**Realtime (opcional, recomendado para Comandas y Conversaciones).** Para que la cocina vea los tickets nuevos sin recargar, agregá las tablas a la publicación de Supabase (otra consulta en el SQL Editor):

```sql
alter publication supabase_realtime add table public.comandas, public.reservas, public.mensajes;
```

### 3.3 Cargar los datos de ejemplo

Tenés dos caminos. Recomendamos el **A**: respeta las relaciones (reservas ↔ mesas, items ↔ comandas) y convierte los textos del demo ("hace 4 días", "$ 7.400", "21:10") a fechas y números reales.

**A. Script que lee los `data.json`** (necesita Node 20.6 o mayor):

1. Hacé el paso 3.5 primero (variables de entorno), porque el script las usa.
2. Instalá el cliente de Supabase (también lo vas a usar en la app):

```bash
npm install @supabase/supabase-js
```

3. Creá un archivo `scripts/seed.mjs` con este contenido (en **tu** copia del proyecto; no lo subas a un repo público con claves adentro: no tiene ninguna, las lee del entorno):

```js
// scripts/seed.mjs · carga los datos de ejemplo (modules/*/data.json) en tu Supabase.
// Se corre UNA vez, en tu computadora, con la service_role. No se sube a ningun lado.
//   node --env-file=.env.local scripts/seed.mjs      (necesita Node 20.6 o mayor)
import { readFileSync } from "node:fs"
import { createClient } from "@supabase/supabase-js"


function construirFilas(raiz) {
  const leer = (modulo) => JSON.parse(readFileSync(`${raiz}/modules/${modulo}/data.json`, "utf8"))

  const ahora = Date.now()
  const hace = (segundos) => new Date(ahora - segundos * 1000).toISOString()
  const hoyA = (hhmm) => {
    const [h, m] = hhmm.split(":").map(Number)
    const d = new Date()
    d.setHours(h, m, 0, 0)
    return d.toISOString()
  }
  const masMinutos = (iso, min) => new Date(new Date(iso).getTime() + min * 60_000).toISOString()
  const diasDesde = (texto) => {
    if (texto === "hoy") return 0
    if (texto === "ayer") return 1
    if (texto === "hace mes y medio") return 45
    const [, n, unidad] = texto.match(/^hace (\d+) (días|semanas|meses)$/)
    return Number(n) * (unidad === "días" ? 1 : unidad === "semanas" ? 7 : 30)
  }

  // contactos
  const contactos = leer("contactos").contacts.map((c) => ({
    id: c.id,
    name: c.name,
    phone: c.phone,
    email: c.email,
    visitas: c.visitas,
    favorito: c.favorito,
    ultima_visita: hace(diasDesde(c.ultima) * 86400),
    tipo: c.tipo,
  }))

  // menu
  const carta = leer("menu").carta
  const secciones_carta = carta.map((s, i) => ({ id: s.id, nombre: s.nombre, orden: i }))
  const platos = carta.flatMap((s) =>
    s.platos.map((p) => ({
      id: p.id,
      seccion_id: s.id,
      nombre: p.nombre,
      descripcion: p.descripcion,
      precio: Number(p.precio.replace(/[^\d]/g, "")), // "$ 7.400" -> 7400
      estado: p.estado,
      vendidos_hoy: p.vendidosHoy,
    })),
  )

  // mesas + reservas
  const { mesas: mesasJson, proximas } = leer("reservas")
  const mesas = mesasJson.map((m) => ({
    id: m.id,
    numero: m.numero,
    x: m.x,
    y: m.y,
    forma: m.forma,
    capacidad: m.capacidad,
  }))
  const reservas = []
  const usadas = new Set()
  for (const m of mesasJson) {
    if (m.estado === "libre") continue
    const prox = proximas.find((p) => p.cliente === m.cliente)
    if (prox) usadas.add(prox.id)
    const ocupada = m.estado === "sentada" || m.estado === "por liberar"
    const inicio = ocupada ? hace(m.minutos * 60) : hoyA(m.hora)
    reservas.push({
      mesa_id: m.id,
      cliente: m.cliente,
      personas: prox ? prox.personas : m.capacidad,
      inicio,
      fin: masMinutos(inicio, 90),
      sentada_at: ocupada ? inicio : null,
      nota: prox?.nota ?? null,
      estado: m.estado,
    })
  }
  for (const p of proximas.filter((p) => !usadas.has(p.id))) {
    const inicio = hoyA(p.hora)
    reservas.push({
      mesa_id: null, // todavia sin mesa asignada
      cliente: p.cliente,
      personas: p.personas,
      inicio,
      fin: masMinutos(inicio, 90),
      nota: p.nota ?? null,
      estado: "reservada",
    })
  }

  // comandas + items
  const comandasJson = leer("comandas").comandas
  const comandas = comandasJson.map((c) => ({
    id: c.id,
    mesa: c.mesa,
    mozo: c.mozo,
    estado: c.estado,
    estacion: c.estacion,
    fired_at: hace(c.firedHace),
    objetivo_seg: c.objetivo,
    listo_at: c.estado === "listo" ? new Date(ahora).toISOString() : null,
  }))
  const comanda_items = comandasJson.flatMap((c) =>
    c.items.map((it, i) => ({ comanda_id: c.id, orden: i, qty: it.qty, nombre: it.nombre, mod: it.mod ?? null })),
  )

  // conversaciones + mensajes (los hilos sin mensajes propios usan el "generico")
  const conv = leer("conversaciones")
  const conversaciones = conv.threads.map((t) => ({
    id: t.id,
    name: t.name,
    last: t.last,
    last_at: t.time === "Ayer" ? hace(86400) : hoyA(t.time), // la lista muestra "Ayer" o una hora
    unread: t.unread,
  }))
  const mensajes = conv.threads.flatMap((t) =>
    (conv.conversaciones[t.id] ?? conv.generico).map((m) => ({
      conversacion_id: t.id,
      autor: m.from,
      texto: m.text,
      created_at: hoyA(m.time),
    })),
  )

  // El orden importa: primero las tablas de las que dependen las demas.
  return {
    contactos,
    secciones_carta,
    platos,
    mesas,
    reservas,
    comandas,
    comanda_items,
    conversaciones,
    mensajes,
  }
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY, // solo en tu maquina, nunca en el frontend
)

// Object.entries respeta el orden de arriba: primero las tablas de las que dependen las demas.
for (const [tabla, filas] of Object.entries(construirFilas(process.cwd()))) {
  const { error } = await supabase.from(tabla).insert(filas)
  if (error) {
    console.error("Fallo en " + tabla + ":", error.message)
    process.exit(1)
  }
  console.log(tabla + ": " + filas.length + " filas")
}
```

4. Corrélo una sola vez:

```bash
node --env-file=.env.local scripts/seed.mjs
```

Tiene que imprimir una línea por tabla (`contactos: 24 filas`, `platos: 28 filas`, …). Si lo corrés dos veces vas a tener datos duplicados o errores de clave repetida: para empezar de cero, borrá las filas desde el **Table Editor**.

> Los números del dashboard (tiempo de preparación, servicio por franja de 30 minutos) **no van a coincidir** con los del demo: ahora se calculan con los datos cargados y la hora actual. Eso es lo correcto.

**B. Import CSV del Table Editor.** En **Table Editor → (tabla) → Insert → Import data from CSV** podés subir un CSV por tabla. Sirve para `contactos`, `secciones_carta` y `platos` si convertís el JSON a CSV a mano (`precio` sin `$` ni puntos). No es práctico para `reservas`, `comandas` y `mensajes`, porque dependen de fechas calculadas.

### 3.4 Instalar el cliente de Supabase para Next.js

```bash
npm install @supabase/supabase-js @supabase/ssr
```

`@supabase/ssr` guarda la sesión del login en cookies, para que funcione tanto en el navegador como en el servidor de Next.js.

### 3.5 Variables de entorno

Creá tu archivo local a partir del ejemplo (el repo ya trae `.env.example`, con los nombres y **sin valores**):

```bash
# Mac / Linux / Git Bash
cp .env.example .env.local
```

```powershell
# Windows PowerShell
Copy-Item .env.example .env.local
```

Completá en `.env.local` (vas a encontrar estos valores en **Project Settings → API**):

| Variable | Qué es | Dónde se usa |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | La URL de tu proyecto (algo como `https://tu-proyecto.supabase.co`) | Navegador y servidor |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | La clave pública. Si tu panel la muestra como **"Publishable key"**, pegá esa: va en esta misma variable | Navegador y servidor |
| `SUPABASE_SERVICE_ROLE_KEY` | La clave **secreta** con permisos totales | **Solo** el script de carga y el worker (etapa 4). **Jamás** en el navegador ni con prefijo `NEXT_PUBLIC_` |

> **Regla de oro:** todo lo que empieza con `NEXT_PUBLIC_` viaja al navegador y lo puede leer cualquiera. La `service_role` se saltea todas las políticas de seguridad (RLS): si se filtra, quien la tenga puede leer y borrar toda tu base. Por eso `.env.local` está en `.gitignore` y nunca se commitea.

### 3.6 Dónde se crea el cliente: `lib/supabase`

Creá estos tres archivos nuevos en tu copia (no existen en el demo). La sintaxis es la del paquete `@supabase/ssr` actual (`getAll` / `setAll`):

**`lib/supabase/client.ts`** — para componentes del navegador (los módulos del demo son componentes de cliente):

```ts
import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
}
```

**`lib/supabase/server.ts`** — para Route Handlers y Server Components (Next.js 15: `cookies()` es asíncrono):

```ts
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
          } catch {
            // Se llamó desde un Server Component: se ignora, el middleware ya refresca la sesión.
          }
        },
      },
    },
  )
}
```

**`middleware.ts`** (en la raíz, junto a `package.json`) — refresca la sesión en cada navegación y manda al login a quien no entró:

```ts
import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
        },
      },
    },
  )

  // No pongas código entre createServerClient y getUser(): rompe el refresco de sesión.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user && !request.nextUrl.pathname.startsWith("/login")) {
    const url = request.nextUrl.clone()
    url.pathname = "/login"
    return NextResponse.redirect(url)
  }

  return response
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
```

### 3.7 ANTES / DESPUÉS: reescribir `getComandas`

Esta es la forma de conectar **cualquier** función: mismo nombre, mismos parámetros, mismo tipo devuelto. Lo único que cambia es el cuerpo. Archivo: `modules/comandas/api.ts`.

**ANTES (demo, datos de ejemplo):**

```ts
import raw from "./data.json"

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export async function getComandas(): Promise<Comanda[]> {
  await sleep(300)
  return structuredClone(raw.comandas) as Comanda[]
}
```

**DESPUÉS (Supabase):**

```ts
import { createClient } from "@/lib/supabase/client"

export async function getComandas(): Promise<Comanda[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("comandas")
    .select("id, mesa, mozo, estado, estacion, fired_at, objetivo_seg, comanda_items(qty, nombre, mod)")
    .neq("estado", "entregada") // las que ya salieron no se muestran en el tablero
    .order("fired_at", { ascending: true })
    .order("orden", { referencedTable: "comanda_items", ascending: true })

  if (error) throw new Error(`No se pudieron leer las comandas: ${error.message}`)

  return (data ?? []).map((c) => ({
    id: c.id,
    mesa: c.mesa,
    mozo: c.mozo,
    estado: c.estado as Comanda["estado"],
    estacion: c.estacion as Comanda["estacion"],
    firedHace: Math.max(0, Math.floor((Date.now() - new Date(c.fired_at).getTime()) / 1000)),
    objetivo: c.objetivo_seg,
    items: c.comanda_items.map((i) => ({ qty: i.qty, nombre: i.nombre, ...(i.mod ? { mod: i.mod } : {}) })),
  }))
}
```

Lo mismo para la acción de la cocina, `avanzarComanda`. En el demo no hace nada (es un `sleep`); en la base es un `update`:

```ts
export async function avanzarComanda(id: string): Promise<void> {
  const supabase = createClient()

  const { data: actual, error: errorLectura } = await supabase.from("comandas").select("estado").eq("id", id).single()
  if (errorLectura) throw new Error(errorLectura.message)

  const siguiente = { "en cocina": "emplatando", emplatando: "listo", listo: "entregada" } as const
  const nuevoEstado = siguiente[actual.estado as keyof typeof siguiente]

  const { error } = await supabase
    .from("comandas")
    .update({ estado: nuevoEstado, ...(nuevoEstado === "listo" ? { listo_at: new Date().toISOString() } : {}) })
    .eq("id", id)
  if (error) throw new Error(error.message)
}
```

Detalles útiles:

- **Manejo de error:** `supabase-js` no lanza excepciones: devuelve `{ data, error }`. Siempre mirá `error` antes de usar `data`.
- **Tipos:** `data` viene tipado como `any` hasta que generes los tipos de tu base: `npx supabase gen types typescript --project-id tu-proyecto > lib/supabase/database.types.ts` y se los pasás a `createBrowserClient<Database>(…)`.
- **Las pantallas ya manejan la carga y el error.** Cada módulo usa `useCarga` (`shell/carga.tsx`) sobre la función del `api.ts`: mientras llegan los datos muestra `—` y un esqueleto, y si la promesa se rechaza (el `throw new Error(...)` de los ejemplos de arriba) muestra el aviso con el botón **Reintentar**. Por eso las funciones del `api.ts` tienen que **lanzar** el error y no devolver una lista vacía.
- **Las fichas laterales (contactos, menú y reservas) hoy no guardan nada.** Sus acciones (`Reservar mesa`, `Marcar como no disponible`, `Liberar mesa`...) solo cambian el estado de React y muestran el aviso "Demo: no se guardó nada". Cuando conectes el backend, sumá una función al `api.ts` de cada módulo (por ejemplo `actualizarEstadoPlato(id, estado)`) y llamala desde el `onClick` de esos botones.
- Hacé **un módulo por vez** y probalo antes de pasar al siguiente. Empezá por `contactos` (el más simple) y dejá `dashboard` para el final.

### 3.8 Auth con Supabase Auth

El demo trae `shell/auth-stub.ts`, un placeholder que siempre devuelve un "Usuario Demo". Se reemplaza por Supabase Auth (**nunca Clerk**; el stack de este sistema es Supabase para base de datos y login).

1. En Supabase: **Authentication → Users → Add user** y creá la cuenta de cada persona de tu personal. Después desactivá el registro abierto (buscá la opción **Allow new users to sign up** en la configuración de Auth) para que solo entren las cuentas que vos creaste.
2. Reemplazá el cuerpo de `shell/auth-stub.ts` (misma función, ahora real):

```ts
import { createClient } from "@/lib/supabase/server"

export async function getSession() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user ? { user: { id: user.id, name: user.email ?? "Personal" } } : null
}
```

3. Creá la pantalla de ingreso `app/login/page.tsx`:

```tsx
"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)

  async function entrar(e: React.FormEvent) {
    e.preventDefault()
    const { error } = await createClient().auth.signInWithPassword({ email, password })
    if (error) return setError(error.message)
    router.push("/dashboard")
    router.refresh()
  }

  return (
    <form onSubmit={entrar} className="mx-auto mt-24 max-w-sm space-y-4">
      <h1 className="font-heading text-3xl font-bold uppercase">Ingresar</h1>
      <label className="block text-sm">
        Email
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-xl bg-subtle px-4 py-2.5" />
      </label>
      <label className="block text-sm">
        Contraseña
        <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full rounded-xl bg-subtle px-4 py-2.5" />
      </label>
      {error && <p role="alert" className="text-sm text-danger-ink">{error}</p>}
      <button type="submit" className="min-h-11 rounded-xl bg-primary px-6 font-bold text-bg">Entrar</button>
    </form>
  )
}
```

Para cerrar sesión: `await createClient().auth.signOut()`. Como el `middleware.ts` ya redirige a `/login` a quien no tiene sesión, no hace falta proteger cada página a mano.

---

## 4. Railway: tareas en segundo plano con pg-boss

### 4.1 Para qué sirve (en criollo)

Vercel corre tu sistema **cuando alguien entra**. Pero hay cosas que tienen que pasar **solas, aunque nadie esté mirando**: mandarle un recordatorio al comensal 2 horas antes de la reserva, avisar al encargado que una comanda lleva demasiado en la cocina, o armar el resumen del turno cuando cierra. Para eso se necesita un programa que esté **siempre prendido** y que tenga una **lista de tareas pendientes**.

- **pg-boss** es esa lista de tareas (una "cola de trabajos"). Guarda las tareas en tu misma base de Postgres (la de Supabase), reintenta las que fallan y puede programar tareas con un horario fijo (como un cron).
- **Railway** es el lugar donde ese programa (el *worker*) vive prendido las 24 horas.

**Casos de un restaurante que lo necesitan:**

| Caso | Tarea |
|---|---|
| Recordatorio de reserva (24 h y 2 h antes) | Buscar reservas próximas y mandar WhatsApp o email (columnas `recordatorio_24h_at` / `recordatorio_2h_at`) |
| Aviso de comanda demorada | Si una comanda abierta pasa el umbral (`theme.fuego.demora`), avisar al encargado |
| Reintento de mensaje fallido | Si falla el envío de una respuesta por WhatsApp, reintentar (está en `modules/conversaciones/BACKEND.md`) |
| Resumen del turno | Al cierre, calcular cubiertos, tiempo de preparación y platos agotados y mandarlo por email |

Si tu restaurante no necesita nada de esto todavía, **salteá esta etapa**.

### 4.2 Qué cadena de conexión usar (directa vs pooler)

Supabase te da varias formas de conectarte a la base. En **Connect** del panel vas a ver las cadenas listas para copiar. Para pg-boss importan estas dos:

| Opción | Cuándo sirve | Para pg-boss |
|---|---|---|
| **Conexión directa** (`db.<proyecto>.supabase.co:5432`) | Servidores que están siempre prendidos. Funciona por IPv6; si tu proveedor no soporta IPv6 necesitás el add-on IPv4 de Supabase | Sirve si tu entorno llega por IPv6 |
| **Session pooler** (host `…pooler.supabase.com`, puerto 5432) | Servidores siempre prendidos que necesitan IPv4 | **La que recomendamos de entrada**: mantiene conexiones largas, como las que usa pg-boss |
| **Transaction pooler** (puerto 6543) | Funciones serverless que abren y cierran conexiones todo el tiempo (como Vercel) | **Evitala para pg-boss**: pensado para consultas cortas, sin funciones de sesión. No lo probamos con pg-boss |

En resumen: el **worker en Railway** usa la **Session pooler** (o la directa si te anda). Tu app en **Vercel** no usa ninguna de estas: habla con Supabase por la API (`supabase-js`) como en la etapa 3. Copiá la cadena exacta desde el panel de Supabase (el formato puede variar); la contraseña es la de tu base de datos.

### 4.3 Pasos en Railway

1. Creá el código del worker en una **carpeta o repo aparte** (por ejemplo `brasa-worker/`; **no dentro de este repo de demo**). Necesita su propio `package.json` con `"type": "module"`:

```bash
mkdir brasa-worker
cd brasa-worker
npm init -y
npm install pg-boss @supabase/supabase-js
```

2. Copiá el esqueleto de la sección 4.4 en `worker.js` y subí esa carpeta a un repo de GitHub (**privado**).
3. En https://railway.com: **New Project → Deploy from GitHub repo** y elegí el repo del worker.
4. En el servicio: **Settings →** *Start Command*: `node worker.js` (si el worker está dentro de una subcarpeta de un repo, indicá también el *Root Directory*). Un worker no necesita dominio público.
5. En la pestaña **Variables**, cargá (las mismas claves que en tu `.env.local`, más la cadena de conexión):

| Variable | Valor |
|---|---|
| `DATABASE_URL` | La cadena de la **Session pooler** de Supabase, con tu contraseña |
| `NEXT_PUBLIC_SUPABASE_URL` | Tu URL de Supabase (se llama así para reutilizar la misma que usa la app) |
| `SUPABASE_SERVICE_ROLE_KEY` | La clave `service_role` (acá es seguro: Railway es un servidor tuyo) |

6. Esperá el deploy y abrí **Logs**: tenés que ver el mensaje `worker listo`. La primera vez, pg-boss crea solo su propio esquema (`pgboss`) en tu base: no hay que migrar nada.

### 4.4 Esqueleto de un worker (bloque de ejemplo)

> Es **un ejemplo para copiar en tu proyecto del worker**, no es código de este repo. El envío real del mensaje (`enviarRecordatorio`) lo completás con tu proveedor de WhatsApp o email. La API de pg-boss está verificada contra su documentación: `new PgBoss(cadena)`, `boss.start()`, `createQueue` antes de usar una cola, `schedule(cola, cron, datos, { tz })`, y los handlers de `work` reciben **una lista** de trabajos.

```js
// worker.js
import { PgBoss } from "pg-boss"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

const boss = new PgBoss(process.env.DATABASE_URL)
boss.on("error", (error) => console.error("pg-boss:", error))
await boss.start() // crea el esquema "pgboss" la primera vez

await boss.createQueue("buscar-recordatorios")
await boss.createQueue("enviar-recordatorio")

// Cada 5 minutos, a la hora de tu restaurante
await boss.schedule("buscar-recordatorios", "*/5 * * * *", {}, { tz: "America/Argentina/Buenos_Aires" })

// 1) Busca reservas que empiezan en menos de 2 horas y todavia no avisaron
await boss.work("buscar-recordatorios", async () => {
  const ahora = new Date()
  const en2h = new Date(ahora.getTime() + 2 * 60 * 60 * 1000)

  const { data, error } = await supabase
    .from("reservas")
    .select("id")
    .eq("estado", "reservada")
    .is("recordatorio_2h_at", null)
    .gt("inicio", ahora.toISOString())
    .lte("inicio", en2h.toISOString())
  if (error) throw new Error(error.message)

  for (const r of data) {
    await boss.send("enviar-recordatorio", { reservaId: r.id }, { retryLimit: 3, retryBackoff: true })
  }
})

// 2) Manda el aviso. Primero "reclama" la reserva para no avisar dos veces.
await boss.work("enviar-recordatorio", async ([job]) => {
  const { reservaId } = job.data

  const { data: reclamada } = await supabase
    .from("reservas")
    .update({ recordatorio_2h_at: new Date().toISOString() })
    .eq("id", reservaId)
    .is("recordatorio_2h_at", null)
    .select("cliente, inicio, contacto:contactos(phone)")
    .maybeSingle()

  if (!reclamada) return // otro trabajo ya la avisó

  // Acá llamás a tu proveedor de WhatsApp o email:
  // await enviarRecordatorio({ telefono: reclamada.contacto?.phone, cliente: reclamada.cliente, inicio: reclamada.inicio })
  console.log("recordatorio enviado a", reclamada.cliente)
})

console.log("worker listo")

// Railway manda SIGTERM al redeployar: cerramos prolijo
process.on("SIGTERM", async () => {
  await boss.stop()
  process.exit(0)
})
```

Para el recordatorio de 24 h repetís el mismo patrón con la columna `recordatorio_24h_at`.

---

## 5. Vercel

1. Subí tu copia del proyecto a un repo de GitHub (**privado** si tiene datos o configuración tuya).
2. En https://vercel.com: **Add New → Project**, elegí el repo y **Import**. Vercel detecta **Next.js** solo: no cambies el comando de build ni la carpeta de salida.
3. Antes de apretar **Deploy**, abrí **Environment Variables** y cargá las del navegador y servidor (no la `service_role`, que solo usa el script y el worker, salvo que algún Route Handler tuyo la necesite):

| Variable | Entornos |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Production, Preview, Development |
| `OPENAI_API_KEY` / `GEMINI_API_KEY` (y el nombre del modelo) | Production y Preview, solo si usás la etapa 6 |

   Las variables `NEXT_PUBLIC_…` se **incrustan al construir**: si las cambiás después, hay que hacer un **Redeploy** para que tengan efecto.
4. **Deploy**. En un par de minutos tenés una URL `https://tu-proyecto.vercel.app`.
5. **Avisale a Supabase de tu URL**: en Supabase, **Authentication → URL Configuration**, poné tu dominio en *Site URL* y en *Redirect URLs*. Sin esto, los links de los emails de Auth (recuperar contraseña, invitaciones) apuntan a `localhost`.
6. **Dominio propio:** en Vercel, **Settings → Domains → Add**, escribí tu dominio y creá en tu proveedor de dominio los registros DNS que te indica. Vercel emite el certificado HTTPS solo.
7. **Redeploy automático:** cada `git push` a la rama principal publica a producción; cada otra rama o pull request genera una URL de *preview* para probar sin romper nada.

**Si el build falla:**

1. Abrí el deploy fallido en Vercel y leé el **Build Logs**: el error real está en las últimas líneas.
2. Reproducilo en tu computadora: `npm run build`. Lo que falla ahí falla en Vercel.
3. Causas típicas: errores de TypeScript; una variable de entorno que falta; una importación con mayúsculas distintas al archivo real (`./Mesa` vs `./mesa`: en Windows y Mac anda, en Vercel/Linux **no**); una versión de Node distinta (*Settings → General → Node.js Version*).

---

## 6. IA (OpenAI o Gemini) para este sistema

### 6.1 Qué módulo se beneficia

Este sistema no trae módulos de agente de IA ni de llamadas; el que se beneficia es **Conversaciones** (el inbox de consultas de clientes). Tres usos concretos que tienen sentido en un restaurante:

| Uso | Qué hace |
|---|---|
| Borrador de respuesta | El cliente pregunta "¿tienen opciones sin TACC?" y la IA propone una respuesta con tono del local para que la persona la revise y la envíe |
| Clasificar la consulta | Etiquetar cada hilo como reserva, carta / alérgenos, queja u otro, para priorizar |
| Resumen del turno | (Se combina con la etapa 4) Texto corto para el dueño con lo que pasó en la noche |

Importante: la IA **propone**, una persona **aprueba**. No dejes que conteste sola temas de alérgenos ni de reclamos.

### 6.2 La clave vive solo en el servidor

La clave de OpenAI o de Gemini **nunca** va en el navegador ni con prefijo `NEXT_PUBLIC_`. La llamada se hace desde un **Route Handler** (un endpoint de Next.js que corre en el servidor), y el navegador solo llama a ese endpoint.

Variables (en `.env.local`, y en Vercel → Environment Variables):

```bash
OPENAI_API_KEY=
OPENAI_MODEL=
GEMINI_API_KEY=
GEMINI_MODEL=
```

`*_MODEL` es el nombre del modelo que elijas en el panel de tu proveedor (elegí uno chico y barato para empezar; los nombres cambian con el tiempo, por eso no están fijos en el código).

### 6.3 Ejemplo mínimo con OpenAI

```bash
npm install openai
```

```ts
// app/api/ia/sugerir-respuesta/route.ts
import OpenAI from "openai"
import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST(request: Request) {
  // 1) Solo personal logueado: sin esto cualquiera gastaría tu plata
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "No autorizado" }, { status: 401 })

  // 2) Validá y limitá la entrada
  const { mensajeCliente } = await request.json()
  if (typeof mensajeCliente !== "string" || mensajeCliente.length === 0 || mensajeCliente.length > 1000) {
    return NextResponse.json({ error: "Mensaje inválido" }, { status: 400 })
  }

  // 3) Llamada con tope de salida
  const response = await openai.responses.create({
    model: process.env.OPENAI_MODEL!,
    instructions:
      "Sos el equipo de atención de un restaurante. Respondé en español rioplatense, breve y cordial. " +
      "No confirmes alérgenos ni reservas: decí que una persona del local lo confirma.",
    input: mensajeCliente,
    max_output_tokens: 300,
  })

  return NextResponse.json({ borrador: response.output_text })
}
```

**Alternativa con Gemini:**

```bash
npm install @google/genai
```

```ts
import { GoogleGenAI } from "@google/genai"

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

const response = await ai.models.generateContent({
  model: process.env.GEMINI_MODEL!,
  contents: mensajeCliente,
  config: { systemInstruction: "Sos el equipo de atención de un restaurante…", maxOutputTokens: 300 },
})
const borrador = response.text
```

Después, desde el módulo, el botón "Sugerir respuesta" hace `fetch("/api/ia/sugerir-respuesta", { method: "POST", body: JSON.stringify({ mensajeCliente }) })`.

### 6.4 Costos y límites a vigilar

- **Se cobra por uso** (por tokens de entrada y de salida). Mirá los precios vigentes de tu proveedor antes de activar nada.
- Poné un **límite de gasto mensual** y alertas de uso en el panel del proveedor.
- Limitá el largo de la entrada y de la salida (como en el ejemplo: 1000 caracteres y 300 tokens).
- Agregá **rate limiting** por usuario al endpoint (Vercel Firewall permite reglas de límite de tasa, o una librería como Upstash Ratelimit): un bucle en el navegador no debería poder disparar 1000 llamadas.
- **No mandes datos personales innecesarios** (teléfonos, apellidos completos) en el texto que envías al modelo.
- Guardá cuántos tokens se usan por llamada (vienen en la respuesta) para saber cuánto cuesta cada función.
- Tené un plan B: si el proveedor falla, la pantalla tiene que seguir funcionando sin el borrador.

---

## 7. Checklist de seguridad antes de publicar con datos reales

- [ ] **RLS activado en todas las tablas** y probado: con un navegador sin sesión no se ve nada.
- [ ] Las políticas no son `using (true)` si hay más de un restaurante o más de un nivel de permisos.
- [ ] La **`service_role` no aparece en el frontend**: ninguna variable `NEXT_PUBLIC_` la contiene; solo vive en el worker, en el script de carga y (si hace falta) en Route Handlers.
- [ ] **`.env.local` está en `.gitignore`** y nunca se commiteó. Verificá con `git log --all -- .env.local` que no tenga historial; si alguna vez se subió una clave, **rotala** (generá una nueva) en vez de solo borrar el archivo.
- [ ] `.env.example` tiene solo nombres, sin valores.
- [ ] **Registro abierto desactivado** en Supabase Auth, y usuarios del personal creados a mano.
- [ ] **Rate limiting** en los endpoints que cuestan plata (IA) o que escriben datos.
- [ ] **Backups**: revisá qué copias automáticas incluye tu plan de Supabase y probá restaurar una antes de necesitarla.
- [ ] **Límites de gasto** configurados en Supabase, Vercel, Railway y el proveedor de IA.
- [ ] **No subas datos reales a un repo público**: ni clientes, ni teléfonos, ni el `data.json` con datos tuyos. Los repos con datos reales son privados.
- [ ] Datos personales de comensales: sabé dónde se guardan, quién accede y cómo borrar los de una persona si lo pide (según la ley de protección de datos de tu país).
- [ ] Un usuario de prueba **sin** permisos de administración para verificar que lo que no debería ver, no lo ve.

---

## 8. Errores comunes y cómo resolverlos

| Qué ves | Causa probable | Solución |
|---|---|---|
| Las listas aparecen **vacías** y no hay error | Sin sesión (rol `anon`) con RLS activado, o falta la política `select` | Iniciá sesión; verificá en **Authentication → Policies** que exista la política para `authenticated` |
| `new row violates row-level security policy` | Falta la política `insert`/`update` o no hay sesión | Revisá las políticas de esa tabla y que el usuario esté logueado |
| `Invalid API key` / `Invalid JWT` | Clave mal copiada, o variable sin prefijo `NEXT_PUBLIC_`, o no redeployaste tras cambiarla | Copiala de nuevo desde **Project Settings → API**, revisá el nombre y hacé Redeploy |
| `permission denied for table …` | El rol no tiene permiso sobre la tabla (por ejemplo, se creó con otro rol) | En el SQL Editor: `grant select, insert, update, delete on all tables in schema public to authenticated;` |
| `conflicting key value violates exclusion constraint "reservas_sin_solapamiento"` (código `23P01`) | Esa mesa ya tiene una reserva activa en ese horario | Es lo esperado: mostrá un mensaje "mesa ocupada en ese horario" y ofrecé otra mesa u hora |
| `duplicate key value violates unique constraint` al correr el seed | Corriste el script dos veces | Borrá las filas desde el Table Editor y volvé a correrlo |
| La sesión se pierde al navegar o aparece "no autorizado" en Route Handlers | Falta el `middleware.ts` o no se nombró exactamente así / no está en la raíz | Revisá la sección 3.6 |
| El worker en Railway no conecta (`ENETUNREACH`, `ECONNREFUSED`) | La cadena directa usa IPv6 y tu entorno no llega | Usá la cadena **Session pooler** |
| Errores raros de conexión o `prepared statement … already exists` | Estás usando el **Transaction pooler** (puerto 6543) | Cambiá a **Session pooler** (puerto 5432) para pg-boss |
| El build pasa en tu computadora y falla en Vercel | Importaciones con mayúsculas distintas, variable de entorno que falta, otra versión de Node | Sección 5, "Si el build falla" |
| `Module not found: @supabase/ssr` (o `openai`) | No instalaste el paquete | `npm install @supabase/ssr` (o el que falte) |
| OpenAI/Gemini devuelve 401 o 429 | Clave inválida o sin saldo / límite de uso excedido | Revisá la clave y la facturación en el panel del proveedor |

---

## 9. Siguiente paso

Si llegaste hasta acá tenés un sistema real. Lo que sigue es lo que se trabaja con acompañamiento: elegir un nicho, armar la propuesta, publicar el sistema y conseguir el primer cliente.

**Aprendé a crear tu Agencia de IA y conseguir tu primer cliente.** Eso lo trabajamos adentro del Club de la IA, nuestro Skool privado.

👉 https://www.skool.com/club-de-la-ia-8047/about
