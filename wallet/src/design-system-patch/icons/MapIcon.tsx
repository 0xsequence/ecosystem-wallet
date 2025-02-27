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
      d="M2.486 3.143a1 1 0 0 1 .985-.025L9 6.067l5.53-2.95a1 1 0 0 1 .94 0l6 3.2A1 1 0 0 1 22 7.2V20a1 1 0 0 1-1.528.85L15 17.443 9.528 20.85a1 1 0 0 1-1.056 0l-6-3.733a1 1 0 0 1-.472-.85V4a1 1 0 0 1 .486-.857M16 15.71l4 2.489V7.8l-4-2.133zM14 5.667V15.71L10 18.2V7.8zM8 7.8 4 5.667V15.71L8 18.2z"
      clipRule="evenodd"
    />
  </svg>
);

const SvgMapIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgMapIcon;
