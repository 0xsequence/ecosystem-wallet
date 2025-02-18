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
      d="M8 22q-.824 0-1.412-.587A1.93 1.93 0 0 1 6 20q0-.824.588-1.413A1.93 1.93 0 0 1 8 18q.825 0 1.412.587Q10 19.176 10 20q0 .824-.588 1.413A1.93 1.93 0 0 1 8 22m10 0q-.824 0-1.413-.587A1.93 1.93 0 0 1 16 20q0-.824.587-1.413A1.93 1.93 0 0 1 18 18q.824 0 1.413.587Q20 19.176 20 20q0 .824-.587 1.413A1.93 1.93 0 0 1 18 22M7.15 6l2.4 5h7l2.75-5zM6.2 4h14.75q.575 0 .875.513.3.512.025 1.037l-3.55 6.4q-.275.5-.738.775A1.95 1.95 0 0 1 16.55 13H9.1L8 15h11a1 1 0 1 1 0 2H8q-1.125 0-1.7-.988-.575-.987-.05-1.962L7.6 11.6 4 4H3a1 1 0 0 1 0-2h1.464c.48 0 .917.276 1.123.71z"
    />
  </svg>
);

const SvgCartIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgCartIcon;
