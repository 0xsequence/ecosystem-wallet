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
      d="M7 10.5a3 3 0 1 1 5.4 1.8c.972.73 1.6 1.891 1.6 3.2a1 1 0 1 1-2 0 2 2 0 1 0-4 0 1 1 0 1 1-2 0c0-1.309.628-2.47 1.6-3.2a3 3 0 0 1-.6-1.8m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      d="M15 10a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2h-1a1 1 0 0 1-1-1M16 13a1 1 0 1 0 0 2h1a1 1 0 1 0 0-2z"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M2 4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1zm2 1v14h16V5z"
      clipRule="evenodd"
    />
  </svg>
);

const SvgContactProfileIcon = ({
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

export default SvgContactProfileIcon;
