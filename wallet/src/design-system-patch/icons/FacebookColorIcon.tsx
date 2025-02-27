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
      d="M13.21 21.93C18.16 21.33 22 17.115 22 12c0-5.525-4.475-10-10-10S2 6.475 2 12c0 4.69 3.23 8.625 7.585 9.705l.195-.815h3.055l.38 1.04z"
    />
    <path
      fill="currentColor"
      d="M9.585 21.705v-6.65H7.52V12h2.065v-1.315c0-3.405 1.54-4.98 4.88-4.98.63 0 1.725.125 2.17.25v2.77c-.235-.025-.65-.035-1.155-.035-1.64 0-2.27.62-2.27 2.235v1.08h3.27l-.56 3.055h-2.705v6.87a10.2 10.2 0 0 1-3.63-.22z"
    />
  </svg>
);

const SvgFacebookColorIcon = ({
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

export default SvgFacebookColorIcon;
