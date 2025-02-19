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
      d="M12 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m0 2a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M12 9c-1.436 0-2.796.91-3.615 2.466a1 1 0 1 1-1.77-.932C7.698 8.48 9.658 7 12 7s4.302 1.48 5.385 3.534a1 1 0 1 1-1.77.932C14.795 9.911 13.436 9 12 9M7.5 18a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m0 2a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M16.5 18a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m0 2a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M7.5 20c-1.62 0-2.976.685-3.715 1.62a1 1 0 1 1-1.57-1.24C3.379 18.909 5.344 18 7.5 18s4.122.909 5.284 2.38a1 1 0 0 1-1.568 1.24C10.476 20.685 9.12 20 7.5 20"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M16.5 20c-1.62 0-2.976.685-3.716 1.62a1 1 0 1 1-1.568-1.24C12.378 18.909 14.343 18 16.5 18s4.122.909 5.285 2.38a1 1 0 0 1-1.57 1.24C19.477 20.685 18.122 20 16.5 20"
      clipRule="evenodd"
    />
  </svg>
);

const SvgCollaboratorsIcon = ({
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

export default SvgCollaboratorsIcon;
