import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './style/index.css'
import SettingsPage from "./SettingsPage";

// Menggunakan lazy loading agar file hanya diunduh saat dibutuhkan
const ClassroomApp = lazy(() => import('./App3'))
const DefaultApp = lazy(() => import('./LoginPage'))

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      {/* Suspense wajib ada saat menggunakan lazy loading */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Rute untuk /classroom */}
          <Route path="/classroom" element={<ClassroomApp />} />
          <Route path="/settings" element={<SettingsPage />} />
          {/* Rute default (index) atau rute lain */}
          <Route path="/" element={<DefaultApp />} />
          
          {/* Opsional: Rute 404 jika halaman tidak ditemukan */}
          <Route path="*" element={<DefaultApp />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>
)