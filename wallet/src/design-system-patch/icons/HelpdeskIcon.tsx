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
      d="M4 9.5A7.5 7.5 0 0 1 11.5 2h1A7.5 7.5 0 0 1 20 9.5V17a1 1 0 0 1-.02.202l-.545 2.633a1 1 0 0 1-.03.114A3 3 0 0 1 16.557 22H13a1 1 0 1 1 0-2h3.558a1 1 0 0 0 .933-.638L17.772 18H17a3 3 0 0 1-3-3v-2a3 3 0 0 1 3-3h1v-.5A5.5 5.5 0 0 0 12.5 4h-1A5.5 5.5 0 0 0 6 9.5v.5h1a3 3 0 0 1 3 3v2a3 3 0 0 1-3 3H5a1 1 0 0 1-1-1zM6 12v4h1a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1zm12 0h-1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h1z"
      clipRule="evenodd"
    />
  </svg>
);

const SvgHelpdeskIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgHelpdeskIcon;
