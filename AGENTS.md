# Portfolio — Instrucciones para agentes

## Alcance

Estas instrucciones aplican a todo el repositorio `portfolio`.

Este archivo es el punto de entrada para cualquier agente que analice, implemente, corrija, documente o audite el proyecto.

El repositorio es público. Todo contenido versionado debe considerarse potencialmente visible para terceros.

> Si Next.js agrega automáticamente un bloque propio de instrucciones para agentes, ese bloque se considera información técnica del framework. Las reglas de Portfolio definidas en este archivo y en `.agent/` gobiernan la forma de trabajo del proyecto.

## Propósito del proyecto

Portfolio es el sitio profesional personal de **Nico Kaminski**.

Debe mostrar proyectos, criterio de producto, trabajo Front-End, experiencia de integración con Back-End y una forma de trabajo centrada en UX, mantenibilidad y validación.

No debe convertirse en un CV cronológico ni exponer información privada de trabajos, clientes o repositorios no públicos.

## Stack

El stack real debe comprobarse siempre en `package.json` y la configuración vigente.

Base actual:

- Next.js;
- React;
- TypeScript en modo estricto;
- CSS Modules;
- App Router.

No usar Tailwind ni agregar librerías visuales o dependencias nuevas sin autorización explícita.

## Lectura obligatoria

`AGENTS.md` es el único punto de entrada. Cada documento debe leerse una sola vez por tarea; una referencia desde una regla no reinicia esta secuencia.

Para cualquier tarea:

1. Aplicar las instrucciones vigentes de mayor prioridad provistas por el entorno de ejecución.
2. Leer este archivo una vez.
3. Consultar `.agent/README.md` una vez para seleccionar únicamente las reglas aplicables.
4. Leer cada regla seleccionada una vez, sin volver al punto de entrada.
5. Inspeccionar los archivos reales relacionados con la tarea y sus consumidores directos.
6. Revisar `package.json` cuando la tarea dependa de scripts, dependencias o stack.

No es necesario recorrer todo el repositorio para una tarea puntual ni volver a abrir documentos ya leídos salvo que hayan cambiado durante la tarea.

## Fuente de verdad

### Estado técnico

El código y la configuración de la rama inspeccionada determinan qué existe realmente.

No asumir que una ruta, archivo, componente, hook, servicio, tipo, script, variable de entorno o dependencia existe solo porque aparezca en documentación o porque sea habitual en Next.js.

### Comportamiento esperado

Prioridad:

1. instrucciones vigentes de sistema o developer provistas por el entorno de ejecución;
2. reglas de este archivo;
3. reglas aplicables de `.agent/rules/`;
4. pedido explícito y vigente de la persona usuaria, interpretado dentro de los límites anteriores;
5. documentación técnica vigente del repositorio;
6. patrones reales del código;
7. criterio del agente.

Si dos fuentes se contradicen y la diferencia puede cambiar la implementación, informar la contradicción antes de decidir.

En esta documentación, **propietario** o **mantenedor** se refiere a Nico o a la persona responsable del repositorio. El término **developer** se reserva para el nivel de instrucciones del entorno y no debe utilizarse para solicitar aprobaciones de producto o publicación.

## Arquitectura base

La separación conceptual aprobada es:

```text
src/
├── app/       # rutas, layouts, metadata y composición de Next.js
├── frontend/  # UI, features y lógica de interacción
├── backend/   # lógica exclusivamente server-side
└── shared/    # tipos, constantes y utilidades realmente compartidos
```

No crear carpetas vacías por anticipación. La estructura debe aparecer cuando exista una responsabilidad real que la justifique.

Reglas detalladas: `.agent/rules/frontend-architecture.md`.

## Principios obligatorios

- Trabajar sobre una sola responsabilidad principal por vez.
- No inventar arquitectura, contratos, contenido, assets ni comportamiento.
- Priorizar cambios pequeños, trazables y fáciles de revisar.
- No ampliar el alcance silenciosamente.
- No hacer refactors generales para resolver una tarea local.
- Separar presentación de lógica, estado y orquestación cuando existan responsabilidades distintas.
- Mantener componentes presentacionales simples cuando sea razonable.
- No crear abstracciones sin un uso concreto.
- No usar `any` ni `as any` para silenciar problemas de tipado.
- No relajar TypeScript o ESLint para hacer pasar una implementación.
- Mantener accesibilidad, responsive y performance como parte de la implementación, no como arreglos posteriores.

## Next.js: Server y Client

Usar componentes de servidor por defecto cuando la vista no necesite interacción del navegador.

Agregar `"use client"` solo cuando exista una necesidad real, por ejemplo:

- estado interactivo;
- efectos;
- APIs del navegador;
- eventos que requieran ejecución en cliente.

Mantener la frontera cliente lo más pequeña posible.

Nunca importar lógica de `src/backend/` desde un Client Component ni exponer secretos, credenciales o variables privadas al bundle del navegador.

## Diseño y estilos

- CSS Modules para estilos locales.
- Variables CSS/tokens semánticos para valores globales repetidos.
- No duplicar hexadecimales por componentes cuando exista un token.
- No usar estilos inline salvo caso mínimo y justificado.
- No agregar Tailwind.
- No agregar librerías UI, animación o iconos sin aprobación.
- Soportar responsive real, foco visible y `prefers-reduced-motion` cuando corresponda.
- Evitar estética genérica de IA, exceso de cards, glassmorphism indiscriminado y efectos sin propósito.

## Seguridad y privacidad

La regla completa vive en `.agent/rules/security.md`.

Regla principal:

> Si existe duda sobre si un dato puede publicarse, tratarlo como privado y detener la incorporación hasta obtener confirmación.

Nunca versionar secretos, credenciales, información privada de clientes/empleadores, datos reales de aplicaciones privadas ni contenido copiado de repositorios privados sin autorización y saneamiento explícitos.

## Dependencias

El agente no ejecuta comandos de instalación, eliminación o actualización de dependencias. Si una dependencia nueva parece necesaria, debe obtener aprobación explícita del propietario o mantenedor y pedirle que realice la instalación y actualice el lockfile; esa aprobación de producto no habilita al agente a ejecutar el comando prohibido.

Antes de proponer una dependencia nueva, informar:

- problema que resuelve;
- alternativa sin dependencia;
- impacto estimado en bundle y mantenimiento;
- compatibilidad con el stack actual.

## Comandos

El agente puede ejecutar automáticamente validaciones no destructivas que existan realmente en `package.json`. `package.json` es la única fuente de verdad sobre los scripts disponibles; no mantener aquí una lista que pueda quedar desactualizada.

`npm run dev` puede utilizarse únicamente cuando la tarea requiera validación de comportamiento o visual en runtime. No debe dejar procesos abiertos al finalizar.

No inventar scripts. Antes de ejecutar una validación, confirmar su existencia y relevancia para la tarea.

### Prohibido siempre

El agente no ejecuta operaciones Git de escritura, sincronización remota o cambio de historia/ramas, incluyendo:

```text
git add
git commit
git push
git pull
git fetch
git merge
git rebase
git reset
git clean
git restore
git checkout
git switch
git stash
git cherry-pick
git revert
git tag
```

Puede usar Git únicamente para inspección, por ejemplo `git status`, `git diff`, `git log`, `git show`, `git branch --show-current` o `git remote -v`.

También está prohibido ejecutar comandos de instalación o dependencias:

```text
npm install
npm uninstall
npm update
npm ci
```

Asimismo, queda prohibido ejecutar mediante shell comandos destructivos de filesystem (`Remove-Item`, `rm`, `del`, `erase`, `rmdir` o equivalentes). Toda eliminación necesaria de archivos debe realizarse mediante herramientas de edición/aplicación de cambios del IDE y no mediante comandos de terminal. Una aprobación de producto del propietario o mantenedor no habilita estos comandos.

## Documentación

La documentación debe:

- tener una responsabilidad clara;
- reflejar decisiones reales;
- evitar inventarios que se desactualicen con facilidad;
- no declarar funcionalidades futuras como implementadas;
- no contener secretos ni información privada;
- actualizarse cuando cambie la regla o arquitectura que documenta.

`README.md` es documentación pública para personas. `.agent/` contiene instrucciones operativas para agentes. No duplicar información entre ambos sin necesidad.

## Cierre obligatorio de tarea

Para una tarea con cambios, la entrega debe informar como mínimo:

1. objetivo trabajado;
2. archivos creados, modificados y eliminados;
3. cambios realizados por responsabilidad;
4. validaciones ejecutadas y resultados;
5. validaciones relevantes no ejecutadas;
6. impacto de seguridad o privacidad, si aplica;
7. riesgos, dudas o limitaciones;
8. cambios fuera de alcance detectados;
9. mensaje de commit recomendado, sin ejecutar el commit.

Para un análisis, diagnóstico o consulta sin cambios, usar un cierre breve con objetivo, hallazgos o respuesta, evidencia revisada, limitaciones relevantes y confirmación de que el árbol no fue modificado. No incluir apartados vacíos por rutina.

No declarar una tarea “lista”, “resuelta” o “sin errores” si falta evidencia necesaria o existe una validación pendiente relevante.
