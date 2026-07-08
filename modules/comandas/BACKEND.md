# Backend — Comandas (ordenes)
> Asume BACKEND_RULES.md.

- Tablas: comandas (mesa, contacto_id, estado, items[], total)
- Estados: recepcion -> cocina -> listo -> entregado.
- Job (pg-boss): avisar a mozo/cliente en cada cambio de estado.
- Reemplazar: modules/comandas/api.ts. Misma firma.
