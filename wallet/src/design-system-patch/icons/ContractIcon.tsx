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
      d="M4 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12.172a2 2 0 0 0 1.414-.586l3.828-3.828A2 2 0 0 0 22 16.172V4a2 2 0 0 0-2-2zm1 2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h11v-4h4V5a1 1 0 0 0-1-1z"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      d="M10 7.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0M16 9.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M8 8.75a.75.75 0 0 1 .75.75v5.46l4.33-1.444a.25.25 0 0 0 .17-.237v-3.091a.75.75 0 0 1 1.5 0v3.091a1.75 1.75 0 0 1-1.197 1.66L8.75 16.541V20a.75.75 0 0 1-1.5 0V9.5A.75.75 0 0 1 8 8.75"
      clipRule="evenodd"
    />
  </svg>
);

const SvgContractIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgContractIcon;
