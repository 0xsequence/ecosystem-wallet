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
      d="M12.014 1.999c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10m0 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16m3.688 3.062-6 2a.98.98 0 0 0-.626.626l-2 6a.984.984 0 0 0 1.25 1.25l6-2a.98.98 0 0 0 .626-.626l2-6a.984.984 0 0 0-1.25-1.25m-1.25 2.5-1.219 3.657-3.657 1.219 1.22-3.657z"
    />
  </svg>
);

const SvgCompassIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgCompassIcon;
