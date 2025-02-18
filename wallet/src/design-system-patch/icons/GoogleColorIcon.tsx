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
      d="M11.773 10.182v3.873h5.251a4.62 4.62 0 0 1-1.96 3.009l3.166 2.518c1.845-1.745 2.91-4.31 2.91-7.355 0-.709-.063-1.39-.178-2.045z"
    />
    <path
      fill="currentColor"
      d="m6.306 13.903-.714.56-2.528 2.019C4.67 19.746 7.96 22 11.774 22c2.633 0 4.842-.89 6.456-2.418l-3.166-2.518c-.87.6-1.978.963-3.29.963-2.537 0-4.692-1.754-5.464-4.118z"
    />
    <path
      fill="currentColor"
      d="M3.064 7.518A10.1 10.1 0 0 0 2.018 12c0 1.618.38 3.136 1.046 4.482 0 .009 3.246-2.582 3.246-2.582A6.1 6.1 0 0 1 6 12c0-.664.115-1.3.31-1.9z"
    />
    <path
      fill="currentColor"
      d="M11.774 5.982c1.436 0 2.714.509 3.734 1.49L18.3 4.61C16.607 2.991 14.408 2 11.774 2 7.96 2 4.669 4.245 3.064 7.518L6.31 10.1c.772-2.364 2.927-4.118 5.464-4.118"
    />
  </svg>
);

const SvgGoogleColorIcon = ({
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

export default SvgGoogleColorIcon;
