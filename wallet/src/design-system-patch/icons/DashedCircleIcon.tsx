// Auto-generated file created by svgr-cli source ./template.js
// Run pnpm build to update
import { SVGProps } from "react";

import { cn } from "../utils";

import { iconVariants } from "../utils/iconVariants";
import { IconProps } from "../utils/types";

const Svg = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M10.05 2.19a10 10 0 0 1 3.9 0 1 1 0 1 1-.388 1.962 8 8 0 0 0-3.124 0 1 1 0 1 1-.389-1.962m6.12 1.77a1 1 0 0 1 1.387-.275 10 10 0 0 1 2.758 2.758 1 1 0 0 1-1.662 1.113 8.05 8.05 0 0 0-2.209-2.21 1 1 0 0 1-.274-1.386m-8.34 0a1 1 0 0 1-.274 1.387 8 8 0 0 0-2.21 2.209 1 1 0 0 1-1.661-1.113 10 10 0 0 1 2.758-2.758 1 1 0 0 1 1.387.275M3.365 9.263a1 1 0 0 1 .787 1.175 8 8 0 0 0 0 3.124 1 1 0 1 1-1.962.389 10 10 0 0 1 0-3.902 1 1 0 0 1 1.175-.786m17.27 0a1 1 0 0 1 1.175.787 10.05 10.05 0 0 1 0 3.9 1 1 0 0 1-1.962-.388 8 8 0 0 0 0-3.124 1 1 0 0 1 .787-1.175m-.595 6.907a1 1 0 0 1 .275 1.387 10.1 10.1 0 0 1-2.758 2.758 1 1 0 0 1-1.113-1.662 8.05 8.05 0 0 0 2.21-2.209 1 1 0 0 1 1.386-.274m-16.08 0a1 1 0 0 1 1.387.274 8.05 8.05 0 0 0 2.209 2.21 1 1 0 0 1-1.113 1.661 10 10 0 0 1-2.758-2.758 1 1 0 0 1 .275-1.387m5.303 4.465a1 1 0 0 1 1.175-.787 8 8 0 0 0 3.124 0 1 1 0 1 1 .389 1.962 10.05 10.05 0 0 1-3.902 0 1 1 0 0 1-.786-1.175"
      clipRule="evenodd"
    />
  </svg>
);

const SvgDashedCircleIcon = ({
  className,
  size = "sm",
  ...props
}: IconProps) => (
  <Svg
    className={cn(
      iconVariants({
        size,
      }),
      className
    )}
    {...props}
  />
);

export default SvgDashedCircleIcon;
