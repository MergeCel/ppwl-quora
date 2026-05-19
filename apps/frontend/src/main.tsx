import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './style/index.css'
import './style/home.css'
import './style/login.css'
import './style/settings.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)