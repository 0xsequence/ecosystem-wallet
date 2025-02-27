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
      d="M7.919 5.25A2 2 0 0 1 9.48 4.5H20a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H9.435a2 2 0 0 1-1.463-.635L2.08 12.55zM20 6.5H9.48l-4.76 5.95 4.715 5.05H20z"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M11.293 8.793a1 1 0 0 1 1.414 0l5 5a1 1 0 0 1-1.414 1.414l-5-5a1 1 0 0 1 0-1.414"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M17.707 8.793a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414l5-5a1 1 0 0 0 0-1.414"
      clipRule="evenodd"
    />
  </svg>
);

const SvgClearInputIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgClearInputIcon;
