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
      d="M6 17H2v-2h4v-4.81a6.48 6.48 0 0 1-4 1.791V9.973A4.5 4.5 0 0 0 6 5.5V4a1 1 0 0 1 2 0v1.75a4.25 4.25 0 0 0 8.5 0V4a1 1 0 1 1 2 0v1.5A4.5 4.5 0 0 0 22 9.888v2.036a6.5 6.5 0 0 1-3.5-1.734V15H22v2h-3.5v3a1 1 0 1 1-2 0v-3H8v3a1 1 0 1 1-2 0zm10.5-6.667V15H8v-4.667A6.23 6.23 0 0 0 12.25 12a6.23 6.23 0 0 0 4.25-1.667"
      clipRule="evenodd"
    />
  </svg>
);

const SvgBridgeIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgBridgeIcon;
