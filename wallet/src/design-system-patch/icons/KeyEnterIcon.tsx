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
      d="M21 2a1 1 0 0 0-1 1v7.813a3 3 0 0 1-3 3H5.414l4.48-4.48A1 1 0 0 0 8.48 7.917l-6.187 6.187a1 1 0 0 0 0 1.415l6.187 6.187a1 1 0 0 0 1.415-1.414l-4.48-4.48H17a5 5 0 0 0 5-5V3a1 1 0 0 0-1-1"
      clipRule="evenodd"
    />
  </svg>
);

const SvgKeyEnterIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgKeyEnterIcon;
