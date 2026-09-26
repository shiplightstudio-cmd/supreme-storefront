import { type ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { Button } from "./button";
export function Sheet({
  open,
  onOpenChange,
  title,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) =>
      event.key === "Escape" && onOpenChange(false);
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [open, onOpenChange]);
  if (!open) return null;
  return createPortal(
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        aria-label="Close menu"
        className="absolute inset-0 bg-stone-950/35"
        onClick={() => onOpenChange(false)}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative h-full w-[min(22rem,88vw)] bg-white p-6 shadow-2xl dark:bg-stone-900"
      >
        <div className="flex items-center justify-between">
          <p className="font-display text-lg font-semibold">{title}</p>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Close menu"
            onClick={() => onOpenChange(false)}
          >
            <X className="size-5" />
          </Button>
        </div>
        <div className="mt-8">{children}</div>
      </aside>
    </div>,
    document.body,
  );
}
