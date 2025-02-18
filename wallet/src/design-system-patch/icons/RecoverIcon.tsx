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
      d="M5.68 7.094A7.97 7.97 0 0 0 4 12c0 1.849.627 3.551 1.68 4.906l2.149-2.149A5 5 0 0 1 7 12a5 5 0 0 1 .829-2.757zM7.094 5.68 9.243 7.83A5 5 0 0 1 12 7a5 5 0 0 1 2.757.829l2.149-2.149A7.97 7.97 0 0 0 12 4a7.97 7.97 0 0 0-4.906 1.68M18.32 7.094l-2.148 2.149A5 5 0 0 1 17 12a5 5 0 0 1-.828 2.757l2.148 2.149A7.97 7.97 0 0 0 20 12a7.97 7.97 0 0 0-1.68-4.906M16.906 18.32l-2.149-2.148A5 5 0 0 1 12 17a5 5 0 0 1-2.757-.828L7.094 18.32A7.97 7.97 0 0 0 12 20a7.97 7.97 0 0 0 4.906-1.68M9.879 9.879A3 3 0 0 0 9 12c0 .829.335 1.577.879 2.121A2.99 2.99 0 0 0 12 15c.829 0 1.577-.335 2.121-.879A2.99 2.99 0 0 0 15 12c0-.829-.335-1.577-.879-2.121A2.99 2.99 0 0 0 12 9c-.829 0-1.577.335-2.121.879M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12"
      clipRule="evenodd"
    />
  </svg>
);

const SvgRecoverIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgRecoverIcon;
