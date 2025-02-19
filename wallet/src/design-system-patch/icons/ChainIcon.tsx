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
      d="m6.457 13.803-2.441 1.373v2.656l2.44 1.373 2.442-1.373v-2.656zm3.93-.084a1 1 0 0 1 .51.872v3.826a1 1 0 0 1-.51.872l-3.44 1.935a1 1 0 0 1-.98 0L2.524 19.29a1 1 0 0 1-.51-.872v-3.826a1 1 0 0 1 .51-.872l3.441-1.935a1 1 0 0 1 .98 0zM12.008 4.92 9.567 6.294V8.95l2.44 1.373L14.45 8.95V6.294zm3.931-.083a1 1 0 0 1 .51.872v3.826a1 1 0 0 1-.51.872l-3.44 1.935a1 1 0 0 1-.981 0l-3.441-1.935a1 1 0 0 1-.51-.872V5.71a1 1 0 0 1 .51-.872l3.44-1.935a1 1 0 0 1 .981 0zM17.559 13.803l-2.441 1.373v2.656l2.441 1.373L20 17.832v-2.656zm3.931-.084a1 1 0 0 1 .51.872v3.826a1 1 0 0 1-.51.872l-3.44 1.935a1 1 0 0 1-.981 0l-3.441-1.935a1 1 0 0 1-.51-.872v-3.826a1 1 0 0 1 .51-.872l3.44-1.935a1 1 0 0 1 .981 0z"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      d="M6.015 16.233 2.64 14.375 6.5 12l3.813 2.375-3.33 1.855a1 1 0 0 1-.968.003M17.015 16.233l-3.374-1.858L17.5 12l3.813 2.375-3.33 1.855a1 1 0 0 1-.968.003M11.538 7.355 8.164 5.497l3.86-2.375 3.812 2.375-3.329 1.855a1 1 0 0 1-.969.003"
    />
  </svg>
);

const SvgChainIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgChainIcon;
