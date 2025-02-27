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
      d="M12 7a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1M19 13h-6a1 1 0 1 1 0-2h6a1 1 0 1 1 0 2M12 17a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2h-8a1 1 0 0 1-1-1M9.707 12.793a1 1 0 0 1 0 1.414L6 17.914l-3.707-3.707a1 1 0 1 1 1.414-1.414L5 14.086V7a1 1 0 0 1 2 0v7.086l1.293-1.293a1 1 0 0 1 1.414 0"
      clipRule="evenodd"
    />
  </svg>
);

const SvgSortIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgSortIcon;
