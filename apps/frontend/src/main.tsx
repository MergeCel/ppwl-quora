import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './style/index.css'
import './style/home.css'
import './style/login.css'
import './style/settings.css'
import SettingsPage from "./SettingsPage.tsx";
import HomePage from "./HomePage.tsx";
import YourPage from "./pages/YourPage.tsx"; // 👈 Impor halaman fitur barumu di sini

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
          
          {/* 🚀 ROUTE RESMI UNTUK HALAMAN FITUR ARJUN */}
          <Route path="/your-feature" element={<YourPage />} />
          
          <Route path="/" element={<DefaultApp />} />
          <Route path="*" element={<DefaultApp />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>
)