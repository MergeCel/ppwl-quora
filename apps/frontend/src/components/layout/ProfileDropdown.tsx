import {
  MessageSquareText,
  Bookmark,
  FilePenLine,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/AuthStore";

type ProfileDropdownProps = {
  onClose?: () => void;
  user: {
    name: string;
    email: string;
    avatarUrl?: string;
  };
};

export default function ProfileDropdown({ onClose, user }: ProfileDropdownProps) {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout)

  return (
    <div className="profile-dropdown">
      {/* HEADER */}
      <div
        className="profile-dropdown-header"
        onClick={() => {
          navigate("/profile");
          onClose?.();
        }}
      >
        <div className="profile-dropdown-user">
          <div className="profile-dropdown-avatar" style={{ overflow: "hidden" }}>
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name}
                style={{ width: "52px", height: "52px", borderRadius: "50%", objectFit: "cover" }}
              />
            ) : (
              user.name.charAt(0).toUpperCase()
            )}
          </div>
          <div>
            <h3>{user.name}</h3>
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
      </div>

      {/* SETTINGS */}
      <div className="profile-dropdown-section">
        <button
          className="profile-dropdown-simple"
          onClick={() => navigate("/settings")}
        >
          Setelan
        </button>
        <button
          className="profile-dropdown-simple logout"
          onClick={() => {
            logout()
            navigate("/")
          }}
        >
          Keluar
        </button>
      </div>
    </div>
  );
}