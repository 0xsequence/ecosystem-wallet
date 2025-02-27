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
      d="M21.635 4.235c.426.362.488 1.014.138 1.455L10.999 19.245a1.958 1.958 0 0 1-3.01.095l-5.722-6.368a1.06 1.06 0 0 1 .053-1.461.977.977 0 0 1 1.413.054l5.72 6.368L20.228 4.378a.98.98 0 0 1 1.408-.143"
      clipRule="evenodd"
    />
  </svg>
);

const SvgCheckmarkIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgCheckmarkIcon;
