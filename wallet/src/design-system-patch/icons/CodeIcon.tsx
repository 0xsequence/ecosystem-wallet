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
      d="M4 16.5v2h16v-2zm-1-2a1 1 0 0 0-1 1v3a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3a1 1 0 0 0-1-1zM10.957 7.793a1 1 0 0 1 0 1.414l-.793.793.793.793a1 1 0 0 1-1.414 1.414L7.336 10l2.207-2.207a1 1 0 0 1 1.414 0M13.043 7.793a1 1 0 0 0 0 1.414l.793.793-.793.793a1 1 0 0 0 1.414 1.414L16.664 10l-2.207-2.207a1 1 0 0 0-1.414 0"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      d="M21 5.5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2l.031 7.5h2L5 6.5a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v6.531h2z"
    />
  </svg>
);

const SvgCodeIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgCodeIcon;
