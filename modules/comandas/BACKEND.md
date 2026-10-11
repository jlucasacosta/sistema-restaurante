# Backend — Comandas (órdenes)
> Asume BACKEND_RULES.md.

- Tablas: comandas (mesa, contacto_id, estado, items[], total)
- Estados: recepcion -> cocina -> listo -> entregado.
- Job (pg-boss): avisar a mozo/cliente en cada cambio de estado.
- Reemplazar: modules/comandas/api.ts. Misma firma.
- "Pasar a emplatado", "Marcar lista" y "Salió" avanzan el ticket de columna (`en cocina` -> `emplatando` -> `listo` -> `entregada`) con `avanzarComanda(id)`. En la demo el cambio es optimista y vive en el estado local; si la promesa se rechaza, el ticket vuelve a su columna y se avisa.
- Una comanda en `listo` ya no envejece: se muestra el tiempo que tardó (`listo_at - fired_at`).
- Error de carga: `useCarga(getComandas)` muestra "Reintentar".
