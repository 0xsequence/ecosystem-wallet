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
      d="M5 3C3.343 3 2 4.344 2 6.003v11.744A3.25 3.25 0 0 0 5.25 21h13.5A3.25 3.25 0 0 0 22 17.747V8.004a1 1 0 0 0-1-1h-2V4A1 1 0 0 0 18 3zm0 2.002h12v2.001H5a1 1 0 0 1 0-2.001m0 4.003h15v8.742a1.25 1.25 0 0 1-1.25 1.251H5.25c-.69 0-1.25-.56-1.25-1.25l.006-8.919s.358.18.994.176"
    />
    <path fill="currentColor" d="M16 14a1 1 0 1 1 2 0 1 1 0 0 1-2 0" />
  </svg>
);

const SvgWalletIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgWalletIcon;
