import { Boxes } from "lucide-react";

export function ProductVisual({ small = false }: { small?: boolean }) {
  return (
    <div
      className={`relative grid place-items-center overflow-hidden bg-gradient-to-br from-teal-950 via-teal-700 to-cyan-700 text-white ${small ? "size-20 shrink-0 rounded-xl" : "min-h-44 rounded-2xl sm:min-h-72 sm:rounded-3xl"}`}
    >
      <div className="absolute -right-12 -top-12 size-44 rounded-full bg-white/10" />
      <Boxes className={small ? "size-8" : "size-24"} strokeWidth={1.3} />
    </div>
  );
}
