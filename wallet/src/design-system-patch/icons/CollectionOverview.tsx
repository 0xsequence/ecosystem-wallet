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
      d="m2.5 8.92 9 5.1a1.01 1.01 0 0 0 1 0l9-5.1a1 1 0 0 0 .364-.357.967.967 0 0 0-.364-1.34l-9-5.092a1.01 1.01 0 0 0-1 0l-9 5.092a1 1 0 0 0-.367.36A.967.967 0 0 0 2.5 8.92M12 4.152l7 3.924L12 12 5 8.076zm8.5 7.034L12 15.924l-8.5-4.777a1.013 1.013 0 0 0-1.37.362.97.97 0 0 0-.095.742c.07.25.237.463.465.593l9 5.1a1.01 1.01 0 0 0 1 0l9-5.1a.98.98 0 0 0 .465-.593.965.965 0 0 0-.352-1.032 1.01 1.01 0 0 0-1.113-.072zm0 3.924L12 19.848 3.5 15.07a1.013 1.013 0 0 0-1.37.363.97.97 0 0 0-.095.742c.07.25.237.463.465.592l9 5.102a1.01 1.01 0 0 0 1 0l9-5.102a.98.98 0 0 0 .465-.592.965.965 0 0 0-.352-1.032 1.01 1.01 0 0 0-1.113-.073z"
    />
  </svg>
);

const SvgCollectionOverview = ({
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

export default SvgCollectionOverview;
