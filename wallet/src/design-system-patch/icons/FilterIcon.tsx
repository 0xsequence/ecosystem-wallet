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
      d="M7 2a1 1 0 0 1 1 1v8.126a4.002 4.002 0 0 1 0 7.748V21a1 1 0 1 1-2 0v-2.126a4.002 4.002 0 0 1 0-7.748V3a1 1 0 0 1 1-1m2 13a2 2 0 1 1-4 0 2 2 0 0 1 4 0M18 13.874a4.002 4.002 0 0 0 0-7.748V3a1 1 0 1 0-2 0v3.126a4.002 4.002 0 0 0 0 7.748V21a1 1 0 1 0 2 0zM19 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0"
      clipRule="evenodd"
    />
  </svg>
);

const SvgFilterIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgFilterIcon;
