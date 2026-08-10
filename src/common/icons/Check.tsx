import type { SVGProps } from 'react'

function Check(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <path d="M7.6 14.6L3.35 10.35L4.75 8.95L7.6 11.8L15.25 4.15L16.65 5.55L7.6 14.6Z" fill="currentColor" />
    </svg>
  )
}

export default Check
