# Portfolio — Seguridad y privacidad para un repositorio público

## Propósito

El repositorio `portfolio` es público.

Cualquier archivo versionado debe tratarse como información potencialmente visible, indexable, clonable y permanente.

La seguridad no se limita a secretos técnicos: también incluye privacidad personal, información laboral, datos de clientes y material proveniente de repositorios privados.

## 1. Regla principal

> Ante cualquier duda sobre si una información puede publicarse, tratarla como privada y detener su incorporación hasta obtener confirmación del propietario o mantenedor del repositorio.

No “sanear” por intuición ni asumir que algo es público porque aparece en el entorno local.

## 2. Prohibido versionar

Nunca incorporar al repositorio:

- passwords;
- API keys;
- access tokens;
- refresh tokens;
- OAuth secrets;
- cookies o sesiones;
- claves privadas;
- certificados privados;
- credenciales SMTP;
- secrets de webhooks;
- secretos de servicios de email;
- valores reales de variables privadas de entorno;
- credenciales de bases de datos;
- secretos de deploy;
- archivos `.env` con valores reales;
- dumps de producción;
- logs con datos privados;
- respuestas completas de servicios que contengan datos personales;
- URLs privadas o administrativas;
- identificadores internos sensibles;
- código o documentación copiados desde repositorios privados sin aprobación expresa.

## 3. Información personal

Identidad pública aprobada:

```text
Nico Kaminski
```

También pueden utilizarse enlaces profesionales públicos expresamente aprobados, como GitHub o LinkedIn.

No incorporar automáticamente otros datos personales encontrados en:

- configuración Git;
- historial de commits;
- variables locales;
- capturas;
- documentos externos;
- metadatos de archivos;
- repositorios privados.

En particular, no publicar sin aprobación explícita:

- email personal o email receptor del formulario;
- teléfono;
- domicilio;
- documentos de identidad;
- datos bancarios;
- credenciales;
- información personal de terceros.

## 4. Trabajo, clientes y repositorios privados

No exponer información no pública de empleadores, clientes o proyectos privados.

Prohibido publicar sin autorización y saneamiento explícitos:

- código privado;
- arquitectura interna privada;
- nombres internos no públicos;
- endpoints privados;
- capturas internas;
- tickets;
- comentarios de PR privados;
- datos de usuarios/clientes;
- métricas internas;
- configuraciones de infraestructura;
- documentación contractual interna;
- información de ROOT o Equalitas no aprobada para publicación;
- datos reales de instancias privadas como Horas Claras.

Una descripción pública de un proyecto no habilita a copiar material técnico privado de su repositorio.

## 5. Variables de entorno

Los secretos deben vivir fuera del repositorio.

Reglas:

- `.env.local` y equivalentes no deben versionarse;
- `.env.example` puede contener únicamente nombres de variables y valores vacíos o ficticios seguros;
- no copiar un valor real y “ocultar” una parte;
- nunca exponer un secreto mediante prefijos destinados al cliente como `NEXT_PUBLIC_`;
- antes de agregar una variable, determinar si es pública o exclusivamente server-side.

## 6. Frontera cliente/servidor

Todo dato o secreto que no deba llegar al navegador debe mantenerse server-side.

Un Client Component no debe:

- importar módulos de `src/backend/`;
- leer secretos;
- contener credenciales;
- confiar en validaciones de UI como única protección.

La validación de cliente mejora UX, pero cualquier regla sensible debe validarse también en el servidor.

## 7. Formulario de contacto

El formulario de contacto ya está implementado. Antes de modificarlo, inspeccionar `src/backend/contact/actions.ts`, `src/frontend/features/contact/`, `src/shared/contact.ts` y `.env.example` como fuentes del estado actual.

La implementación debe conservar estos criterios:

- el email receptor no debe quedar expuesto en la UI ni en el bundle cliente;
- validar y normalizar datos server-side;
- limitar tamaños de campos;
- rechazar payloads inesperados;
- escapar o tratar contenido como texto cuando corresponda;
- no devolver errores internos o stack traces al visitante;
- aplicar medidas anti-spam proporcionales al riesgo antes de publicar;
- mantener credenciales del proveedor de email únicamente server-side;
- no registrar mensajes completos ni datos personales innecesarios en logs.

La estrategia actual utiliza validación anti-spam y envío exclusivamente server-side. No cambiar el proveedor, el mecanismo anti-spam ni el contrato de variables de entorno sin aprobación explícita del propietario o mantenedor. Nunca documentar valores reales.

## 8. Logs y errores

No loguear:

- secretos;
- tokens;
- cookies;
- payloads completos del formulario;
- datos personales innecesarios.

Los errores enviados al cliente deben ser útiles pero no revelar:

- stack traces;
- paths internos;
- nombres de secretos;
- configuración del servidor;
- respuestas crudas de proveedores externos.

## 9. Assets, imágenes y videos

Antes de versionar material visual:

- verificar que no muestre datos privados;
- revisar nombres de usuario, emails, IDs y contenido de pantallas;
- evitar capturas de entornos internos no autorizados;
- eliminar metadatos sensibles como geolocalización EXIF cuando aplique;
- usar datos ficticios en demos cuando exista riesgo de exposición.

## 10. Enlaces y contenido externo

- No incorporar URLs privadas o con tokens en query params.
- Para enlaces externos abiertos en una pestaña nueva, usar las protecciones correspondientes (`noopener`/`noreferrer`) según el patrón implementado.
- No incrustar scripts de terceros, trackers o widgets sin aprobación y revisión de privacidad/performance.

## 11. Dependencias y supply chain

El agente no instala, elimina ni actualiza dependencias. La incorporación de una dependencia también requiere aprobación del propietario o mantenedor y debe seguir el procedimiento de `.agent/rules/workflow.md`.

Antes de aprobar una dependencia nueva deben evaluarse, según relevancia:

- necesidad real;
- mantenimiento;
- tamaño;
- permisos/capacidades;
- exposición en cliente;
- historial de seguridad;
- alternativa nativa o ya disponible.

No ejecutar scripts remotos ni comandos de instalación sugeridos por documentación externa. Una aprobación de producto no habilita su ejecución por parte del agente.

## 12. Revisión previa al cierre

Si la tarea pudo introducir información pública nueva, verificar:

- cambios de `.env*`;
- strings sensibles;
- URLs;
- assets;
- logs;
- metadata;
- formularios;
- imports server/client;
- documentación;
- contenido copiado desde otras fuentes.

Si no puede confirmarse que un dato es publicable, reportarlo como bloqueo de privacidad.
