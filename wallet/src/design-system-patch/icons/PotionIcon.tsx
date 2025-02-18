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
      d="M7 3a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M9 2h6v4.582A8.002 8.002 0 0 1 12 22 8 8 0 0 1 9 6.582zm2 2v4.036l-.715.212a6 6 0 1 0 3.43 0L13 8.036V4z"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M14.999 17.72c1.429.148 2.855-.317 4.224-1.765.37-.39.37-1.024 0-1.414a.91.91 0 0 0-1.337 0c-.994 1.052-1.872 1.274-2.703 1.188-.922-.095-1.873-.576-2.99-1.183l-.21-.114c-.996-.543-2.146-1.17-3.317-1.367-1.364-.229-2.733.12-4.014 1.476-.37.39-.37 1.024 0 1.414a.91.91 0 0 0 1.337 0c.845-.895 1.604-1.045 2.381-.915.86.145 1.757.632 2.852 1.227l.106.058c1.068.58 2.333 1.256 3.67 1.395"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      d="M12 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0M16 12.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"
    />
  </svg>
);

const SvgPotionIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgPotionIcon;
