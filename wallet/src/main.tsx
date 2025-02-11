import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router'

const favicon = document.getElementById('favicon')
const appTitle = document.getElementById('app-title')
const projectName = import.meta.env.VITE_PROJECT_NAME
const smallLogo = import.meta.env.VITE_PROJECT_SMALL_LOGO
if (favicon instanceof HTMLLinkElement && smallLogo) {
  favicon.href = smallLogo
}
if (appTitle && projectName) {
  appTitle.textContent = projectName + ' ' + 'Wallet'
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
