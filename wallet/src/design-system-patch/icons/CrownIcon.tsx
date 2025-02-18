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
      d="M21.424 3.094a1 1 0 0 0-1.065.138L16.144 7.58l-3.363-4.2a1.036 1.036 0 0 0-1.562 0l-3.363 4.2L3.64 3.232A1 1 0 0 0 2 4v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V4a1 1 0 0 0-.576-.906M20 18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-1h16zm0-3H4V6.135l3.36 3.633a1 1 0 0 0 1.421-.143L12 5.6l3.219 4.024a1 1 0 0 0 1.422.143L20 6.135z"
    />
  </svg>
);

const SvgCrownIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgCrownIcon;
