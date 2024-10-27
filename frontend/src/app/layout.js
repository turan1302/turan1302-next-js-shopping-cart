"use client";

import Header from "@/components/common/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { CartProvider } from "react-use-cart";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
