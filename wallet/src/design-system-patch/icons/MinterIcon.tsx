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
      d="M20.204 2.32a1 1 0 0 1-.366 1.367l-5.629 3.25a1 1 0 1 1-1-1.732l5.63-3.25a1 1 0 0 1 1.365.366"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="m8.994 5.816 2.518 4.32 1.761-.993-2.517-4.32zM7.132 4.571a1 1 0 0 0-.375 1.37l3.518 6.052a1 1 0 0 0 1.357.371l3.504-1.975a1 1 0 0 0 .375-1.371l-3.518-6.052a1 1 0 0 0-1.357-.371zM2 14.5a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1h-1 1v.023a4 4 0 0 1-.007.202c-.007.13-.02.31-.048.524a7.2 7.2 0 0 1-.384 1.602c-.222.593-.579 1.253-1.162 1.771-.605.538-1.403.878-2.399.878h-2.023l.451 1.129A1 1 0 0 1 15.5 22h-9a1 1 0 0 1-.928-1.371l.451-1.129H3a1 1 0 0 1-1-1zm17.876 1H4v2h3.5a1 1 0 0 1 .928 1.371L7.977 20h6.046l-.451-1.129A1 1 0 0 1 14.5 17.5H18c.504 0 .83-.16 1.07-.372.26-.232.466-.572.619-.98.081-.217.142-.439.187-.648"
      clipRule="evenodd"
    />
  </svg>
);

const SvgMinterIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgMinterIcon;
