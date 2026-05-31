import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./stores/AuthStore";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import SettingsPage from "./SettingsPage";
import ProfilePage from "./ProfilePage";
import YourPage from "./pages/YourPage";
import PostDetailPage from "./pages/PostDetailPage";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, _hasHydrated } = useAuthStore()

  if (!_hasHydrated) return null
  if (!isAuthenticated) return <Navigate to="/" replace />
  return <>{children}</>
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute><YourPage /></ProtectedRoute>} />
        <Route path="/post/:id" element={<ProtectedRoute><PostDetailPage /></ProtectedRoute>} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;