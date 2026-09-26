import { useEffect, useState } from "react";
import type { Product } from "@/lib/api";
import { api } from "@/lib/api";
import { Alert } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Loader } from "@/components/ui/loader";
import { ProductCard } from "@/components/storefront/ProductCard";
import { StorefrontShell } from "@/components/storefront/StorefrontShell";

export function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .products()
      .then(setProducts)
      .catch((error: Error) => setError(error.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <StorefrontShell>
      <section className="mb-14 text-center">
        <h1 className="font-display  text-4xl font-bold tracking-tight sm:text-3xl">
          Welcome, Happy Shopping
        </h1>
      </section>
      {error ? (
        <Alert variant="destructive">{error}</Alert>
      ) : loading ? (
        <Loader label="Loading the collection…" />
      ) : products.length ? (
        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      ) : (
        <Card>
          <CardContent className="py-14 text-center text-stone-500">
            No products are available for pickup yet.
          </CardContent>
        </Card>
      )}
    </StorefrontShell>
  );
}
