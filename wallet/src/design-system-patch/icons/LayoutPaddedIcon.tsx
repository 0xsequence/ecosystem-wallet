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
      stroke="currentColor"
      strokeWidth={2}
      d="M20 3a1 1 0 0 1 1 1v1a2 2 0 0 0-2-2zM4 3h1a2 2 0 0 0-2 2V4a1 1 0 0 1 1-1ZM3 20v-1a2 2 0 0 0 2 2H4a1 1 0 0 1-1-1Zm17 1h-1a2 2 0 0 0 2-2v1a1 1 0 0 1-1 1ZM7 7h10v4H7z"
    />
  </svg>
);

const SvgLayoutPaddedIcon = ({
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

export default SvgLayoutPaddedIcon;
