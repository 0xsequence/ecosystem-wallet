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
      d="M16.186 19.707a1 1 0 0 0 0-1.414L9.893 12l6.293-6.293a1 1 0 0 0-1.414-1.414l-6.93 6.93a1.1 1.1 0 0 0 0 1.555l6.93 6.93a1 1 0 0 0 1.414 0"
      clipRule="evenodd"
    />
  </svg>
);

const SvgChevronLeftIcon = ({
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

export default SvgChevronLeftIcon;
