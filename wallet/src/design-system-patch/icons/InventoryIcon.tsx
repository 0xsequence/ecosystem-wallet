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
      d="m22.929 6.628-2-5A1 1 0 0 0 20 1H4a1 1 0 0 0-.929.628l-2 5A1 1 0 0 0 1 7v15a1 1 0 0 0 1 1h20a1 1 0 0 0 1-1V7a1 1 0 0 0-.071-.372M4.677 3h14.646l1.2 3H3.477zM3 21V8h18v13z"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M12 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 2a3 3 0 1 0 0-6 3 3 0 0 0 0 6"
      clipRule="evenodd"
    />
    <path fill="currentColor" d="M3 12h7v2H3zM14 12h7v2h-7z" />
  </svg>
);

const SvgInventoryIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgInventoryIcon;
