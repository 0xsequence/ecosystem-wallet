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
      d="M7 3.967c-1.657 0-3 1.321-3 2.951v7.869c0 1.63 1.343 2.95 3 2.95h2.75c.315 0 .611.147.8.394L12 20.033l1.45-1.902c.189-.247.485-.393.8-.393H17c1.657 0 3-1.322 3-2.951V6.918c0-1.63-1.343-2.95-3-2.95zM2 6.918C2 4.202 4.239 2 7 2h10c2.761 0 5 2.202 5 4.918v7.869c0 2.716-2.239 4.918-5 4.918h-2.25l-1.15 1.508a2.02 2.02 0 0 1-3.2 0l-1.15-1.508H7c-2.761 0-5-2.202-5-4.918z"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      d="M14.58 11.3a3.24 3.24 0 0 0 .71-2 3.29 3.29 0 1 0-6.58 0 3.24 3.24 0 0 0 .71 2 5 5 0 0 0-2 2.31 1 1 0 1 0 1.84.78A3 3 0 0 1 12 12.57a3 3 0 0 1 2.75 1.82 1 1 0 1 0 1.84-.78 5 5 0 0 0-2.01-2.31M12 10.57a1.29 1.29 0 1 1 0-2.58 1.29 1.29 0 0 1 0 2.58"
    />
  </svg>
);

const SvgContactBubbleIcon = ({
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

export default SvgContactBubbleIcon;
