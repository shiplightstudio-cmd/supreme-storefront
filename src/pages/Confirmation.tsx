import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Link, useParams } from "react-router";
import { api } from "@/lib/api";
import { rupiah } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StorefrontShell } from "@/components/storefront/StorefrontShell";

type PaymentStatus = { paymentStatus: string; totalPrice: number };

export function ConfirmationPage() {
  const { reference } = useParams();
  const [status, setStatus] = useState<PaymentStatus>();
  const [error, setError] = useState("");

  useEffect(() => {
    if (!reference) return;
    let active = true;
    const loadStatus = () => api.status(reference).then((status) => active && setStatus(status)).catch((error: Error) => active && setError(error.message));
    loadStatus();
    const timer = window.setInterval(loadStatus, 4000);
    return () => { active = false; window.clearInterval(timer); };
  }, [reference]);

  const paid = status?.paymentStatus === "paid";
  const message = error || (!status ? "Checking your payment…" : paid ? `Your pickup order is confirmed for ${rupiah(status.totalPrice)}.` : "We will refresh this page when Midtrans confirms your payment. Do not pay twice.");

  return (
    <StorefrontShell>
      <Card className="mx-auto max-w-xl text-center">
        <CardContent className="py-12">
          <div className={`mx-auto grid size-16 place-items-center rounded-full ${paid ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}><CheckCircle2 className="size-8" /></div>
          <h1 className="font-display mt-6 text-3xl font-bold">{paid ? "Payment received" : "Payment status pending"}</h1>
          <p className="mt-4 leading-7 text-stone-600">{message}</p>
          {reference && <p className="mt-6 text-xs font-medium tracking-wide text-stone-400">ORDER REFERENCE · {reference}</p>}
          <Button asChild className="mt-8"><Link to="/">Continue shopping</Link></Button>
        </CardContent>
      </Card>
    </StorefrontShell>
  );
}
