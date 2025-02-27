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
      d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16m0 2c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10"
      clipRule="evenodd"
    />
    <path fill="currentColor" d="M13 17a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M12 8c-1.204 0-2 .897-2 1.667a1 1 0 1 1-2 0C8 7.604 9.89 6 12 6s4 1.604 4 3.667c0 .424-.052.892-.287 1.307-.446.786-1.185 1.356-1.702 1.755q-.148.113-.267.208c-.583.472-.744.73-.744 1.063a1 1 0 1 1-2 0c0-1.323.852-2.104 1.486-2.618q.219-.176.408-.323c.498-.39.846-.663 1.075-1.063l.01-.047c.011-.055.021-.144.021-.282C14 8.897 13.204 8 12 8"
      clipRule="evenodd"
    />
  </svg>
);

const SvgHelpIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgHelpIcon;
