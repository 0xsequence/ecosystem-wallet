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
      d="M7 3.967c-1.657 0-3 1.321-3 2.951v7.869c0 1.63 1.343 2.95 3 2.95h2.75c.315 0 .611.147.8.394L12 20.033l1.45-1.902c.189-.247.485-.393.8-.393H17c1.657 0 3-1.322 3-2.951V6.918c0-1.63-1.343-2.95-3-2.95zM2 6.918C2 4.202 4.239 2 7 2h10c2.761 0 5 2.202 5 4.918v7.869c0 2.716-2.239 4.918-5 4.918h-2.25l-1.15 1.508a2.02 2.02 0 0 1-3.2 0l-1.15-1.508H7c-2.761 0-5-2.202-5-4.918z"
      clipRule="evenodd"
    />
    <path fill="currentColor" d="M12 16a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M12 8a1 1 0 0 0-1 1 1 1 0 1 1-2 0 3 3 0 1 1 5.045 2.195l-.126.117c-.276.256-.501.465-.68.691-.198.25-.239.402-.239.497a1 1 0 1 1-2 0c0-.733.337-1.317.67-1.738.283-.358.635-.683.901-.928l.11-.102A1 1 0 0 0 12 8"
      clipRule="evenodd"
    />
  </svg>
);

const SvgSpeechBubbleIcon = ({
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

export default SvgSpeechBubbleIcon;
