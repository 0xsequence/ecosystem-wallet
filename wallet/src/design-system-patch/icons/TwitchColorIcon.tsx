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
      <path d="M6.75 2 3 5.571V18.43h4.5V22l3.75-3.571h3L21 12V2z" />
      <path d="m16.5 14.143 3-2.857V3.429h-12v10.714h3V17l3-2.857z" />
      <path d="M12 6.286h1.5v4.286H12zm5.25 0v4.286h-1.5V6.286z" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="currentColor" d="M3 2h18v20H3z" />
      </clipPath>
    </defs>
  </svg>
);

const SvgTwitchColorIcon = ({
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

export default SvgTwitchColorIcon;
