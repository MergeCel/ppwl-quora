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
import ProfileDropdown from "./ProfileDropdown";

type TopNavbarProps = {
  user: {
    name: string;
    email: string;
  };
};

export default function TopNavbar({ user }: TopNavbarProps) {
  // State untuk mengontrol buka-tutup dropdown profil
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="topnav">
      <div className="topnav-inner">

        {/* Sisi Kiri: Logo Quora */}
        <div className="topnav-logo">
          Quora
        </div>

        {/* Sisi Tengah: Menu Navigasi Ikon */}
        <div className="topnav-nav">
          <button className="topnav-icon active" title="Beranda">
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

          <button className="topnav-icon" title="Notifikasi">
            <Bell size={22} />
            <div className="notif-badge" />
          </button>
        </div>

        {/* Fitur Pencarian */}
        <div className="topnav-search">
          <Search size={15} className="search-icon" />
          <input type="text" placeholder="Cari Quora" />
        </div>

        {/* Sisi Kanan: Avatar User, Bahasa, dan Tombol Pertanyaan */}
        <div className="topnav-right">
          
          {/* Pembungkus Relatif untuk Mengunci Posisi Dasar Dropdown */}
          <div style={{ position: "relative", display: "inline-block" }}>
            {/* Tombol Avatar */}
            <button
              className="topnav-avatar"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </button>

            {/* KUNCI UTAMA: Kita bungkus ProfileDropdown dan timpa CSS right-nya secara paksa */}
            {showDropdown && (
              <div style={{ position: "absolute", right: 0, top: 0, zIndex: 99999 }} className="forced-dropdown-wrapper">
                <ProfileDropdown 
                  user={user} 
                  onClose={() => setShowDropdown(false)} 
                />
                {/* Tag style inline di bawah ini buat nabrak nilai 'right: 90px' bawaan dari home.css */}
                <style>{`
                  .profile-dropdown {
                    right: 0px !important;
                    top: 50px !important;
                  }
                `}</style>
              </div>
            )}
          </div>

          <button className="topnav-globe">
            <Globe size={18} />
          </button>

          <button className="topnav-question-btn">
            Tambah pertanyaan
          </button>

        </div>

      </div>
    </header>
  );
}