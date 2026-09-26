import { useEffect, useState } from "react";
import type { Product } from "@/lib/api";
import { api } from "@/lib/api";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
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
      <section className="relative mb-12 overflow-hidden rounded-3xl bg-gradient-to-br from-teal-950 via-teal-800 to-teal-700 px-6 py-12 text-white sm:px-10 sm:py-16">
        <div className="max-w-2xl">
          <Badge className="bg-white/15 text-white">Pickup collection</Badge>
          <h1 className="font-display mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
            Practical goods, ready for the work ahead.
          </h1>
          <p className="mt-5 leading-7 text-teal-50/85">
            Browse finished products from Supreme ERP. Every order is prepared
            for convenient pickup and priced in Indonesian rupiah.
          </p>
        </div>
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
