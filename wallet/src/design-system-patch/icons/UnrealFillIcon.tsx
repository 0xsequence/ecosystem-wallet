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
      d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10m2.558-4.44c2.445-1.155 3.212-3.288 3.384-4.12-.894.916-1.883 1.844-2.548 1.202 0 0-.037-3.429-.037-4.835 0-1.89 1.793-3.3 1.793-3.3-.986.176-2.17.527-3.427 1.76a5 5 0 0 0-.322.355c-.539-.413-1.237-.289-1.237-.289.378.207.754.81.754 1.31v4.91s-.822.724-1.456.724a.9.9 0 0 1-.733-.371 1 1 0 0 1-.123-.213V8.626c-.188.155-.82.282-.82-.769 0-.653.47-1.431 1.307-1.909a6.18 6.18 0 0 0-3.108 1.434 6.09 6.09 0 0 0-2.106 4.665s.612-1.915 1.38-2.092a.742.742 0 0 1 .93.742v4.495c0 .456-.294.555-.565.55a2.4 2.4 0 0 1-.542-.102 6.12 6.12 0 0 0 4.837 2.481l1.657-1.665z"
      clipRule="evenodd"
    />
  </svg>
);

const SvgUnrealFillIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgUnrealFillIcon;
