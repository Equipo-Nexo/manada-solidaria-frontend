import { useEffect } from 'react'
import type { ComponentType, SVGProps } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import {
  OptionContent,
  OptionDescription,
  OptionIcon,
  OptionItem,
  OptionsBackdrop,
  OptionsList,
  OptionTitle,
} from './PublishOptions.styles'
import { DollarSign, HandHeart, PawPrint } from '../../icons'

type IconProps = SVGProps<SVGSVGElement>

type PublishOption = {
  title: string
  description: string
  icon: ComponentType<IconProps>
  path: string
}

const publishOptions: PublishOption[] = [
  {
    title: 'Publicar caso de animal',
    description: 'Perdidos, encontrados, en adopción o en la calle.',
    icon: PawPrint,
    path: '/publicar/animal',
  },
  {
    title: 'Publicar colecta de dinero',
    description: 'Gastos veterinarios, tratamientos, cirugías o insumos.',
    icon: DollarSign,
    path: '/publicar/colecta',
  },
  {
    title: 'Publicar una campaña',
    description: 'Castraciones, vacunaciones, donaciones o eventos solidarios.',
    icon: HandHeart,
    path: '/publicar/campania',
  },
]

type PublishOptionsProps = {
  isOpen: boolean
  placement: 'mobile' | 'desktop'
  onClose: () => void
}

function PublishOptions({ isOpen, placement, onClose }: PublishOptionsProps) {
  const navigate = useNavigate()

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  const handleOptionClick = (path: string) => {
    onClose()
    navigate(path)
  }

  return createPortal(
    <OptionsBackdrop aria-label="Opciones para publicar" onClick={onClose}>
      <OptionsList $placement={placement} onClick={(event) => event.stopPropagation()}>
        {publishOptions.map((option) => {
          const Icon = option.icon

          return (
            <OptionItem
              key={option.title}
              type="button"
              onClick={() => handleOptionClick(option.path)}
            >
              <OptionIcon aria-hidden="true">
                <Icon />
              </OptionIcon>
              <OptionContent>
                <OptionTitle>{option.title}</OptionTitle>
                <OptionDescription>{option.description}</OptionDescription>
              </OptionContent>
            </OptionItem>
          )
        })}
      </OptionsList>
    </OptionsBackdrop>,
    document.body,
  )
}

export default PublishOptions
