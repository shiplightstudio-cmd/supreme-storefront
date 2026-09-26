import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
export const Card = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "rounded-2xl border border-stone-200 bg-white shadow-[0_1px_2px_rgba(28,25,23,.05)]",
      className,
    )}
    {...props}
  />
);
export const CardHeader = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col gap-1.5 p-6", className)} {...props} />
);
export const CardTitle = ({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => (
  <h2
    className={cn(
      "font-display text-lg font-semibold tracking-tight text-stone-950",
      className,
    )}
    {...props}
  />
);
export const CardDescription = ({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-sm leading-6 text-stone-500", className)} {...props} />
);
export const CardContent = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("p-6 pt-0", className)} {...props} />
);
export const CardFooter = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex items-center p-6 pt-0", className)} {...props} />
);
