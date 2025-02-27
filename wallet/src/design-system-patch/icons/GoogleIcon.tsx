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
      d="M11.756 10.182v3.873h5.25a4.62 4.62 0 0 1-1.96 3.009l3.166 2.518c1.845-1.745 2.91-4.31 2.91-7.355q-.002-1.063-.178-2.045z"
    />
    <path
      fill="currentColor"
      d="m6.288 13.903-.714.56-2.527 2.019C4.652 19.745 7.942 22 11.756 22c2.634 0 4.842-.891 6.456-2.418l-3.166-2.518c-.869.6-1.978.963-3.29.963-2.537 0-4.692-1.754-5.464-4.118z"
    />
    <path
      fill="currentColor"
      d="M3.046 7.518A10.1 10.1 0 0 0 2 12c0 1.618.381 3.136 1.046 4.482 0 .009 3.247-2.582 3.247-2.582a6.1 6.1 0 0 1-.31-1.9c0-.664.115-1.3.31-1.9z"
    />
    <path
      fill="currentColor"
      d="M11.756 5.982c1.437 0 2.714.509 3.734 1.49l2.794-2.863C16.59 2.991 14.39 2 11.756 2c-3.814 0-7.104 2.245-8.71 5.518L6.294 10.1c.771-2.364 2.926-4.118 5.463-4.118"
    />
  </svg>
);

const SvgGoogleIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgGoogleIcon;
