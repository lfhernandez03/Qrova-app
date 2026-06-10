# AGENTS.md — Plan de Construcción del MVP de Qrova

> Este archivo define el orden de construcción del MVP de Qrova, tarea por tarea.
> Cada bloque es una unidad de trabajo independiente. Completar en orden salvo que se indique lo contrario.

---

## Estado del MVP

El MVP cubre todo lo necesario para que un usuario llegue, genere un QR, lo personalice, se registre y vea sus analíticas. Nada más, nada menos.

**Criterio de "done" del MVP:** Un usuario nuevo puede llegar a `/`, crear un QR personalizado sin cuenta, registrarse, ver su QR guardado en el dashboard y ver sus primeros escaneos en analítica.

---

## Bloque 0 — Setup del Proyecto

**Objetivo:** Repositorio corriendo en local y en Vercel.

- [ ] Crear proyecto Next.js 14 con App Router: `npx create-next-app@latest qrova --typescript --tailwind --app`
- [ ] Configurar Tailwind con los colores custom de Qrova en `tailwind.config.ts`:
  ```js
  colors: {
    coral: {
      50:  '#FFF1EE',
      100: '#FFD5CC',
      200: '#FFB5A7',
      300: '#FF8B77',
      400: '#F4623A', // PRIMARY
      500: '#D94F2B',
      600: '#B03C1E',
      700: '#8A2C12',
      900: '#3D1108',
    },
    emerald: { // Solo para estados positivos
      50:  '#ECFDF5',
      400: '#10B981',
      600: '#059669',
      800: '#065F46',
    }
  }
  ```
- [ ] Instalar fuentes en `app/layout.tsx`: Inter + JetBrains Mono desde `next/font/google`
- [ ] Configurar variables de entorno: `DATABASE_URL`, `CLERK_*`, `UPLOADTHING_*`, `RESEND_API_KEY`, `NEXT_PUBLIC_APP_URL`
- [ ] Setup Prisma + Neon: `npm install prisma @prisma/client`, `npx prisma init`, configurar `DATABASE_URL` en `.env`
- [ ] Definir schema Prisma inicial (ver Bloque 1)
- [ ] Instalar Clerk: `npm install @clerk/nextjs`, configurar `middleware.ts` con rutas protegidas
- [ ] Deploy inicial en Vercel (vacío, solo para confirmar pipeline)
- [ ] Configurar Sentry: `npx @sentry/wizard@latest -i nextjs`

---

## Bloque 1 — Schema de Base de Datos

**Objetivo:** Modelos Prisma completos para el MVP.

```prisma
model User {
  id        String   @id @default(cuid())
  clerkId   String   @unique
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  qrCodes   QRCode[]
  presets   Preset[]
}

model QRCode {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  name        String
  slug        String   @unique  // Para la URL /r/[slug]
  isDynamic   Boolean  @default(false)
  destination String   // URL de destino actual
  logoUrl     String?  // URL en R2
  styleConfig Json     // Colores, forma módulos, ojos, marco, CTA
  isArchived  Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  scans       Scan[]
}

model Scan {
  id        String   @id @default(cuid())
  qrCodeId  String
  qrCode    QRCode   @relation(fields: [qrCodeId], references: [id], onDelete: Cascade)
  timestamp DateTime @default(now())
  country   String?
  city      String?
  device    String?  // 'mobile' | 'desktop' | 'tablet'
  os        String?  // 'android' | 'ios' | 'windows' | 'macos'
  browser   String?
  ip        String?
  isUnique  Boolean  @default(true)
}

model Preset {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  name        String
  baseTheme   String?  // 'minimalista' | 'business' | 'pastel' | null (custom)
  styleConfig Json
  createdAt   DateTime @default(now())
}
```

- [ ] Escribir el schema en `prisma/schema.prisma`
- [ ] Correr `npx prisma migrate dev --name init`
- [ ] Correr `npx prisma generate`
- [ ] Crear `lib/prisma.ts` con singleton del cliente Prisma

---

## Bloque 2 — Editor QR (Modo Guest)

**Objetivo:** El usuario llega a `/` y puede generar, personalizar y descargar un QR sin cuenta.

### Instalación

```bash
npm install qr-code-styling
```

### Componentes a crear

**`components/qr-editor/QREditor.tsx`** (Client Component principal)

- Input de URL de destino
- Preview del QR en tiempo real
- Controles de personalización (ver abajo)
- Botón de descarga PNG/SVG
- Estado local con `useState` para toda la config

**`components/qr-editor/ColorPicker.tsx`**

- Color de módulos y color de fondo
- Input hex + color picker nativo

**`components/qr-editor/PresetSelector.tsx`**

- 3 presets del MVP: Minimalista, Business, Pastel
- Al seleccionar, aplica toda la config de golpe

  | Preset      | Config                                                          |
  | ----------- | --------------------------------------------------------------- |
  | Minimalista | Módulos negros, fondo blanco, bordes redondeados, sin marco     |
  | Business    | Módulos `#1E3A5F`, fondo `#F8F9FA`, ojos rectos, marco formal   |
  | Pastel      | Módulos lila `#9B8EC4`, fondo crema `#FFF8F0`, ojos redondeados |

**`components/qr-editor/CTAFrameSelector.tsx`**

- Toggle para mostrar/ocultar marco
- Selector de texto CTA (predefinidos + texto libre)
- Posición del texto: arriba, abajo
- Color y tamaño del texto

**`components/qr-editor/LogoUpload.tsx`**

- Upload de imagen (guest: solo preview local con `FileReader`, sin subir a R2)
- Control de tamaño (10%–40% del QR)

**`components/qr-editor/DownloadButton.tsx`**

- Descargar PNG (512px, 1024px, 2048px)
- Descargar SVG
- Al intentar guardar → mostrar gate de registro

### Gate de registro (contextual)

Componente `components/auth/RegistrationGate.tsx`:

- Modal o drawer que aparece cuando el guest intenta una acción que requiere cuenta
- Mensaje específico según la acción intentada
- CTA a `/sign-up` preservando el estado del editor en `sessionStorage`

### Preservación del estado al registrarse

- Al iniciar el editor, leer `sessionStorage.getItem('qrova_guest_config')`
- Al cambiar cualquier config, escribir en `sessionStorage`
- En el callback post-registro de Clerk, leer sessionStorage y crear el QR en DB

---

## Bloque 3 — Autenticación con Clerk

**Objetivo:** Registro, login y rutas protegidas funcionando.

- [ ] Crear `middleware.ts` que proteja `/dashboard/*` y permita `/` y `/r/*`
- [ ] Crear páginas `app/sign-in/[[...sign-in]]/page.tsx` y `app/sign-up/[[...sign-up]]/page.tsx` con componentes de Clerk
- [ ] Crear webhook handler en `app/api/webhooks/clerk/route.ts`:
  - Evento `user.created` → crear registro en tabla `User` con `clerkId` y `email`
- [ ] Crear helper `lib/auth.ts` con función `getCurrentUser()` que lee de Clerk y busca en DB
- [ ] Al completar registro: leer `sessionStorage` con la config del editor guest → crear primer QRCode en DB

---

## Bloque 4 — Endpoint de Redirección `/r/[slug]`

**Objetivo:** Los QRs dinámicos redirigen correctamente y registran el escaneo.

**`app/r/[slug]/route.ts`** (Route Handler, no page)

```typescript
export async function GET(
  req: Request,
  { params }: { params: { slug: string } },
) {
  // 1. Buscar QRCode por slug en DB
  // 2. Si no existe → 404
  // 3. Si está archivado o expirado → página custom (o redirect a /qr-expirado)
  // 4. Registrar Scan en DB (async, no bloquear el redirect):
  //    - Parsear User-Agent → device, os, browser
  //    - Parsear IP → país y ciudad (usar librería `@maxmind/geoip2-node` o API externa)
  //    - Determinar isUnique (comparar IP + User-Agent con escaneos previos en últimas 24h)
  // 5. Redirect 302 al destination del QRCode
}
```

Librerías sugeridas:

- `ua-parser-js` para parsear User-Agent
- `geoip-lite` para país/ciudad desde IP (sin API externa, base de datos local)

---

## Bloque 5 — Dashboard General

**Objetivo:** Primera pantalla del panel autenticado con métricas del período actual.

**`app/dashboard/page.tsx`** (Server Component)

Métricas a mostrar (MVP):

- Total de escaneos hoy / esta semana / este mes
- Número de QRs activos
- Los 5 QRs más escaneados recientemente
- Acceso rápido a crear nuevo QR

Queries Prisma necesarias:

```typescript
// Escaneos del mes actual
const scansThisMonth = await prisma.scan.count({
  where: {
    qrCode: { userId },
    timestamp: { gte: startOfMonth },
  },
});

// Top 5 QRs
const topQRs = await prisma.qRCode.findMany({
  where: { userId, isArchived: false },
  include: { _count: { select: { scans: true } } },
  orderBy: { scans: { _count: "desc" } },
  take: 5,
});
```

**Componentes:**

- `components/dashboard/MetricCard.tsx` — card con label, valor grande, tendencia (↑/↓)
- `components/dashboard/TopQRsList.tsx` — lista de 5 QRs con miniaturas y conteo
- `components/dashboard/QuickCreateButton.tsx` — botón que abre el editor

---

## Bloque 6 — Gestión de QRs

**Objetivo:** Listado, búsqueda, creación, edición y archivado de QRs.

### Rutas y páginas

**`app/dashboard/qrcodes/page.tsx`**

- Lista paginada de QRs del usuario (20 por página)
- Búsqueda por nombre (client-side con debounce)
- Filtros: Todos / Activos / Archivados / Dinámicos / Estáticos
- Cada fila: miniatura QR, nombre, tipo, fecha, badge de estado, escaneos totales
- Acciones: Editar, Duplicar, Archivar, Eliminar

**`app/dashboard/qrcodes/new/page.tsx`**

- Reutilizar `QREditor` del Bloque 2
- Al guardar → llamada a `POST /api/qrcodes`

**`app/dashboard/qrcodes/[id]/page.tsx`**

- Información del QR + analítica (ver Bloque 7)

### API Routes

**`app/api/qrcodes/route.ts`**

```
GET  → Listar QRs del usuario autenticado
POST → Crear nuevo QRCode
```

**`app/api/qrcodes/[id]/route.ts`**

```
GET    → Obtener QR por ID (verificar ownership)
PUT    → Actualizar QR (destino, nombre, styleConfig)
DELETE → Archivar (soft delete, isArchived = true)
```

### Upload de logo a R2

**`app/api/upload/route.ts`**

- Recibe archivo de imagen
- Valida tipo (jpg, png, webp, svg) y tamaño (máx 2MB)
- Sube a Cloudflare R2 con nombre único (`${userId}/${cuid()}.ext`)
- Retorna la URL pública
- Usar `@aws-sdk/client-s3` (compatible con R2)

---

## Bloque 7 — Analítica por QR

**Objetivo:** Ver escaneos, línea de tiempo, país y dispositivo por QR.

**`app/dashboard/qrcodes/[id]/page.tsx`** (Server Component)

Métricas a calcular:

- Escaneos totales
- Escaneos únicos (`isUnique = true`)
- Primer escaneo / último escaneo
- Promedio de escaneos por día

Queries:

```typescript
const scans = await prisma.scan.findMany({
  where: { qrCodeId: id },
  orderBy: { timestamp: "asc" },
});

// Agrupar por día para la línea de tiempo
// Agrupar por país para la tabla geográfica
// Agrupar por OS para la tabla de dispositivos
```

**Componentes:**

- `components/analytics/ScanTimelineChart.tsx` — gráfica de línea (usar `recharts`)
- `components/analytics/CountryTable.tsx` — tabla país → conteo → % con banderas emoji
- `components/analytics/DeviceBreakdown.tsx` — barras simples: Android / iOS / Desktop

**Librería de gráficas:** `recharts` (ya disponible en el stack de Next.js/React)

```bash
npm install recharts
```

---

## Bloque 8 — Open Graph por QR

**Objetivo:** Preview visual rica cuando se comparte el link de un QR dinámico.

**`app/r/[slug]/opengraph-image.tsx`** (con `@vercel/og`)

```typescript
import { ImageResponse } from 'next/og'

export async function GET(req: Request, { params }) {
  const qr = await getQRBySlug(params.slug) // Fetch desde DB
  return new ImageResponse(
    <div style={{ display: 'flex', /* ... */ }}>
      <img src={/* miniatura del QR */} />
      <div>{qr.name}</div>
      <div>{qr.destination}</div>
    </div>
  )
}
```

**`app/r/[slug]/page.tsx`** → usar `generateMetadata()`:

```typescript
export async function generateMetadata({ params }) {
  const qr = await getQRBySlug(params.slug);
  return {
    title: qr.name,
    description: `Escanea este QR para ir a ${qr.destination}`,
    openGraph: {
      title: qr.name,
      description: qr.destination,
      images: [`/r/${params.slug}/opengraph-image`],
    },
  };
}
```

---

## Bloque 9 — Onboarding de 3 Pasos

**Objetivo:** Guía mínima para usuarios nuevos que se muestra solo una vez.

**Flujo:**

1. **Crear primer QR** — editor abierto con QR de ejemplo. Tooltip: "Cambia la URL de destino"
2. **Personalizar** — resaltar controles de color y preset con indicador visual (anillo coral pulsante)
3. **Compartir y rastrear** — mostrar la URL corta `/r/[slug]` y explicar que cada escaneo aparece en analítica

**Implementación:**

- Flag `hasCompletedOnboarding` en tabla `User` (agregar al schema)
- Al completar o saltar → `PUT /api/user/onboarding` → actualizar flag
- Componente `components/onboarding/OnboardingOverlay.tsx`:
  - No bloquea la UI (overlay semi-transparente, el editor sigue siendo interactivo)
  - Botón "Saltar" visible en todo momento
  - Se muestra solo si `!user.hasCompletedOnboarding`

---

## Bloque 10 — Presets Personalizados

**Objetivo:** El usuario puede guardar su propia configuración visual como preset.

- [ ] `POST /api/presets` → Crear preset con `name` y `styleConfig` del editor actual
- [ ] `GET /api/presets` → Listar presets del usuario (incluye los 3 del sistema)
- [ ] `DELETE /api/presets/[id]` → Eliminar preset personalizado
- [ ] En el `PresetSelector`, mostrar presets del usuario debajo de los del sistema
- [ ] Indicador visual "Basado en [Tema]" cuando se modifica un preset del sistema

---

## Bloque 11 — Exportación de QRs

**Objetivo:** Descargar QR en PNG (varias resoluciones) y SVG.

**En el editor (modo guest y autenticado):**

- El botón de descarga usa `qr-code-styling` directamente en el cliente
- Opciones de resolución para PNG: 512px, 1024px, 2048px
- SVG: sin pérdida de calidad

**Desde el dashboard (`/dashboard/qrcodes`):**

- Botón de descarga en cada fila del listado
- Genera el QR en el cliente con la `styleConfig` guardada en DB
- No requiere endpoint de servidor para la imagen

---

## Bloque 12 — Polish y Validaciones

**Objetivo:** QA y detalles antes de considerar el MVP completo.

- [ ] Loading states en todas las acciones async (skeleton loaders, spinners)
- [ ] Error handling: toasts para errores de red, mensajes de validación en formularios
- [ ] Validación de URLs de destino (debe ser URL válida)
- [ ] Manejo de slugs únicos: reintentar con sufijo si hay colisión
- [ ] Meta tags básicos en `app/layout.tsx`: title, description, favicon
- [ ] Favicon: ícono de Qrova (los 3 cuadrados coral)
- [ ] Responsive: verificar editor y dashboard en mobile (320px y 768px)
- [ ] Rate limiting en endpoints críticos: `/api/qrcodes` y `/r/[slug]`
- [ ] Verificar que rutas `/dashboard/*` retornen 401 sin sesión
- [ ] Configurar Sentry para capturar errores en producción

---

## Orden de Construcción Recomendado

```
Bloque 0 (Setup)
    ↓
Bloque 1 (Schema DB)
    ↓
Bloque 3 (Auth Clerk)
    ↓
Bloque 2 (Editor QR guest) ←→ Bloque 4 (Redirect /r/[slug])
    ↓
Bloque 6 (Gestión QRs)
    ↓
Bloque 5 (Dashboard)
    ↓
Bloque 7 (Analítica)
    ↓
Bloque 8 (Open Graph)  ←→  Bloque 9 (Onboarding)  ←→  Bloque 10 (Presets)
    ↓
Bloque 11 (Exportación)
    ↓
Bloque 12 (Polish)
```

---

## Criterios de Aceptación del MVP Completo

- [ ] Usuario guest puede generar y descargar un QR sin cuenta
- [ ] Usuario puede registrarse y su QR guest se preserva como primer QR
- [ ] QR dinámico redirige correctamente y registra el escaneo
- [ ] Dashboard muestra escaneos del período actual
- [ ] Analítica individual muestra línea de tiempo, países y dispositivos
- [ ] Los 3 presets del sistema funcionan correctamente
- [ ] Open Graph funciona al compartir en WhatsApp/Slack
- [ ] Onboarding aparece solo en el primer acceso y es saltable
- [ ] Todas las rutas del dashboard están protegidas
- [ ] La app funciona en mobile (responsive)
