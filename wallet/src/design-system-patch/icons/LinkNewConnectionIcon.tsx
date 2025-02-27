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
      d="M5.5 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m0 2a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M18 14a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M22 18a1 1 0 0 1-1 1h-6a1 1 0 1 1 0-2h6a1 1 0 0 1 1 1M17 8.622c0-1.01-1.328-1.384-1.854-.52l-5.085 8.338C8.483 19.028 4.5 17.91 4.5 14.878V8.412a1 1 0 0 1 2 0v6.466c0 1.01 1.328 1.384 1.854.521l5.085-8.34C15.017 4.473 19 5.59 19 8.623v2.76a1 1 0 1 1-2 0z"
      clipRule="evenodd"
    />
  </svg>
);

const SvgLinkNewConnectionIcon = ({
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

export default SvgLinkNewConnectionIcon;
