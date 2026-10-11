# Brasa Cocina — Sistema para restaurantes

Un sistema de gestión para restaurantes: menú, reservas, comandas en cocina, conversaciones con clientes y contactos. Un sistema demo hecho con Next.js.

> Es un demo **frontend** con datos de ejemplo (mock). No tiene backend conectado: sirve para ver cómo se ve y cómo funciona un sistema así, y para aprender a construirlo.

---

## Demo en vivo
👉 https://sistema-restaurante-eight.vercel.app

## Sumate al Club de la IA

Aprendé a crear tu Agencia de IA y conseguir tu primer cliente. Eso lo trabajamos adentro del Club de la IA, nuestro Skool privado.

👉 https://www.skool.com/club-de-la-ia-8047/about

---

## Qué incluye
- Dashboard con métricas del negocio
- Menú (catálogo de platos con filtros por categoría)
- Conversaciones (inbox de clientes)
- Reservas (agenda de mesas del dia)
- Comandas (tablero de cocina por estado)
- Contactos (clientes)
- Configuración

## Requisitos (instalá esto primero)

Necesitás dos programas gratis en tu computadora:

1. **Node.js** (versión 18 o mayor). Descargalo en https://nodejs.org y elegí la opción **LTS**.
2. **Git**. Descargalo en https://git-scm.com

Para chequear que quedaron instalados, abrí una terminal y escribí:

    node -v
    git --version

Si te devuelven un número de versión, ya está.

## Cómo clonar y correr (paso a paso)

1. Abrí una terminal en la carpeta donde quieras guardar el proyecto.
2. Cloná el repo:

       git clone https://github.com/jlucasacosta/sistema-restaurante.git

3. Entrá a la carpeta del proyecto:

       cd sistema-restaurante

4. Instalá las dependencias (baja lo que el proyecto necesita):

       npm install

5. Levantá el proyecto:

       npm run dev

6. Abrí el navegador en http://localhost:3000

Listo. Vas a ver el sistema funcionando.

## Personalizarlo

Todo el diseño (colores, tipografía, nombre de la marca) vive en un solo archivo: `shell/theme.ts`. Cambiás eso y muta el sistema entero. Probá y mirá qué pasa.

## Cambiar los datos de ejemplo

Todos los datos que ves (comandas, mesas, platos, contactos, mensajes) viven en archivos `modules/<modulo>/data.json`. Podés abrirlos y cambiar nombres, platos o números para adaptarlo a tu restaurante.

- Son de **solo lectura**: el demo no guarda nada. Si en pantalla "avanzás" una comanda o escribís algo, el cambio vive solo hasta que recargás.
- Al apretar **F5** la pantalla vuelve a mostrar exactamente lo que dice el `data.json`.

## Estructura de carpetas

```
app/           las páginas (una carpeta por pantalla) y el layout general
modules/       un módulo por pantalla
  <modulo>/index.tsx   la pantalla
  <modulo>/api.ts      las funciones que traen los datos (hoy leen data.json)
  <modulo>/data.json   los datos de ejemplo
  <modulo>/BACKEND.md  cómo se conectaría a una base real
shell/         el marco: theme.ts (diseño), navegación, fuentes, auth de ejemplo
docs/          guías (IMPLEMENTAR.md)
.env.example   los nombres de las variables que vas a necesitar (sin valores)
```

## Llevalo a producción

Este repo es un **demo frontend con datos de ejemplo y sin backend conectado**. Pasarlo a un sistema real es un trabajo aparte, y está explicado paso a paso en [`docs/IMPLEMENTAR.md`](docs/IMPLEMENTAR.md):

- **Supabase**: base de datos y login (tablas listas para copiar, derivadas de este mismo demo).
- **Vercel**: publicar el sistema con tu propio dominio.
- **Railway + pg-boss**: tareas en segundo plano, por ejemplo recordatorios de reservas.
- **OpenAI o Gemini**: borradores de respuesta para las conversaciones con clientes.
- Un checklist de seguridad para antes de usar datos reales.

La idea es que cambies el cuerpo de las funciones de cada `api.ts` sin tocar las pantallas.

## Licencia

MIT. Podés usarlo, copiarlo y modificarlo. Ver el archivo [`LICENSE`](LICENSE).

## Te trabaste

Si algo no te salió, preguntá en el Club de la IA. Aprendé a crear tu Agencia de IA y conseguir tu primer cliente:

👉 https://www.skool.com/club-de-la-ia-8047/about
