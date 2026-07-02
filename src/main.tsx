import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ToastProvider } from './hooks/ToastProvider'
import { persistor, store } from './app/store/store'
import { GlobalStyle } from './styles/GlobalStyle'
import { theme } from './styles/theme'

declare const __APP_VERSION__: string

console.log(`Manada Solidaria v${__APP_VERSION__}`)

createRoot(document.getElementById('root')!).render(
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
)
