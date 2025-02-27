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
      d="m17.254 4.016-7.32 7.32 2.745 2.746L20 6.762V4.016zm-3.16 11.48L21.42 8.17a1.98 1.98 0 0 0 .58-1.4V3.996a1.98 1.98 0 0 0-1.98-1.98h-2.774a1.98 1.98 0 0 0-1.4.58L8.518 9.922l-.68-.68a1.98 1.98 0 0 0-2.8 0l-.959.959a1.98 1.98 0 0 0-.478 2.026l1 3-1.99 1.99a1.98 1.98 0 0 0 0 2.8l1.386 1.387a1.98 1.98 0 0 0 2.801 0l1.99-1.99 3 1a1.98 1.98 0 0 0 2.026-.478l.958-.959a1.98 1.98 0 0 0 0-2.8zM6.439 10.67l-.936.936 1 3a1.98 1.98 0 0 1-.48 2.026L4.04 18.617l1.36 1.36 1.984-1.985a1.98 1.98 0 0 1 2.027-.479l3 1 .935-.936z"
      clipRule="evenodd"
    />
  </svg>
);

const SvgGameSwordIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgGameSwordIcon;
