import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './style/index.css'
import './style/home.css'
import './style/login.css'
import './style/settings.css'
import SettingsPage from "./SettingsPage.tsx";
import HomePage from "./HomePage.tsx";
import YourPage from "./pages/YourPage.tsx"; // 👈 Impor halaman fitur barumu

const DefaultApp = lazy(() => import('./LoginPage'))

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/home" element={<HomePage />} />
          
          {/* 🔔 ROUTE HALAMAN NOTIFIKASI */}
          <Route path="/your-feature" element={<YourPage />} />
          
          <Route path="/" element={<DefaultApp />} />
          <Route path="*" element={<DefaultApp />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>
)