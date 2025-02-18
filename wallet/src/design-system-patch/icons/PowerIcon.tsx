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
      d="M10 14v5.04L16.453 12h-4.719l.766-6.127L6.115 14zm-5.943 2a1 1 0 0 1-.786-1.618l9.429-12A1 1 0 0 1 13.486 2h.381a1 1 0 0 1 .992 1.124L14 10h4.728c.87 0 1.325 1.034.737 1.676l-9.167 10A1 1 0 0 1 9.56 22H9a1 1 0 0 1-1-1v-5z"
      clipRule="evenodd"
    />
  </svg>
);

const SvgPowerIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgPowerIcon;
