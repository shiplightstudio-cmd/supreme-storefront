import { Link } from "react-router";
import type { Product } from "@/lib/api";
import { useCart } from "@/contexts/cart";
import { useToast } from "@/contexts/toast";
import { rupiah } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProductVisual } from "./product-visual";
import { StockBadge } from "./stock-badge";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const { toast } = useToast();
  const addToCart = () => { add(product); toast(`${product.name} is ready in your cart.`); };

  return (
    <Card className="overflow-hidden transition hover:-translate-y-1 hover:shadow-lg">
      <Link to={`/products/${product.id}`}><div className="relative"><ProductVisual /><div className="absolute left-4 top-4"><StockBadge quantity={product.quantity} /></div></div></Link>
      <CardContent className="p-5">
        <div className="flex justify-between gap-3"><Link className="font-display font-semibold hover:text-teal-700" to={`/products/${product.id}`}>{product.name}</Link><b className="whitespace-nowrap text-sm">{rupiah(product.price)}</b></div>
        <p className="mt-2 text-sm text-stone-500">Finished good · Pickup from our facility</p>
        <Button className="mt-5 w-full" disabled={!product.quantity} onClick={addToCart}>{product.quantity ? "Add to cart" : "Unavailable"}</Button>
      </CardContent>
    </Card>
  );
}
