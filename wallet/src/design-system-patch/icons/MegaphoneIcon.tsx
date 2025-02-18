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
      d="M14.5 7a1 1 0 0 1 1 1v7.448a1 1 0 1 1-2 0V8a1 1 0 0 1 1-1"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      d="m7.343 16.922 1.763 3.525a1 1 0 1 0 1.789-.894L9.618 17H8.25q-.465 0-.907-.078"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M18.987 2.599C19.73 1.856 21 2.382 21 3.432v16.636c0 1.05-1.27 1.576-2.013.833l-3.02-3.02A6.43 6.43 0 0 0 11.426 16H7.25a4.25 4.25 0 0 1 0-8.5h4.175a6.43 6.43 0 0 0 4.542-1.882zM19 5.414l-1.618 1.618A8.42 8.42 0 0 1 11.425 9.5H7.25a2.25 2.25 0 0 0 0 4.5h4.175c2.234 0 4.377.888 5.957 2.468L19 18.086z"
      clipRule="evenodd"
    />
  </svg>
);

const SvgMegaphoneIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgMegaphoneIcon;
