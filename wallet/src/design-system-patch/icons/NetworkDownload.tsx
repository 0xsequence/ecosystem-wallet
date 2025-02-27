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
      d="m14.31 17.287-1.291 1.3v-5.593a1 1 0 1 0-2.002 0v5.594l-1.291-1.301a1.005 1.005 0 0 0-1.422 1.42l3.003 3.003c.095.09.208.162.33.21a.94.94 0 0 0 .761 0 1 1 0 0 0 .33-.21l3.003-3.002a1.004 1.004 0 1 0-1.421-1.421m4.134-11.078A7.005 7.005 0 0 0 7.037 4.08a7 7 0 0 0-1.966 4.022 4.004 4.004 0 0 0-1.722 6.888 4 4 0 0 0 2.663 1.007 1.001 1.001 0 0 0 0-2.001 2.002 2.002 0 0 1 0-4.003 1 1 0 0 0 1.001-1 5 5 0 0 1 4.188-4.926 5.006 5.006 0 0 1 5.551 3.314 1 1 0 0 0 .781.67 3.003 3.003 0 0 1 .24 5.845 1.003 1.003 0 1 0 .5 1.94 5.004 5.004 0 0 0 .171-9.626"
    />
  </svg>
);

const SvgNetworkDownload = ({
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

export default SvgNetworkDownload;
