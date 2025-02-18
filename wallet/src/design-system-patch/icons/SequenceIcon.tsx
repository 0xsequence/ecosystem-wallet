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
      d="M2.4 8.016v8.703c0 1.777 1.461 3.217 3.264 3.217h12.672c1.803 0 3.264-1.44 3.264-3.217V8.016c0-1.776-1.461-3.216-3.264-3.216H5.664C3.861 4.8 2.4 6.24 2.4 8.016m4.8.568a.953.953 0 0 0-.96-.946c-.53 0-.96.423-.96.946s.43.946.96.946.96-.424.96-.946M6.24 15.2c.53 0 .96.423.96.946s-.43.946-.96.946a.953.953 0 0 1-.96-.946c0-.523.43-.946.96-.946m12.48-2.832a.953.953 0 0 0-.96-.946c-.53 0-.96.423-.96.946s.43.946.96.946.96-.424.96-.946m-8.64-4.73h7.68c.53 0 .96.423.96.946s-.43.946-.96.946h-7.68a.953.953 0 0 1-.96-.946c0-.523.43-.946.96-.946m7.68 7.562h-7.68c-.53 0-.96.423-.96.946s.43.946.96.946h7.68c.53 0 .96-.424.96-.946a.953.953 0 0 0-.96-.946M6.24 11.422h7.68c.53 0 .96.423.96.946s-.43.946-.96.946H6.24a.953.953 0 0 1-.96-.946c0-.523.43-.946.96-.946"
      clipRule="evenodd"
    />
  </svg>
);

const SvgSequenceIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgSequenceIcon;
