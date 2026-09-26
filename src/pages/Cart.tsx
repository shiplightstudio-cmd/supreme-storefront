import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router";
import { useCart } from "@/contexts/Cart";
import { rupiah } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { OrderSummary } from "@/components/storefront/OrderSummary";
import { ProductVisual } from "@/components/storefront/ProductVisual";
import { StorefrontShell } from "@/components/storefront/StorefrontShell";

export function CartPage() {
  const { items, setQuantity, remove, total } = useCart();

  return (
    <StorefrontShell>
      <Badge variant="secondary">Your selection</Badge>
      <h1 className="font-display mt-3 text-4xl font-bold tracking-tight">Your cart</h1>
      {!items.length ? (
        <Card className="mt-8">
          <CardContent className="py-14 text-center">
            <ShoppingBag className="mx-auto size-9 text-stone-400" />
            <p className="mt-4 font-semibold">Your cart is empty.</p>
            <Button asChild className="mt-6"><Link to="/">Browse products</Link></Button>
          </CardContent>
        </Card>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
          <div className="space-y-4">
            {items.map(({ product, quantity }) => (
              <Card key={product.id}>
                <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                  <ProductVisual small />
                  <div className="flex-1">
                    <Link className="font-display font-semibold hover:text-teal-700" to={`/products/${product.id}`}>{product.name}</Link>
                    <p className="text-sm text-stone-500">{rupiah(product.price)} each</p>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center rounded-xl border p-1">
                      <Button variant="ghost" size="icon" aria-label="Decrease quantity" onClick={() => setQuantity(product.id, quantity - 1)}><Minus className="size-4" /></Button>
                      <span className="w-8 text-center text-sm font-semibold">{quantity}</span>
                      <Button variant="ghost" size="icon" aria-label="Increase quantity" disabled={quantity >= product.quantity} onClick={() => setQuantity(product.id, quantity + 1)}><Plus className="size-4" /></Button>
                    </div>
                    <Button variant="ghost" size="icon" aria-label="Remove item" onClick={() => remove(product.id)}><Trash2 className="size-4" /></Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <OrderSummary total={total} checkout />
        </div>
      )}
    </StorefrontShell>
  );
}
