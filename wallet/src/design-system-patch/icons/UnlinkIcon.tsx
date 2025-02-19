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
      d="M14.588 2.34a1 1 0 0 1 .707 1.225l-4.658 17.387a1 1 0 0 1-1.932-.517l4.658-17.387a1 1 0 0 1 1.225-.707"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M12.867 11.503a1 1 0 1 1-1.733 1 1 1 0 0 1 1.733-1M5.5 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m0 2a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M18.5 20a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m0 2a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      d="m15.385 10.03.719-2.684c1.668-.213 3.396 1.028 3.396 2.982V16a1 1 0 1 1-2 0v-5.672c0-.89-1.077-1.337-1.707-.707zM5.5 7a1 1 0 0 1 1 1v5.672c0 .89 1.077 1.337 1.707.707l3.086-3.086a1 1 0 0 1 1.414 1.414l-3.086 3.086c-1.89 1.89-5.121.551-5.121-2.121V8a1 1 0 0 1 1-1"
    />
  </svg>
);

const SvgUnlinkIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgUnlinkIcon;
