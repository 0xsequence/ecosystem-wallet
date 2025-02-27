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
    <g fill="currentColor" clipPath="url(#a)">
      <path
        fillRule="evenodd"
        d="M3 5.571 6.75 2H21v10l-6.75 6.429h-3L7.5 22v-3.571H3zm16.5 5.715-3 2.857h-3L10.5 17v-2.857h-3V3.429h12z"
        clipRule="evenodd"
      />
      <path d="M12 6.286h1.5v4.286H12zm5.25 0v4.286h-1.5V6.286z" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="currentColor" d="M3 2h18v20H3z" />
      </clipPath>
    </defs>
  </svg>
);

const SvgTwitchIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgTwitchIcon;
