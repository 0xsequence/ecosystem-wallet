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
      d="M12 2a9.04 9.04 0 0 0-6.361 2.625A8.94 8.94 0 0 0 3 10.95v10.045a.99.99 0 0 0 .684.944 1 1 0 0 0 1.116-.347l2.029-2.686 1.276 2.539a1 1 0 0 0 .807.55 1 1 0 0 0 .893-.398L12 18.676l2.2 2.917a1 1 0 0 0 .893.398 1 1 0 0 0 .807-.55l1.271-2.533 2.029 2.685a1 1 0 0 0 .8.398c.265 0 .52-.105.707-.292a1 1 0 0 0 .293-.703V10.951a8.94 8.94 0 0 0-2.639-6.326A9.04 9.04 0 0 0 12 2m7 16.012-1.2-1.59a.99.99 0 0 0-1.361-.229 1 1 0 0 0-.329.376l-1.276 2.538-2.034-2.686a1 1 0 0 0-.8-.398 1 1 0 0 0-.8.398l-2.029 2.69L7.9 16.573a1 1 0 0 0-.81-.55 1 1 0 0 0-.89.398L5 18.012v-7.061c0-1.846.737-3.617 2.05-4.923A7.02 7.02 0 0 1 12 3.99a7.02 7.02 0 0 1 4.95 2.04A6.94 6.94 0 0 1 19 10.95zm-9-8.056v1.99a1 1 0 0 1-.293.703 1.003 1.003 0 0 1-1.414 0A1 1 0 0 1 8 11.946v-1.99c0-.263.105-.516.293-.703A1.003 1.003 0 0 1 10 9.956m6 0v1.99a1 1 0 0 1-.293.703 1.003 1.003 0 0 1-1.414 0 1 1 0 0 1-.293-.703v-1.99c0-.263.105-.516.293-.703A1.003 1.003 0 0 1 16 9.956"
    />
  </svg>
);

const SvgMonsterIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgMonsterIcon;
