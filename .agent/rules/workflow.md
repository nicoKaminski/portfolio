# Portfolio — Workflow de trabajo para agentes

## Propósito

Define el procedimiento general para analizar, implementar, corregir y documentar cambios en `portfolio`.

Complementa `AGENTS.md`. La instrucción actual del developer tiene prioridad sobre esta regla, salvo que contradiga una restricción de seguridad.

## 1. Una responsabilidad principal por tarea

Resolver un objetivo principal por vez.

No:

- adelantar features futuras;
- mezclar problemas independientes;
- convertir mejoras opcionales en requisitos;
- transformar una corrección local en un refactor general;
- crear infraestructura “por si acaso”.

Cuando varias capas deban cambiar juntas, explicar por qué forman parte del mínimo cambio completo.

## 2. Confirmar el contexto real

Antes de editar:

- identificar el objetivo exacto;
- confirmar la rama mediante inspección si resulta relevante;
- revisar el estado del árbol de trabajo cuando pueda afectar la tarea;
- identificar archivos y consumidores relacionados;
- revisar `package.json` si la tarea depende de scripts o dependencias;
- distinguir hechos comprobados de inferencias.

No inventar nombres, rutas, scripts, tipos ni dependencias.

## 3. Leer solo lo aplicable

Orden mínimo:

1. instrucción actual del developer;
2. `AGENTS.md`;
3. `.agent/README.md`;
4. esta regla;
5. regla técnica adicional aplicable;
6. archivos concretos de la tarea;
7. consumidores, tests, estilos y configuración relacionados.

No leer o modificar todo el repositorio cuando el alcance es local.

## 4. Inspeccionar antes de modificar

Según el cambio, revisar:

- imports y exports;
- tipos y props;
- límites Server/Client;
- componentes consumidores;
- hooks y utilidades relacionadas;
- CSS Modules y tokens afectados;
- metadata/rutas si aplica;
- manejo de errores;
- estados loading/empty/error/success si aplica;
- accesibilidad y responsive en cambios de UI;
- variables de entorno y exposición de datos en cambios server-side.

## 5. Cambio mínimo mantenible

La solución debe ser lo más pequeña posible sin degradar la arquitectura.

No confundir “cambio mínimo” con:

- duplicar lógica;
- meter toda la lógica en un componente;
- omitir validaciones necesarias;
- hardcodear valores repetidos;
- saltarse una frontera de seguridad;
- dejar deuda inmediata que el mismo cambio podría evitar razonablemente.

## 6. Dependencias

No agregar, eliminar ni actualizar dependencias sin aprobación explícita.

No ejecutar comandos de instalación.

Si una dependencia parece necesaria, detener esa parte y reportar:

- necesidad concreta;
- alternativa sin dependencia;
- impacto en bundle;
- mantenimiento;
- compatibilidad.

## 7. Comandos permitidos

Se permiten comandos de inspección y validaciones no destructivas ya declaradas en el repositorio.

### Git de solo lectura

Ejemplos permitidos:

```text
git status
git diff
git log
git show
git branch --show-current
git remote -v
```

### Validaciones npm

Antes de ejecutar una validación:

1. revisar `package.json`;
2. confirmar que el script existe;
3. ejecutar solo lo relevante para la tarea;
4. reportar el resultado real.

Con el estado inicial del repo:

```text
npm run lint
npm run build
```

`npm run dev` se reserva para tareas que necesiten validación visual o funcional en runtime. Si se inicia, detener el proceso al finalizar.

No usar `npm run start` como validación genérica.

No inventar `typecheck`, `test` u otros scripts inexistentes.

## 8. Comandos prohibidos

El developer controla Git, dependencias, ramas y publicación.

No ejecutar:

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
npm install
npm uninstall
npm update
npm ci
```

### Prohibición estricta de comandos destructivos de filesystem

Queda terminantemente prohibido ejecutar mediante shell comandos destructivos para borrar o modificar el filesystem, incluyendo:

- `Remove-Item`
- `rm`
- `del`
- `erase`
- `rmdir`
- variantes recursivas o forzadas (`-r`, `-rf`, `-Recurse`, `-Force`, `/s`, `/q`, etc.);
- borrados masivos o patrones glob destructivos;
- cualquier comando equivalente que elimine archivos o directorios.

Si una tarea o implementación requiere eliminar un archivo concreto:
- el agente debe realizar dicha eliminación exclusivamente mediante las herramientas de edición/aplicación de cambios disponibles en el entorno (IDE);
- **nunca** debe recurrir a la shell para ejecutar la eliminación;
- cualquier excepción requiere autorización previa y explícita de Nico para el comando exacto a ejecutar.

Tampoco ejecutar cambios de permisos, despliegues o acciones irreversibles sin instrucción explícita y específica del developer.

## 9. Documentación

Actualizar documentación cuando cambie una regla, arquitectura, setup, variable de entorno o contrato documentado.

No documentar por rutina cada cambio pequeño.

No convertir documentación en inventarios de archivos que el agente puede inspeccionar directamente.

## 10. Validación

Distinguir siempre:

```text
Implementado.
```

```text
Implementado y validado con: <comandos/evidencia>.
```

Una validación exitosa no demuestra por sí sola que todos los casos estén cubiertos.

Para cambios visuales, si no se realizó revisión en runtime, informar explícitamente que la validación visual queda pendiente.

## 11. Seguridad antes del cierre

Si la tarea toca formularios, datos, variables de entorno, assets, enlaces externos o server-side, revisar `.agent/rules/security.md` antes de cerrar.

No entregar un cambio que exponga datos privados o secretos aunque compile correctamente.

## 12. Entrega

Reportar:

```text
Objetivo
Archivos creados
Archivos modificados
Archivos eliminados
Cambios realizados
Qué no se tocó
Validaciones ejecutadas y resultados
Validaciones pendientes
Impacto de seguridad/privacidad
Riesgos o dudas
Fuera de alcance detectado
Mensaje de commit recomendado
```

El mensaje de commit es una recomendación. El agente nunca ejecuta el commit.
