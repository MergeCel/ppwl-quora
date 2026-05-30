import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import SettingsPage from "./SettingsPage";
import YourPage from "./pages/YourPage";
import PostDetailPage from "./pages/PostDetailPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/notifications" element={<YourPage />} />
        <Route path="/post/:id" element={<PostDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
