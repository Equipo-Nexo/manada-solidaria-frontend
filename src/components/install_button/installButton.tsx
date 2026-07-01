import { useEffect, useState } from 'react'
import styled from 'styled-components'

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

const InstallPromptButton = styled.button<{ $isVisible: boolean }>`
  position: fixed;
  bottom: 9rem;
  left: 50%;
  z-index: 50;
  padding: 0.75rem 3.75rem;
  border: 0;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  box-shadow: 0 10px 15px rgb(0 0 0 / 18%);
  cursor: pointer;
  font-weight: 500;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  pointer-events: ${({ $isVisible }) => ($isVisible ? 'auto' : 'none')};
  transform: ${({ $isVisible }) =>
    $isVisible ? 'translate(-50%, 0)' : 'translate(-50%, 6rem)'};
  transition: opacity 500ms ease-out, transform 500ms ease-out;
`
