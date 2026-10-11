# Backend — Menú (catálogo)
> Asume BACKEND_RULES.md.

- Tablas: platos (nombre, categoria, precio, descripcion, attrs jsonb, disponible)
- categoria enum: entradas | principales | postres | bebidas.
- Imágenes de plato en Supabase Storage. Búsqueda full-text con tsvector.
- Reemplazar: modules/menu/api.ts. Misma firma.
