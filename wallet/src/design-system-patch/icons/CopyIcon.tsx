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
      d="M9 18q-.825 0-1.412-.587A1.93 1.93 0 0 1 7 16V4q0-.824.588-1.412A1.93 1.93 0 0 1 9 2h9q.824 0 1.413.587Q20 3.176 20 4v12q0 .824-.587 1.413A1.93 1.93 0 0 1 18 18zm0-2h9V4H9zm-4 6q-.824 0-1.412-.587A1.93 1.93 0 0 1 3 20V7a1 1 0 0 1 2 0v13h10a1 1 0 1 1 0 2z"
    />
  </svg>
);

const SvgCopyIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgCopyIcon;
