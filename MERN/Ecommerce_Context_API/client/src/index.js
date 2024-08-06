import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";


import "antd/dist/reset.css";
import { AuthProvider } from "./context/auth";
import { SearchProvider } from "./context/Search";
import { CartProvider } from "./context/Cart";

ReactDom.render(
  <>
    <BrowserRouter>
      <AuthProvider>
        <SearchProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </SearchProvider>
      </AuthProvider>
    </BrowserRouter>
  </>,
  document.getElementById("root")
);
