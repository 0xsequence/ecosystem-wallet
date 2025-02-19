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
      d="m15.04 12 3.587-6.043L20.361 12l-1.734 6.042zm-1.749.982 3.588 6.043-6.248-1.562-4.515-4.48zm3.588-8.007-3.588 6.043H6.116l4.515-4.48zM22 9.944 19.811 2l-8.169 2.129-1.209 2.074-2.454-.017L2 12.001l5.98 5.814 2.452-.018 1.211 2.074L19.811 22 22 14.058 20.757 12z"
    />
  </svg>
);

const SvgUnity = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgUnity;
