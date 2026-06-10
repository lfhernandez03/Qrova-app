# CLAUDE.md — Qrova Project Context

> Este archivo le da contexto completo a Claude (o cualquier agente de IA) sobre el proyecto Qrova.
> Léelo antes de tocar cualquier archivo del proyecto.

---

## ¿Qué es Qrova?

Qrova (`qrova.app`) es una plataforma web **100% gratuita** de generación, personalización y analítica de códigos QR. La propuesta central es dar a usuarios lo que los competidores (QR Tiger, Bitly, etc.) cobran en planes premium — sin planes, sin funciones bloqueadas, sin sorpresas.

**Usuarios objetivo:** Negocios, agencias y emprendedores.
**Tono de marca:** Amigable, directo, energético. Sin jerga técnica innecesaria.
**Posicionamiento:** "La herramienta de QR más completa y gratuita del mercado."

---

## Stack Técnico

| Capa           | Tecnología                          | Notas                                        |
| -------------- | ----------------------------------- | -------------------------------------------- |
| Framework      | Next.js 14 (App Router)             | SSR, RSC, routing integrado                  |
| Auth           | Clerk                               | OAuth social + email, middleware de rutas    |
| Base de datos  | PostgreSQL via Neon (serverless)    |                                              |
| ORM            | Prisma                              | Type-safety + migraciones                    |
| Almacenamiento | Cloudflare R2                       | Logos subidos por usuarios                   |
| Email          | Resend                              | API moderna, plantillas React                |
| QR generation  | `qr-code-styling`                   | Client-side, sin llamadas a DB en modo guest |
| OG images      | `@vercel/og` + `generateMetadata()` | Edge functions en Vercel                     |
| Deploy         | Vercel                              |                                              |
| Monitoreo      | Sentry                              |                                              |

**Decisión arquitectural:** Web-first. React Native fue descartado — los dashboards admin viven en desktop/laptop. App móvil puede ser complemento futuro.

---

## Estructura de Rutas

| Ruta                      | Acceso                 | Descripción                                                 |
| ------------------------- | ---------------------- | ----------------------------------------------------------- |
| `/`                       | Público (guest + auth) | Landing con editor QR funcional. Punto de entrada y SEO.    |
| `/r/[slug]`               | Público                | Redirección de QR dinámico. Registra el escaneo y redirige. |
| `/dashboard`              | Solo autenticados      | Panel principal: resumen y QRs recientes.                   |
| `/dashboard/qrcodes`      | Solo autenticados      | Listado con búsqueda y filtros.                             |
| `/dashboard/qrcodes/[id]` | Solo autenticados      | Detalle y analítica de un QR.                               |
| `/dashboard/analytics`    | Solo autenticados      | Vista global de analítica.                                  |

---

## Modelo de Datos (Prisma)

Modelos principales:

- `User` — usuarios autenticados vía Clerk
- `QRCode` — código QR (estático o dinámico), pertenece a un User
- `Scan` — registro de cada escaneo (timestamp, país, dispositivo, IP)
- `Preset` — configuración visual guardada por workspace

---

## Sistema de Diseño

### Colores

| Token           | Hex       | Uso                                       |
| --------------- | --------- | ----------------------------------------- |
| `coral-400` ★   | `#F4623A` | **Primario** — CTAs, links, logo, énfasis |
| `coral-500`     | `#D94F2B` | Hover de botón primario                   |
| `emerald-400` ★ | `#10B981` | **Acento** — SOLO estados positivos/éxito |
| `gray-800`      | `#1F2937` | Texto primario, letra 'a' del logo        |
| `gray-900`      | `#111827` | Headings                                  |

> ⚠️ El esmeralda se reserva **exclusivamente** para estados de éxito (QR activo, métricas positivas). Nunca como decorativo.

### Tipografía

- **UI:** Inter (Google Fonts) — misma que Stripe, Linear, Notion
- **URLs / código:** JetBrains Mono
- Nunca usar all-caps en la interfaz principal

### Espaciado

Escala de 4px (idéntica a Tailwind). Usar clases Tailwind directamente: `p-4`, `gap-6`, etc.

### Componentes clave

- **Botón Primary:** `bg-coral-400 text-white rounded-lg` + hover `coral-500`
- **Botón Secondary:** `bg-coral-50 text-coral-600 border-coral-200`
- **Badge Activo:** fondo `emerald-50`, texto `emerald-800`
- **Input:** borde `gray-300` en reposo, `coral-400` en focus con sombra `rgba(244,98,58,0.12)`

---

## Modo Guest

El editor QR en `/` funciona **sin cuenta**. La generación es 100% client-side con `qr-code-styling`. Ningún dato se escribe en DB.

El "gate" se activa contextualmente:

- Intenta guardar → "Crea una cuenta gratis para guardar tus QRs"
- Intenta QR dinámico → "Con una cuenta puedes cambiar el destino sin reimprimir"
- Intenta ver analítica → "Regístrate para ver cuántas personas escanearon tu código"

**Preservación de estado:** Si el guest se registra, la config del editor (colores, preset, CTA, URL) se preserva y se guarda como su primer QR.

---

## Convenciones de Código

- Usar App Router de Next.js 14 (no Pages Router)
- Server Components por defecto; `'use client'` solo donde sea necesario
- Llamadas a DB siempre en Server Components o Route Handlers, nunca en el cliente
- Variables de entorno en `.env.local`, nunca hardcodeadas
- Nombres de archivos en kebab-case para rutas, PascalCase para componentes

---

## Copy de Marca

**No usar:** "gratis", "free", "sin costo"
**Usar:** _"Sin planes premium. Sin funciones bloqueadas. Sin sorpresas."_

---

## Lo que NO es Qrova (todavía)

- No tiene app móvil nativa
- No tiene monetización (sin planes de pago)
- No tiene integraciones externas en MVP (Slack, webhooks, etc.)
- No tiene A/B testing, formularios integrados ni landing page builder (Fase 4)
