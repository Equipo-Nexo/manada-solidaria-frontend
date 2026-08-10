import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "@hooks/toast/ToastProvider";
import { persistor, store } from "@store/store";
import { GlobalStyle } from "@styles/GlobalStyle.ts";
import { theme } from "@styles/theme.ts";
import { defineCustomElements } from "@ionic/pwa-elements/loader";
import "cally";

declare const __APP_VERSION__: string;

console.log(`Manada Solidaria v${__APP_VERSION__}`);

void defineCustomElements(window);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <BrowserRouter>
            <ToastProvider>
              <App />
            </ToastProvider>
          </BrowserRouter>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
);
