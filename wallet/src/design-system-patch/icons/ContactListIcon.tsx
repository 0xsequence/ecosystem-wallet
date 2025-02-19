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
      d="M5.5 4a1 1 0 0 0-1 1 1 1 0 0 1-2 0 3 3 0 0 1 3-3H19a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H5.5a3 3 0 0 1-3-3 1 1 0 1 1 2 0 1 1 0 0 0 1 1H19a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1z"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M2 9a1 1 0 0 1 1-1h1a1 1 0 0 1 0 2H3a1 1 0 0 1-1-1M2 15a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1M2 12a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1M9.751 15.25h5.498a2.583 2.583 0 0 0-2.582-2.5h-.334a2.583 2.583 0 0 0-2.582 2.5m-1.501.083a4.083 4.083 0 0 1 4.083-4.083h.334a4.083 4.083 0 0 1 4.083 4.083c0 .783-.634 1.417-1.417 1.417H9.667a1.417 1.417 0 0 1-1.417-1.417"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M12.5 10.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 1.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"
      clipRule="evenodd"
    />
  </svg>
);

const SvgContactListIcon = ({
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

export default SvgContactListIcon;
