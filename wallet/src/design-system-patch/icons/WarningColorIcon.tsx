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
      d="M21.025 21c.75 0 1.218-.834.843-1.5L12.843 3.498a.962.962 0 0 0-1.686 0l-9.024 16c-.376.667.092 1.501.842 1.501z"
    />
    <path
      fill="currentColor"
      d="M13 18a1 1 0 1 1-2 0 1 1 0 0 1 2 0M11 9.5a1 1 0 1 1 2 0V15a1 1 0 1 1-2 0z"
    />
  </svg>
);

const SvgWarningColorIcon = ({
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

export default SvgWarningColorIcon;
