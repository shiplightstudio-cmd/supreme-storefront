import { AlertCircle, CheckCircle2, Info } from "lucide-react";
import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
type Variant = "default" | "destructive" | "success";
const icons = {
  default: Info,
  destructive: AlertCircle,
  success: CheckCircle2,
};
export function Alert({
  className,
  variant = "default",
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & { variant?: Variant }) {
  const Icon = icons[variant];
  return (
    <div
      role="alert"
      className={cn(
        "flex gap-3 rounded-xl border p-4 text-sm",
        variant === "destructive" && "border-red-200 bg-red-50 text-red-800",
        variant === "success" &&
          "border-emerald-200 bg-emerald-50 text-emerald-800",
        variant === "default" && "border-teal-100 bg-teal-50 text-teal-900",
        className,
      )}
      {...props}
    >
      <Icon className="mt-0.5 size-4 shrink-0" /> <div>{children}</div>
    </div>
  );
}
