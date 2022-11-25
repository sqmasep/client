import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import TokenProvider from "./contexts/TokenContext";
import App from "./App";
import SettingsProvider from "./contexts/SettingsContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Router>
    <SettingsProvider>
      <TokenProvider>
        <App />
      </TokenProvider>
    </SettingsProvider>
  </Router>
);
