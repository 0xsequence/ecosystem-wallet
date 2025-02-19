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
      d="M9.283 3.918c.91-2.557 4.525-2.557 5.434 0a.785.785 0 0 0 1.077.446c2.45-1.165 5.007 1.391 3.842 3.842-.2.42.008.921.447 1.077 2.556.91 2.556 4.525 0 5.434a.785.785 0 0 0-.447 1.077c1.165 2.45-1.391 5.007-3.842 3.842a.785.785 0 0 0-1.077.447c-.91 2.556-4.525 2.556-5.434 0a.785.785 0 0 0-1.077-.447c-2.45 1.165-5.007-1.391-3.842-3.842a.785.785 0 0 0-.446-1.077c-2.557-.91-2.557-4.525 0-5.434a.785.785 0 0 0 .446-1.077C3.199 5.756 5.755 3.2 8.206 4.364c.42.2.921-.008 1.077-.446m3.457.703c-.248-.696-1.232-.696-1.48 0a2.884 2.884 0 0 1-3.955 1.638c-.667-.317-1.363.379-1.046 1.046A2.884 2.884 0 0 1 4.62 11.26c-.696.248-.696 1.232 0 1.48a2.884 2.884 0 0 1 1.638 3.955c-.317.667.379 1.363 1.046 1.046a2.884 2.884 0 0 1 3.955 1.638c.248.697 1.232.697 1.48 0a2.884 2.884 0 0 1 3.955-1.638c.667.317 1.363-.379 1.046-1.046a2.884 2.884 0 0 1 1.638-3.955c.697-.248.697-1.232 0-1.48a2.884 2.884 0 0 1-1.638-3.955c.317-.667-.379-1.363-1.046-1.046A2.884 2.884 0 0 1 12.74 4.62"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M8 12a4 4 0 1 1 8 0 4 4 0 0 1-8 0m4-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4"
      clipRule="evenodd"
    />
  </svg>
);

const SvgSettingsIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgSettingsIcon;
