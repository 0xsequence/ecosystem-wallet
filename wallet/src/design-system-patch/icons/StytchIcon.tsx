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
      d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10m.588-6.144q-.466.103-.944.094a7 7 0 0 1-1.93-.234 7 7 0 0 1-1.327-.528l-.762 2.144c.155.092.361.19.597.294q.415.176.85.294.56.153 1.135.234.716.1 1.437.096 2.372-.002 3.55-.926 1.18-.924 1.18-2.6c.012-.5-.064-.999-.225-1.472a2.85 2.85 0 0 0-.686-1.054 4.3 4.3 0 0 0-1.148-.78 18 18 0 0 0-1.63-.683q-.45-.155-.824-.302-.345-.134-.658-.33a1.5 1.5 0 0 1-.442-.406.94.94 0 0 1-.15-.557.9.9 0 0 1 .424-.821q.424-.268 1.395-.268a4.9 4.9 0 0 1 1.475.198q.577.183 1.117.458l.78-2.126a7.6 7.6 0 0 0-1.455-.57 7.5 7.5 0 0 0-2.097-.26 6.2 6.2 0 0 0-1.837.252c-.505.146-.976.39-1.387.716a3.2 3.2 0 0 0-.885 1.133c-.213.47-.32.98-.311 1.495-.014.486.087.968.295 1.408.187.375.446.71.76.986.319.274.676.502 1.06.674q.59.27 1.179.476 1.352.45 1.906.832a1.16 1.16 0 0 1 .555.977c0 .173-.032.345-.095.507a.86.86 0 0 1-.312.389 1.7 1.7 0 0 1-.59.26"
      clipRule="evenodd"
    />
  </svg>
);

const SvgStytchIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgStytchIcon;
