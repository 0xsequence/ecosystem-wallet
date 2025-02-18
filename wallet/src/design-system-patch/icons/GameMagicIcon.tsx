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
      d="M7.669 9.682a.71.71 0 0 1-.4.437l-4.426 1.787c-.59.238-.59 1.15 0 1.388l4.425 1.787a.71.71 0 0 1 .401.437l1.638 4.827c.218.645 1.053.645 1.272 0l1.638-4.827a.71.71 0 0 1 .4-.437l4.426-1.787c.59-.238.59-1.15 0-1.388l-4.425-1.787a.71.71 0 0 1-.401-.437l-1.638-4.827c-.219-.645-1.054-.645-1.272 0zm2.274-.477-.38 1.12a2.71 2.71 0 0 1-1.546 1.649l-1.55.626 1.55.626c.766.31 1.305.938 1.546 1.65l.38 1.12.38-1.12c.241-.712.78-1.34 1.546-1.65l1.55-.626-1.55-.626a2.71 2.71 0 0 1-1.546-1.65zm7.069-4.332a.67.67 0 0 1-.396.396L15.18 5.8a.67.67 0 0 0 0 1.257l1.436.531a.67.67 0 0 1 .396.396l.531 1.436a.67.67 0 0 0 1.257 0l.531-1.436a.67.67 0 0 1 .396-.396l1.436-.531a.67.67 0 0 0 0-1.257l-1.436-.531a.67.67 0 0 1-.396-.396L18.8 3.437a.67.67 0 0 0-1.257 0zm-.62 12.814a.425.425 0 0 0 0 .797l1.325.49a.42.42 0 0 1 .251.252l.49 1.325c.137.37.66.37.798 0l.49-1.325a.43.43 0 0 1 .251-.251l1.326-.49a.425.425 0 0 0 0-.798l-1.326-.49a.42.42 0 0 1-.25-.252l-.491-1.325a.425.425 0 0 0-.797 0l-.49 1.326a.43.43 0 0 1-.252.25z"
      clipRule="evenodd"
    />
  </svg>
);

const SvgGameMagicIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgGameMagicIcon;
