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
      d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10"
    />
    <path
      fill="currentColor"
      d="M8 8.111C8 7.497 8.448 7 9 7s1 .497 1 1.111v7.778C10 16.503 9.552 17 9 17s-1-.497-1-1.111zM14 8.111C14 7.497 14.448 7 15 7s1 .497 1 1.111v7.778c0 .614-.448 1.111-1 1.111s-1-.497-1-1.111z"
    />
  </svg>
);

const SvgPauseColorIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgPauseColorIcon;
