import type { SVGProps } from 'react'

function Eye(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <path
        d="M10 4C13.79 4 16.17 6.42 18 10C16.17 13.58 13.79 16 10 16C6.21 16 3.83 13.58 2 10C3.83 6.42 6.21 4 10 4ZM10 6C7.48 6 5.7 7.34 4.29 10C5.7 12.66 7.48 14 10 14C12.52 14 14.3 12.66 15.71 10C14.3 7.34 12.52 6 10 6ZM10 7C11.66 7 13 8.34 13 10C13 11.66 11.66 13 10 13C8.34 13 7 11.66 7 10C7 8.34 8.34 7 10 7ZM10 9C9.45 9 9 9.45 9 10C9 10.55 9.45 11 10 11C10.55 11 11 10.55 11 10C11 9.45 10.55 9 10 9Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default Eye
