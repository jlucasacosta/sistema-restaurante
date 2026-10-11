# Backend — Dashboard
> Asume BACKEND_RULES.md (stack global). Acá solo lo propio.

- Sin tablas propias: agrega datos de otros módulos (ventas, pipeline, conversaciones).
- Fuente ideal: vistas / materialized views en Supabase.
- Realtime opcional: refrescar KPIs suscribiendo a las tablas fuente.
- Reemplazar: modules/dashboard/api.ts (mock -> queries agregadas). Misma firma.
- Los indicadores del turno son una fila fija (ya no una cinta que se desplaza). Cada bloque tiene su propio `useCarga` y su "Reintentar".
- `getCurvaServicio` devuelve cubiertos por franja de 30 minutos (`hora` = "19:30").
