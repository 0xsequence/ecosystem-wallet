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
      stroke="currentColor"
      strokeWidth={2}
      d="M10.89 16.254 5 20.798V5.086C5 3.968 5.95 3 7.2 3h9.6c1.25 0 2.2.968 2.2 2.086v15.712l-5.89-4.544a1.82 1.82 0 0 0-2.22 0Zm8.421 4.784Z"
    />
  </svg>
);

const SvgFavoriteIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgFavoriteIcon;
