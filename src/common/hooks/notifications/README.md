# Recuperación de suscripciones Web Push

`usePushSubscriptionSync` se monta una sola vez en `App`. Con una sesión
autenticada, reenvía la suscripción existente del navegador a
`POST /push-notifications/subscribe`:

- Al abrir la aplicación o iniciar sesión, incluida una sesión persistida.
- Al volver a primer plano o recuperar la conexión.
- Cada cinco minutos mientras la aplicación está visible y tiene conexión.

El backend debe crear el registro si no existe y actualizarlo si ya existe,
identificándolo por `endpoint`. La implementación actual del backend hace esto.
Se conserva la suscripción del navegador; la recuperación no pide permisos ni
crea una suscripción si el usuario desactivó las notificaciones.

Los errores se reintentan con esperas de 5, 10, 20 segundos y así sucesivamente,
hasta un máximo de cinco minutos entre intentos. Los eventos de primer plano y
conexión adelantan el siguiente intento. Los intentos se suspenden si la app
está oculta o sin conexión, y se cancelan al cerrar sesión.

Cerrar sesión conserva la suscripción del navegador y su registro en el backend.
El logout es local y no espera peticiones de notificaciones. La desuscripción
desde la app ocurre únicamente cuando la persona desactiva las notificaciones
en su perfil.

El perfil muestra `sync-pending` cuando existe una suscripción local pero no
hay una confirmación exitosa del servidor para el usuario actual. La
confirmación se comparte mediante el `fixedCacheKey` de RTK Query. Las altas y
bajas se serializan para evitar que un reintento vuelva
a registrar un dispositivo que se está desvinculando.

Si el backend pierde el registro con la app completamente cerrada, la
recuperación espera a que vuelva a abrirse. No recupera mensajes que el backend
no pudo enviar mientras no tenía la suscripción.

Verificación automática: `npm.cmd run test:push`, `npm.cmd run build` y
`npm.cmd run lint`. Para verificar la integración en un entorno de prueba,
activar las notificaciones, eliminar únicamente el registro de ese dispositivo
en el backend y volver a la app: el mismo endpoint debe registrarse de nuevo.
