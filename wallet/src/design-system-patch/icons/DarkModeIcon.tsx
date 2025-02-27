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
      d="m17.183 18.17-.046-.016a6 6 0 0 1-1.663-.892 6.45 6.45 0 0 1-2.15-2.92 6.77 6.77 0 0 1-.281-3.674 6.57 6.57 0 0 1 1.678-3.24 6.13 6.13 0 0 1 2.894-1.712 6 6 0 0 1 .55-.114c.352-.055.632-.344.632-.7a.64.64 0 0 0-.278-.534 8.6 8.6 0 0 0-1.152-.649 8.3 8.3 0 0 0-4.287-.746c-2.025.189-3.922 1.116-5.36 2.621C6.198 7.2 5.303 9.342 5.211 11.602a9.35 9.35 0 0 0 2.012 6.21c1.387 1.734 3.342 2.864 5.483 3.168a8.3 8.3 0 0 0 5.206-.965q.31-.17.605-.367a.64.64 0 0 0 .28-.535c0-.355-.28-.644-.63-.7a6 6 0 0 1-.984-.243m-2.678.86a8.45 8.45 0 0 1-3.058-3.996 8.77 8.77 0 0 1-.365-4.762 8.57 8.57 0 0 1 2.192-4.225 8.2 8.2 0 0 1 1.249-1.073 6.3 6.3 0 0 0-1.258-.01c-1.531.143-2.983.846-4.096 2.009-1.18 1.245-1.887 2.923-1.96 4.71a7.35 7.35 0 0 0 1.577 4.88c1.077 1.348 2.58 2.207 4.201 2.437a6.3 6.3 0 0 0 1.518.03"
      clipRule="evenodd"
    />
  </svg>
);

const SvgDarkModeIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgDarkModeIcon;
