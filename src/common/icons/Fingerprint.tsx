import type { SVGProps } from 'react'

function Fingerprint(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M4.55 10.3A7.6 7.6 0 0 1 12 4.2a7.6 7.6 0 0 1 7.45 6.1M7.2 11.3A4.9 4.9 0 0 1 12 7.4a4.9 4.9 0 0 1 4.8 3.9M9.8 12.2A2.25 2.25 0 0 1 12 10.4a2.25 2.25 0 0 1 2.2 1.8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M5.25 13.05c.15 3.55-1.05 5.2-1.75 6.05M8.1 12.5c.18 4.45-1.15 7-2.05 8.1M11 13c.15 3.7-.65 6.75-1.45 8M13.9 13c.05 3.15-.35 5.95-1.05 8M16.7 12.5c.05 2.75.4 5.15 1.55 6.85M19.45 13.05c-.05 1.45.2 2.65.75 3.65"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default Fingerprint
