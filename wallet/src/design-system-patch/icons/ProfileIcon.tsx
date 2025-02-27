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
      d="M5.099 20H18.9a4.996 4.996 0 0 0-4.895-4H9.994a4.996 4.996 0 0 0-4.895 4M3 20.994A6.994 6.994 0 0 1 9.994 14h4.012A6.994 6.994 0 0 1 21 20.994C21 21.55 20.55 22 19.994 22H4.006C3.45 22 3 21.55 3 20.994M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6m0 2a5 5 0 1 0 0-10 5 5 0 0 0 0 10"
      clipRule="evenodd"
    />
  </svg>
);

const SvgProfileIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgProfileIcon;
