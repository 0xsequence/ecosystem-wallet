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
      d="M11.51 2.128a1 1 0 0 1 .98 0l8 4.5A1 1 0 0 1 21 7.5v9a1 1 0 0 1-.51.872l-8 4.5a1 1 0 0 1-.98 0l-8-4.5A1 1 0 0 1 3 16.5v-9a1 1 0 0 1 .51-.872zM5 9.21v6.705l6 3.375v-6.705zm8 3.375v6.705l6-3.375V9.21zM17.96 7.5 12 10.853 6.04 7.5 12 4.147z"
      clipRule="evenodd"
    />
  </svg>
);

const SvgNodeIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgNodeIcon;
