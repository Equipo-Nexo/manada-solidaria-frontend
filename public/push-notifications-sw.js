importScripts('/service_workers/notificationActionStrategies.js')

self.addEventListener('push', (event) => {
  console.info('[Web Push] Evento push recibido', {
    hasData: Boolean(event.data),
  })

  if (!event.data) {
    console.warn('[Web Push] El evento no contiene datos; no se mostrar\u00e1 una notificaci\u00f3n')
    return
  }

  event.waitUntil(
    Promise.resolve()
      .then(() => event.data.json())
      .then(async (payload) => {
        if (typeof payload?.title !== 'string' || typeof payload?.body !== 'string') {
          console.warn('[Web Push] Payload descartado: title y body deben ser strings')
          return
        }

        const actions = (payload.actions ?? []).map((action, index) => ({
          ...action,
          id: `action-${index}`,
        }));

        await self.registration.showNotification(payload.title, {
          body: payload.body,
          ...(payload.icon ? { icon: payload.icon } : {}),
          ...(payload.badge ? { badge: payload.badge } : {}),
          tag: payload.tag,
          data: {
            ...(payload.data && typeof payload.data === "object"
              ? payload.data
              : {}),
            url: payload.url,
            actions,
          },
          actions: actions.map(({ id, title }) => ({
            action: id,
            title,
          })),
        });
      })
      .catch((error) => console.error('[Web Push] No se pudo procesar la notificaci\u00f3n', error)),
  )
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  const data = event.notification.data ?? {}
  const actions = data.actions ?? []
  // Al tocar el cuerpo, usamos el primer REDIRECT o la URL por defecto.
  const action = event.action
    ? actions.find((action) => action.id === event.action)
    : actions.find((action) => action.type === 'REDIRECT') ?? { type: 'REDIRECT' }
  const strategy = notificationActionStrategies.get(action?.type)

  if (!strategy) return

  event.waitUntil(
    Promise.resolve().then(() => strategy({ action, data })),
  )
})
