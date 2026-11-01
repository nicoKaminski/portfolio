# Portfolio — Nico Kaminski

**Desarrollador de software full stack con enfoque en frontend.**

Este repositorio contiene el código de mi sitio web profesional: [nicokaminski.com](https://nicokaminski.com/).

En el Portfolio presento proyectos, prácticas de laboratorio y mi forma de abordar el desarrollo de software, con especial atención a la experiencia de usuario, las interfaces claras y la integración entre frontend y backend cuando el producto lo necesita.

## Qué vas a encontrar

- **Sobre mí y cómo trabajo:** mi enfoque profesional y los criterios que aplico al desarrollar software.
- **Proyectos:** aplicaciones y sitios web, con sus descripciones y enlaces públicos cuando corresponde.
- **Laboratorio:** prácticas y proyectos experimentales.
- **Contacto:** un formulario para conversar sobre proyectos, ideas o desarrollo de software.

Este repositorio corresponde al sitio Portfolio, no al código fuente de todos los proyectos que se presentan en él.

## Tecnologías y arquitectura

El sitio está desarrollado con **Next.js (App Router)**, **React**, **TypeScript** y **CSS Modules**.

El código se organiza principalmente en:

```text
src/
├── app/       # Rutas, layouts, metadata y composición
├── frontend/  # Interfaz, componentes e interacción
├── backend/   # Lógica exclusiva del servidor
└── shared/    # Tipos y utilidades compartidos
```

Las versiones y dependencias vigentes se encuentran en `package.json`.

Las instrucciones operativas para agentes de desarrollo están en [AGENTS.md](AGENTS.md) y `.agent/`.

## Desarrollo local

Para ejecutar el sitio localmente necesitás Node.js y npm. El workflow de integración continua utiliza Node.js 24.

Cloná el repositorio e instalá las dependencias:

```bash
git clone https://github.com/nicoKaminski/portfolio.git
cd portfolio
npm ci
```

Iniciá el entorno de desarrollo:

```bash
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000) en el navegador.

### Formulario de contacto

Para probar el envío de mensajes necesitás configurar localmente las variables indicadas en `.env.example`, utilizando tus propias credenciales y guardando sus valores fuera del repositorio.

Sin esa configuración, el formulario no podrá completar el envío de mensajes.

Nunca publiques credenciales, valores reales de variables privadas ni información personal recibida por el formulario.

## Validaciones

El proyecto dispone de los siguientes comandos:

```bash
npm run lint
npm run typecheck
npm run build
```

GitHub Actions ejecuta las validaciones automáticas en pushes y Pull Requests dirigidos a `dev` y `main`.

## Contribuciones y seguridad

Se reciben reportes de errores, sugerencias y propuestas de mejora. Antes de contribuir, consultá la [guía de contribución](CONTRIBUTING.md).

Para reportar problemas o proponer mejoras, utilizá los [Issues del repositorio](https://github.com/nicoKaminski/portfolio/issues).

Si encontrás una posible vulnerabilidad de seguridad, no publiques sus detalles en un Issue ni en una Pull Request. Seguí las instrucciones de [SECURITY.md](SECURITY.md) para utilizar el canal privado de reporte.

## Contacto

- [Portfolio](https://nicokaminski.com/)
- [LinkedIn](https://www.linkedin.com/in/nicokaminski/)
- [Formulario de contacto](https://nicokaminski.com/#contacto)
