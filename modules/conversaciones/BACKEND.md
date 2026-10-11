# Backend — Conversaciones
> Asume BACKEND_RULES.md.

- Tablas: conversaciones, mensajes
- Ingreso: webhook de WhatsApp (Meta) -> Route Handler -> insert en mensajes
- Realtime: suscribir a mensajes para inbox en vivo
- Job (pg-boss): reintento de envío fallido
- Reemplazar: modules/conversaciones/api.ts. Misma firma.
- Error de carga: la lista de hilos y los mensajes de cada hilo se cargan con `useCarga`, cada uno con su "Reintentar".
- El campo de mensaje de la demo solo agrega el texto en pantalla. Al conectar, llamar a una función `enviarMensaje(threadId, texto)` en `api.ts`.
