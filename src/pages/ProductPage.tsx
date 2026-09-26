import { useEffect, useState } from "react";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { Link, useParams } from "react-router";
import type { Product } from "@/lib/api";
import { api } from "@/lib/api";
import { useCart } from "@/contexts/Cart";
import { useToast } from "@/contexts/Toast";
import { rupiah } from "@/lib/utils";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader } from "@/components/ui/loader";
import { ProductVisual } from "@/components/storefront/ProductVisual";
import { StockBadge } from "@/components/storefront/StockBadge";
import { StorefrontShell } from "@/components/storefront/StorefrontShell";

export function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product>();
  const [error, setError] = useState("");
  const { add } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    if (!id) return;
    api.product(id).then(setProduct).catch((error: Error) => setError(error.message));
  }, [id]);

  const addToCart = () => {
    if (!product) return;
    add(product);
    toast(`${product.name} is ready in your cart.`);
  };

  if (error) {
    return <StorefrontShell><Alert variant="destructive">{error}</Alert></StorefrontShell>;
  }

  if (!product) {
    return <StorefrontShell><Loader label="Loading product…" /></StorefrontShell>;
  }

  return (
    <StorefrontShell>
      <Button asChild variant="ghost" className="mb-8 -ml-3">
        <Link to="/"><ArrowLeft className="size-4" />Back to collection</Link>
      </Button>
      <section className="grid gap-10 lg:grid-cols-[1.1fr_.9fr]">
        <ProductVisual />
        <div>
          <Badge>Finished good</Badge>
          <h1 className="font-display mt-4 text-4xl font-bold tracking-tight sm:text-5xl">{product.name}</h1>
          <p className="mt-5 text-3xl font-bold">{rupiah(product.price)}</p>
          <div className="mt-5"><StockBadge quantity={product.quantity} /></div>
          <p className="mt-5 leading-7 text-stone-600">Prepared by Supreme ERP and available for direct pickup.</p>
          {product.properties.length > 0 && (
            <div className="mt-8 grid grid-cols-2 gap-3">
              {product.properties.map((property) => (
                <Card key={property.name} className="bg-stone-50 shadow-none">
                  <CardContent className="p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-stone-500">{property.name}</p>
                    <p className="mt-1 font-semibold">{property.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          <Button className="mt-8 w-full sm:w-auto" size="lg" disabled={!product.quantity} onClick={addToCart}>
            <ShoppingBag className="size-4" />Add to cart
          </Button>
        </div>
      </section>
    </StorefrontShell>
  );
}
