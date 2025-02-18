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
      d="M4.293 7.814a1 1 0 0 1 1.414 0L12 14.107l6.293-6.293a1 1 0 1 1 1.414 1.414l-6.93 6.93a1.1 1.1 0 0 1-1.555 0l-6.93-6.93a1 1 0 0 1 0-1.414"
      clipRule="evenodd"
    />
  </svg>
);

const SvgChevronDownIcon = ({
  className,
  size = "sm",
  ...props
}: IconProps) => (
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

export default SvgChevronDownIcon;
