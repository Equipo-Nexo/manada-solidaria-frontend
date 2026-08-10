import { MenuBackdrop, MenuOverlay, MenuPanel } from '../../../App.styles'
import Menu from '../menu/Menu'

type AuthenticatedMenuOverlayProps = {
  isOpen: boolean
  onClose: () => void
}

function AuthenticatedMenuOverlay({ isOpen, onClose }: AuthenticatedMenuOverlayProps) {
  return (
    <MenuOverlay $isOpen={isOpen} aria-hidden={!isOpen}>
      <MenuBackdrop type="button" aria-label={'Cerrar men\u00fa'} onClick={onClose} />
      <MenuPanel aria-label={'Men\u00fa principal'}>
        <Menu onNavigate={onClose} />
      </MenuPanel>
    </MenuOverlay>
  )
}

export default AuthenticatedMenuOverlay
