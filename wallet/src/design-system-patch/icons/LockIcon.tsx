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
      d="M4 13a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3zm3-1a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1z"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M7 8a5 5 0 0 1 10 0v2.938c0 .586-.476 1.062-1.062 1.062H8.061A1.063 1.063 0 0 1 7 10.938zm5-3a3 3 0 0 0-3 3v2h6V8a3 3 0 0 0-3-3M12.8 16.269A1.499 1.499 0 0 0 12 13.5a1.5 1.5 0 0 0-.8 2.768 1 1 0 0 0-.012.138v1.282a.813.813 0 0 0 1.624 0v-1.282a1 1 0 0 0-.011-.137"
      clipRule="evenodd"
    />
  </svg>
);

const SvgLockIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgLockIcon;
