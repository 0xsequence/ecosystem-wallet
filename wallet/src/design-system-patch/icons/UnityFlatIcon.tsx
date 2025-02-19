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
      d="m12.787 5.578 3.219 1.828c.115.064.12.242 0 .306L12.18 9.885a.36.36 0 0 1-.36 0L7.997 7.712c-.118-.062-.12-.244 0-.306l3.216-1.828V2L3 6.665v9.33l3.15-1.789v-3.655c-.003-.13.153-.223.269-.153l3.824 2.173a.35.35 0 0 1 .181.306v4.344c.002.13-.153.224-.269.154l-3.219-1.828-3.15 1.788L12 22l8.213-4.665-3.15-1.788-3.218 1.828c-.114.068-.274-.021-.27-.154v-4.344c0-.13.074-.246.182-.306l3.824-2.173c.114-.068.274.019.27.153v3.655L21 15.994v-9.33L12.787 2z"
    />
  </svg>
);

const SvgUnityFlatIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgUnityFlatIcon;
