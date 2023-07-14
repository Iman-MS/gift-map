import React from "react";
import ReactDOM from "react-dom/client";

import { CookiesProvider } from "react-cookie";

import App from "./App";
import { AuthContextProvider } from "./contexts/auth-context";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CookiesProvider>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </CookiesProvider>
);
