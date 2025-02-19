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
      d="M18.16 9.86C16.77 8.365 14.763 7 12 7S7.23 8.364 5.84 9.86A12.4 12.4 0 0 0 4.256 12q.02.035.042.07c.337.568.85 1.322 1.544 2.07C7.23 15.635 9.236 17 12 17s4.77-1.364 6.16-2.86A12.4 12.4 0 0 0 19.744 12l-.042-.07c-.337-.568-.85-1.322-1.544-2.07M22 12s-3-7-10-7-10 7-10 7 3 7 10 7 10-7 10-7m-1.836-.793v-.002zm0 1.588v-.002zm-16.329 0 .001-.002zm.001-1.588v-.002q-.001 0 0 0z"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M12 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m0 1.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6"
      clipRule="evenodd"
    />
  </svg>
);

const SvgEyeIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgEyeIcon;
