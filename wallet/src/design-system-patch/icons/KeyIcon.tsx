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
      d="M7.999 6a6 6 0 1 0 0 12c2.123 0 4.028-1.097 5.188-2.999h3.187l.719 1.437c.169.338.527.562.906.562h3a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1l-7.815-.008C12.101 7.157 10.122 6 7.999 6m0 2c1.593 0 3.018.956 3.656 2.406.16.363.51.594.906.594h7.438v4h-1.375l-.719-1.438a1.03 1.03 0 0 0-.906-.562h-4.438a.99.99 0 0 0-.906.594A4 4 0 0 1 7.999 16a4 4 0 0 1 0-8m0 3c-.256 0-.523.086-.719.281a1.03 1.03 0 0 0 0 1.438 1.03 1.03 0 0 0 1.438 0 1.03 1.03 0 0 0 0-1.438 1.01 1.01 0 0 0-.719-.28"
    />
  </svg>
);

const SvgKeyIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgKeyIcon;
