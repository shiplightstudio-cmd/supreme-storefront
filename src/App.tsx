import { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  Boxes,
  CheckCircle2,
  Minus,
  Plus,
  ShoppingBag,
} from "lucide-react";
import { api, type Product } from "@/lib/api";
import { useCart } from "@/contexts/cart";
import { rupiah } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
function Header() {
  const { count } = useCart();
  return (
    <header className="sticky top-0 z-10 border-b bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link
          className="flex items-center gap-2 font-bold text-slate-900"
          to="/"
        >
          <span className="rounded-lg bg-teal-700 p-2 text-white">
            <Boxes size={18} />
          </span>
          Supreme Store
        </Link>
        <Link
          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-slate-100"
          to="/cart"
        >
          <ShoppingBag size={18} />
          Cart{" "}
          {count > 0 && (
            <span className="rounded-full bg-teal-700 px-2 py-0.5 text-xs text-white">
              {count}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="mx-auto min-h-[calc(100vh-4rem)] max-w-6xl px-4 py-10">
        {children}
      </main>
    </>
  );
}
function Catalog() {
  const [products, setProducts] = useState<Product[]>([]),
    [error, setError] = useState("");
  useEffect(() => {
    api
      .products()
      .then(setProducts)
      .catch((error) => setError(error.message));
  }, []);
  return (
    <Shell>
      <section className="mb-10 max-w-2xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-teal-700">
          Pickup collection
        </p>
        <h1 className="text-4xl font-bold tracking-tight">
          Made for the work ahead.
        </h1>
        <p className="mt-3 text-slate-600">
          Browse finished products available for pickup. Prices are shown in
          Indonesian rupiah.
        </p>
      </section>
      {error && (
        <p className="rounded-md bg-red-50 p-4 text-red-700">{error}</p>
      )}
      {!error && !products.length && (
        <p className="text-slate-500">Loading products…</p>
      )}
      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </Shell>
  );
}
function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  return (
    <article className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <Link
        to={`/products/${product.id}`}
        className="flex h-44 items-center justify-center bg-gradient-to-br from-teal-700 to-cyan-700 text-white"
      >
        <Boxes size={58} />
      </Link>
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <Link
            to={`/products/${product.id}`}
            className="font-semibold hover:underline"
          >
            {product.name}
          </Link>
          <span className="whitespace-nowrap font-semibold">
            {rupiah(product.price)}
          </span>
        </div>
        <p className="mt-2 text-sm text-slate-500">
          {product.quantity > 0
            ? `${product.quantity} ready for pickup`
            : "Out of stock"}
        </p>
        <Button
          className="mt-5 w-full"
          disabled={!product.quantity}
          onClick={() => add(product)}
        >
          Add to cart
        </Button>
      </div>
    </article>
  );
}
function ProductPage() {
  const { id } = useParams(),
    [product, setProduct] = useState<Product>(),
    [error, setError] = useState("");
  const { add } = useCart();
  useEffect(() => {
    if (id)
      api
        .product(id)
        .then(setProduct)
        .catch((error) => setError(error.message));
  }, [id]);
  if (error)
    return (
      <Shell>
        <p className="text-red-700">{error}</p>
      </Shell>
    );
  if (!product)
    return (
      <Shell>
        <p className="text-slate-500">Loading product…</p>
      </Shell>
    );
  return (
    <Shell>
      <Link
        to="/"
        className="mb-8 inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-950"
      >
        <ArrowLeft size={16} />
        Back to collection
      </Link>
      <section className="grid gap-10 md:grid-cols-2">
        <div className="flex min-h-80 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-700 to-cyan-700 text-white">
          <Boxes size={96} />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-700">
            Finished good
          </p>
          <h1 className="mt-2 text-4xl font-bold">{product.name}</h1>
          <p className="mt-5 text-3xl font-semibold">{rupiah(product.price)}</p>
          <p className="mt-2 text-slate-600">
            {product.quantity} available for pickup
          </p>
          {product.properties.length > 0 && (
            <dl className="mt-7 grid grid-cols-2 gap-3">
              {product.properties.map((property) => (
                <div
                  key={property.name}
                  className="rounded-lg bg-slate-100 p-3"
                >
                  <dt className="text-xs uppercase text-slate-500">
                    {property.name}
                  </dt>
                  <dd className="mt-1 font-medium">{property.value}</dd>
                </div>
              ))}
            </dl>
          )}
          <Button
            className="mt-8 w-full sm:w-auto"
            disabled={!product.quantity}
            onClick={() => add(product)}
          >
            Add to cart
          </Button>
        </div>
      </section>
    </Shell>
  );
}
function CartPage() {
  const { items, setQuantity, remove, total } = useCart();
  return (
    <Shell>
      <h1 className="text-3xl font-bold">Your cart</h1>
      {!items.length ? (
        <div className="mt-8 rounded-xl border bg-white p-8">
          <p>Your cart is empty.</p>
          <Button className="mt-4" as-child={undefined as never}>
            <Link to="/">Browse products</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="space-y-3">
            {items.map(({ product, quantity }) => (
              <article
                className="flex items-center gap-4 rounded-xl border bg-white p-4"
                key={product.id}
              >
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-teal-700 text-white">
                  <Boxes />
                </div>
                <div className="min-w-0 flex-1">
                  <Link
                    className="font-semibold hover:underline"
                    to={`/products/${product.id}`}
                  >
                    {product.name}
                  </Link>
                  <p className="text-sm text-slate-500">
                    {rupiah(product.price)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(product.id, quantity - 1)}
                  >
                    <Minus size={14} />
                  </Button>
                  <span className="w-6 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(product.id, quantity + 1)}
                    disabled={quantity >= product.quantity}
                  >
                    <Plus size={14} />
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => remove(product.id)}
                >
                  Remove
                </Button>
              </article>
            ))}
          </div>
          <aside className="h-fit rounded-xl border bg-white p-5">
            <h2 className="font-semibold">Order summary</h2>
            <div className="my-5 flex justify-between border-y py-4">
              <span>Total</span>
              <strong>{rupiah(total)}</strong>
            </div>
            <Button className="w-full" as-child={undefined as never}>
              <Link to="/checkout">Checkout</Link>
            </Button>
            <p className="mt-3 text-xs text-slate-500">
              Pickup only. Secure payment is provided by Midtrans.
            </p>
          </aside>
        </div>
      )}
    </Shell>
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
      <Shell>
        <p>Your cart is empty.</p>
        <Link className="mt-4 inline-block text-teal-700 underline" to="/">
          Browse products
        </Link>
      </Shell>
    );
  const pay = async (event: React.FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const checkout = await api.checkout({
        customer: { name, email },
        items: items.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
      });
      await loadSnap();
      window.snap?.pay(checkout.snapToken, {
        onSuccess: () => {
          clear();
          navigate(`/payment/${checkout.publicReference}`);
        },
        onPending: () => navigate(`/payment/${checkout.publicReference}`),
        onError: () => navigate(`/payment/${checkout.publicReference}`),
        onClose: () => navigate(`/payment/${checkout.publicReference}`),
      });
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Unable to start payment",
      );
    } finally {
      setBusy(false);
    }
  };
  return (
    <Shell>
      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <form onSubmit={pay} className="rounded-xl border bg-white p-6">
          <h1 className="text-3xl font-bold">Checkout</h1>
          <p className="mt-2 text-slate-600">
            Enter your details, then choose a Midtrans payment method.
          </p>
          <label className="mt-7 block text-sm font-medium">
            Name
            <input
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-2 w-full rounded-md border px-3 py-2"
            />
          </label>
          <label className="mt-5 block text-sm font-medium">
            Email
            <input
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-md border px-3 py-2"
            />
          </label>
          {error && (
            <p className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-700">
              {error}
            </p>
          )}
          <Button className="mt-7 w-full" disabled={busy}>
            {busy ? "Opening payment…" : `Pay ${rupiah(total)}`}
          </Button>
        </form>
        <aside className="h-fit rounded-xl border bg-white p-5">
          <h2 className="font-semibold">Pickup order</h2>
          {items.map((item) => (
            <div
              className="mt-3 flex justify-between text-sm"
              key={item.product.id}
            >
              <span>
                {item.product.name} × {item.quantity}
              </span>
              <span>{rupiah(item.product.price * item.quantity)}</span>
            </div>
          ))}
          <div className="mt-5 flex justify-between border-t pt-4 font-semibold">
            <span>Total</span>
            <span>{rupiah(total)}</span>
          </div>
        </aside>
      </div>
    </Shell>
  );
}
function Confirmation() {
  const { reference } = useParams(),
    [status, setStatus] = useState<{
      paymentStatus: string;
      orderStatus: string;
      totalPrice: number;
    }>(),
    [error, setError] = useState("");
  useEffect(() => {
    if (!reference) return;
    let active = true;
    const refresh = () =>
      api
        .status(reference)
        .then((value) => active && setStatus(value))
        .catch((error) => active && setError(error.message));
    refresh();
    const timer = window.setInterval(refresh, 4000);
    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, [reference]);
  const paid = status?.paymentStatus === "paid";
  return (
    <Shell>
      <section className="mx-auto max-w-xl rounded-2xl border bg-white p-8 text-center">
        <CheckCircle2
          className={paid ? "mx-auto text-teal-600" : "mx-auto text-amber-500"}
          size={52}
        />
        <h1 className="mt-5 text-3xl font-bold">
          {paid ? "Payment received" : "Payment status pending"}
        </h1>
        <p className="mt-3 text-slate-600">
          {error ||
            (!status
              ? "Checking your payment…"
              : paid
                ? `Your pickup order is confirmed for ${rupiah(status.totalPrice)}.`
                : "We will refresh this page when Midtrans confirms your payment. Do not pay twice.")}
        </p>
        {reference && (
          <p className="mt-5 text-xs text-slate-500">
            Order reference: {reference}
          </p>
        )}
        <Button className="mt-7" as-child={undefined as never}>
          <Link to="/">Continue shopping</Link>
        </Button>
      </section>
    </Shell>
  );
}
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Catalog />} />
      <Route path="/products/:id" element={<ProductPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/payment/:reference" element={<Confirmation />} />
    </Routes>
  );
}
