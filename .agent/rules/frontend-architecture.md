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

### Tipografía

- Onest es la tipografía vigente y aprobada para el Portfolio.
- Su definición global pertenece a `src/app/globals.css`; las features y los componentes deben heredarla o consumir el token tipográfico correspondiente.
- No mantener tipografías globales paralelas ni redefinir la familia principal por feature.

## 8. Theme y tokens

### Estado implementado actual

`src/app/globals.css` es la única fuente técnica de verdad para primitives, colores, roles semánticos y tokens globales consumidos por la aplicación.

La paleta de marca implementada es:

```text
#1D314A
#10698C
#228DAF
#02F1B6
```

Roles de marca:

- tono profundo: `#1D314A`;
- azul base: `#10698C`;
- cyan intermedio: `#228DAF`;
- menta brillante: `#02F1B6`.

#### Tema claro implementado · Glaciar

```text
#E1ECEE
#134670
#10698C
#648A81
```

Roles semánticos implementados:

- fondo principal: `#E1ECEE`;
- superficie principal: `#E1ECEE`;
- texto principal: `#134670`;
- texto secundario: derivado de `#134670`;
- acento e interacción: `#10698C`;
- bordes y detalles: `#648A81`.

#### Tema oscuro implementado y aprobado como base · Aurora

```text
#02F1B6
#228DAF
#2B4C6A
#1D314A
#353B55
```

Roles semánticos implementados:

- fondo principal: `#1D314A`;
- superficie principal: `#2B4C6A`;
- texto principal: `#E1ECEE`, compartido con Glaciar;
- texto secundario: derivado de `#E1ECEE`;
- acento e interacción: `#02F1B6`;
- acento secundario y detalles: `#228DAF`;
- bordes funcionales: derivado de `#E1ECEE`;
- `#353B55` se reserva para superficies secundarias, profundidad visual o elementos gráficos cuando exista un uso real que lo justifique.

La menta Aurora `#02F1B6` no debe utilizarse como color general de texto. Su función principal es destacar interacción, foco, enlaces, CTA y detalles visuales.

El modo oscuro actualmente implementado es la base visual aprobada. No debe rediseñarse globalmente sin una instrucción explícita.

El tema claro Glaciar describe el estado implementado actual; no debe confundirse con la próxima evolución aprobada.

### Dirección aprobada pendiente · Tema claro Caribe

La próxima evolución aprobada para el tema claro es la paleta Caribe:

```text
#E6ECF5
#BDE0F5
#7CB9E2
#3471A4
#4E8C94
#A1E2D6
```

Esta paleta todavía no está implementada. Antes de incorporarla deben definirse sus roles semánticos en `src/app/globals.css` y migrarse los consumidores de forma controlada.

También está aprobada una futura superficie elevada casi blanca para el tema claro. Su valor HEX todavía no está decidido y no debe inventarse.

Reglas:

- centralizar primitives, colores y valores globales reutilizados en `src/app/globals.css` mediante variables CSS y exponer roles semánticos para su consumo;
- los componentes deben consumir tokens semánticos en lugar de depender directamente de primitives o valores de paleta;
- las features no deben mantener paletas globales paralelas ni repetir hexadecimales globales en sus CSS Modules;
- no inventar colores derivados o roles nuevos sin una necesidad concreta;
- los derivados ya definidos por el sistema de theme se consideran parte del sistema visual vigente;
- los colores funcionales de error, éxito o advertencia pueden definirse cuando sean necesarios, con contraste accesible y tokens centralizados, sin incorporarlos por ello a la paleta de marca;
- no crear en TypeScript una segunda fuente de tema que duplique variables, valores o roles definidos en CSS.

Cuando JavaScript necesite un color por una razón real —por ejemplo canvas, gráficos o el minijuego— debe consumir la fuente CSS vigente mediante un mecanismo explícito, sin copiar sus HEX ni mantener un tema paralelo.

El selector de tema ya vive como feature dedicada en `src/frontend/features/theme/`. Inspeccionar su implementación real antes de modificar su contrato o ubicación.

### Profundidad visual

- La identidad visual del Portfolio debe construirse principalmente mediante profundidad, capas, variaciones tonales de superficie y luz ambiental controlada.
- Pueden utilizarse `color-mix()`, gradientes y luces radiales cuando deriven de los tokens vigentes y exista una necesidad visual real.
- Los tonos teal/verde del sistema pueden utilizarse como luz ambiental, halo o detalle controlado; no como fondo dominante ni como color general de texto.
- La intensidad debe responder a la jerarquía: los elementos protagonistas pueden tener mayor expresión visual y los secundarios deben utilizar tratamientos más contenidos.
- Estos recursos no deben aplicarse automáticamente a todas las secciones ni repetirse mecánicamente.
- Preferir profundidad y variación de superficie antes que proliferación de cards, marcos, sombras fuertes, cards anidadas o glassmorphism.
- Mantener `Calma Tecnológica` como límite: luz, color y profundidad acompañan al contenido y no compiten con él.
- Una solución visual aprobada para una feature no debe copiarse literalmente a otra cuando su jerarquía o función requieran un tratamiento diferente.

## 8-A. Estados interactivos

Los estados interactivos deben responder a la semántica del elemento y mantener una lógica visual coherente en tema claro y oscuro.

### Estado implementado actual

El núcleo del sistema interactivo compartido centraliza las acciones semánticas y los enlaces editoriales inline mediante componentes presentacionales reutilizables. Los tokens globales gobiernan color, borde, profundidad, foco y transiciones cuando esos estados se comparten; cada feature conserva el control de su layout y composición.

Familias actuales:

- **Acciones primary y secondary:** `ActionLink` y `ActionButton` comparten estructura, variantes semánticas y estados mediante el mismo módulo visual. Primary conserva su gradiente y color de texto base; en hover refuerza el gradiente, el borde y el glow mediante tokens semánticos y se eleva `2px`. Al presionarse vuelve hacia la superficie y reduce levemente su escala. Secondary mantiene una respuesta visual propia y no hereda automáticamente el tratamiento de primary.
- **Enlaces editoriales inline:** `InlineLink` hereda el color del contexto en reposo y revela en hover o foco un subrayado en gradiente de izquierda a derecha sin alterar el layout. El foco mantiene además un outline visible. Este patrón no reemplaza automáticamente los tratamientos específicos de navegación: Navbar y Footer pueden conservar respuestas acordes con su función.
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

### Sistema interactivo compartido

- Las acciones que compartan semántica deben reutilizar `ActionLink` o `ActionButton` en lugar de redefinir independientemente padding, radio, tipografía, borde, colores, hover, foco y transición dentro de cada feature.
- Los enlaces editoriales inline que compartan el mismo comportamiento deben reutilizar `InlineLink`; no deben simular una acción ni adoptar un color sólido de acento en reposo por defecto.
- Las variantes deben representar intención semántica y no pertenencia a Hero, Contacto, Proyectos o Laboratorio.
- Cada feature conserva control sobre layout, posición, agrupación, ancho local y necesidades realmente específicas.
- Antes de ampliar el sistema con nuevos componentes, variantes o familias de controles, deben auditarse sus consumidores reales y comprobarse que exista una responsabilidad compartida concreta.

## 8-B. Motion

### Estado implementado actual

La aplicación ya combina transiciones globales con animaciones y transiciones locales, y contempla `prefers-reduced-motion`. Esto no implica que el sistema de motion compartido esté consolidado.

### Dirección aprobada pendiente

- El Portfolio debe sentirse calmo, reactivo y vivo.
- Las interacciones importantes deben ser perceptibles; evitar animaciones tan leves que prácticamente no se vean.
- Centralizar duraciones, easings y tokens de motion cuando exista reutilización real, sin crear abstracciones preventivas.
- Mantener obligatorio `prefers-reduced-motion` y ofrecer una experiencia comprensible sin depender del movimiento.
- La dirección aprobada incluye reveals perceptibles, hover claro, spotlight ambiental en desktop, movimiento leve de la pieza del hero y zoom suave de imágenes en cards.
- No agregar custom cursor, partículas, scroll secuestrado ni animaciones permanentes sin valor.
- Estas evoluciones deben implementarse y validarse por alcance; su mención aquí no afirma que ya existan.

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

### Estado implementado actual

La navegación vigente utiliza una barra superior tanto en desktop como en tablet y mobile.

### Dirección aprobada pendiente · Layout y navegación

- En desktop, la dirección aprobada es una sidebar o rail izquierda fija y compacta.
- Tablet y mobile mantienen navegación superior.
- No usar un único `max-width` estrecho como regla universal para toda la landing.
- Diferenciar el shell visual amplio del ancho de lectura controlado para textos.
- Esta dirección todavía no está implementada y no debe documentarse ni tratarse como estado actual.

### Dirección aprobada pendiente · Cards de Proyectos

Esta dirección aplica a Proyectos y no a Laboratorio.

- GeClau y Horas Claras mantienen protagonismo.
- Las cards futuras usarán el mockup o la cobertura aportada por Nico.
- El logo se ubicará a la izquierda del nombre.
- La primera capa mostrará mockup, nombre, descripción breve y acción.
- No mostrar tecnologías en las cards; pueden permanecer dentro de los detalles de proyecto.
- No aumentar el tamaño de las cards como solución automática.
- El hover podrá combinar zoom suave del mockup con una respuesta de profundidad.
- Estas cards todavía no están implementadas; no inventar assets, dimensiones ni contratos antes de contar con el material y auditar la composición real.

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

### Overlays

- Deben consumir el mismo lenguaje interactivo global que la landing; no deben crear un sistema paralelo de acciones y controles.
- En desktop, el shell puede ampliarse cuando la multimedia lo necesite.
- El ancho de lectura textual debe mantenerse controlado aunque el shell visual sea más amplio.
- Deben conservar accesibilidad, foco visible y administrado, cierre con Escape, bloqueo del fondo y retorno de foco al elemento que los abrió.

## 12. Performance

- Mantener Client Components acotados.
- Evitar dependencias visuales pesadas por conveniencia.
- Cargar multimedia de forma responsable.
- No introducir animaciones continuas costosas sin valor.
- Evitar re-renders y efectos innecesarios cuando sean evidentes en el flujo afectado.
- No optimizar prematuramente sin evidencia de un problema.

## 13. Cazador de Bugs

La presencia de assets del minijuego no implica que su feature esté implementada. Antes de trabajar sobre él, comprobar el estado real del código.

Cuando se implemente, debe vivir dentro del mismo repositorio como feature aislada, mantener su lógica separada de las secciones del Portfolio y no contaminar la composición principal.

La mecánica exacta debe venir definida por su tarea correspondiente. No crear infraestructura del juego por anticipación.

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
