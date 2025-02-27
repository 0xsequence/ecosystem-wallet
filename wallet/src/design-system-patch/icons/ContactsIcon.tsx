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
      d="M14.668 6.027a6 6 0 0 0-1.002-1.8 4 4 0 1 1 0 7.544c.431-.531.773-1.139 1.002-1.798Q14.83 10 15 10a2 2 0 1 0-.332-3.973M17.001 15.126A8 8 0 0 0 15.291 13H16a6 6 0 0 1 6 6 2 2 0 0 1-2 2h-2.535c.34-.588.535-1.271.535-2h2A4 4 0 0 0 17 15.126"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M9 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4M5 8a4 4 0 1 1 8 0 4 4 0 0 1-8 0M8 15a4 4 0 0 0-4 4h10a4 4 0 0 0-4-4zm-6 4a6 6 0 0 1 6-6h2a6 6 0 0 1 6 6 2 2 0 0 1-2 2H4a2 2 0 0 1-2-2"
      clipRule="evenodd"
    />
  </svg>
);

const SvgContactsIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgContactsIcon;
