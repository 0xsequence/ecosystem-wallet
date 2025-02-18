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
      d="M5 8.586a1 1 0 0 0 .293.707l-1.414 1.414A3 3 0 0 1 3 8.586v-4.42c0-1.585 1.69-2.598 3.088-1.852l14.688 7.833c1.482.79 1.482 2.915 0 3.706L6.088 21.686C4.69 22.432 3 21.42 3 19.833v-4.419a3 3 0 0 1 .879-2.121L5.172 12l-1.293-1.293 1.414-1.414 2 2a1 1 0 0 1 0 1.414l-2 2a1 1 0 0 0-.293.707v4.42a.1.1 0 0 0 .147.088l14.688-7.834a.1.1 0 0 0 0-.176L5.147 4.078A.1.1 0 0 0 5 4.167z"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      d="M6 12a1 1 0 0 1 1-1h4.5a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1"
    />
  </svg>
);

const SvgSendIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgSendIcon;
