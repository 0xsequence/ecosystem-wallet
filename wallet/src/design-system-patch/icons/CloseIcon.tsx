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
      d="M3.293 3.293a1 1 0 0 1 1.414 0l16 16a1 1 0 0 1-1.414 1.414l-16-16a1 1 0 0 1 0-1.414"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M20.707 3.293a1 1 0 0 0-1.414 0l-16 16a1 1 0 1 0 1.414 1.414l16-16a1 1 0 0 0 0-1.414"
      clipRule="evenodd"
    />
  </svg>
);

const SvgCloseIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgCloseIcon;
