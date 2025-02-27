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
      d="M12.45 4.1a1 1 0 0 1 .566.9v14a1 1 0 0 1-1.623.782L7.29 16.51 3 16.511a1 1 0 0 1-1.001-1V8.49a1 1 0 0 1 1-1h4.29l4.103-3.27a1 1 0 0 1 1.057-.12m-1.434 2.976L8.264 9.271a1 1 0 0 1-.623.218H4v5.022h3.64a1 1 0 0 1 .624.217l2.752 2.195zm4.768 1.95a1 1 0 0 1 1.414-.018l1.552 1.513 1.552-1.513a1 1 0 0 1 1.396 1.432l-1.515 1.477 1.515 1.477a1 1 0 1 1-1.396 1.432l-1.552-1.512-1.552 1.512a1 1 0 1 1-1.396-1.432l1.515-1.477-1.515-1.477a1 1 0 0 1-.018-1.414"
      clipRule="evenodd"
    />
  </svg>
);

const SvgVolumeOffIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgVolumeOffIcon;
