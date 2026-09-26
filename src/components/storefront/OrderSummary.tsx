import { Link } from "react-router";
import { useCart } from "@/contexts/Cart";
import { rupiah } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type OrderSummaryProps = { total: number; items?: ReturnType<typeof useCart>["items"]; checkout?: boolean };

export function OrderSummary({ total, items, checkout }: OrderSummaryProps) {
  return (
    <Card className="h-fit lg:sticky lg:top-24">
      <CardHeader><CardTitle>{checkout ? "Order summary" : "Pickup order"}</CardTitle><CardDescription>Pickup only · Secure payment via Midtrans</CardDescription></CardHeader>
      <CardContent>
        {items?.map((item) => <div className="mb-3 flex justify-between gap-3 text-sm" key={item.product.id}><span className="text-stone-600">{item.product.name} × {item.quantity}</span><b>{rupiah(item.product.price * item.quantity)}</b></div>)}
        {items?.length ? <Separator className="my-5" /> : null}
        <div className="flex justify-between"><b>Total</b><strong className="text-xl">{rupiah(total)}</strong></div>
        {checkout && <Button asChild className="mt-6 w-full"><Link to="/checkout">Checkout</Link></Button>}
      </CardContent>
    </Card>
  );
}
