import type { ReactNode } from "react";
import { Header } from "./Header";
import Footer from "./Footer";

export function StorefrontShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="mx-auto min-h-[calc(100vh-72px)] max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
        {children}
      </main>
     <Footer />
    </>
  );
}
