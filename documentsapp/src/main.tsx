import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "react-oidc-context";
import "./index.css";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./libs/queryClientConfig.ts";
import oidcConfig from "./oidcConfig";
import { createTheme, ThemeProvider } from "@mui/material";
import getCustomTheme from './getCustomTheme.tsx';
export const theme = createTheme(
    getCustomTheme("light")

);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <AuthProvider userManager={oidcConfig}>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
