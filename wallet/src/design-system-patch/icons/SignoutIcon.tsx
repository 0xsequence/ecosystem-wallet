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
      d="M10 4a1 1 0 0 1 1-1h6.5a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H11a1 1 0 1 1 0-2h6.5a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H11a1 1 0 0 1-1-1"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M8.793 8.293a1 1 0 0 1 1.414 0L13.914 12l-3.707 3.707a1 1 0 0 1-1.414-1.414L10.086 13H4a1 1 0 1 1 0-2h6.086L8.793 9.707a1 1 0 0 1 0-1.414"
      clipRule="evenodd"
    />
  </svg>
);

const SvgSignoutIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgSignoutIcon;
