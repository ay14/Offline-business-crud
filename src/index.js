import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { DbProvider } from "./context/DbContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DbProvider>
      <App />
    </DbProvider>
  </React.StrictMode>
);
