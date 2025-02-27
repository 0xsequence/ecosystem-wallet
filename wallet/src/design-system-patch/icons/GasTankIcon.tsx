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
      d="M11 4H4v16h7zM4 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M21 6a1 1 0 0 1 1 1v11.5a3.5 3.5 0 1 1-7 0v-2.6a3 3 0 0 0-3-3 1 1 0 1 1 0-2 5 5 0 0 1 5 5v2.6a1.5 1.5 0 0 0 3 0V7a1 1 0 0 1 1-1"
      clipRule="evenodd"
    />
    <path fill="currentColor" d="M17.5 7a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M16.293 2.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414l-4-4a1 1 0 0 1 0-1.414"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      d="M6 7a1 1 0 0 1 1-1h1a1 1 0 0 1 0 2H7a1 1 0 0 1-1-1"
    />
  </svg>
);

const SvgGasTankIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgGasTankIcon;
