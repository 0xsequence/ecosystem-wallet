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
    <path fill="currentColor" d="M11 3a1 1 0 1 1 2 0v8a1 1 0 1 1-2 0z" />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M7.291 4.264a1 1 0 0 1-.18 1.403 8 8 0 1 0 9.777 0 1 1 0 1 1 1.224-1.583A9.99 9.99 0 0 1 22 12c0 5.523-4.477 10-10 10S2 17.523 2 12a9.99 9.99 0 0 1 3.888-7.916 1 1 0 0 1 1.403.18"
      clipRule="evenodd"
    />
  </svg>
);

const SvgOnIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgOnIcon;
