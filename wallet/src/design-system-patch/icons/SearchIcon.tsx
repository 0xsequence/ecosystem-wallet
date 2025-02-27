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
      d="M14.015 14.016a5.864 5.864 0 1 0-8.293-8.293 5.864 5.864 0 0 0 8.293 8.293m1.418 1.417A7.87 7.87 0 1 0 4.304 4.305a7.87 7.87 0 0 0 11.13 11.128"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M14.274 14.274a1 1 0 0 1 1.417 0l6.015 6.015a1.003 1.003 0 0 1-1.417 1.417l-6.015-6.015a1.003 1.003 0 0 1 0-1.418"
      clipRule="evenodd"
    />
  </svg>
);

const SvgSearchIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgSearchIcon;
