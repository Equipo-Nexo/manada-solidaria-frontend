import { PawPrint } from 'lucide-react'
import { useToast } from '../../hooks/toast/useToast'
import { FloatingButton } from './PublishFloatingButton.styles'

function PublishFloatingButton() {
  const toast = useToast()

  const handlePublish = () => {
    toast.information({
      title: 'Error al publicar',
      description: 'Ocurri\u00f3 un error al intentar publicar tu notificaci\u00f3n.',
    })
  }

  return (
    <FloatingButton type="button" aria-label="Publicar" onClick={handlePublish}>
      <PawPrint aria-hidden="true" />
      <span>Publicar</span>
    </FloatingButton>
  )
}

export default PublishFloatingButton
