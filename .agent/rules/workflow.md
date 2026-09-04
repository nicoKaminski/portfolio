# Portfolio — Workflow de trabajo para agentes

## Propósito

Define el procedimiento general para analizar, implementar, corregir y documentar cambios en `portfolio`.

Complementa `AGENTS.md` y respeta sin excepciones la jerarquía definida allí. Esta regla no puede elevarse por encima de una instrucción de mayor prioridad.

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

Al llegar a esta regla, el punto de entrada y el índice ya fueron leídos. No reiniciar esa secuencia.

Continuar únicamente con:

1. otra regla técnica que el índice haya marcado como aplicable;
2. archivos concretos de la tarea;
3. consumidores, tests, estilos y configuración relacionados.

No leer o modificar todo el repositorio cuando el alcance es local ni volver a procesar documentos ya revisados salvo que hayan cambiado.

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

No ejecutar comandos de instalación, eliminación o actualización de dependencias.

Si una dependencia parece necesaria, obtener aprobación explícita del propietario o mantenedor para la decisión técnica y pedirle que ejecute la instalación y actualice el lockfile. La aprobación no habilita al agente a ejecutar el comando.

Al reportar la propuesta, incluir:

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

`package.json` es la única fuente de verdad sobre los scripts disponibles. Antes de ejecutar una validación:

1. revisar `package.json`;
2. confirmar que el script existe;
3. ejecutar solo lo relevante para la tarea;
4. reportar el resultado real.

`npm run dev` se reserva para tareas que necesiten validación visual o funcional en runtime. Si se inicia, detener el proceso al finalizar.

No usar `npm run start` como validación genérica.

No inventar scripts que no estén declarados.

## 8. Comandos prohibidos

El propietario o mantenedor controla Git, dependencias, ramas y publicación. Las prohibiciones operativas de esta sección siguen aplicando aunque exista aprobación de producto.

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

Tampoco ejecutar cambios de permisos, despliegues o acciones irreversibles sin una instrucción explícita de nivel superior que autorice exactamente esa acción.

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

### Tareas con cambios

Reportar de forma compacta:

```text
Objetivo
Archivos creados, modificados y eliminados
Cambios realizados por responsabilidad
Validaciones ejecutadas y resultados
Validaciones relevantes pendientes
Impacto de seguridad/privacidad, si aplica
Riesgos o dudas
Fuera de alcance detectado
Mensaje de commit recomendado
```

### Análisis o consultas sin cambios

Reportar objetivo, resultado o hallazgos, evidencia revisada, limitaciones relevantes y confirmar que no se modificaron archivos. Omitir campos vacíos y no recomendar un commit salvo que se hayan propuesto cambios documentales o técnicos concretos.

El mensaje de commit es una recomendación. El agente nunca ejecuta el commit.
