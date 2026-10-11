# Backend — Reservas (agenda)
> Asume BACKEND_RULES.md.

- Tablas: reservas (contacto_id, inicio, personas, mesa, estado)
- Job (pg-boss): recordatorio 24h y 2h antes -> WhatsApp/email.
- Evitar solapamientos de mesa con constraint de rango horario.
- Reemplazar: modules/reservas/api.ts. Misma firma.
- Ficha lateral para cada mesa y para cada próxima llegada. Acciones de demo en la mesa: `Sentar clientes`, `Liberar mesa`, `Reservar mesa`, `Enviar recordatorio`, `Pedir la cuenta`; en la llegada: `Asignar mesa`, `Confirmar reserva`, `Registrar llegada`. Al conectar: UPDATE de `reservas.estado` / `sentada_at` / `fin`.
- La mesa asignada a una llegada hoy se deduce por el nombre del cliente; en la base real sale de `reservas.mesa_id`.
- Los avisos de rotación salen de `theme.sala` (`rotacion` y `aviso`, en minutos).
- Error de carga: dos `useCarga` independientes (plano y próximas llegadas), cada uno con su "Reintentar".
