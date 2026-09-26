import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { api } from "@/lib/api";
import { useCart } from "@/contexts/Cart";
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
import { OrderSummary } from "@/components/storefront/OrderSummary";
import { StorefrontShell } from "@/components/storefront/StorefrontShell";

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

export function CheckoutPage() {
  const { items, total, clear } = useCart();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  if (!items.length) {
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
  }

  const pay = async (event: React.FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const order = await api.checkout({
        customer: { name, email },
        items: items.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
      });
      await loadSnap();
      window.snap?.pay(order.snapToken, {
        onSuccess: () => {
          clear();
          navigate(`/payment/${order.publicReference}`);
        },
        onPending: () => navigate(`/payment/${order.publicReference}`),
        onError: () => navigate(`/payment/${order.publicReference}`),
        onClose: () => navigate(`/payment/${order.publicReference}`),
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
                  onChange={(event) => setName(event.target.value)}
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
                  onChange={(event) => setEmail(event.target.value)}
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
