# Portfolio — Nico Kaminski

Portfolio profesional personal de **Nico Kaminski**, desarrollado para presentar proyectos, criterio de producto, trabajo Front-End y una forma de construir software centrada en experiencia de usuario, mantenibilidad y validación.

## Estado

Proyecto en desarrollo.

La primera versión se está construyendo de forma incremental, con especial atención a arquitectura modular, accesibilidad, responsive, performance y seguridad para un repositorio público.

## Stack

- Next.js
- React
- TypeScript
- CSS Modules

Las versiones exactas y scripts disponibles se encuentran en `package.json`.

## Principios técnicos

- App Router de Next.js.
- TypeScript estricto.
- Separación clara entre composición de aplicación, frontend, lógica server-side y código compartido.
- Componentes presentacionales simples cuando corresponde.
- Lógica y estado separados de la UI cuando aportan claridad y mantenibilidad.
- Server Components por defecto y Client Components solo cuando la interacción lo requiere.
- CSS Modules y tokens visuales centralizados.
- Sin Tailwind.
- Sin dependencias nuevas sin una necesidad real.

## Desarrollo local

Instalar las dependencias del lockfile:

```bash
npm ci
```

Levantar el entorno de desarrollo:

```bash
npm run dev
```

Abrir:

```text
http://localhost:3000
```

## Validaciones disponibles

```bash
npm run lint
npm run build
```

No se documentan comandos de test o typecheck independientes mientras no existan como scripts en `package.json`.

## Seguridad y privacidad

Este repositorio es público.

No deben versionarse secretos, credenciales, datos privados de clientes o empleadores, información de repositorios privados ni datos reales de aplicaciones privadas.

Las futuras variables de entorno sensibles deberán mantenerse fuera del repositorio y documentarse únicamente mediante nombres de variables y valores seguros en `.env.example` cuando corresponda.

## Documentación para agentes

Las instrucciones de trabajo para agentes locales viven en:

```text
AGENTS.md
.agent/
```

Esa documentación define límites de alcance, arquitectura, seguridad, comandos permitidos y criterios de cierre para intervenciones asistidas por IA.
