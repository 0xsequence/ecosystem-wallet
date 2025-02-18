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
      d="m1.956 16.5.551-7.443A6 6 0 0 1 8.491 3.5h6.974a6 6 0 0 1 5.984 5.557L22 16.5c.196 2.642-2.878 4.222-4.912 2.527L13.456 16H10.5l-3.632 3.027M1.956 16.5c-.196 2.642 2.877 4.222 4.912 2.527zm2.546-7.295-.552 7.443c-.065.88.96 1.407 1.638.842l3.632-3.026A2 2 0 0 1 10.5 14h2.956a2 2 0 0 1 1.28.464l3.632 3.026c.678.566 1.703.039 1.638-.842l-.552-7.443A4 4 0 0 0 15.465 5.5H8.491A4 4 0 0 0 4.5 9.205"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M8.5 12.75a.75.75 0 0 1-.75-.75V8.5a.75.75 0 0 1 1.5 0V12a.75.75 0 0 1-.75.75M15.531 9.281a.75.75 0 0 1-.75-.75V8.5a.75.75 0 0 1 1.5 0v.031a.75.75 0 0 1-.75.75M15.531 12.75a.75.75 0 0 1-.75-.75v-.031a.75.75 0 1 1 1.5 0V12a.75.75 0 0 1-.75.75M13.781 11a.75.75 0 0 1-.75-.75v-.031a.75.75 0 1 1 1.5 0v.031a.75.75 0 0 1-.75.75M17.281 11a.75.75 0 0 1-.75-.75v-.031a.75.75 0 1 1 1.5 0v.031a.75.75 0 0 1-.75.75"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M6 10.25a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1-.75-.75"
      clipRule="evenodd"
    />
  </svg>
);

const SvgControllerIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgControllerIcon;
