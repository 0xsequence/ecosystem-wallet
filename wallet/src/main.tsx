import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'

import { App as Router } from './App.tsx'
import { AppContextProvider } from './context/AppContext.tsx'
import './index.css'
import { THEME } from './utils/theme'

const favicon = document.getElementById('favicon')
const appTitle = document.getElementById('app-title')

if (favicon instanceof HTMLLinkElement && THEME.favicon) {
  favicon.href = THEME.favicon
}
if (appTitle && THEME.name) {
  appTitle.textContent = THEME.name + ' ' + 'Wallet'
}
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <div id="app" className="flex flex-col flex-1">
        <AppContextProvider>
          <Router />
        </AppContextProvider>
      </div>
    </BrowserRouter>
  </StrictMode>
)
