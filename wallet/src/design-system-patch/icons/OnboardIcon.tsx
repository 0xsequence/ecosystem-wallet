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
      d="M12 2c-2.633 0-5.17.984-7.05 2.753S2 8.939 2 11.47a1 1 0 0 0 .318.73l6.746 6.294A2 2 0 0 1 11 17h2a2 2 0 0 1 1.996 1.869q.115-.066.213-.163l6.5-6.53a1 1 0 0 0 .291-.705c0-2.532-1.07-4.947-2.95-6.718C17.17 2.984 14.632 2 12 2M5.925 9.93c-.998 0-1.664.559-1.863 1.164l5.791 5.402-1.787-4.668A1 1 0 0 1 8 11.471c0-.338-.175-.707-.563-1.021a2.44 2.44 0 0 0-1.512-.52m2.771-1.034q.138.111.266.236C9.707 8.376 10.81 7.93 12 7.93s2.292.446 3.036 1.2q.128-.123.264-.234a4.44 4.44 0 0 1 3.816-.837 7.5 7.5 0 0 0-1.437-1.85C16.182 4.801 14.14 4 12 4c-2.14 0-4.182.8-5.679 2.21a7.5 7.5 0 0 0-1.437 1.848 4.3 4.3 0 0 1 1.041-.128c1.033 0 2.024.361 2.771.966M12 9.93c-1.233 0-1.9.706-1.99 1.383L12 16.51l1.99-5.196c-.09-.677-.757-1.383-1.99-1.383m3.934 1.898a1 1 0 0 0 .066-.357c0-.34.175-.71.56-1.022s.932-.52 1.515-.52c1.003 0 1.676.573 1.869 1.185L14 16.5z"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M8 19a3 3 0 0 1 3-3h2a3 3 0 1 1 0 6h-2a3 3 0 0 1-3-3m3-1a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2z"
      clipRule="evenodd"
    />
  </svg>
);

const SvgOnboardIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgOnboardIcon;
