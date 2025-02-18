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
      d="M11.888 14.852a1 1 0 0 0-.257-1.143L10.33 12.56l.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H16a1 1 0 0 0 0-2h-6V3a1 1 0 0 0-2 0v1l-5.059.008A.995.995 0 0 0 2.944 6l9.226-.009C11.5 7.92 10.44 9.75 9 11.35A15.6 15.6 0 0 1 6.958 8.5a.96.96 0 0 0-.836-.5c-.672 0-1.118.693-.792 1.281a17.8 17.8 0 0 0 2.34 3.279l-4.373 4.313a1 1 0 1 0 1.41 1.42L9 14l1.253 1.219a1 1 0 0 0 1.617-.324zM17.743 10.649a1 1 0 0 0-.936-.649h-.614a1 1 0 0 0-.936.649l-3.783 10.087a.936.936 0 1 0 1.753.656l.65-1.742a1 1 0 0 1 .937-.65h3.364a1 1 0 0 1 .936.648l.657 1.745a.937.937 0 0 0 1.754-.659zM15.313 17a.3.3 0 0 1-.281-.405l1.187-3.174a.3.3 0 0 1 .562 0l1.187 3.174a.3.3 0 0 1-.28.405z"
    />
  </svg>
);

const SvgCurrencyIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgCurrencyIcon;
