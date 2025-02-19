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
      d="M4.284 13.474a1 1 0 0 0 .018 1.414l7 6.828a1 1 0 0 0 1.396 0l7-6.828a1 1 0 1 0-1.396-1.431L13 18.627V3a1 1 0 1 0-2 0v15.628l-5.302-5.171a1 1 0 0 0-1.414.017"
      clipRule="evenodd"
    />
  </svg>
);

const SvgArrowDownIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgArrowDownIcon;
