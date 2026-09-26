import { Route, Routes } from "react-router";
import { CartPage } from "@/pages/cart";
import { CatalogPage } from "@/pages/catalog";
import { CheckoutPage } from "@/pages/checkout";
import { ConfirmationPage } from "@/pages/confirmation";
import { ProductPage } from "@/pages/product-page";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<CatalogPage />} />
      <Route path="/products/:id" element={<ProductPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/payment/:reference" element={<ConfirmationPage />} />
    </Routes>
  );
}
