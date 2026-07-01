import { PawPrint } from 'lucide-react'
import styled from 'styled-components'
import { useToast } from '../../hooks/useToast'

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

const FloatingButton = styled.button`
  position: fixed;
  right: 24px;
  bottom: 96px;
  z-index: 30;
  min-width: 58px;
  min-height: 58px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 0 20px;
  border: 0;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  box-shadow: 0 12px 24px rgb(89 65 55 / 22%);
  cursor: pointer;
  font-size: 15px;
  font-weight: 700;
  line-height: 20px;
  transition: transform 160ms ease, box-shadow 160ms ease, background 160ms ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
    box-shadow: 0 16px 30px rgb(89 65 55 / 28%);
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 3px;
  }

  svg {
    width: 24px;
    height: 24px;
    flex: 0 0 24px;
    stroke-width: 2.5;
  }

  @media (max-width: 767px) {
    display: none;
  }
`

export default PublishFloatingButton
