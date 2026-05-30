import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import SettingsPage from "./SettingsPage";
import ProfilePage from "./ProfilePage";
import YourPage from "./pages/YourPage";
<<<<<<< HEAD
import LoginPage from "./LoginPage";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, _hasHydrated } = useAuthStore()

  console.log("_hasHydrated:", _hasHydrated, "isAuthenticated:", isAuthenticated)

  if (!_hasHydrated) return null
  if (!isAuthenticated) return <Navigate to="/" replace />
  return <>{children}</>
}
=======
import PostDetailPage from "./pages/PostDetailPage";
>>>>>>> feat/febrianti-post

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
<<<<<<< HEAD
        <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/notifications" element={<ProtectedRoute><YourPage /></ProtectedRoute>} />
        <Route path="*" element={<LoginPage />} />
=======
        <Route path="/home" element={<HomePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/notifications" element={<YourPage />} />
        <Route path="/post/:id" element={<PostDetailPage />} />
>>>>>>> feat/febrianti-post
      </Routes>
    </Router>
  );
}

export default App;
