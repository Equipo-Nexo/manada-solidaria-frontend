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
        console.info('[Web Push] Payload recibido', {
          title: payload?.title,
          body: payload?.body,
          tag: payload?.tag,
          url: payload?.url,
        })

        if (typeof payload?.title !== 'string' || typeof payload?.body !== 'string') {
          console.warn('[Web Push] Payload descartado: title y body deben ser strings')
          return
        }

        await self.registration.showNotification(payload.title, {
          body: payload.body,
          icon: payload.icon,
          badge: payload.badge,
          tag: payload.tag,
          data: {
            ...(payload.data && typeof payload.data === 'object' ? payload.data : {}),
            url: payload.url,
          },
        })

        console.info('[Web Push] Notificaci\u00f3n mostrada', {
          title: payload.title,
          tag: payload.tag,
          url: payload.url,
        })
      })
      .catch((error) => console.error('[Web Push] No se pudo procesar la notificaci\u00f3n', error)),
  )
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  const relativeUrl = event.notification.data?.url ?? '/home'
  const targetUrl = new URL(relativeUrl, self.location.origin).href

  console.info('[Web Push] Click en notificaci\u00f3n', { targetUrl })

  event.waitUntil(
    clients
      .matchAll({
        type: 'window',
        includeUncontrolled: true,
      })
      .then((windowClients) => {
        for (const client of windowClients) {
          if ('focus' in client) {
            return client.navigate(targetUrl).then(() => client.focus())
          }
        }

        return clients.openWindow(targetUrl)
      }),
  )
})
