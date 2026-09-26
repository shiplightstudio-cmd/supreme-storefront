import { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  CheckCircle2,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { api, type Product } from "@/lib/api";
import { useCart } from "@/contexts/cart";
import { useToast } from "@/contexts/toast";
import { rupiah } from "@/lib/utils";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "@/components/ui/loader";
import { OrderSummary } from "@/components/storefront/order-summary";
import { ProductCard } from "@/components/storefront/product-card";
import { ProductVisual } from "@/components/storefront/product-visual";
import { StockBadge } from "@/components/storefront/stock-badge";
import { StorefrontShell } from "@/components/storefront/storefront-shell";

const loadSnap = () =>
  new Promise<void>((resolve, reject) => {
    if (window.snap) return resolve();
    const script = document.createElement("script");
    script.src =
      import.meta.env.VITE_MIDTRANS_IS_PRODUCTION === "true"
        ? "https://app.midtrans.com/snap/snap.js"
        : "https://app.sandbox.midtrans.com/snap/snap.js";
    script.dataset.clientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Unable to load secure payment"));
    document.head.append(script);
  });

function Catalog() {
  const [products, setProducts] = useState<Product[]>([]),
    [error, setError] = useState(""),
    [loading, setLoading] = useState(true);
  useEffect(() => {
    api
      .products()
      .then(setProducts)
      .catch((e) => setError(e.message))
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
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
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

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product>(),
    [error, setError] = useState("");
  const { add } = useCart();
  const { toast } = useToast();
  const addToCart = () => {
    if (product) {
      add(product);
      toast(`${product.name} is ready in your cart.`);
    }
  };
  useEffect(() => {
    if (id)
      api
        .product(id)
        .then(setProduct)
        .catch((e) => setError(e.message));
  }, [id]);
  if (error)
    return (
      <StorefrontShell>
        <Alert variant="destructive">{error}</Alert>
      </StorefrontShell>
    );
  if (!product)
    return (
      <StorefrontShell>
        <Loader label="Loading product…" />
      </StorefrontShell>
    );
  return (
    <StorefrontShell>
      <Button asChild variant="ghost" className="mb-8 -ml-3">
        <Link to="/">
          <ArrowLeft className="size-4" />
          Back to collection
        </Link>
      </Button>
      <section className="grid gap-10 lg:grid-cols-[1.1fr_.9fr]">
        <ProductVisual />
        <div>
          <Badge>Finished good</Badge>
          <h1 className="font-display mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            {product.name}
          </h1>
          <p className="mt-5 text-3xl font-bold">{rupiah(product.price)}</p>
          <div className="mt-5">
            <StockBadge quantity={product.quantity} />
          </div>
          <p className="mt-5 leading-7 text-stone-600">
            Prepared by Supreme ERP and available for direct pickup.
          </p>
          {product.properties.length > 0 && (
            <div className="mt-8 grid grid-cols-2 gap-3">
              {product.properties.map((x) => (
                <Card key={x.name} className="bg-stone-50 shadow-none">
                  <CardContent className="p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-stone-500">
                      {x.name}
                    </p>
                    <p className="mt-1 font-semibold">{x.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          <Button
            className="mt-8 w-full sm:w-auto"
            size="lg"
            disabled={!product.quantity}
            onClick={addToCart}
          >
            <ShoppingBag className="size-4" />
            Add to cart
          </Button>
        </div>
      </section>
    </StorefrontShell>
  );
}

function Cart() {
  const { items, setQuantity, remove, total } = useCart();
  return (
    <StorefrontShell>
      <Badge variant="secondary">Your selection</Badge>
      <h1 className="font-display mt-3 text-4xl font-bold tracking-tight">
        Your cart
      </h1>
      {!items.length ? (
        <Card className="mt-8">
          <CardContent className="py-14 text-center">
            <ShoppingBag className="mx-auto size-9 text-stone-400" />
            <p className="mt-4 font-semibold">Your cart is empty.</p>
            <Button asChild className="mt-6">
              <Link to="/">Browse products</Link>
            </Button>
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
                    <Link
                      className="font-display font-semibold hover:text-teal-700"
                      to={`/products/${product.id}`}
                    >
                      {product.name}
                    </Link>
                    <p className="text-sm text-stone-500">
                      {rupiah(product.price)} each
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center rounded-xl border p-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Decrease quantity"
                        onClick={() => setQuantity(product.id, quantity - 1)}
                      >
                        <Minus className="size-4" />
                      </Button>
                      <span className="w-8 text-center text-sm font-semibold">
                        {quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Increase quantity"
                        disabled={quantity >= product.quantity}
                        onClick={() => setQuantity(product.id, quantity + 1)}
                      >
                        <Plus className="size-4" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Remove item"
                      onClick={() => remove(product.id)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
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

function Checkout() {
  const { items, total, clear } = useCart();
  const navigate = useNavigate();
  const [name, setName] = useState(""),
    [email, setEmail] = useState(""),
    [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  if (!items.length)
    return (
      <StorefrontShell>
        <Card>
          <CardContent className="py-12 text-center">
            <p>Your cart is empty.</p>
            <Button asChild className="mt-5">
              <Link to="/">Browse products</Link>
            </Button>
          </CardContent>
        </Card>
      </StorefrontShell>
    );
  const pay = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const x = await api.checkout({
        customer: { name, email },
        items: items.map((i) => ({
          productId: i.product.id,
          quantity: i.quantity,
        })),
      });
      await loadSnap();
      window.snap?.pay(x.snapToken, {
        onSuccess: () => {
          clear();
          navigate(`/payment/${x.publicReference}`);
        },
        onPending: () => navigate(`/payment/${x.publicReference}`),
        onError: () => navigate(`/payment/${x.publicReference}`),
        onClose: () => navigate(`/payment/${x.publicReference}`),
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to start payment");
    } finally {
      setBusy(false);
    }
  };
  return (
    <StorefrontShell>
      <Badge variant="secondary">Secure checkout</Badge>
      <h1 className="font-display mt-3 text-4xl font-bold tracking-tight">
        Complete your pickup order
      </h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
        <Card>
          <CardHeader>
            <CardTitle>Your details</CardTitle>
            <CardDescription>
              Used for your pickup order and payment receipt.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-5" onSubmit={pay}>
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </div>
              {error && <Alert variant="destructive">{error}</Alert>}
              <Button className="w-full" size="lg" disabled={busy}>
                {busy ? "Opening payment…" : `Pay ${rupiah(total)}`}
              </Button>
            </form>
          </CardContent>
        </Card>
        <OrderSummary total={total} items={items} />
      </div>
    </StorefrontShell>
  );
}

function Confirmation() {
  const { reference } = useParams();
  const [status, setStatus] = useState<{
      paymentStatus: string;
      totalPrice: number;
    }>(),
    [error, setError] = useState("");
  useEffect(() => {
    if (!reference) return;
    let on = true;
    const go = () =>
      api
        .status(reference)
        .then((x) => on && setStatus(x))
        .catch((e) => on && setError(e.message));
    go();
    const timer = window.setInterval(go, 4000);
    return () => {
      on = false;
      window.clearInterval(timer);
    };
  }, [reference]);
  const paid = status?.paymentStatus === "paid";
  return (
    <StorefrontShell>
      <Card className="mx-auto max-w-xl text-center">
        <CardContent className="py-12">
          <div
            className={`mx-auto grid size-16 place-items-center rounded-full ${paid ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}
          >
            <CheckCircle2 className="size-8" />
          </div>
          <h1 className="font-display mt-6 text-3xl font-bold">
            {paid ? "Payment received" : "Payment status pending"}
          </h1>
          <p className="mt-4 leading-7 text-stone-600">
            {error ||
              (!status
                ? "Checking your payment…"
                : paid
                  ? `Your pickup order is confirmed for ${rupiah(status.totalPrice)}.`
                  : "We will refresh this page when Midtrans confirms your payment. Do not pay twice.")}
          </p>
          {reference && (
            <p className="mt-6 text-xs font-medium tracking-wide text-stone-400">
              ORDER REFERENCE · {reference}
            </p>
          )}
          <Button asChild className="mt-8">
            <Link to="/">Continue shopping</Link>
          </Button>
        </CardContent>
      </Card>
    </StorefrontShell>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Catalog />} />
      <Route path="/products/:id" element={<ProductPage />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/payment/:reference" element={<Confirmation />} />
    </Routes>
  );
}
