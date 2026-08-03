import type { SVGProps } from "react";

function Copy(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="0.5" y="0.5" width="11" height="11" rx="1.5" stroke="white" />
      <rect
        x="4.5"
        y="4.5"
        width="11"
        height="11"
        rx="1.5"
        fill="#EA5F09"
        stroke="white"
      />
    </svg>
  );
}

export default Copy;
