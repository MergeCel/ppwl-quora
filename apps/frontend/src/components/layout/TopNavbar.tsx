import { useState } from "react";
import { Link } from "react-router-dom"; // Atau pakai 'a' href biasa kalau gak pakai react-router
import "./TopNavbar.css"; // Sesuaikan dengan style kelompokmu

export default function TopNavbar({ user }: { user: any }) {
  // 1. State buat kontrol dropdown profil terbuka/tertutup
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="top-navbar">
      {/* ... Sisi kiri navbar (Logo Quora, Search Bar, dll) biarkan tetap ... */}
      <div className="navbar-left">
        <span className="logo">Quora</span>
      </div>

      {/* ... Sisi kanan navbar (Tempat Foto Profil) ... */}
      <div className="navbar-right" style={{ position: "relative" }}>
        
        {/* Tombol Profil (Avatar) */}
        <button 
          className="profile-avatar-btn"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          style={{
            background: "#7c3aed",
            color: "white",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            cursor: "pointer",
            border: "none"
          }}
        >
          {user?.name ? user.name[0].toUpperCase() : "U"}
        </button>

        {/* 2. UI KOMPONEN DROPDOWN (Hanya muncul kalau isDropdownOpen === true) */}
        {isDropdownOpen && (
          <div 
            className="profile-dropdown-box"
            style={{
              position: "absolute",
              right: 0,
              top: "50px",
              background: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
              width: "200px",
              zIndex: 999,
              padding: "8px 0"
            }}
          >
            {/* Info User Singkat di dalam Dropdown */}
            <div style={{ padding: "8px 16px", borderBottom: "1px solid #f3f4f6" }}>
              <p style={{ fontWeight: "bold", color: "#1f2937", margin: 0 }}>{user?.name}</p>
              <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>{user?.email}</p>
            </div>

            {/* LINK MENU MENUJU SETTING */}
            <Link 
              to="/settings" 
              onClick={() => setIsDropdownOpen(false)}
              style={{
                display: "block",
                padding: "10px 16px",
                color: "#374151",
                textDecoration: "none",
                fontSize: "14px"
              }}
              className="dropdown-item-hover"
            >
              ⚙️ Pengaturan / Setting
            </Link>

            {/* Link Menu Logout */}
            <button
              onClick={() => {
                // Logika logout nanti di sini (hapus token dll)
                setIsDropdownOpen(false);
                alert("Logout diklik");
              }}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                padding: "10px 16px",
                color: "#dc2626",
                background: "none",
                border: "none",
                fontSize: "14px",
                cursor: "pointer"
              }}
            >
              🚪 Keluar
            </button>
          </div>
        )}

      </div>
    </header>
  );
}