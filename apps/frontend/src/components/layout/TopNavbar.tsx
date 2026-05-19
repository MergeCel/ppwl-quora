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

        {/* Sisi Kanan: KEMBALI KE STRUKTUR ASLI TANPA BUNGKUSAN DIV ANEH */}
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

          {/* Ditaruh langsung di sini agar CSS right: 90px bawaan Sheren bekerja sempurna */}
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