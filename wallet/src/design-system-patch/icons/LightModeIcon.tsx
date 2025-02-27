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
      d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4m0 2a4 4 0 1 0 0-8 4 4 0 0 0 0 8M12 2a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1M12 18a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1M4.929 4.929a1 1 0 0 1 1.414 0l1.414 1.414a1 1 0 0 1-1.414 1.414L4.929 6.343a1 1 0 0 1 0-1.414M16.242 16.243a1 1 0 0 1 1.415 0l1.414 1.414a1 1 0 0 1-1.414 1.414l-1.415-1.414a1 1 0 0 1 0-1.414M2 12a1 1 0 0 1 1-1h2a1 1 0 0 1 0 2H3a1 1 0 0 1-1-1M18 12a1 1 0 0 1 1-1h2a1 1 0 0 1 0 2h-2a1 1 0 0 1-1-1M4.929 19.071a1 1 0 0 1 0-1.414l1.414-1.414a1 1 0 0 1 1.414 1.414L6.343 19.07a1 1 0 0 1-1.414 0M16.242 7.757a1 1 0 0 1 0-1.414l1.415-1.414a1 1 0 1 1 1.414 1.414l-1.414 1.414a1 1 0 0 1-1.415 0"
      clipRule="evenodd"
    />
  </svg>
);

const SvgLightModeIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgLightModeIcon;
