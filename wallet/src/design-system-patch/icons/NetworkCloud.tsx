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
      d="M18.433 9.206a7.002 7.002 0 0 0-13.364 1.9A4 4 0 0 0 6.01 19h11.003a5 5 0 0 0 4.203-7.693 5 5 0 0 0-2.782-2.1M17.013 17H6.008a2 2 0 0 1 0-4.001 1 1 0 0 0 1-1 5.002 5.002 0 0 1 9.733-1.611 1 1 0 0 0 .78.66 3.001 3.001 0 0 1-.51 5.952"
    />
  </svg>
);

const SvgNetworkCloud = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgNetworkCloud;
