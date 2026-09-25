import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/api";
type Item = { product: Product; quantity: number };
type Cart = {
  items: Item[];
  add: (product: Product, quantity?: number) => void;
  setQuantity: (id: number, quantity: number) => void;
  remove: (id: number) => void;
  clear: () => void;
  count: number;
  total: number;
};
const Context = createContext<Cart | undefined>(undefined);
const key = "supreme-store-cart";
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Item[]>(() =>
    JSON.parse(localStorage.getItem(key) || "[]"),
  );
  useEffect(() => localStorage.setItem(key, JSON.stringify(items)), [items]);
  const value = useMemo<Cart>(
    () => ({
      items,
      add: (product, quantity = 1) =>
        setItems((current) => {
          const existing = current.find(
            (item) => item.product.id === product.id,
          );
          return existing
            ? current.map((item) =>
                item.product.id === product.id
                  ? {
                      ...item,
                      quantity: Math.min(
                        item.quantity + quantity,
                        product.quantity,
                      ),
                    }
                  : item,
              )
            : [
                ...current,
                { product, quantity: Math.min(quantity, product.quantity) },
              ];
        }),
      setQuantity: (id, quantity) =>
        setItems((current) =>
          current.map((item) =>
            item.product.id === id
              ? {
                  ...item,
                  quantity: Math.max(
                    1,
                    Math.min(quantity, item.product.quantity),
                  ),
                }
              : item,
          ),
        ),
      remove: (id) =>
        setItems((current) => current.filter((item) => item.product.id !== id)),
      clear: () => setItems([]),
      count: items.reduce((sum, item) => sum + item.quantity, 0),
      total: items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0,
      ),
    }),
    [items],
  );
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
export const useCart = () => {
  const cart = useContext(Context);
  if (!cart) throw new Error("useCart must be used inside CartProvider");
  return cart;
};
