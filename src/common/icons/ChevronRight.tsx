import type { SVGProps } from "react";

function ChevronRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="6"
      height="10"
      viewBox="0 0 6 10"
      fill="none"
      {...props}
    >
      <path
        d="M6 5L1.13514 10L0 8.83333L3.72973 5L0 1.16667L1.13514 0L6 5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default ChevronRight;
