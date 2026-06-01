import { Home, PenSquare, Bell, Search, Globe } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";

// Tambahkan onOpenModal pada tipe props
type TopNavbarProps = {
  user?: {
    name: string;
    email: string;
    avatarUrl?: string;
  };
  onOpenModal?: () => void;
};

// Terima props onOpenModal
export default function TopNavbar({ user, onOpenModal }: TopNavbarProps) {
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
            onClick={() => navigate("/notifications")}
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

          {/* Wrapper Avatar dan Dropdown (Dipusatkan) */}
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

            {/* Menu Dropdown */}
            {showDropdown && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 8px)",
                  left: "50%",
                  transform: "translateX(-50%)",
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

          {/* Tombol Tambah Pertanyaan (Memicu Modal Pop-up) */}
          <button className="topnav-question-btn" onClick={onOpenModal}>
            {window.innerWidth <= 768 ? "Tanya" : "Tambah pertanyaan"}
          </button>
        </div>
      </div>
    </header>
  );
}
