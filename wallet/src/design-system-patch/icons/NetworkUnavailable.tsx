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
      d="M12 3.5a7.25 7.25 0 0 0-3.5.968c-.479.275-.65.896-.375 1.374.275.48.896.62 1.375.344A5.16 5.16 0 0 1 12 5.5c2.681-.021 5.021 2.285 5 4.996v1.093c0 .466.296.895.75 1 1.316.303 2.25 1.305 2.25 2.404 0 .355-.078.712-.25 1.031a.986.986 0 0 0 .406 1.342.987.987 0 0 0 1.344-.406c.328-.606.5-1.276.5-1.967 0-1.813-1.192-3.379-3.004-4.111l.004-.386c.03-3.832-3.209-7.024-7-6.995M5 5.5a1 1 0 0 0-.719.282c-.39.39-.39 1.046 0 1.435l1.108 1.096c-.108.225-.156.478-.212.737C3.273 9.88 2 11.712 2 13.868c0 3.007 2.376 5.62 5.312 5.62h9.25l.719.719c.391.39 1.047.39 1.438 0 .39-.39.39-1.046 0-1.436l-1-1-12-11.99A1 1 0 0 0 5 5.499m2.028 4.456 7.534 7.535h-7.25C5.525 17.49 4 15.813 4 13.868c0-1.491.934-2.702 2.344-3.123a1 1 0 0 0 .684-.79"
    />
  </svg>
);

const SvgNetworkUnavailable = ({
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

export default SvgNetworkUnavailable;
