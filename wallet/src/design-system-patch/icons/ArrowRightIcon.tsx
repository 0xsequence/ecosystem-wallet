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
      d="M13.474 4.284a1 1 0 0 1 1.414.018l6.828 7a1 1 0 0 1 0 1.396l-6.828 7a1 1 0 1 1-1.431-1.396L18.627 13H3a1 1 0 1 1 0-2h15.628l-5.171-5.302a1 1 0 0 1 .017-1.414"
      clipRule="evenodd"
    />
  </svg>
);

const SvgArrowRightIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgArrowRightIcon;
