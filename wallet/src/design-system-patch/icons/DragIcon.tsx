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
      d="M7 6a2 2 0 1 1 4 0 2 2 0 0 1-4 0M7 12a2 2 0 1 1 4 0 2 2 0 0 1-4 0M7 18a2 2 0 1 1 4 0 2 2 0 0 1-4 0M13 6a2 2 0 1 1 4 0 2 2 0 0 1-4 0M13 12a2 2 0 1 1 4 0 2 2 0 0 1-4 0M13 18a2 2 0 1 1 4 0 2 2 0 0 1-4 0"
    />
  </svg>
);

const SvgDragIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgDragIcon;
