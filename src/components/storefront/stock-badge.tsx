import { PackageCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function StockBadge({ quantity }: { quantity: number }) {
  return quantity > 0 ? (
    <Badge variant="success">
      <PackageCheck className="mr-1 size-3.5" />
      {quantity} ready for pickup
    </Badge>
  ) : (
    <Badge variant="destructive">Out of stock</Badge>
  );
}
