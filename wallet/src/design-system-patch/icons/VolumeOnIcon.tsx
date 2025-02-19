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
      d="M12.436 4.1A1 1 0 0 1 13 5v14a1 1 0 0 1-1.62.784L7.24 16.51 3 16.511a1 1 0 0 1-1-1V8.488a1 1 0 0 1 1-1h4.24l4.14-3.272a1 1 0 0 1 1.056-.116M11 7.065 8.208 9.273a1 1 0 0 1-.62.215H4v5.023l3.587-.001a1 1 0 0 1 .621.216L11 16.934zm8.15.168a1 1 0 0 1 1.379.313c1.773 2.816 2.01 6.538.346 9.81a1 1 0 1 1-1.783-.908c1.349-2.65 1.138-5.623-.256-7.836a1 1 0 0 1 .314-1.379m-3.454 1.731a1 1 0 0 1 1.41.11c1.624 1.898 1.853 4.478.317 6.701a1 1 0 0 1-1.646-1.137c1.007-1.457.858-3.037-.191-4.264a1 1 0 0 1 .11-1.41"
      clipRule="evenodd"
    />
  </svg>
);

const SvgVolumeOnIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgVolumeOnIcon;
