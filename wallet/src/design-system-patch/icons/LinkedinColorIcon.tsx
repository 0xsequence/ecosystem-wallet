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
    <path fill="currentColor" d="M4.5 4.5h16.25v15H4.5z" />
    <path
      fill="currentColor"
      d="M19.619 2H4.381A2.38 2.38 0 0 0 2 4.381v15.238A2.38 2.38 0 0 0 4.381 22h15.238A2.38 2.38 0 0 0 22 19.619V4.381A2.38 2.38 0 0 0 19.619 2M8.19 9.619v9.048H5.333V9.619zM5.333 6.986c0-.667.572-1.176 1.429-1.176s1.395.51 1.428 1.176c0 .666-.533 1.204-1.428 1.204-.857 0-1.429-.538-1.429-1.204m13.334 11.68h-2.858v-4.761c0-.953-.476-1.905-1.666-1.924h-.038c-1.153 0-1.629.98-1.629 1.924v4.762H9.62V9.619h2.857v1.22s.92-1.22 2.767-1.22c1.89 0 3.424 1.3 3.424 3.933z"
    />
  </svg>
);

const SvgLinkedinColorIcon = ({
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

export default SvgLinkedinColorIcon;
