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
      d="M4 4.003C4 2.899 4.893 2 6 2h12c1.107 0 2 .9 2 2.003v15.994A2 2 0 0 1 18 22H6c-1.107 0-2-.9-2-2.003zM6 4V20h12V4.001M18 4v.001zm0 0H6v.001"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M7.594 15.5a1 1 0 0 1 1-1h2.875a1 1 0 0 1 0 2H8.594a1 1 0 0 1-1-1"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M10 13a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1M8 6.77c0-.426.358-.77.8-.77h6.4c.442 0 .8.344.8.77v3.46c0 .426-.358.77-.8.77H8.8c-.442 0-.8-.344-.8-.77zm1.6.768v1.924h4.8V7.538z"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      d="M15 15a1 1 0 1 0 0-2 1 1 0 0 0 0 2M15 18a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
    />
  </svg>
);

const SvgGameboyIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgGameboyIcon;
