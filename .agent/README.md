# Portfolio — Índice de reglas para agentes

## Propósito

Esta carpeta contiene reglas operativas y técnicas para agentes que trabajan sobre `portfolio`.

La entrada principal del repositorio es:

```text
AGENTS.md
```

Este índice no describe el estado puntual de una rama ni duplica reglas de producto. Su función es indicar qué documento consultar según la tarea.

## Estructura

```text
.agent/
├── README.md
└── rules/
    ├── workflow.md
    ├── frontend-architecture.md
    └── security.md
```

No crear skills, reglas adicionales o documentación de agente por anticipación. Agregar un documento solo cuando exista una responsabilidad estable y recurrente que no esté cubierta por los actuales.

## Selección de reglas

Este archivo es únicamente un índice. Al llegar aquí, `AGENTS.md` ya debe haberse leído. No volver a abrir el punto de entrada ni este índice por referencias encontradas dentro de una regla.

Seleccionar una regla solo si corresponde al alcance real de la tarea y después continuar con los archivos, consumidores, configuración y evidencia necesarios.

### Implementación o corrección general

```text
.agent/rules/workflow.md
```

### Arquitectura, componentes, hooks, estilos o UI

```text
.agent/rules/workflow.md
.agent/rules/frontend-architecture.md
```

### Backend interno de Next.js, formulario de contacto, variables de entorno o datos sensibles

```text
.agent/rules/workflow.md
.agent/rules/security.md
```

Si una tarea cruza frontend y backend, leer ambas reglas relevantes.

Para un análisis o auditoría de solo lectura, consultar `workflow.md` únicamente cuando sus criterios de inspección, evidencia o validación resulten pertinentes. No cargar reglas visuales o de seguridad por anticipación.

## Principio de vigencia

Las reglas contienen criterios estables. El repositorio real determina qué está implementado.

No usar esta carpeta para:

- registrar el avance de un hito;
- guardar estado temporal de una rama;
- copiar prompts históricos;
- duplicar `README.md`;
- enumerar todos los archivos o componentes;
- documentar decisiones personales o privadas que no necesite el agente.
