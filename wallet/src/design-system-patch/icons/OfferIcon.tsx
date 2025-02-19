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
      d="M5.005 15.333 4.973 10c0-3.314 3.684-6 6.995-6s6.996 2.686 6.996 6l.031 5.333 1.4 1.867c1.49 1.99.053 4.8-2.403 4.8H6.008c-2.456 0-3.893-2.81-2.402-4.8zM6.972 10l.031 5.977a.07.07 0 0 1-.014.042L5.205 18.4c-.494.66-.02 1.6.803 1.6h11.984c.824 0 1.298-.94.804-1.6l-1.785-2.381a.07.07 0 0 1-.014-.042L16.965 10c0-2.21-2.789-4-4.997-4s-4.996 1.79-4.996 4"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      d="M10.969 3a1 1 0 1 1 1.999 0v1a1 1 0 1 1-1.999 0zM14.998 21H8.003v1h6.995zM11.866 19a.8.8 0 0 0 .565-.225.7.7 0 0 0 .243-.525v-.321q1.155-.194 1.986-.836.832-.643.832-1.907 0-.9-.555-1.65-.554-.75-2.217-1.307-1.386-.429-1.917-.75-.531-.322-.531-.879t.427-.879 1.236-.321q.462 0 .808.15t.578.407.52.354.542-.011a.77.77 0 0 0 .474-.44.56.56 0 0 0-.058-.567 3.4 3.4 0 0 0-.912-.836 2.5 2.5 0 0 0-1.167-.386V7.75q0-.3-.242-.525A.8.8 0 0 0 11.912 7a.8.8 0 0 0-.566.225.7.7 0 0 0-.243.525v.321q-1.155.237-1.801.943-.647.707-.647 1.586 0 1.006.635 1.629.636.621 1.998 1.071 1.455.493 2.021.879.566.385.566 1.007 0 .707-.543 1.039t-1.305.332q-.6 0-1.085-.268a2.2 2.2 0 0 1-.809-.803.93.93 0 0 0-.485-.407.87.87 0 0 0-.6 0 .79.79 0 0 0-.474.407q-.15.3-.011.578.369.729.993 1.19t1.501.632v.364q0 .3.243.525.242.225.566.225"
    />
  </svg>
);

const SvgOfferIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgOfferIcon;
