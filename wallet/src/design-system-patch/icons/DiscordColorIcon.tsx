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
      d="M18.942 5.34A16 16 0 0 0 14.816 4c-.178.332-.386.779-.529 1.134a14.7 14.7 0 0 0-4.573 0A12 12 0 0 0 9.18 4c-1.448.26-2.834.716-4.129 1.343-2.611 4.078-3.319 8.055-2.965 11.975 1.732 1.337 3.41 2.149 5.06 2.68q.613-.87 1.084-1.844a10.5 10.5 0 0 1-1.706-.859q.215-.165.418-.342c3.29 1.59 6.866 1.59 10.118 0q.206.178.418.342a10.5 10.5 0 0 1-1.71.86q.47.974 1.084 1.845c1.652-.531 3.332-1.343 5.064-2.682.415-4.544-.71-8.484-2.973-11.978M8.678 14.908c-.988 0-1.798-.954-1.798-2.114s.792-2.116 1.798-2.116c1.005 0 1.815.953 1.798 2.116.001 1.16-.793 2.114-1.798 2.114m6.644 0c-.988 0-1.798-.954-1.798-2.114s.793-2.116 1.798-2.116c1.006 0 1.816.953 1.798 2.116 0 1.16-.793 2.114-1.798 2.114"
    />
  </svg>
);

const SvgDiscordColorIcon = ({
  className,
  size = "sm",
  ...props
}: IconProps) => (
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

export default SvgDiscordColorIcon;
