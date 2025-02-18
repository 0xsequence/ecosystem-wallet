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
      d="M3 19v-8.123a3 3 0 0 1 1.05-2.28l6.5-5.56a3 3 0 0 1 3.9 0l6.501 5.566A3 3 0 0 1 22 10.882V19a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3m2 0a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1v-8.118a1 1 0 0 0-.35-.76l-6.5-5.565a1 1 0 0 0-1.3 0l-6.5 5.56a1 1 0 0 0-.35.76z"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      d="M11 15a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1z"
    />
  </svg>
);

const SvgHomeIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgHomeIcon;
