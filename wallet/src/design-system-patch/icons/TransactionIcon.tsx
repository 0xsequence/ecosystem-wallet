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
      d="M19 22H5a3 3 0 0 1-3-3V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v12h4v4a3 3 0 0 1-3 3m-1-5v2a1 1 0 0 0 2 0v-2zm-2 3V4H4v15a1 1 0 0 0 1 1z"
    />
    <path
      fill="currentColor"
      d="M13 7H7a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2M13 11H7a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2M10 15H7a1 1 0 1 0 0 2h3a1 1 0 1 0 0-2"
    />
  </svg>
);

const SvgTransactionIcon = ({
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

export default SvgTransactionIcon;
