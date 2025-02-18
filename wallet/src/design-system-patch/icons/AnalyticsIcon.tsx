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
      d="M2 17a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm6 0H4v3h4z"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M8 11a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v11H8zm6 0h-4v9h4z"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M14 4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-6zm6 0h-4v16h4z"
      clipRule="evenodd"
    />
  </svg>
);

const SvgAnalyticsIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgAnalyticsIcon;
