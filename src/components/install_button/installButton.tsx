import { useEffect, useState } from 'react'
import { InstallPromptButton } from './installButton.styles'

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
}

export const InstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isVisible, setVisible] = useState(false)

  useEffect(() => {
    const handler = (event: Event) => {
      event.preventDefault()

      setDeferredPrompt(event as BeforeInstallPromptEvent)
      setVisible(true)

      setTimeout(() => {
        setVisible(false)
      }, 6000)
    }

    window.addEventListener('beforeinstallprompt', handler)

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [])

  const installApp = async () => {
    if (!deferredPrompt) return

    await deferredPrompt.prompt()

    const choice = await deferredPrompt.userChoice

    console.log('Install choice:', choice.outcome)

    setDeferredPrompt(null)
    setVisible(false)
  }

  if (!deferredPrompt) return null

  return (
    <InstallPromptButton type="button" onClick={installApp} $isVisible={isVisible}>
      Instalar app
    </InstallPromptButton>
  )
}
