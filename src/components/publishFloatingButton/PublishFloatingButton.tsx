import { PawPrint } from 'lucide-react'
import { useToast } from '../../hooks/useToast'
import './PublishFloatingButton.css'

function PublishFloatingButton() {
  const toast = useToast()

  const handlePublish = () => {
    toast.information({
      title: 'Error al publicar',
      description: 'Ocurrió un error al intentar publicar tu notificación.',
    })
  }

  return (
    <button
      className="publish-floating-button"
      type="button"
      aria-label="Publicar"
      onClick={handlePublish}
    >
      <PawPrint aria-hidden="true" />
      <span>Publicar</span>
    </button>
  )
}

export default PublishFloatingButton
