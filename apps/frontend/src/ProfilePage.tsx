import TopNavbar from "./components/layout/TopNavbar";
import EditNameModal from "./components/profile/EditNameModal";
import "./style/profile.css";
import { useRef, useState } from "react";
import { useAuthStore } from "./stores/AuthStore";

export default function ProfilePage() {
  const { user: storeUser, setAuth, token } = useAuthStore()

  const [avatar, setAvatar] = useState<string | null>(storeUser?.avatarUrl || null);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showEditName, setShowEditName] = useState(false);
  const [displayName, setDisplayName] = useState(storeUser?.name || "User");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Tampilkan preview dulu
    const previewUrl = URL.createObjectURL(file);
    setAvatar(previewUrl);

    // Convert ke base64
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      setIsSaving(true);

      try {
        // Simpan base64 ke DB via endpoint
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/auth/profile/avatar`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ avatar_url: base64 }),
          }
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);

        // Update Zustand store agar semua komponen ikut update
        if (storeUser && token) {
          setAuth({ ...storeUser, avatarUrl: base64 }, token)
        }

        setAvatar(base64)
        alert("Foto profil berhasil disimpan!")
      } catch (err: any) {
        console.error("Gagal simpan avatar:", err)
        alert("Gagal menyimpan foto profil")
        // Kembalikan ke avatar sebelumnya kalau gagal
        setAvatar(storeUser?.avatarUrl || null)
      } finally {
        setIsSaving(false);
      }
    };
    reader.readAsDataURL(file);
  };

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
                  style={{ width: "100%", height: "100%", objectFit: "cover", aspectRatio: "1/1" }}
                />
              ) : (
                displayName.charAt(0)
              )}
            </div>

            <button
              className="edit-avatar-btn"
              onClick={() => fileInputRef.current?.click()}
              disabled={isSaving}
            >
              {isSaving ? "..." : "✎"}
            </button>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
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