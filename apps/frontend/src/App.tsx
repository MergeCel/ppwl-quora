import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./HomePage"; 
import SettingsPage from "./SettingsPage";
import YourPage from "./pages/YourPage";

function App() {
  // Dummy user untuk dipassing ke komponen yang membutuhkan data user (misal Navbar/Beranda)
  const dummyUser = { name: "Arjun Maheswara", email: "arjun@hmsi.untan.ac.id" };

  return (
    <Router>
      <Routes>
        {/* Rute awal otomatis dialihkan ke /home */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        
        {/* Rute Beranda */}
        <Route path="/home" element={<HomePage user={dummyUser} />} />
        
        {/* Rute Pengaturan */}
        <Route path="/settings" element={<SettingsPage />} />
        
        {/* Rute Fitur Barumu (Diubah path-nya menjadi /notifications agar sinkron) */}
        <Route path="/notifications" element={<YourPage />} />
      </Routes>
    </Router>
  );
}

export default App;