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
      d="M4.495 10.28c-1.958.452-3.285-1.942-1.864-3.363l4.33-4.33c1.464-1.464 3.915-.01 3.333 1.978l-.165.561-1.92-.562.166-.562-4.33 4.33.548-.127a2 2 0 0 1 2.05.749l3.44 4.588c.393.524.48 1.17.345 1.734a6.5 6.5 0 0 0-.027 2.893l7.71-7.71a6.5 6.5 0 0 0-2.893.027 2.08 2.08 0 0 1-1.735-.344L8.93 6.726a2 2 0 0 1-.72-2.162l1.92.562 4.554 3.415.01.003a.2.2 0 0 0 .061-.003 8.5 8.5 0 0 1 4.119.045c.728.19 1.193.757 1.323 1.391a1.95 1.95 0 0 1-.543 1.768l-8.966 8.966a1.002 1.002 0 0 1-1.61-.276 8.5 8.5 0 0 1-.595-5.622.2.2 0 0 0 .004-.061l-.003-.01-3.44-4.588zm6.387 9.293"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M14.208 14.656a1 1 0 0 1 1.415 0l5.647 5.647a1 1 0 0 1-1.415 1.414l-5.647-5.647a1 1 0 0 1 0-1.415"
      clipRule="evenodd"
    />
  </svg>
);

const SvgPinIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgPinIcon;
