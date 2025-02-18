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
      d="M12 22q-3.476-.875-5.737-3.988Q4 14.9 4 11.1V5.693a1 1 0 0 1 .649-.936l7-2.625a1 1 0 0 1 .702 0l7 2.625a1 1 0 0 1 .649.936V11.1q0 3.8-2.262 6.913Q15.475 21.124 12 22m0-2.1q2.425-.75 4.05-2.962a9.9 9.9 0 0 0 1.731-3.845c.122-.58-.345-1.093-.937-1.093H12V5.568a1 1 0 0 0-1.351-.936l-4 1.5A1 1 0 0 0 6 7.068v4.482q0 .175.05.45H12z"
    />
  </svg>
);

const SvgShieldIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgShieldIcon;
