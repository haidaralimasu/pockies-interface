import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { DAppProvider } from "@usedapp/core";
import { supportedChainId, rpcUrl } from "./config";

const config = {
  readOnlyChainId: supportedChainId,
  readOnlyUrls: {
    [supportedChainId]: rpcUrl,
  },
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <App />
    </DAppProvider>
  </React.StrictMode>
);
