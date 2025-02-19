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
      d="M9 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4M5 8a4 4 0 1 1 8 0 4 4 0 0 1-8 0"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      d="M17 12h-2a.97.97 0 0 1-.713-.287A.97.97 0 0 1 14 11q0-.424.287-.713A.97.97 0 0 1 15 10h2V8q0-.424.288-.713A.97.97 0 0 1 18 7q.424 0 .712.287Q19 7.576 19 8v2h2q.424 0 .712.287.288.288.288.713 0 .424-.288.713A.97.97 0 0 1 21 12h-2v2q0 .424-.288.713A.97.97 0 0 1 18 15a.97.97 0 0 1-.712-.287A.97.97 0 0 1 17 14z"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M8 15a4 4 0 0 0-4 4h10a4 4 0 0 0-4-4zm-6 4a6 6 0 0 1 6-6h2a6 6 0 0 1 6 6 2 2 0 0 1-2 2H4a2 2 0 0 1-2-2"
      clipRule="evenodd"
    />
  </svg>
);

const SvgContactAddIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgContactAddIcon;
