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
      d="M10.264 6.973a1.973 1.973 0 1 1-2.79 2.79 1.973 1.973 0 0 1 2.79-2.79"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M3 4.473C3 3.383 3.883 2.5 4.973 2.5h6.974c.523 0 1.025.208 1.395.578l8.08 8.08c.77.77.77 2.02 0 2.79l-6.974 6.974c-.77.77-2.02.77-2.79 0l-8.08-8.08A1.97 1.97 0 0 1 3 11.447zm1.973 0v6.974l8.08 8.08 6.974-6.974-8.08-8.08z"
      clipRule="evenodd"
    />
  </svg>
);

const SvgTagIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgTagIcon;
