import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Pastikan lokasi import ini sesuai dengan file di laptopmu
import HomePage from "./HomePage";
import SettingsPage from "./SettingsPage";
import YourPage from "./pages/YourPage";

function App() {
  // Dummy user untuk dipassing ke navbar agar tidak error
  const dummyUser = { name: "Arjun Maheswara", email: "arjun@mail.com" };

  return (
    <Router>
      <Routes>
        {/* Redirect otomatis dari root ke /home */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        
        {/* Halaman Utama Kelompok */}
        <Route path="/home" element={<HomePage user={dummyUser} />} />
        <Route path="/settings" element={<SettingsPage />} />
        
        {/* INI ROUTE UNTUK HALAMAN FITUR BARUMU */}
        <Route path="/your-feature" element={<YourPage />} />
      </Routes>
    </Router>
  );
}

export default App;