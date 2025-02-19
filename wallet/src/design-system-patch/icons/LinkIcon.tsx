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
      d="M15.624 8.376a.995.995 0 0 1 0 1.407l-6.258 6.258a.995.995 0 1 1-1.407-1.407l6.258-6.258a.995.995 0 0 1 1.407 0"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      d="M15.051 17.554a.995.995 0 0 0-1.407 0l-.965.966A5.09 5.09 0 0 1 5.48 11.32l.966-.965a.995.995 0 0 0-1.407-1.407l-.965.965a7.08 7.08 0 0 0 10.012 10.012l.965-.965a.995.995 0 0 0 0-1.407M18.389 12.81a.995.995 0 0 0 1.407 1.407l.13-.131A7.08 7.08 0 0 0 9.914 4.074l-.13.13a.995.995 0 1 0 1.406 1.407l.131-.13a5.09 5.09 0 1 1 7.199 7.198z"
    />
  </svg>
);

const SvgLinkIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgLinkIcon;
