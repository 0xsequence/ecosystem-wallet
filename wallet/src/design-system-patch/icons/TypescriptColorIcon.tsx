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
    <g fill="currentColor" clipPath="url(#a)">
      <path d="M20.047 2H3.953A1.953 1.953 0 0 0 2 3.953v16.094C2 21.126 2.874 22 3.953 22h16.094A1.953 1.953 0 0 0 22 20.047V3.953A1.953 1.953 0 0 0 20.047 2" />
      <path d="M20.047 2H3.953A1.953 1.953 0 0 0 2 3.953v16.094C2 21.126 2.874 22 3.953 22h16.094A1.953 1.953 0 0 0 22 20.047V3.953A1.953 1.953 0 0 0 20.047 2" />
      <path
        fillRule="evenodd"
        d="M14.38 17.915v1.956a4.1 4.1 0 0 0 1.128.366q.651.123 1.373.122a6.4 6.4 0 0 0 1.336-.134q.632-.134 1.11-.443.476-.309.754-.807t.278-1.231q0-.531-.159-.932a2.2 2.2 0 0 0-.458-.712q-.3-.311-.718-.56a8 8 0 0 0-.945-.467 12 12 0 0 1-.69-.308 3.5 3.5 0 0 1-.52-.306 1.3 1.3 0 0 1-.33-.33.7.7 0 0 1-.117-.394q0-.2.104-.364.104-.161.294-.277a1.6 1.6 0 0 1 .464-.18q.276-.066.612-.065.244 0 .516.037.273.036.547.113.276.076.535.192.261.116.48.27v-1.828a4.8 4.8 0 0 0-.975-.254 8 8 0 0 0-1.213-.082q-.698 0-1.32.15-.625.15-1.098.467a2.34 2.34 0 0 0-.75.81q-.274.492-.274 1.176 0 .874.504 1.491.505.618 1.531 1.045.404.165.752.324.349.159.603.33.253.17.4.373a.76.76 0 0 1 .055.81.8.8 0 0 1-.278.28q-.187.12-.465.187a2.8 2.8 0 0 1-.65.067q-.637 0-1.26-.223a3.8 3.8 0 0 1-1.156-.669m-3.287-4.818h2.509v-1.605H6.609v1.605h2.497v7.145h1.987z"
        clipRule="evenodd"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="currentColor" d="M2 2h20v20H2z" />
      </clipPath>
    </defs>
  </svg>
);

const SvgTypescriptColorIcon = ({
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

export default SvgTypescriptColorIcon;
