import {
  Home,
  PenSquare,
  Bell,
  Search,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";

type TopNavbarProps = {
  user?: {
    name: string;
    email: string;
  };
};

export default function TopNavbar({ user }: TopNavbarProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const safeUser = user || { name: "Arjun Maheswara", email: "arjun@hmsi.untan.ac.id" };

  return (
    <header className="topnav">
      <div className="topnav-inner">
        {/* Logo Baru */}
        <div className="topnav-logo" style={{ cursor: "pointer", color: "#e6403b" }} onClick={() => navigate("/home")}>
          TanyaYuk
        </div>

        {/* Navigasi Inti */}
        <div className="topnav-nav">
          <button className="topnav-icon" title="Beranda" onClick={() => navigate("/home")}>
            <Home size={22} />
          </button>
          
          <button 
            className="topnav-icon" 
            title="Notifikasi" 
            onClick={() => navigate("/notifications")} // Diarahkan ke /notifications sesuai dengan rute endpoint backend
          >
            <Bell size={22} />
            <div className="notif-badge" />
          </button>
        </div>

        {/* Search */}
        <div className="topnav-search">
          <Search size={15} className="search-icon" />
          <input type="text" placeholder="Cari di TanyaYuk..." />
        </div>

        {/* Nav Right (Diberikan class 'relative' agar dropdown mengacu pada posisi container ini) */}
        <div className="topnav-right" style={{ position: "relative" }}>
          <button className="topnav-icon" title="Tulis">
            <PenSquare size={22} />
          </button>

          <button className="topnav-avatar" onClick={() => setShowDropdown(!showDropdown)}>
            {safeUser.name.charAt(0).toUpperCase()}
          </button>

          {/* Menampilkan dropdown profil dengan pengkondisian posisi */}
          {showDropdown && (
            <div style={{ position: "absolute", right: 0, top: "100%", zIndex: 50 }}>
              <ProfileDropdown user={safeUser} onClose={() => setShowDropdown(false)} />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}