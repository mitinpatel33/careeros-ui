import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme/theme.ts";
import { store } from "./store/store.ts";
import { Provider } from "react-redux";
import AppToaster from "./common/toast/AppToaster.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;

console.log('googleClientId===========>', googleClientId)

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={googleClientId}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
          <AppToaster />
        </ThemeProvider>
      </Provider>
    </GoogleOAuthProvider>
  </StrictMode>,
);
