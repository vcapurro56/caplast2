# Guía de integración del CMS (Sanity) — Caplast

Esta guía explica cómo quedó conectado el sitio a un panel de administración visual y cómo dejarlo funcionando en producción.

## ¿Qué cambió?

El sitio sigue siendo el mismo HTML/CSS/JS estático de siempre (no se agregó React, ni Node, ni un paso de "build"). Lo único nuevo es que `assets/js/main.js` ahora, al cargar cada página, le pide los datos a **Sanity** (un CMS gratuito y 100% hospedado) en vez de leerlos de arrays escritos a mano. Si por algún motivo no puede contactar a Sanity (CMS recién creado, sin internet, etc.), usa automáticamente un set de datos de respaldo para que el sitio nunca se vea roto.

Archivos nuevos que agrega esta integración:
- `assets/js/sanity-config.js` — acá van tu `projectId` y `dataset` (paso 5).
- `assets/js/sanity-client.js` — hace las consultas a Sanity (no hay que tocarlo).
- `cms/schemaTypes/*.js` — el modelo de datos, listo para pegar en tu Sanity Studio (paso 2).

Páginas del sitio que ahora se "hidratan" con datos del CMS: la portada, `/productos/`, la calculadora, y las 6 fichas de producto (`/productos/<slug>/`).

**Importante — no rompas los links:** el `slug` de cada producto en Sanity debe ser idéntico al nombre de su carpeta actual (por ejemplo `envase-hdpe-500cc`), porque de ahí sale la URL `/productos/envase-hdpe-500cc/`. Igual para las categorías: deben usar exactamente los slugs `potes-de-capsula` y `potes-apilables`.

---

## Paso 1 — Crear el proyecto de Sanity

Necesitas Node.js instalado. Desde una terminal, en cualquier carpeta (puede ser fuera del sitio, por ejemplo una carpeta hermana `caplast-cms/`):

```bash
npm create sanity@latest
```

Te va a preguntar:
- Iniciar sesión (con Google o email) — esto crea tu cuenta gratuita de Sanity.
- Nombre del proyecto: "Caplast CMS" (o el que prefieras).
- Dataset: dejar `production`.
- Plantilla: elegir **"Clean project with no predefined schemas"**.



- Typescript: no es necesario, pero da igual si acepta el default.

Al terminar, anota el **Project ID** que te muestra en la terminal (o lo puedes ver después en `sanity.config.js`, campo `projectId`).

## Paso 2 — Cargar el modelo de datos (schema)

En la carpeta del proyecto que acaba de crear `npm create sanity`, hay una carpeta `schemaTypes/`. Reemplaza su contenido por los archivos que preparé en `cms/schemaTypes/` de este repositorio (son 7 archivos: `categoria.js`, `producto.js`, `tapaOpcion.js`, `selloOpcion.js`, `configuracionPrecios.js`, `configuracionSitio.js`, `index.js`).

Luego confirma que `sanity.config.js` (en la raíz de ese proyecto) importe el schema así:

```js
import {schemaTypes} from './schemaTypes'
// ...
export default defineConfig({
  // ...
  schema: {types: schemaTypes},
})
```

## Paso 3 — Probar y publicar el Studio

Dentro de la carpeta del proyecto de Sanity:

```bash
npm run dev
```

Se abre en `http://localhost:3333` — ahí ya deberías ver en el menú lateral: Producto, Categoría, Tapa, Sello, Configuración de precios, Configuración del sitio.

Cuando quieras que el encargado de contenido pueda entrar desde cualquier lugar (sin instalar nada), publica el Studio:

```bash
npx sanity deploy
```

Te va a pedir un subdominio, por ejemplo `caplast` → queda en **`https://caplast.sanity.studio`**. Ese es el link que le vas a pasar a la persona que administrará el contenido.

## Paso 4 — Habilitar que el sitio pueda leer los datos (CORS)

Ve a [manage.sanity.io](https://manage.sanity.io), entra a tu proyecto → **API** → **CORS origins** → **Add CORS origin**, y agrega:
- La URL real de tu sitio en producción (ej. `https://caplast.cl`)
- `http://localhost:5500` o el puerto que uses para probar el sitio localmente (sin esto, la calculadora y el catálogo no van a cargar datos cuando pruebes en tu computador)

No actives "Allow credentials" — no hace falta, porque solo se está leyendo contenido publicado (público por diseño).

## Paso 5 — Conectar el sitio al proyecto (sin `.env`)

Acá viene una diferencia importante respecto a lo que pediste: como este sitio **no tiene un paso de build** (no hay Webpack/Vite/Next), no existe un archivo `.env` real que un navegador pueda leer — las variables de entorno son un concepto de Node/servidores, no de HTML servido tal cual.

En su lugar, esos dos datos (`projectId` y `dataset`) van directo en `assets/js/sanity-config.js`, que ya viaja al navegador de todos modos. Esto **no es un riesgo de seguridad**: son identificadores públicos (equivalen a decir "de qué proyecto leer"), no credenciales. Nadie puede escribir ni editar contenido con ellos — para eso hace falta iniciar sesión con una cuenta invitada al proyecto (paso 7).

Abre `assets/js/sanity-config.js` y reemplaza:

```js
window.CAPLAST_SANITY = {
  projectId: "TU_PROJECT_ID",   // ← pega aquí tu Project ID del paso 1
  dataset: "production",
  apiVersion: "2024-01-01",
};
```

## Paso 6 — Cargar el contenido inicial

Entra a tu Studio (local o el link `.sanity.studio`) y crea, en este orden:

1. **Categoría** ×2: "Potes de cápsula" (slug `potes-de-capsula`) y "Potes apilables" (slug `potes-apilables`).
2. **Tapa (opción)**: Tapa lisa (`lisa`), Tapa estriada (`estriada`), Tapa seguro de niño (`segurodenino`), Tapa cápsula dispensadora (`dispensadora`). Los precios base actuales están en la tabla al final de esta guía.
3. **Sello (opción)**: Con sello (`con`), precio base 71.
4. **Configuración de precios** (crea un solo documento): agrega los 5 tramos de cantidad (tabla al final).
5. **Configuración del sitio** (crea un solo documento): número de WhatsApp `56986071957`, email, etc.
6. **Producto** ×6, uno por cada carpeta en `/productos/`. Los slugs deben ser EXACTOS:

| Slug (obligatorio) | Nombre | Categoría | Capacidad | Precio base | Es cápsula | Admite sello | Tapas compatibles |
|---|---|---|---|---|---|---|---|
| `envase-hdpe-200cc` | Pote de Cápsula 200cc | Potes de cápsula | 200 | 144 | Sí | No | seguro de niño, dispensadora |
| `pote-capsula-250cc` | Pote de Cápsula 250cc | Potes de cápsula | 250 | 144 | Sí | No | seguro de niño, dispensadora |
| `envase-hdpe-250cc` | Pote Apilable 250cc | Potes apilables | 250 | 221 | No | Sí | lisa, estriada |
| `envase-hdpe-500cc` | Pote Apilable 500cc | Potes apilables | 500 | 292 | No | Sí | lisa, estriada |
| `envase-hdpe-650cc` | Pote Apilable 650cc | Potes apilables | 650 | 298 | No | Sí | lisa, estriada |
| `envase-hdpe-1000cc` | Pote Apilable 1000cc | Potes apilables | 1000 | 320 | No | Sí | lisa, estriada |

No olvides subir al menos 1 imagen y completar "Descripción corta" en cada producto — son campos obligatorios y sin ellos no aparecen en el catálogo.

**Tramos de cantidad** (para "Configuración de precios"):

| Mínimo | Máximo | Multiplicador |
|---|---|---|
| 0 | 100 | 2.0 |
| 101 | 500 | 1.5 |
| 501 | 1000 | 1.25 |
| 1001 | 4990 | 1.15 |
| 4991 | (vacío = sin límite) | 1.0 |

## Paso 7 — Invitar al encargado de contenido

En [manage.sanity.io](https://manage.sanity.io) → tu proyecto → **Members** → **Invite members**. Ingresa su email y asígnale el rol **Editor** (puede crear/editar/publicar contenido, pero no puede cambiar el schema ni borrar el proyecto). Esa persona entra a `https://caplast.sanity.studio` (o el subdominio que hayas elegido), inicia sesión, y ve un panel de formularios simple: elige "Producto", completa los campos, sube la foto y hace clic en "Publish". El sitio se actualiza solo, sin tocar código ni volver a subir nada.

## Paso 8 — Publicar el sitio

El sitio se sigue hospedando exactamente igual que antes (Netlify, GitHub Pages, hosting compartido, lo que estés usando) — no cambia nada de eso. Solo asegúrate de subir los 3 archivos nuevos (`sanity-config.js`, `sanity-client.js`, `main.js` actualizado) junto con el resto.

---

## Preguntas frecuentes

**¿Si edito un producto en Sanity, tengo que volver a subir el sitio?** No. El sitio consulta a Sanity en cada visita; los cambios de contenido aparecen al instante (recargando la página), sin redeploy.

**¿Y si quiero agregar un producto nuevo de verdad (con una URL propia)?** Ahí sí se necesita al desarrollador: hay que crear la carpeta `/productos/nuevo-slug/index.html` (copiando una existente) para que la URL exista, además de cargar el producto en el CMS con ese mismo slug.

**El catálogo/calculadora se ven vacíos o con datos viejos.** Abre la consola del navegador (F12) — si ves un mensaje `[Caplast] No se pudo cargar el CMS...`, revisa: que `sanity-config.js` tenga tu `projectId` real (no "TU_PROJECT_ID"), que el dominio desde el que estás probando esté en CORS origins (paso 4), y que existan productos con "disponible" activado en el Studio.
