# Taller Norte

Sistema integral de gestión para taller mecánico. Este repositorio contiene la Fase 1 navegable.

## Arquitectura

- Next.js App Router + React + TypeScript.
- Tailwind CSS y Lucide para sistema visual.
- PostgreSQL + Prisma para modelo relacional, migraciones y seed.
- Zod previsto como frontera de validación.
- JWT firmado en cookie HTTP-only para sesión demo.
- Componentes server-first; interactividad cliente limitada a formularios, búsqueda y comandos.

La estructura principal:

```text
src/app/             rutas, layouts y acciones server
src/components/      componentes visuales e interactivos
src/lib/             datos, autenticación y utilidades
prisma/              modelo relacional y seed
```

## Ejecutar

1. Copiar `.env.example` a `.env` y configurar PostgreSQL.
2. Instalar: `npm install`
3. Crear tablas: `npm run db:push`
4. Cargar demo: `npm run db:seed`
5. Iniciar: `npm run dev`

Abrir `http://localhost:3000/login`.

Credenciales demo:

- Email: `admin@tallernorte.com`
- Contraseña: `Taller2026!`

## Fase 1 implementada

- Autenticación demo protegida con sesión firmada.
- Shell responsive, navegación lateral, acciones rápidas y command palette (`Ctrl+K`).
- Dashboard operativo con métricas, alertas, facturación y vehículos en taller.
- Clientes: búsqueda, alta local navegable y ficha con vehículos/actividad.
- Vehículos: búsqueda, alta local navegable, tarjetas y ficha histórica.
- Taller en vivo como vista operativa inicial.
- Modelo multiempresa/multisucursal y seed PostgreSQL.

Las altas de UI son demostrativas durante esta fase y viven en el estado de la sesión. El schema y seed dejan preparada la persistencia; conectar Server Actions transaccionales es el primer pendiente técnico de Fase 2.

## Próxima fase

Turnos, recepción, inspecciones, presupuestos, órdenes y Kanban con drag-and-drop persistente.
