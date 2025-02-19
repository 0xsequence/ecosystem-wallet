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
      d="M12 3a1 1 0 0 1 .74.327l5 5.5a1 1 0 1 1-1.48 1.346L12 5.487l-4.26 4.686a1 1 0 0 1-1.48-1.346l5-5.5A1 1 0 0 1 12 3M6.327 13.76a1 1 0 0 1 1.413.067L12 18.513l4.26-4.686a1 1 0 0 1 1.48 1.346l-5 5.5a1 1 0 0 1-1.48 0l-5-5.5a1 1 0 0 1 .067-1.413"
      clipRule="evenodd"
    />
  </svg>
);

const SvgChevronUpDownIcon = ({
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

export default SvgChevronUpDownIcon;
