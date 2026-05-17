import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './style/index.css'
import SettingsPage from "./SettingsPage.tsx";
import HomePage from "./HomePage.tsx";

// Menggunakan lazy loading agar file hanya diunduh saat dibutuhkan
const DefaultApp = lazy(() => import('./LoginPage'))

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      {/* Suspense wajib ada saat menggunakan lazy loading */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={<DefaultApp />} />
          <Route path="*" element={<DefaultApp />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>
)