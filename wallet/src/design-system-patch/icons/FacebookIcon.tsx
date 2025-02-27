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
      d="M13.215 22c4.948-.605 8.786-4.834 8.786-9.965C22.001 6.491 17.526 2 12 2S1.999 6.49 1.999 12.035c0 4.707 3.23 8.655 7.586 9.74V15.1H7.519v-3.066h2.066v-1.32c0-3.417 1.54-4.997 4.88-4.997.63 0 1.726.125 2.17.25v2.78c-.234-.025-.65-.035-1.155-.035-1.64 0-2.27.623-2.27 2.243v1.084h3.27l-.56 3.066h-2.705z"
      clipRule="evenodd"
    />
  </svg>
);

const SvgFacebookIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgFacebookIcon;
