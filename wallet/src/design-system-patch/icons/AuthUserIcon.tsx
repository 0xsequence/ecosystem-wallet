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
      d="M12 12a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m0 2a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M12 14c-1.436 0-2.795.91-3.615 2.466a1 1 0 1 1-1.77-.932C7.699 13.48 9.66 12 12 12c2.342 0 4.302 1.48 5.385 3.534a1 1 0 1 1-1.77.932C14.796 14.911 13.437 14 12 14M2 4a2 2 0 0 1 2-2h4a1 1 0 0 1 0 2H4v4a1 1 0 0 1-2 0zM22 20a2 2 0 0 1-2 2h-4a1 1 0 1 1 0-2h4v-4a1 1 0 1 1 2 0zM22 4a2 2 0 0 0-2-2h-4a1 1 0 1 0 0 2h4v4a1 1 0 1 0 2 0zM2 20a2 2 0 0 0 2 2h4a1 1 0 1 0 0-2H4v-4a1 1 0 1 0-2 0z"
      clipRule="evenodd"
    />
  </svg>
);

const SvgAuthUserIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgAuthUserIcon;
