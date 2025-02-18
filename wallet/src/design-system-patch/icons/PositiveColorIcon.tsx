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
      d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M17.6 7.575a1 1 0 0 1 .2 1.4l-5.308 7.078a2 2 0 0 1-3.014.214l-3.185-3.185a1 1 0 1 1 1.414-1.414l3.185 3.185L16.2 7.775a1 1 0 0 1 1.4-.2"
      clipRule="evenodd"
    />
  </svg>
);

const SvgPositiveColorIcon = ({
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

export default SvgPositiveColorIcon;
