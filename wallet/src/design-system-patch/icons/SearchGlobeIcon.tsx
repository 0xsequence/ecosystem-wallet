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
      d="M12.382 19.876A.84.84 0 0 1 12 20c-.215 0-.948-.226-1.747-1.823-.639-1.278-1.11-3.083-1.226-5.177h4.914a5.6 5.6 0 0 1 3.497-1.219c1.773 0 3.354.82 4.385 2.102q.175-.917.177-1.883c0-5.523-4.477-10-10-10S2 6.477 2 12s4.477 10 10 10q.997-.002 1.94-.188a5.65 5.65 0 0 1-1.558-1.936M14.972 11H9.028c.116-2.094.587-3.899 1.226-5.177C11.052 4.226 11.785 4 12 4s.948.226 1.747 1.823c.639 1.278 1.11 3.083 1.226 5.177m4.966 0h-2.963c-.12-2.434-.678-4.61-1.512-6.214A8 8 0 0 1 19.938 11M4.062 13a8 8 0 0 0 4.475 6.214C7.703 17.61 7.145 15.434 7.025 13zm2.963-2H4.062a8 8 0 0 1 4.475-6.214C7.703 6.39 7.145 8.566 7.025 11"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M17.4 15.4a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-4 2a4 4 0 1 1 7.446 2.032l.861.861a1 1 0 0 1-1.414 1.415l-.861-.861A4 4 0 0 1 13.4 17.4"
      clipRule="evenodd"
    />
  </svg>
);

const SvgSearchGlobeIcon = ({
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

export default SvgSearchGlobeIcon;
