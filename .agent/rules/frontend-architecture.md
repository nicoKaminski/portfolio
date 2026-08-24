---
trigger: always_on
---

# Portfolio — Arquitectura frontend y composición Next.js

## Propósito

Define criterios arquitectónicos y visuales estables para `portfolio`.

No es un inventario permanente del repositorio. Antes de modificar una zona, comprobar la estructura real y crear solo las capas que la responsabilidad actual necesite.

## 1. Principios

- Separar presentación, estado, orquestación y lógica server-side.
- Mantener responsabilidades cerca de sus consumidores.
- Evitar archivos monolíticos.
- Evitar duplicación de lógica y datos.
- No crear capas, carpetas, hooks o componentes sin un uso concreto.
- No mover código por preferencia estética si la tarea no lo necesita.
- Priorizar código legible, escalable y mantenible sobre soluciones rápidas.
- Mantener bajo acoplamiento entre features.

## 2. Capas principales

Arquitectura conceptual aprobada:

```text
src/
├── app/
├── frontend/
├── backend/
└── shared/
```

Las carpetas deben crearse cuando exista contenido real para ellas; no se crean vacías por anticipación.

### `src/app/`

Responsabilidades:

- rutas del App Router;
- layouts;
- metadata;
- composición de páginas;
- boundaries propios de Next.js.

Mantener `app/` fino. No colocar allí lógica de feature si puede vivir en una responsabilidad más específica.

### `src/frontend/`

Responsabilidades:

- UI;
- features visuales o interactivas;
- componentes;
- hooks de interacción;
- lógica de estado de cliente;
- adaptaciones necesarias para presentar datos.

Organizar preferentemente por feature cuando una funcionalidad tenga identidad propia.

Ejemplo posible, no plantilla obligatoria:

```text
frontend/
└── features/
    └── projects/
        ├── components/
        ├── hooks/
        ├── types/
        └── utils/
```

Crear únicamente las subcarpetas que realmente se usen.

### `src/backend/`

Responsabilidades exclusivamente server-side, por ejemplo:

- lógica segura del formulario de contacto;
- validación server-side;
- adaptadores de servicios externos;
- acceso a variables privadas;
- normalización y manejo seguro de errores del servidor.

Un Client Component nunca debe importar módulos de `src/backend/`.

### `src/shared/`

Reservado para elementos con consumidores reales en más de una feature o capa:

- tipos compartidos;
- constantes comunes;
- utilidades puras;
- validaciones reutilizadas cuando corresponda.

No mover una utilidad a `shared/` solo porque “podría reutilizarse” en el futuro.

## 3. Server Components y Client Components

En App Router, preferir componentes de servidor por defecto.

Usar `"use client"` únicamente cuando la pieza necesite ejecución en navegador, por ejemplo:

- `useState`, `useReducer` u otro estado interactivo;
- `useEffect`;
- eventos interactivos que requieran lógica de cliente;
- `localStorage`, `window`, `document` u otras APIs del navegador.

Mantener el Client Component lo más abajo posible en el árbol para reducir JavaScript enviado al navegador y preservar límites de seguridad.

No convertir una página completa en cliente si solo un control pequeño necesita interacción.

## 4. Componentes presentacionales y lógica

Favorecer componentes presentacionales cuando exista una separación útil.

Un componente presentacional debería, en general:

- recibir datos por props;
- recibir callbacks por props;
- concentrarse en markup, estilos y accesibilidad;
- evitar conocer detalles de integración o persistencia.

La lógica de estado, efectos y orquestación puede vivir en:

- hooks de feature;
- componentes contenedores pequeños;
- funciones/utilidades puras;
- módulos server-side cuando corresponda.

No extraer lógica automáticamente. Un estado local simple y exclusivamente visual puede permanecer dentro del componente si mejora claridad.

## 5. Hooks

Crear un custom hook cuando encapsule una responsabilidad clara de estado, efecto u orquestación.

No crear hooks como envoltorios triviales de una sola línea ni para esconder lógica que sería más clara como función pura.

Los hooks no deben convertirse en “cajones” que mezclen múltiples responsabilidades no relacionadas.

## 6. Tipos y TypeScript

- Mantener `strict`.
- No usar `any` ni `as any`.
- No inventar tipos para silenciar errores.
- Mantener tipos cerca del dominio/feature que los usa.
- Llevar un tipo a `shared/` solo cuando tenga consumidores reales fuera de su feature.
- Verificar imports y exports existentes antes de utilizarlos.

## 7. CSS Modules y estilos

- Usar CSS Modules para estilos locales.
- Mantener estilos cerca del componente o feature que los consume.
- Usar nombres de clase semánticos.
- Mantener selectores simples.
- Evitar estilos inline salvo caso mínimo y justificado.
- No usar Tailwind.
- No agregar librerías CSS/UI sin autorización.
- La apariencia de la scrollbar del Portfolio es global y se define en `src/app/globals.css`; no debe duplicarse en CSS Modules de features salvo que exista una necesidad funcional explícita y diferente.

## 8. Theme y tokens

Las paletas base aprobadas para el proyecto son:

### Tema claro · Glaciar

```text
#E1ECEE
#134670
#10698C
#648A81
```

Roles semánticos aprobados:

- fondo principal: `#E1ECEE`;
- superficie principal: `#E1ECEE`;
- texto principal: `#134670`;
- texto secundario: derivado de `#134670`;
- acento e interacción: `#10698C`;
- bordes y detalles: `#648A81`.

### Tema oscuro · Aurora

```text
#21E6A8
#2B4C6A
#1D314A
#353B55
```

Roles semánticos aprobados:

- fondo principal: `#1D314A`;
- superficie principal: `#2B4C6A`;
- texto principal: `#E1ECEE`, compartido con Glaciar;
- texto secundario: derivado de `#E1ECEE`;
- acento e interacción: `#21E6A8`;
- bordes funcionales: derivado de `#E1ECEE`;
- `#353B55` se reserva para superficies secundarias, profundidad visual o elementos gráficos cuando exista un uso real que lo justifique.

El verde Aurora `#21E6A8` no debe utilizarse como color general de texto. Su función principal es destacar interacción, foco, enlaces, CTA y detalles visuales.

Reglas:

- centralizar colores repetidos mediante variables CSS/tokens semánticos;
- no repetir hexadecimales en múltiples CSS Modules;
- preferir una única fuente de verdad para tokens visuales;
- no inventar colores derivados o roles nuevos sin una necesidad y definición aprobadas;
- los derivados ya definidos por el sistema de theme se consideran parte de la paleta aprobada;
- no crear un objeto TypeScript de tema solo para duplicar variables CSS.

Cuando JavaScript necesite un color por una razón real —por ejemplo canvas, gráficos o el minijuego— puede evaluarse una fuente tipada específica, evitando mantener dos fuentes divergentes del mismo token.

La lógica del selector de tema puede vivir como feature o componente dedicado dentro de `frontend/` cuando se implemente.

## 8-A. Estados interactivos

Los estados interactivos deben responder a la semántica del elemento y mantener una lógica visual coherente en tema claro y oscuro.

Familias actuales:

- **Acción primaria:** mantiene un estado base sólido y su hover puede pasar a una superficie contextual sutil con borde y texto de acento, claramente perceptible en claro y oscuro. No utiliza movimiento, elevación, sombra ni opacity para el hover del CTA.
- **Enlaces:** no deben convertirse automáticamente en botones ni depender de un cambio cromático casi imperceptible. Navbar puede utilizar color de acento + superficie contextual sutil; los links del Footer utilizan cambio cromático a color de acento sin fondo contextual y sin subrayado. No agregar movimiento a enlaces de texto solo para hacer visible el hover.
- **Controles:** pueden comunicar hover mediante borde y superficie cuando esa respuesta represente mejor su función.

Reglas generales:

- todo elemento interactivo debe tener feedback perceptible cuando corresponda y foco visible para teclado;
- el hover debe funcionar visualmente en ambos temas y mantener una diferencia perceptible, pudiendo tener valores de hover diferentes según el tema siempre que preserven la misma semántica;
- no usar `opacity` como mecanismo principal de hover de una acción si puede reducir contraste o claridad;
- usar tokens semánticos y `--transition-interactive` para estados reutilizados;
- `prefers-reduced-motion` debe eliminar desplazamientos, no necesariamente los cambios de color o profundidad;
- un control `disabled` no debe presentar hover, desplazamiento ni apariencia de acción disponible;
- una card, superficie o elemento no interactivo no debe recibir hover que sugiera que puede accionarse;
- las distintas familias no necesitan tener el mismo hover: la coherencia proviene de compartir criterios, tokens, duración y accesibilidad, no de hacer que todos los elementos reaccionen igual.

## 9. Dirección visual estable

El sitio debe sentirse:

- contemporáneo;
- humano;
- técnico sin ser frío;
- nature-tech de forma abstracta;
- claro y cómodo de recorrer.

Evitar:

- naturaleza literal como fondo dominante;
- estética cripto/neón;
- gradientes púrpura genéricos;
- glassmorphism indiscriminado;
- exceso de cards;
- terminales falsas decorativas;
- efectos permanentes sin utilidad;
- layouts tipo revista que perjudiquen lectura;
- apariencia genérica de sitio producido por IA.

No inventar decisiones visuales no definidas en la tarea. Cuando el detalle visual todavía esté abierto, implementar solo el prototipo o alcance expresamente solicitado.

## 10. Responsive

Todo cambio visual debe contemplar:

- móvil;
- tablet / anchos intermedios;
- desktop;
- pantallas amplias cuando el layout lo requiera.

Revisar:

- overflow horizontal;
- wrapping;
- legibilidad;
- acciones táctiles;
- composición;
- multimedia;
- overlays/modales;
- navegación.

No resolver mobile como una reducción automática del desktop.

## 11. Accesibilidad

Mínimo esperado:

- HTML semántico;
- jerarquía correcta de headings;
- foco visible;
- navegación por teclado;
- labels de formularios;
- `aria-label` cuando sea necesario;
- contraste suficiente;
- no comunicar estados solo por color;
- `prefers-reduced-motion` para animaciones relevantes;
- overlays con manejo correcto de foco cuando se implementen.

## 12. Performance

- Mantener Client Components acotados.
- Evitar dependencias visuales pesadas por conveniencia.
- Cargar multimedia de forma responsable.
- No introducir animaciones continuas costosas sin valor.
- Evitar re-renders y efectos innecesarios cuando sean evidentes en el flujo afectado.
- No optimizar prematuramente sin evidencia de un problema.

## 13. Cazador de Bugs

El minijuego vive inicialmente dentro del mismo repositorio como feature aislada.

Debe mantener su lógica separada de las secciones del Portfolio y no contaminar la composición principal.

La mecánica exacta se definirá en su tarea correspondiente. No crear ahora infraestructura del juego por anticipación.

## 14. Criterio final

Una implementación correcta para Portfolio:

- mantiene límites claros;
- separa lógica y presentación cuando aporta valor;
- conserva la frontera servidor/cliente;
- usa tokens y CSS Modules coherentemente;
- es responsive y accesible;
- evita duplicación;
- evita complejidad sin necesidad;
- y puede evolucionar sin convertir componentes en archivos monolíticos.
