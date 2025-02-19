import { cva } from "class-variance-authority";

export const iconVariants = cva("block shrink-0", {
  variants: {
    size: {
      xs: "w-4 h-4",
      sm: "w-5 h-5",
      md: "w-6 h-6",
      lg: "w-7 h-7",
      xl: "w-9 h-9",
    },
  },
  defaultVariants: {
    size: "md",
  },
});
