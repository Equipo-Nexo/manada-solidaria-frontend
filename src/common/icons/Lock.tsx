import type { SVGProps } from 'react'

function Lock(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <path
        d="M4 7V5C4 3.9 4.39 2.96 5.17 2.17C5.96 1.39 6.9 1 8 1C9.1 1 10.04 1.39 10.83 2.17C11.61 2.96 12 3.9 12 5V7H13C13.55 7 14 7.45 14 8V14C14 14.55 13.55 15 13 15H3C2.45 15 2 14.55 2 14V8C2 7.45 2.45 7 3 7H4ZM6 7H10V5C10 4.45 9.8 3.98 9.41 3.59C9.02 3.2 8.55 3 8 3C7.45 3 6.98 3.2 6.59 3.59C6.2 3.98 6 4.45 6 5V7ZM4 13H12V9H4V13Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default Lock
