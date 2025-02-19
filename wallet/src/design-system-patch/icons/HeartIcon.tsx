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
      d="M20.19 4.866a6.25 6.25 0 0 0-3.975-1.84 6.2 6.2 0 0 0-4.193 1.238 6.2 6.2 0 0 0-4.437-1.225A6.24 6.24 0 0 0 3.52 5.223a6.47 6.47 0 0 0-1.514 4.423 6.45 6.45 0 0 0 1.849 4.288l6.006 6.171a2.98 2.98 0 0 0 2.122.895c.796 0 1.559-.322 2.122-.895l6.006-6.171a6.4 6.4 0 0 0 1.387-2.066 6.5 6.5 0 0 0 .044-4.91 6.4 6.4 0 0 0-1.351-2.092m-1.411 7.61-6.006 6.12a1 1 0 0 1-.711.301.98.98 0 0 1-.71-.302l-6.007-6.12a4.42 4.42 0 0 1-1.224-3.06 4.42 4.42 0 0 1 1.224-3.06 4.23 4.23 0 0 1 3.003-1.256c1.124 0 2.203.451 3.003 1.256a1 1 0 0 0 .71.302.99.99 0 0 0 .712-.302c.821-.666 1.855-1.001 2.903-.94a4.24 4.24 0 0 1 2.78 1.268 4.4 4.4 0 0 1 1.245 2.834 4.4 4.4 0 0 1-.922 2.958"
    />
  </svg>
);

const SvgHeartIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgHeartIcon;
