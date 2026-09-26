import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "flex h-11 w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-sm text-stone-950 outline-none placeholder:text-stone-400 focus:border-teal-700 focus:ring-2 focus:ring-teal-100 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-50 dark:placeholder:text-stone-500 dark:focus:ring-teal-950 disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  />
));
Input.displayName = "Input";
