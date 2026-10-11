# Portfolio — Nico Kaminski

Portfolio profesional personal de **Nico Kaminski**, desarrollado para presentar proyectos, criterio de producto, trabajo Front-End y una forma de construir software centrada en experiencia de usuario, mantenibilidad y validación.

**Sitio web:** [nicokaminski.com](https://nicokaminski.com/)

## Estado

Portfolio publicado y en evolución.

El proyecto continúa evolucionando de forma incremental, con especial atención a arquitectura modular, accesibilidad, responsive, performance y seguridad para un repositorio público.

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

Los comandos de esta sección están destinados a personas que trabajan localmente. Los agentes deben respetar las restricciones operativas de `AGENTS.md` y no ejecutar comandos de instalación.

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
npm run typecheck
npm run build
```

`package.json` es la fuente de verdad sobre los scripts disponibles. No se documentan comandos de test mientras no exista un script correspondiente.

El repositorio también cuenta con validaciones automáticas mediante GitHub Actions, ejecutadas en pushes y pull requests sobre `dev` y `main`.

## Seguridad y privacidad

Este repositorio es público.

No deben versionarse secretos, credenciales, datos privados de clientes o empleadores, información de repositorios privados ni datos reales de aplicaciones privadas.

Las variables de entorno utilizadas por el formulario de contacto se documentan únicamente por nombre y con valores vacíos seguros en `.env.example`. Sus valores reales deben mantenerse fuera del repositorio.

## Documentación para agentes

Las instrucciones de trabajo para agentes locales viven en:

```text
AGENTS.md
.agent/
```

Esa documentación define límites de alcance, arquitectura, seguridad, comandos permitidos y criterios de cierre para intervenciones asistidas por IA.

## Contacto

Si querés conocer el Portfolio o conversar sobre desarrollo de software, podés encontrarme en:

[![LinkedIn](https://img.shields.io/badge/LinkedIn-w?logo=inspire&logoColor=white&labelColor=007AB5&color=007AB5)](https://www.linkedin.com/in/nicokaminski/) [![Contacto](https://img.shields.io/badge/Contacto-w?logo=gmail&logoColor=white&labelColor=%23EA4335&color=%23EA4335)](https://nicokaminski.com/#contacto) [![Portfolio](https://img.shields.io/badge/Portfolio-134670?logo=ntfy&logoColor=white)](https://nicokaminski.com/)

