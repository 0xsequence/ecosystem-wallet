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
      d="M17.028 12.627c-.022-2.53 1.905-3.746 1.992-3.806a4.2 4.2 0 0 0-3.37-1.983c-1.434-.159-2.799.917-3.527.917s-1.85-.894-3.04-.87c-1.564.026-3.006.987-3.812 2.508-1.624 3.057-.415 7.591 1.168 10.075.775 1.214 1.696 2.581 2.909 2.53 1.168-.05 1.608-.82 3.018-.82s1.808.82 3.04.795c1.255-.027 2.051-1.24 2.82-2.459.887-1.408 1.253-2.774 1.274-2.845-.027-.011-2.447-1.018-2.472-4.042M14.71 5.194c.643-.845 1.077-2.022.958-3.194-.927.041-2.049.671-2.713 1.517-.595.747-1.118 1.944-.976 3.093 1.03.087 2.087-.572 2.73-1.416"
    />
  </svg>
);

const SvgAppleIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgAppleIcon;
