import { type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
const badgeVariants = cva(
  "inline-flex w-fit items-center rounded-full px-2.5 py-1 text-xs font-semibold",
  {
    variants: {
      variant: {
        default: "bg-teal-50 text-teal-800",
        secondary: "bg-stone-100 text-stone-700",
        success: "bg-emerald-50 text-emerald-800",
        warning: "bg-amber-50 text-amber-800",
        destructive: "bg-red-50 text-red-700",
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
