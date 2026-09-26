import { useEffect, useState } from "react";
import { Boxes, Menu, Moon, ShoppingBag, Sun } from "lucide-react";
import { Link } from "react-router";
import { useCart } from "@/contexts/Cart";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet } from "@/components/ui/sheet";

export function Header() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));

  useEffect(() => {
    if (localStorage.getItem("supreme-theme")) return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const updateTheme = (event: MediaQueryListEvent) => setDark(event.matches);
    media.addEventListener("change", updateTheme);
    return () => media.removeEventListener("change", updateTheme);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
    document.querySelector("meta[name=\"theme-color\"]")?.setAttribute("content", dark ? "#0c0a09" : "#fafaf9");
  }, [dark]);

  const toggleTheme = () => {
    const nextTheme = !dark;
    localStorage.setItem("supreme-theme", nextTheme ? "dark" : "light");
    setDark(nextTheme);
  };
  const nav = (
    <nav className="flex flex-col gap-1 lg:flex-row">
      <Link onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm font-semibold text-stone-600 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-900 lg:text-base" to="/">
        Collection
      </Link>
      <Link onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm font-semibold text-stone-600 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-900 lg:text-base" to="/cart">
        Your cart
      </Link>
    </nav>
  );

  return (
    <header className="sticky top-0 z-40 border-b bg-stone-50/90 backdrop-blur dark:bg-stone-950/90">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link className="flex items-center gap-3" to="/">
          <span className="grid size-10 place-items-center rounded-xl bg-teal-700 text-white dark:bg-teal-600"><Boxes className="size-5" /></span>
          <span>
            <b className="font-display block tracking-tight lg:text-xl">Supreme Store</b>
          </span>
        </Link>
        <div className="hidden lg:block">{nav}</div>
        <div className="flex gap-4">
          <Button variant="ghost" size="icon" aria-label={dark ? "Switch to light mode" : "Switch to dark mode"} onClick={toggleTheme}>
            {dark ? <Sun className="size-5" /> : <Moon className="size-5" />}
          </Button>
          <Button asChild variant="outline" className="hidden sm:inline-flex lg:text-base">
            <Link to="/cart"><ShoppingBag className="size-4" />Cart {count > 0 && <Badge className="ml-1 bg-teal-700 text-white">{count}</Badge>}</Link>
          </Button>
          <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu" onClick={() => setOpen(true)}><Menu /></Button>
        </div>
      </div>
      <Sheet open={open} onOpenChange={setOpen} title="Supreme Store">
        {nav}
        <Separator className="my-6" />
        <Button asChild className="w-full"><Link to="/cart">Cart {count > 0 && `(${count})`}</Link></Button>
      </Sheet>
    </header>
  );
}
