import { CheckCircle2, X } from "lucide-react";
import { createContext, useContext, useEffect, useState } from "react";

const ToastContext = createContext<
  { toast: (message: string) => void } | undefined
>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState<string>();
  useEffect(() => {
    if (!message) return;
    const timer = window.setTimeout(() => setMessage(undefined), 3500);
    return () => window.clearTimeout(timer);
  }, [message]);

  return (
    <ToastContext.Provider value={{ toast: setMessage }}>
      {children}
      {message && (
        <div
          role="status"
          className="fixed bottom-5 right-5 z-50 flex w-[min(24rem,calc(100vw-2.5rem))] items-start gap-3 rounded-2xl border border-teal-100 bg-white p-4 text-sm shadow-xl dark:border-teal-900 dark:bg-stone-900"
        >
          <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-teal-700" />
          <div className="flex-1">
            <p className="font-semibold text-stone-950 dark:text-stone-50">
              Added to cart
            </p>
            <p className="mt-0.5 text-stone-500 dark:text-stone-400">
              {message}
            </p>
          </div>
          <button
            aria-label="Dismiss notification"
            className="text-stone-400 hover:text-stone-700 dark:text-stone-500 dark:hover:text-stone-200"
            onClick={() => setMessage(undefined)}
          >
            <X className="size-4" />
          </button>
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used inside ToastProvider");
  return context;
}
