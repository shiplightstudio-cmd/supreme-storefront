import { LoaderCircle } from "lucide-react";
export function Loader({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="flex min-h-48 flex-col items-center justify-center gap-3 text-sm text-stone-500 dark:text-stone-400">
      <LoaderCircle
        className="size-6 animate-spin text-teal-700"
        aria-hidden="true"
      />
      <span>{label}</span>
    </div>
  );
}
