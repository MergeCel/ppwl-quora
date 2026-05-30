import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./stores/AuthStore";
import HomePage from "./HomePage";
import SettingsPage from "./SettingsPage";
import ProfilePage from "./ProfilePage";
import YourPage from "./pages/YourPage";
import LoginPage from "./LoginPage";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, _hasHydrated } = useAuthStore()

  console.log("_hasHydrated:", _hasHydrated, "isAuthenticated:", isAuthenticated)

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
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/notifications" element={<ProtectedRoute><YourPage /></ProtectedRoute>} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;