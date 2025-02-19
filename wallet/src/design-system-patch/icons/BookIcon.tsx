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
      d="M6.783 4C5.793 4 5 4.797 5 5.77v9.136a3.8 3.8 0 0 1 1.783-.445h.739V4zm2.739 0v10.462H19V4.384A.39.39 0 0 0 18.609 4zM19 16.462H6.783c-.99 0-1.783.796-1.783 1.769S5.794 20 6.783 20h11.826c.22 0 .391-.177.391-.385zM3 18.23V5.769A3.776 3.776 0 0 1 6.783 2h11.826A2.39 2.39 0 0 1 21 4.385v15.23A2.39 2.39 0 0 1 18.609 22H6.783A3.776 3.776 0 0 1 3 18.23m8.054-11.077a1 1 0 0 1 1-1h3.816a1 1 0 1 1 0 2h-3.816a1 1 0 0 1-1-1m0 4.154a1 1 0 0 1 1-1h3.816a1 1 0 1 1 0 2h-3.816a1 1 0 0 1-1-1"
      clipRule="evenodd"
    />
  </svg>
);

const SvgBookIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgBookIcon;
