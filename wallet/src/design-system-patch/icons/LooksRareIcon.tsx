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
      stroke="currentColor"
      strokeWidth={2}
      d="M9.516 10.494a8 8 0 0 1-.253-.286q.128-.152.253-.287a2.5 2.5 0 0 0 0 .573Zm4.984-.287q0-.145-.016-.286.126.135.253.287-.128.15-.253.286.015-.141.016-.287Z"
    />
  </svg>
);

const SvgLooksRareIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgLooksRareIcon;
