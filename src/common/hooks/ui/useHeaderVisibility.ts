import { useEffect, useRef, useState } from 'react'

const TOP_OFFSET = 16
const SCROLL_DELTA = 6

function useHeaderVisibility() {
  const [isVisible, setIsVisible] = useState(true)
  const lastScrollY = useRef(0)

  useEffect(() => {
    lastScrollY.current = window.scrollY

    const handleScroll = () => {
      const currentScrollY = Math.max(window.scrollY, 0)
      const difference = currentScrollY - lastScrollY.current

      if (currentScrollY <= TOP_OFFSET) {
        setIsVisible(true)
        lastScrollY.current = currentScrollY
      } else if (Math.abs(difference) >= SCROLL_DELTA) {
        setIsVisible(difference < 0)
        lastScrollY.current = currentScrollY
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return isVisible
}

export default useHeaderVisibility
