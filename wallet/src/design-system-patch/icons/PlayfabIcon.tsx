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
      d="m3 7 9-5 9 5v10l-9 5-2.602-1.445v.016L7.43 19.483v-4.898L3 12.068zm1.969 1.103L12 4.196l7.031 3.907v7.794L12 19.803l-2.602-1.445v-2.684l2.72 1.496 4.69-2.619V9.313l-4.69-2.62-4.688 2.62v3.022l-2.461-1.423zm4.43 2.31 2.72-1.52 2.72 1.52v3.038l-2.72 1.52-2.72-1.52z"
      clipRule="evenodd"
    />
  </svg>
);

const SvgPlayfabIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgPlayfabIcon;
