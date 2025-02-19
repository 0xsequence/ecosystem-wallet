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
      d="M2.034 20.661q-.14.584.291 1.014.43.43 1.014.291l5.304-1.11L21.361 8.136Q22 7.498 22 6.554t-.639-1.583L19.03 2.64Q18.389 2 17.446 2q-.944 0-1.583.639L3.145 15.357zM7.65 19.02l-3.377.707.707-3.377L17.277 4.053a.3.3 0 0 1 .05-.039c.002 0 .035-.014.119-.014s.116.013.12.014l.011.007a.3.3 0 0 1 .037.032l2.333 2.333a.3.3 0 0 1 .039.049.3.3 0 0 1 .014.12c0 .083-.013.116-.014.118l-.007.012a.3.3 0 0 1-.032.038z"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M13.47 6.47a.75.75 0 0 1 1.06 0l3 3a.75.75 0 1 1-1.06 1.06l-3-3a.75.75 0 0 1 0-1.06"
      clipRule="evenodd"
    />
  </svg>
);

const SvgEditIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgEditIcon;
