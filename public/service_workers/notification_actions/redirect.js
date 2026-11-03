async function redirectNotificationAction({ action, data }) {
  const relativeUrl = action.url ?? data.url ?? '/home'
  const targetUrl = new URL(relativeUrl, self.location.origin)

  if (targetUrl.origin !== self.location.origin) return

  const windowClients = await self.clients.matchAll({
    type: 'window',
    includeUncontrolled: true,
  })

  const client = windowClients.find(
    (client) => new URL(client.url).origin === targetUrl.origin,
  )

  if (client) {
    const navigatedClient = await client.navigate(targetUrl.href)

    if (navigatedClient) {
      return navigatedClient.focus()
    }
  }

  return self.clients.openWindow(targetUrl.href)
}
