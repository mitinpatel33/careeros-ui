import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme/theme.ts";
import { store } from "./store/store.ts";
import { Provider } from "react-redux";
import AppToaster from "./common/toast/AppToaster.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
        <AppToaster />
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);
