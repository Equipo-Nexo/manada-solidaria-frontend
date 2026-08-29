import type { SVGProps } from 'react'
import HandHeart from './HandHeart'

function OutlinedHandHeart(props: SVGProps<SVGSVGElement>) {
  return <HandHeart variant="outlined" {...props} />
}

export default OutlinedHandHeart
