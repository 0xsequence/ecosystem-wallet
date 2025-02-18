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
      d="M9.547 18.696A9.9 9.9 0 0 0 12 19c7 0 10-7 10-7s-.733-1.71-2.318-3.439l-1.416 1.416c.64.709 1.117 1.415 1.437 1.952l.042.071-.042.07a12.4 12.4 0 0 1-1.544 2.07C16.77 15.635 14.764 17 12 17q-.372 0-.725-.032zm10.618-7.491-.001.002zm0 1.59-.001-.002zM16.792 8.623a8.4 8.4 0 0 0-1.796-1.033A7.7 7.7 0 0 0 12 7C9.236 7 7.23 8.364 5.84 9.86a12.4 12.4 0 0 0-1.543 2.07l-.042.07.042.07c.337.568.85 1.322 1.544 2.07.403.433.857.856 1.367 1.237a8.4 8.4 0 0 0 1.796 1.033L7.5 17.914a10.7 10.7 0 0 1-1.717-1.11C3.179 14.75 2 12 2 12s3-7 10-7c1.743 0 3.238.434 4.5 1.086.63.325 1.202.704 1.717 1.11zm-12.956 4.17v.002z"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M21.707 2.293a1 1 0 0 1 0 1.414l-18 18a1 1 0 0 1-1.414-1.414l18-18a1 1 0 0 1 1.414 0"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M14.708 10.707a3 3 0 0 0-1.415-1.415 3 3 0 1 0-2.587 5.415zM13 12a1 1 0 1 1-2 0 1 1 0 0 1 2 0"
      clipRule="evenodd"
    />
  </svg>
);

const SvgHiddenIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgHiddenIcon;
