import { useEffect, useState } from 'react'
import { ChevronRight } from '@/common/icons'
import * as S from './ScrollHint.styles'

function ScrollHint() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const updateVisibility = () => {
      const remainingScroll = document.documentElement.scrollHeight
        - window.scrollY
        - window.innerHeight

      setVisible(remainingScroll > 80)
    }

    updateVisibility()
    window.addEventListener('scroll', updateVisibility, { passive: true })
    window.addEventListener('resize', updateVisibility)

    const resizeObserver = new ResizeObserver(updateVisibility)
    resizeObserver.observe(document.body)

    return () => {
      window.removeEventListener('scroll', updateVisibility)
      window.removeEventListener('resize', updateVisibility)
      resizeObserver.disconnect()
    }
  }, [])

  if (!visible) return null

  return (
    <S.Hint
      type="button"
      onClick={() => window.scrollBy({ top: window.innerHeight * 0.65, behavior: 'smooth' })}
      aria-label="Desplazarse para ver más contenido"
    >
      <span>Deslizá para ver más</span>
      <ChevronRight aria-hidden="true" />
    </S.Hint>
  )
}

export default ScrollHint
