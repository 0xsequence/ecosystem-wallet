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
      d="M22 3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1zm-2 17H4v-2.519l3.926-3.141 2.367 2.367a1 1 0 0 0 1.414 0l4.367-4.367L20 15.481zm0-7.081-3.375-2.7a1 1 0 0 0-1.332.074L11 14.586l-2.293-2.293a1 1 0 0 0-1.332-.074L4 14.919V4h16zM6 8a2 2 0 1 1 4 0 2 2 0 0 1-4 0"
    />
  </svg>
);

const SvgPictureIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgPictureIcon;
