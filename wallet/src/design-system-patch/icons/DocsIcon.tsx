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
      d="M4.019 5.028c-.016.015-.019.028-.019.039v11.2c0 .011.003.024.019.04a.1.1 0 0 0 .071.026h3.148c1.302 0 2.558.465 3.536 1.306V6.554l-.604-.59A3.42 3.42 0 0 0 7.783 5H4.09a.1.1 0 0 0-.072.028m7.884-.42a1 1 0 0 0-.26 0l-.075-.073A5.42 5.42 0 0 0 7.783 3H4.09C2.958 3 2 3.904 2 5.067v11.2c0 1.161.956 2.066 2.09 2.066h3.148c.9 0 1.757.35 2.387.965l1.45 1.417a1 1 0 0 0 1.398 0l1.45-1.417a3.42 3.42 0 0 1 2.387-.965h3.599c1.133 0 2.091-.903 2.091-2.066v-11.2C22 3.904 21.042 3 19.909 3h-4.145c-1.415 0-2.778.55-3.785 1.535zm.87 1.946V17.64a5.42 5.42 0 0 1 3.537-1.306h3.599a.1.1 0 0 0 .072-.027c.016-.015.019-.028.019-.04v-11.2c0-.01-.003-.023-.019-.038A.1.1 0 0 0 19.91 5h-4.145c-.9 0-1.758.35-2.387.965z"
      clipRule="evenodd"
    />
  </svg>
);

const SvgDocsIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgDocsIcon;
