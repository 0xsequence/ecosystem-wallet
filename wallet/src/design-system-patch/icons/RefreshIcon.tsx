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
      d="M3.137 8.437a9.51 9.51 0 0 1 8.82-5.937A9.51 9.51 0 0 1 20 6.928V4.562a1 1 0 1 1 2 0v4.25a1 1 0 0 1-1 1h-4.256a1 1 0 1 1 0-2h1.445A7.5 7.5 0 0 0 11.956 4.5 7.51 7.51 0 0 0 4.99 9.188a1 1 0 0 1-1.853-.751m17.175 5.824a1 1 0 0 1 .551 1.302 9.515 9.515 0 0 1-8.82 5.937A9.51 9.51 0 0 1 4 17.072v2.366a1 1 0 1 1-2 0v-4.25a1 1 0 0 1 1-1h4.256a1 1 0 1 1 0 2H5.81a7.5 7.5 0 0 0 6.233 3.312 7.515 7.515 0 0 0 6.966-4.688 1 1 0 0 1 1.302-.551"
      clipRule="evenodd"
    />
  </svg>
);

const SvgRefreshIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgRefreshIcon;
