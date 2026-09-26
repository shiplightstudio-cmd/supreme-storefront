import { useState } from "react";
import { Boxes, Menu, ShoppingBag } from "lucide-react";
import { Link } from "react-router";
import { useCart } from "@/contexts/Cart";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet } from "@/components/ui/sheet";

export function Header() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const nav = (
    <nav className="flex flex-col gap-1 lg:flex-row">
      <Link onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm font-semibold text-stone-600 hover:bg-stone-100" to="/">
        Collection
      </Link>
      <Link onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm font-semibold text-stone-600 hover:bg-stone-100" to="/cart">
        Your cart
      </Link>
    </nav>
  );

  return (
    <header className="sticky top-0 z-40 border-b bg-stone-50/90 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link className="flex items-center gap-3" to="/">
          <span className="grid size-10 place-items-center rounded-xl bg-teal-700 text-white"><Boxes className="size-5" /></span>
          <span>
            <b className="font-display block tracking-tight">Supreme Store</b>
            <small className="block text-[10px] font-bold uppercase tracking-[.16em] text-teal-700">Made to move work</small>
          </span>
        </Link>
        <div className="hidden lg:block">{nav}</div>
        <div className="flex gap-1">
          <Button asChild variant="outline" className="hidden sm:inline-flex">
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
