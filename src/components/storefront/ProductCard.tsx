import { Link } from "react-router";
import type { Product } from "@/lib/api";
import { useCart } from "@/contexts/Cart";
import { useToast } from "@/contexts/Toast";
import { rupiah } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProductVisual } from "./ProductVisual";
import { StockBadge } from "./StockBadge";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const { toast } = useToast();
  const addToCart = () => {
    add(product);
    toast(`${product.name} is ready in your cart.`);
  };

  return (
    <Card className="overflow-hidden transition hover:-translate-y-1 hover:shadow-lg">
      <Link to={`/products/${product.id}`}>
        <div className="relative">
          <ProductVisual />
          <div className="absolute left-2 top-2 origin-top-left scale-75 sm:left-4 sm:top-4 sm:scale-100">
            <StockBadge quantity={product.quantity} />
          </div>
        </div>
      </Link>
      <CardContent className="p-3 sm:p-5">
        <div className="flex flex-col gap-1 sm:flex-row sm:gap-3">
          <Link
            className="font-display text-sm font-semibold hover:text-teal-700 sm:text-base"
            to={`/products/${product.id}`}
          >
            {product.name}
          </Link>
          <b className="whitespace-nowrap text-xs sm:text-sm">
            {rupiah(product.price)}
          </b>
        </div>
        <p className="mt-1 hidden text-sm text-stone-500 dark:text-stone-400 sm:block">
          Finished good · Pickup from our facility
        </p>
        <Button
          className="mt-3 h-8 w-full text-xs sm:mt-5 sm:h-10 sm:text-sm"
          disabled={!product.quantity}
          onClick={addToCart}
        >
          {product.quantity ? "Add to cart" : "Unavailable"}
        </Button>
      </CardContent>
    </Card>
  );
}
