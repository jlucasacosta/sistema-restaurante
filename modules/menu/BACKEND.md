# Backend — Menú (catálogo)
> Asume BACKEND_RULES.md.

- Tablas: platos (nombre, categoria, precio, descripcion, attrs jsonb, disponible)
- categoria enum: entradas | principales | postres | bebidas.
- Imágenes de plato en Supabase Storage. Búsqueda full-text con tsvector.
- Reemplazar: modules/menu/api.ts. Misma firma.
- Ficha lateral por plato: precio, estado, vendidos hoy y ventas de hoy (`vendidosHoy` × precio, se calcula en pantalla). Acciones de demo: `Marcar como no disponible`, `Marcar pocas porciones`, `Enviar menú`. Al conectar: agregar `actualizarEstadoPlato(id, estado)` en `api.ts` (UPDATE de `platos.estado`).
- Error de carga: `useCarga(getCarta)` muestra "Reintentar" si `api.ts` lanza.
