import type { SVGProps } from "react";
type CopyProps = SVGProps<SVGSVGElement> & {
  $inverted?: boolean;
};

function Copy({ $inverted = false, ...props }: CopyProps) {
  const strokeColor = $inverted ? "#EA5F09" : "white";
  const fillColor = $inverted ? "white" : "#EA5F09";
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x="0.5"
        y="0.5"
        width="11"
        height="11"
        rx="1.5"
        stroke={strokeColor}
      />
      <rect
        x="4.5"
        y="4.5"
        width="11"
        height="11"
        rx="1.5"
        fill={fillColor}
        stroke={strokeColor}
      />
    </svg>
  );
}

export default Copy;
