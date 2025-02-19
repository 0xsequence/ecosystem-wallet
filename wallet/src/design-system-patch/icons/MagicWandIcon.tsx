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
      d="m12.66 9.918-7.817 7.817 1.421 1.422 7.818-7.818zm.71-2.132a1.005 1.005 0 0 0-1.42 0l-9.24 9.239a1.005 1.005 0 0 0 0 1.421l2.843 2.843a1.005 1.005 0 0 0 1.422 0l9.239-9.239a1.005 1.005 0 0 0 0-1.421z"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      d="m11.239 11.34 1.421 1.42-1.421 1.422-1.421-1.421z"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M19.057 4.943a1.005 1.005 0 0 1 0 1.422l-1.421 1.42a1.005 1.005 0 1 1-1.422-1.42l1.422-1.422a1.005 1.005 0 0 1 1.42 0M16.225 16.325a1.005 1.005 0 0 1 1.421 0l1.421 1.421a1.005 1.005 0 1 1-1.42 1.421l-1.422-1.421a1.005 1.005 0 0 1 0-1.421M7.676 7.775a1.005 1.005 0 0 0 0-1.42L6.254 4.932a1.005 1.005 0 1 0-1.421 1.421l1.421 1.421a1.005 1.005 0 0 0 1.422 0M22 12a1 1 0 0 1-1 1h-2a1 1 0 1 1 0-2h2a1 1 0 0 1 1 1M12 2a1 1 0 0 0-1 1v2a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1"
      clipRule="evenodd"
    />
  </svg>
);

const SvgMagicWandIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgMagicWandIcon;
