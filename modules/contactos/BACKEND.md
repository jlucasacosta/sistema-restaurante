# Backend — Contactos
> Asume BACKEND_RULES.md.

- Tablas: contactos (name, phone, email, status, owner_id)
- RLS por owner_id.
- Reemplazar: modules/contactos/api.ts. Misma firma.
- Ficha lateral: al hacer clic en un comensal se abre con todos sus datos. Las acciones (`Reservar mesa`, `Enviar menú`, `Enviar mensaje`) son de demo: al conectar, llamar a las funciones de `reservas` y `conversaciones`.
- Error de carga: `useCarga(getContacts)` captura el rechazo y muestra "Reintentar". `api.ts` tiene que lanzar el error, no devolver `[]`.
