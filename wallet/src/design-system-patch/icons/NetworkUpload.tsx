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
      d="m9.726 15.748 1.291-1.31v5.635c0 .267.106.524.293.713a.997.997 0 0 0 1.416 0c.188-.189.293-.446.293-.713v-5.635l1.291 1.31a1 1 0 0 0 1.095.22 1 1 0 0 0 .544-.548 1.02 1.02 0 0 0-.217-1.103l-3.003-3.024a1 1 0 0 0-.33-.212.93.93 0 0 0-.761 0 1 1 0 0 0-.33.212l-3.003 3.024a1.016 1.016 0 0 0 0 1.431 1 1 0 0 0 1.42 0"
    />
    <path
      fill="currentColor"
      d="M18.444 8.24a7.04 7.04 0 0 0-3.005-3.342 6.964 6.964 0 0 0-8.402 1.197 7.08 7.08 0 0 0-1.966 4.051 4 4 0 0 0-2.352 1.616 4.055 4.055 0 0 0 .63 5.324A4 4 0 0 0 6.012 18.1c.266 0 .52-.106.708-.295a1.01 1.01 0 0 0 0-1.426 1 1 0 0 0-.708-.295c-.53 0-1.04-.213-1.415-.59a2.024 2.024 0 0 1 0-2.852c.375-.378.884-.59 1.415-.59.266 0 .52-.107.708-.296s.293-.445.293-.713A5.06 5.06 0 0 1 8.205 7.79a4.975 4.975 0 0 1 6.38-1.063A5.03 5.03 0 0 1 16.75 9.42a1.01 1.01 0 0 0 .781.676 3 3 0 0 1 1.715.994 3.036 3.036 0 0 1 .153 3.76c-.4.552-.974.952-1.628 1.133a1 1 0 0 0-.613.465 1.015 1.015 0 0 0 .354 1.383 1 1 0 0 0 .76.108 5 5 0 0 0 2.66-1.763 5.06 5.06 0 0 0 .106-6.079 5 5 0 0 0-2.596-1.856"
    />
  </svg>
);

const SvgNetworkUpload = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgNetworkUpload;
