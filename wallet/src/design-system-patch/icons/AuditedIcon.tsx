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
      d="M11.419 2.186a1 1 0 0 1 1.162 0l.386.276a9 9 0 0 0 6.226 1.622l.697-.078A1 1 0 0 1 21 5v7.056a9 9 0 0 1-4.975 8.05l-3.578 1.788a1 1 0 0 1-.894 0l-3.578-1.788A9 9 0 0 1 3 12.055V5a1 1 0 0 1 1.11-.994l.697.078a9 9 0 0 0 6.225-1.622zM19 6.11a11 11 0 0 1-7-1.883 11 11 0 0 1-7 1.883v5.947a7 7 0 0 0 3.87 6.26L12 19.883l3.13-1.565A7 7 0 0 0 19 12.056zm-3.293 3.184a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 1 1 1.414-1.414L11 12.586l3.293-3.293a1 1 0 0 1 1.414 0"
      clipRule="evenodd"
    />
  </svg>
);

const SvgAuditedIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgAuditedIcon;
