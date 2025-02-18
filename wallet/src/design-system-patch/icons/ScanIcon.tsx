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
      d="M2 4a2 2 0 0 1 2-2h4a1 1 0 0 1 0 2H4v4a1 1 0 0 1-2 0zM22 20a2 2 0 0 1-2 2h-4a1 1 0 1 1 0-2h4v-4a1 1 0 1 1 2 0zM20 2a2 2 0 0 1 2 2v4a1 1 0 1 1-2 0V4h-4a1 1 0 1 1 0-2zM2 20a2 2 0 0 0 2 2h4a1 1 0 1 0 0-2H4v-4a1 1 0 1 0-2 0z"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M6 7a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm1.5.8a.3.3 0 0 1 .3-.3h1.4a.3.3 0 0 1 .3.3v1.4a.3.3 0 0 1-.3.3H7.8a.3.3 0 0 1-.3-.3zM14 6a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1zm.8 1.5a.3.3 0 0 0-.3.3v1.4a.3.3 0 0 0 .3.3h1.4a.3.3 0 0 0 .3-.3V7.8a.3.3 0 0 0-.3-.3zM6 14a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm1.5.831a.3.3 0 0 1 .3-.3h1.4a.3.3 0 0 1 .3.3v1.4a.3.3 0 0 1-.3.3H7.8a.3.3 0 0 1-.3-.3z"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      d="M13 13.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM16.5 16a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM13 16.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM16.5 13a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z"
    />
  </svg>
);

const SvgScanIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgScanIcon;
