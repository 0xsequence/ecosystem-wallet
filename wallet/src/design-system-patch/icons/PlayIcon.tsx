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
      d="M6.05 4.958v14.084L17.95 12zm-2.05 0c0-1.533 1.766-2.47 3.132-1.66l11.899 7.04a1.908 1.908 0 0 1 0 3.323L7.132 20.703C5.766 21.51 4 20.575 4 19.04z"
      clipRule="evenodd"
    />
  </svg>
);

const SvgPlayIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgPlayIcon;
