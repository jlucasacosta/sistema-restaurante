# Backend — Menu (catalogo)
> Asume BACKEND_RULES.md.

- Tablas: platos (nombre, categoria, precio, descripcion, attrs jsonb, disponible)
- categoria enum: entradas | principales | postres | bebidas.
- Imagenes de plato en Supabase Storage. Busqueda full-text con tsvector.
- Reemplazar: modules/menu/api.ts. Misma firma.
