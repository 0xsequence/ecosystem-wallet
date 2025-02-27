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
      d="M10 12a2 2 0 1 1 4 0 2 2 0 0 1-4 0"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M12 8a4 4 0 0 0-2.8 6.857 1 1 0 0 1-1.4 1.428 6 6 0 1 1 8.4 0 1 1 0 0 1-1.4-1.428A4 4 0 0 0 12 8"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M12 4a8 8 0 0 0-5.533 13.778 1 1 0 1 1-1.384 1.444A9.97 9.97 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10a9.97 9.97 0 0 1-3.083 7.222 1 1 0 1 1-1.384-1.444A8 8 0 0 0 12 4"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      d="M9 21a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1"
    />
    <path fill="currentColor" d="M11 14a1 1 0 1 1 2 0v7a1 1 0 1 1-2 0z" />
  </svg>
);

const SvgNetworkIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgNetworkIcon;
