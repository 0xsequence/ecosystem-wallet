import "@0xsequence/design-system/styles.css";
import { ThemeProvider } from "@0xsequence/design-system";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";

import App from "./App.tsx";
import "./index.css";

import { config } from "./wagmiConfig.ts";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <div id="app">
          <ThemeProvider root="#app" scope="app" theme="dark">
            <App />
          </ThemeProvider>
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>
);
