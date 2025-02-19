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
      d="m11.13 17.183-8.577-4.289.894-1.788 8.578 4.289 8.569-3.809.812 1.828-8.569 3.808a2 2 0 0 1-1.706-.039"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      d="m9 7.739-5.812 2.583A2 2 0 0 0 2 12.15v3.732a2 2 0 0 0 1.106 1.789l8 4a2 2 0 0 0 1.788 0l8-4A2 2 0 0 0 22 15.882v-3.264a2 2 0 0 0-1.106-1.789L15 7.882v2.236l5 2.5v3.264l-8 4-8-4V12.15l5-2.222z"
    />
    <path fill="currentColor" d="M11 6a1 1 0 1 1 2 0v6a1 1 0 1 1-2 0z" />
    <path fill="currentColor" d="M14 4a2 2 0 1 1-4 0 2 2 0 0 1 4 0" />
  </svg>
);

const SvgGameIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgGameIcon;
