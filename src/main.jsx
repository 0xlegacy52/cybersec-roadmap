import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '../cybersec-roadmap.jsx'

if (import.meta.env.DEV && 'serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations()
    .then((registrations) => {
      registrations.forEach((registration) => {
        if (registration.scope.includes(import.meta.env.BASE_URL)) registration.unregister()
      })
    })
    .catch(() => {})
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
