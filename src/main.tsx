import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App";
import { CartProvider } from "./contexts/cart";
import { ToastProvider } from "./contexts/toast";
import "./index.css";
createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ToastProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </ToastProvider>
  </BrowserRouter>,
);
