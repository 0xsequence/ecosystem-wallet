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
      d="M11.929 4a1 1 0 0 1 1-1h7.07a1 1 0 0 1 1 1v7.071a1 1 0 0 1-2 0V6.414L8.708 16.707l-.006.006L6.414 19h4.657a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1v-7.071a1 1 0 0 1 2 0v4.657L15.293 7.293l.006-.006L17.586 5h-4.657a1 1 0 0 1-1-1"
      clipRule="evenodd"
    />
  </svg>
);

const SvgExpandIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgExpandIcon;
