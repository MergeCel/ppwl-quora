import {
  Home,
  ClipboardList,
  PenSquare,
  Users,
  Bell,
  Search,
  Globe,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 👈 Impor useNavigate
import ProfileDropdown from "./ProfileDropdown";

type TopNavbarProps = {
  user: {
    name: string;
    email: string;
  };
};

export default function TopNavbar({ user }: TopNavbarProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate(); // 👈 Inisialisasi navigasi

  return (
    <header className="topnav">
      <div className="topnav-inner">

        {/* Logo */}
        <div className="topnav-logo" style={{ cursor: "pointer" }} onClick={() => navigate("/home")}>
          Quora
        </div>

        {/* Nav icons */}
        <div className="topnav-nav">
          <button className="topnav-icon" title="Beranda" onClick={() => navigate("/home")}>
            <Home size={22} />
          </button>

          <button className="topnav-icon" title="Jawabanku">
            <ClipboardList size={22} />
            <div className="notif-dot" />
          </button>

          <button className="topnav-icon" title="Tulis">
            <PenSquare size={22} />
          </button>

          <button className="topnav-icon" title="Komunitas">
            <Users size={22} />
          </button>

          {/* 🚀 TOMBOL NOTIFIKASI SEKARANG MENGARAH KE HALAMAN FITUR NOTIFIKASIMU */}
          <button 
            className="topnav-icon" 
            title="Notifikasi" 
            onClick={() => navigate("/your-feature")}
          >
            <Bell size={22} />
            <div className="notif-badge" />
          </button>
        </div>

        {/* Search */}
        <div className="topnav-search">
          <Search size={15} className="search-icon" />
          <input type="text" placeholder="Cari Quora" />
        </div>

        {/* Right */}
        <div className="topnav-right">
          <button
            className="topnav-avatar"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </button>

          <button className="topnav-globe">
            <Globe size={18} />
          </button>

          <button className="topnav-question-btn">
            Tambah pertanyaan
          </button>

          {showDropdown && (
            <ProfileDropdown 
              user={user} 
              onClose={() => setShowDropdown(false)} 
            />
          )}
        </div>

      </div>
    </header>
  );
}