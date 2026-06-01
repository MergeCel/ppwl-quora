import TopNavbar from "./components/layout/TopNavbar";
import EditNameModal from "./components/profile/EditNameModal";
import "./style/profile.css";
import { useRef, useState } from "react";
import { useAuthStore } from "./stores/AuthStore";

export default function ProfilePage() {
  // Pastikan memanggil token dan fungsi untuk mengupdate data user di store
  const { user: storeUser, token } = useAuthStore();

  const [avatar, setAvatar] = useState<string | null>(
    storeUser?.avatarUrl || null,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showEditName, setShowEditName] = useState(false);
  const [displayName, setDisplayName] = useState(storeUser?.name || "User");
  const [isUploading, setIsUploading] = useState(false);

  return (
    <div className="profile-page">
      <TopNavbar
        user={{
          name: storeUser?.name || "User",
          email: storeUser?.email || "",
          avatarUrl: storeUser?.avatarUrl || undefined,
        }}
      />

      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar-wrapper">
            <div
              className="profile-avatar"
              style={{ overflow: "hidden", padding: 0 }}
            >
              {isUploading ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                  }}
                >
                  ⏳{" "}
                </div>
              ) : avatar ? (
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
              disabled={isUploading}
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
                  setIsUploading(true);

                  // Ubah gambar jadi base64 untuk dikirim ke API
                  const reader = new FileReader();
                  reader.readAsDataURL(file);
                  reader.onloadend = async () => {
                    const base64String = reader.result as string;

                    try {
                      const backendUrl = import.meta.env.VITE_BACKEND_URL;

                      // 1. UPLOAD KE AWS S3 (upload.ts)
                      const uploadRes = await fetch(
                        `${backendUrl}/uploads/image`,
                        {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            fileName: file.name,
                            contentType: file.type,
                            base64: base64String,
                          }),
                        },
                      );

                      const uploadData = await uploadRes.json();

                      if (uploadRes.ok && uploadData.image_url) {
                        // 2. SIMPAN URL S3 KE DATABASE PRISMA (index.ts)
                        const updateRes = await fetch(
                          `${backendUrl}/users/avatar`,
                          {
                            method: "PATCH",
                            headers: {
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${token}`,
                            },
                            body: JSON.stringify({
                              avatarUrl: uploadData.image_url,
                            }),
                          },
                        );

                        if (updateRes.ok) {
                          setAvatar(uploadData.image_url);

                          // WAJIB: Update data AuthStore agar foto berganti di semua halaman (Navbar, Notifikasi, dll)
                          useAuthStore.setState({
                            user: {
                              ...storeUser,
                              avatarUrl: uploadData.image_url,
                            } as any,
                          });

                          alert("Foto profil berhasil diperbarui!");
                        } else {
                          alert("Gagal menyimpan foto ke database");
                        }
                      } else {
                        alert("Gagal mengunggah gambar ke server");
                      }
                    } catch (error) {
                      console.error("Error:", error);
                      alert("Terjadi kesalahan sistem");
                    } finally {
                      setIsUploading(false);
                    }
                  };
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
          <div className="empty-profile">Anda belum membagikan apa pun.</div>
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
