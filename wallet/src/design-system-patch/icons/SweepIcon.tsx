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
      d="M6.564 3.304a.465.465 0 0 1 .872 0l.536 1.449a.47.47 0 0 0 .275.275l1.45.536a.465.465 0 0 1 0 .872l-1.45.536a.47.47 0 0 0-.275.275l-.536 1.45a.465.465 0 0 1-.872 0l-.536-1.45a.47.47 0 0 0-.275-.275l-1.45-.536a.465.465 0 0 1 0-.872l1.45-.536a.47.47 0 0 0 .275-.275z"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M7.572 12.129a1 1 0 0 1 1.3-.557l2.895 1.158.339-.677a1 1 0 1 1 1.788.894l-.264.528 2.741 1.097a1 1 0 0 1-.742 1.857l-7.5-3a1 1 0 0 1-.557-1.3"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      d="M7.188 18.781c.853 0 1.935-.364 3.498-1.405.47-.313 1.12-.212 1.371.294.754 1.512.767 2.944.13 3.58l-1.399-.69c.074-.351.086-.687.008-.924-.191.084-.438.197-.709.321l-.269.123z"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M17.425 3.88a1 1 0 0 0-1.85-.76L12.33 11H8.123c-.994 0-1.567.88-1.555 1.635.017 1.036-.519 2.568-1.908 3.455-.532.34-.76.917-.755 1.42.005.51.262 1.146.93 1.427l3.882 1.634c.422-.18.927-.41 1.37-.614.27-.124.518-.237.709-.321.138.414-.004 1.131-.263 1.7l2.367.996c.39.164.878.174 1.308-.08 1.583-.932 3.743-3.484 3.31-7.18a1.49 1.49 0 0 0-.51-.954L14.2 11.712zM8.558 13h4.072l2.921 2.504c.209 2.457-1.125 4.166-2.13 4.877l-7.133-3.003C7.801 16.155 8.47 14.404 8.558 13"
      clipRule="evenodd"
    />
  </svg>
);

const SvgSweepIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgSweepIcon;
