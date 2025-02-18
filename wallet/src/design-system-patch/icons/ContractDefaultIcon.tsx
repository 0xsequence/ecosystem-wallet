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
      d="M6 7a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1M6 11a1 1 0 0 1 1-1h5a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1"
    />
  </svg>
);

const SvgContractDefaultIcon = ({
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

export default SvgContractDefaultIcon;
