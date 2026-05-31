import TopNavbar from "./components/layout/TopNavbar";
import EditNameModal from "./components/profile/EditNameModal";
import "./style/profile.css";
import { useRef, useState } from "react";
import { useAuthStore } from "./stores/AuthStore";

export default function ProfilePage() {
  const { user: storeUser } = useAuthStore()

  const [avatar, setAvatar] = useState<string | null>(storeUser?.avatarUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showEditName, setShowEditName] = useState(false);
  const [displayName, setDisplayName] = useState(storeUser?.name || "User");

  return (
    <div className="profile-page">
      <TopNavbar user={{
        name: storeUser?.name || "User",
        email: storeUser?.email || "",
        avatarUrl: storeUser?.avatarUrl || undefined
      }} />
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar-wrapper">
            <div className="profile-avatar" style={{ overflow: "hidden", padding: 0 }}>
              {avatar ? (
                <img
                  src={avatar}
                  alt="Profile"
                  className="profile-avatar-img"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                displayName.charAt(0)
              )}
            </div>

            <button
              className="edit-avatar-btn"
              onClick={() => fileInputRef.current?.click()}
            >
              ✎
            </button>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const imageUrl = URL.createObjectURL(file);
                  setAvatar(imageUrl);
                }
              }}
            />
          </div>

          <div className="profile-info">
            <h1
              onClick={() => setShowEditName(true)}
              style={{ cursor: "pointer" }}
            >
              {displayName}
            </h1>
            <p>Tambahkan kredensial profil</p>
            <span>0 pengikut · Mengikuti 1</span>
          </div>
        </div>

        <div className="profile-section">
          <h2>Profil</h2>
          <div className="empty-profile">
            Anda belum membagikan apa pun.
          </div>
        </div>
      </div>

      {showEditName && (
        <EditNameModal
          currentName={displayName}
          onClose={() => setShowEditName(false)}
          onSave={(newName) => setDisplayName(newName)}
        />
      )}
    </div>
  );
}