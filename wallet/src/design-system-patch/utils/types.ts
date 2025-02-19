import { VariantProps } from "class-variance-authority";
import { ComponentType, SVGProps } from "react";

import { iconVariants } from "./iconVariants";

export interface IconProps
  extends SVGProps<SVGSVGElement>,
    VariantProps<typeof iconVariants> {}

export type Icon = ComponentType<IconProps>;
