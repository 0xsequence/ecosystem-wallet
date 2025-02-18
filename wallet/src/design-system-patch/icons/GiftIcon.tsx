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
      d="M12.583 2.842a2.887 2.887 0 0 1 4.07-.007 2.87 2.87 0 0 1-.007 4.066c-.175.174-.39.32-.606.443h4.26A1.7 1.7 0 0 1 22 9.042v3.49a1.7 1.7 0 0 1-1.7 1.699h-.306v6.07c0 .608-.356 1.045-.668 1.286-.318.245-.74.413-1.18.413H5.65a1.7 1.7 0 0 1-1.7-1.698V14.23H3.7A1.7 1.7 0 0 1 2 12.533V9.042a1.7 1.7 0 0 1 1.7-1.698h4.2a3 3 0 0 1-.602-.443 2.873 2.873 0 0 1-.007-4.065 2.887 2.887 0 0 1 4.069.006c.262.262.462.614.61.92.15-.307.35-.658.613-.92M10.78 6.317a18 18 0 0 0-.25-.786 9 9 0 0 0-.346-.87 3 3 0 0 0-.158-.294 1 1 0 0 0-.057-.083l-.021-.026a.887.887 0 0 0-1.245-.006.873.873 0 0 0 .007 1.232l.028.024q.03.023.085.058.113.07.296.158c.246.117.549.234.871.345.27.092.542.176.79.248m.192 3.027H4v2.887h6.972zm0 4.887H5.95V20h5.022zm2 5.769v-5.769h5.022V20zm0-7.769V9.344H20v2.887zm.19-5.915c.249-.073.522-.157.793-.25.324-.112.627-.23.873-.346q.184-.087.296-.158.055-.034.084-.057l.026-.021a.87.87 0 0 0 .006-1.232.887.887 0 0 0-1.245.007q0-.001-.023.028-.024.03-.058.084-.07.112-.159.295a9 9 0 0 0-.345.868c-.092.267-.176.536-.247.782"
      clipRule="evenodd"
    />
  </svg>
);

const SvgGiftIcon = ({ className, size = "sm", ...props }: IconProps) => (
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

export default SvgGiftIcon;
