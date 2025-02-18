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
      d="M7.95 5.988A1 1 0 0 1 8.963 5l9.777.122a1 1 0 0 1 .988.987l.121 9.778a1 1 0 1 1-2 .025l-.092-7.406-11.05 11.05a1 1 0 1 1-1.414-1.413l11.05-11.05L8.938 7a1 1 0 0 1-.988-1.012"
      clipRule="evenodd"
    />
  </svg>
);

const SvgExternalLinkIcon = ({
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

export default SvgExternalLinkIcon;
