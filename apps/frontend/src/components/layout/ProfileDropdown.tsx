import {
  MessageSquareText,
  Bookmark,
  FilePenLine,
  BarChart3,
  ChevronRight,
} from "lucide-react";

import { useNavigate }
from "react-router-dom";

type ProfileDropdownProps = {
  onClose?: () => void;

  user: {
    name: string;
    email: string;
  };
};

export default function ProfileDropdown({
  onClose,
  user,
}: ProfileDropdownProps) {

  const navigate = useNavigate();

  return (
    <div className="profile-dropdown">

      {/* HEADER */}
      <div className="profile-dropdown-header">

        <div className="profile-dropdown-user">

          <div className="profile-dropdown-avatar">
            {user.name.charAt(0).toUpperCase()}
          </div>

          <div>
            <h3>
              {user.name}
            </h3>
          </div>

        </div>

        <ChevronRight size={18} />

      </div>

      {/* MENU TOP */}
      <div className="profile-dropdown-section">

        <button className="profile-dropdown-item">
          <MessageSquareText size={18} />
          <span>Pesan</span>
        </button>

        <button className="profile-dropdown-item">
          <Bookmark size={18} />
          <span>Daftar Bacaan</span>
        </button>

        <button className="profile-dropdown-item">
          <FilePenLine size={18} />
          <span>Draf</span>
        </button>

        <button className="profile-dropdown-item">
          <BarChart3 size={18} />
          <span>Konten & statistik Anda</span>
        </button>

      </div>

      {/* SETTINGS */}
      <div className="profile-dropdown-section">

        <button className="profile-dropdown-simple">
          Mode gelap

          <span className="auto-badge">
            Otomatis
          </span>
        </button>

        <button
          className="profile-dropdown-simple"
          onClick={() =>
            navigate("/settings")
          }
        >
          Setelan
        </button>

        <button className="profile-dropdown-simple">
          Bahasa
        </button>

        <button className="profile-dropdown-simple">
          Bantuan
        </button>

        <button className="profile-dropdown-simple logout">
          Keluar
        </button>

      </div>

      {/* FOOTER */}
      <div className="profile-dropdown-footer">

        <span>Tentang Qarou</span>
        <span>·</span>

        <span>Ketentuan</span>
        <span>·</span>

        <span>Privasi</span>
        <span>·</span>

        <span>Penggunaan Dapat Diterima</span>
        <span>·</span>

        <span>Beriklan</span>
        <span>·</span>

        <span>Karier</span>

      </div>

    </div>
  );
}