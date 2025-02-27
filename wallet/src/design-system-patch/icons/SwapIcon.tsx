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
      d="M3 8.5h15.003l-1.601 1.2a1 1 0 1 0 1.2 1.6l4.004-3a1 1 0 0 0 0-1.589l-3.863-3a1.002 1.002 0 0 0-1.231 1.58l1.571 1.21H3.001a1.001 1.001 0 0 0-.708 1.707c.188.188.442.293.708.293M20.899 15.5H5.997l1.601-1.2a1 1 0 1 0-1.2-1.6l-4.004 3a1 1 0 0 0 0 1.59l3.863 3a1 1 0 0 0 1.051.107 1 1 0 0 0 .35-.287 1 1 0 0 0-.17-1.4L5.917 17.5h14.982a1.002 1.002 0 0 0 .708-1.707 1 1 0 0 0-.708-.293"
    />
  </svg>
);

const SvgSwapIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgSwapIcon;
