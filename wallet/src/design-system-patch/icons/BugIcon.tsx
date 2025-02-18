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
      d="M19 14h2a1 1 0 0 0 0-2h-2v-1a5.2 5.2 0 0 0-.21-1.36A5 5 0 0 0 22 5a1 1 0 0 0-2 0 3 3 0 0 1-2.14 2.87A5 5 0 0 0 16 6.4q.015-.2 0-.4a4 4 0 1 0-8 0 2.6 2.6 0 0 0 0 .4 5 5 0 0 0-1.9 1.47A3 3 0 0 1 4 5a1 1 0 0 0-2 0 5 5 0 0 0 3.21 4.64c-.13.442-.201.9-.21 1.36v1H3a1 1 0 0 0 0 2h2v1a7 7 0 0 0 .14 1.38A5 5 0 0 0 2 21a1 1 0 1 0 2 0 3 3 0 0 1 1.81-2.74 7 7 0 0 0 12.38 0A3 3 0 0 1 20 21a1 1 0 0 0 2 0 5 5 0 0 0-3.14-4.62q.139-.683.14-1.38zm-8 5.9A5 5 0 0 1 7 15v-4a3 3 0 0 1 3-3h1zM10 6a2 2 0 1 1 4 0zm7 9a5 5 0 0 1-4 4.9V8h1a3 3 0 0 1 3 3z"
    />
  </svg>
);

const SvgBugIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgBugIcon;
