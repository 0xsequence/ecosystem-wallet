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
      d="M17.862 13.354c-.168.8-.912 2.855-3.289 3.967l-.954-1.064-1.61 1.604a6 6 0 0 1-2.632-.65 5.94 5.94 0 0 1-2.068-1.739q.257.08.526.098c.263.005.55-.09.55-.53v-4.327a.702.702 0 0 0-.272-.581.7.7 0 0 0-.302-.141.75.75 0 0 0-.333.007c-.746.171-1.34 2.014-1.34 2.014a5.8 5.8 0 0 1 .523-2.469A5.9 5.9 0 0 1 8.185 7.52a6 6 0 0 1 3.02-1.38c-.813.46-1.27 1.208-1.27 1.837 0 1.012.616.89.797.742v5.842a1 1 0 0 0 .12.206.88.88 0 0 0 .71.357c.617 0 1.415-.696 1.415-.696v-4.73c0-.48-.366-1.061-.732-1.26 0 0 .678-.12 1.201.278a4 4 0 0 1 .313-.342c1.221-1.188 2.373-1.527 3.33-1.696 0 0-1.743 1.357-1.743 3.178 0 1.354.035 4.657.035 4.657.646.619 1.608-.275 2.477-1.158z"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M22 12c0 5.522-4.477 10-10 10S2 17.522 2 12 6.478 2 12 2s10 4.477 10 10m-10 9.31A9.31 9.31 0 0 0 21.31 12 9.31 9.31 0 0 0 12 2.69 9.31 9.31 0 0 0 2.69 12 9.31 9.31 0 0 0 12 21.31"
      clipRule="evenodd"
    />
  </svg>
);

const SvgUnrealIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgUnrealIcon;
