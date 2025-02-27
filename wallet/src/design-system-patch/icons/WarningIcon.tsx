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
      d="M12 4.74 19.631 19H4.37zm9.822 14.115c.514.96-.147 2.145-1.195 2.145H3.373c-1.048 0-1.709-1.185-1.195-2.145l8.627-16.12a1.34 1.34 0 0 1 2.39 0z"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      d="M13 17a1 1 0 1 1-2 0 1 1 0 0 1 2 0M11 10a1 1 0 1 1 2 0v4a1 1 0 1 1-2 0z"
    />
  </svg>
);

const SvgWarningIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgWarningIcon;
