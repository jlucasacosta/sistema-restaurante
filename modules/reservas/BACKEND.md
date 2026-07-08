# Backend — Reservas (agenda)
> Asume BACKEND_RULES.md.

- Tablas: reservas (contacto_id, inicio, personas, mesa, estado)
- Job (pg-boss): recordatorio 24h y 2h antes -> WhatsApp/email.
- Evitar solapamientos de mesa con constraint de rango horario.
- Reemplazar: modules/reservas/api.ts. Misma firma.
