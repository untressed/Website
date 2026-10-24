import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.jsx'

const rootEl = document.getElementById('root');
if (rootEl) {
  try {
    createRoot(rootEl).render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
  } catch (err) {
    console.error('Failed to render React app:', err);
    rootEl.innerHTML = `<div style="padding:40px;color:#c62828;background:#ffebee;font-family:sans-serif;"><h3>Application Render Error</h3><pre>${err.stack || err.message}</pre></div>`;
  }
}
