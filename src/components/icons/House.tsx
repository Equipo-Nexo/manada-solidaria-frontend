import type { SVGProps } from 'react'

function House(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="18"
      viewBox="0 0 16 18"
      fill="none"
      {...props}
    >
      <path
        d="M0 18V6L8 0L16 6V18H10V11H6V18H0Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default House
