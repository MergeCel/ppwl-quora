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
import { useNavigate } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";

type TopNavbarProps = {
  user?: {
    name: string;
    email: string;
    avatarUrl?: string;
  };
};

export default function TopNavbar({ user }: TopNavbarProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const safeUser = user || {
    name: "Arjun Maheswara",
    email: "arjun@hmsi.untan.ac.id",
  };

  return (
    <header className="topnav">
      <div className="topnav-inner">
        {/* Logo */}
        <div
          className="topnav-logo"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/home")}
        >
          Qarou
        </div>

        {/* Navigasi Inti */}
        <div className="topnav-nav">
          <button
            className="topnav-icon"
            title="Beranda"
            onClick={() => navigate("/home")}
          >
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
          <input type="text" placeholder="Cari Qarou" />
        </div>

        {/* Nav Right */}
        <div className="topnav-right">
          <button className="topnav-icon" title="Tulis">
            <PenSquare size={22} />
          </button>

          {/* PERBAIKAN: Tambahkan inline-flex dan align-items agar tidak merusak layout navbar */}
          <div
            style={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            <button
              className="topnav-avatar"
              style={{ overflow: "hidden", cursor: "pointer" }}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {safeUser.avatarUrl ? (
                <img
                  src={safeUser.avatarUrl}
                  alt={safeUser.name}
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                safeUser.name.charAt(0).toUpperCase()
              )}
            </button>

            {/* Menu Dropdown dipusatkan tepat di bawah tombol avatar */}
            {showDropdown && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 8px)", // Jarak vertikal dari tombol
                  left: "50%", // Geser titik awalnya ke tengah tombol
                  transform: "translateX(-50%)", // Tarik ke kiri separuh lebarnya agar benar-benar simetris
                  zIndex: 9999,
                }}
              >
                <ProfileDropdown
                  user={safeUser}
                  onClose={() => setShowDropdown(false)}
                />
              </div>
            )}
          </div>

          <button className="topnav-globe">
            <Globe size={18} />
          </button>
          <button className="topnav-question-btn">
            {window.innerWidth <= 768 ? "Tanya" : "Tambah pertanyaan"}
          </button>
        </div>
      </div>
    </header>
  );
}
