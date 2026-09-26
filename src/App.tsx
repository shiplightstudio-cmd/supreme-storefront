import { Route, Routes } from "react-router";
import { CartPage } from "@/pages/Cart";
import { CatalogPage } from "@/pages/Catalog";
import { CheckoutPage } from "@/pages/Checkout";
import { ConfirmationPage } from "@/pages/Confirmation";
import { ProductPage } from "@/pages/ProductPage";

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
