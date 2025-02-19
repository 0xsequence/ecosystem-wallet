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
      d="M12 22a9.7 9.7 0 0 1-3.9-.788 10.1 10.1 0 0 1-3.175-2.137q-1.35-1.35-2.137-3.175A9.7 9.7 0 0 1 2 12q0-2.075.788-3.9a10.1 10.1 0 0 1 2.137-3.175q1.35-1.35 3.175-2.137A9.7 9.7 0 0 1 12 2q2.075 0 3.9.788a10.1 10.1 0 0 1 3.175 2.137q1.35 1.35 2.137 3.175A9.7 9.7 0 0 1 22 12v1.45q0 1.474-1.012 2.513Q19.975 17 18.5 17a3.74 3.74 0 0 1-1.65-.375 3.5 3.5 0 0 1-1.3-1.075 4.8 4.8 0 0 1-1.638 1.087A5.1 5.1 0 0 1 12 17q-2.075 0-3.537-1.463Q7 14.075 7 12q0-2.075 1.463-3.537Q9.926 7 12 7q2.075 0 3.537 1.463Q17 9.926 17 12v1.45q0 .65.425 1.1T18.5 15t1.075-.45.425-1.1V12q0-3.35-2.325-5.675T12 4 6.325 6.325 4 12t2.325 5.675T12 20h4a1 1 0 1 1 0 2zm0-7q1.25 0 2.125-.875A2.9 2.9 0 0 0 15 12q0-1.25-.875-2.125A2.9 2.9 0 0 0 12 9q-1.25 0-2.125.875A2.9 2.9 0 0 0 9 12q0 1.25.875 2.125A2.9 2.9 0 0 0 12 15"
    />
  </svg>
);

const SvgSocialLoginIcon = ({
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

export default SvgSocialLoginIcon;
