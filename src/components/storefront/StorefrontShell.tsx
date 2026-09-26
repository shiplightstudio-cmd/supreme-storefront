import type { ReactNode } from "react";
import { Boxes, Clock3, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { Link } from "react-router";
import { Header } from "./Header";

export function StorefrontShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="mx-auto min-h-[calc(100vh-72px)] max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
        {children}
      </main>
      <footer className="border-t bg-white dark:bg-stone-900">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.35fr_.8fr_1.15fr_1.1fr]">
            <section>
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-teal-700 text-white dark:bg-teal-600"><Boxes className="size-5" /></span>
                <b className="font-display text-lg tracking-tight">Supreme Store</b>
              </div>
              <p className="mt-4 max-w-xs text-sm leading-6 text-stone-600 dark:text-stone-300">
                A simple way to browse finished goods, place a secure order, and collect it directly from our facility.
              </p>
              <div className="mt-5 flex items-center gap-2 text-sm font-medium text-teal-700 dark:text-teal-300">
                <ShieldCheck className="size-4" /> Secure payments via Midtrans
              </div>
            </section>

            <section>
              <h2 className="font-display font-semibold">Shop</h2>
              <nav className="mt-4 flex flex-col items-start gap-3 text-sm text-stone-600 dark:text-stone-300">
                <Link className="hover:text-teal-700 dark:hover:text-teal-300" to="/">Collection</Link>
                <Link className="hover:text-teal-700 dark:hover:text-teal-300" to="/cart">Your cart</Link>
                <Link className="hover:text-teal-700 dark:hover:text-teal-300" to="/checkout">Checkout</Link>
              </nav>
            </section>

            <section>
              <h2 className="font-display font-semibold">Pickup information</h2>
              <ul className="mt-4 space-y-3 text-sm leading-5 text-stone-600 dark:text-stone-300">
                <li className="flex gap-3"><MapPin className="mt-0.5 size-4 shrink-0 text-teal-700 dark:text-teal-300" /><span>Collect orders from the Supreme ERP facility after payment confirmation.</span></li>
                <li className="flex gap-3"><Clock3 className="mt-0.5 size-4 shrink-0 text-teal-700 dark:text-teal-300" /><span>Pickup hours: Monday–Friday, 09:00–17:00 WIB.</span></li>
                <li className="flex gap-3"><ShieldCheck className="mt-0.5 size-4 shrink-0 text-teal-700 dark:text-teal-300" /><span>Bring your order reference when collecting.</span></li>
              </ul>
            </section>

            <section>
              <h2 className="font-display font-semibold">Contact us</h2>
              <ul className="mt-4 space-y-3 text-sm text-stone-600 dark:text-stone-300">
                <li className="flex gap-3"><Mail className="mt-0.5 size-4 shrink-0 text-teal-700 dark:text-teal-300" /><a className="hover:text-teal-700 dark:hover:text-teal-300" href="mailto:support@supremestore.example">support@supremestore.example</a></li>
                <li className="flex gap-3"><Phone className="mt-0.5 size-4 shrink-0 text-teal-700 dark:text-teal-300" /><a className="hover:text-teal-700 dark:hover:text-teal-300" href="tel:+62215550123">+62 21 555 0123</a></li>
                <li className="flex gap-3"><MapPin className="mt-0.5 size-4 shrink-0 text-teal-700 dark:text-teal-300" /><span>Supreme ERP Facility<br />Jakarta, Indonesia</span></li>
              </ul>
            </section>
          </div>
          <div className="mt-10 flex flex-col gap-3 border-t pt-6 text-xs text-stone-500 dark:text-stone-400 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Supreme Store. All rights reserved.</p>
            <p>Pickup only · Please contact us before visiting the facility.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
