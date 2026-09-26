import { type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
const badgeVariants = cva(
  "inline-flex w-fit items-center rounded-full px-2.5 py-1 text-xs font-semibold",
  {
    variants: {
      variant: {
        default: "bg-teal-50 text-teal-800 dark:bg-teal-950 dark:text-teal-200",
        secondary: "bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-200",
        success: "bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200",
        warning: "bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-200",
        destructive: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-200",
      },
    },
    defaultVariants: { variant: "default" },
  },
);
export interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}
export const Badge = ({ className, variant, ...props }: BadgeProps) => (
  <div className={cn(badgeVariants({ variant }), className)} {...props} />
);
