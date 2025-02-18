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
      d="M21 9c0-1.105-.806-2-1.8-2H4.8C3.806 7 3 7.895 3 9v11c0 1.105.806 2 1.8 2h14.4c.994 0 1.8-.895 1.8-2zm-1.8 1c0-.552-.403-1-.9-1H5.7c-.497 0-.9.448-.9 1v9c0 .552.403 1 .9 1h12.6c.497 0 .9-.448.9-1z"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M9 7h6a3 3 0 1 0-6 0m3-5a5 5 0 0 0-5 5v2h10V7a5 5 0 0 0-5-5"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M8 7a1 1 0 0 1 1 1v2.5a1 1 0 1 1-2 0V8a1 1 0 0 1 1-1M16 7a1 1 0 0 1 1 1v2.5a1 1 0 1 1-2 0V8a1 1 0 0 1 1-1"
      clipRule="evenodd"
    />
  </svg>
);

const SvgShopBagIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgShopBagIcon;
