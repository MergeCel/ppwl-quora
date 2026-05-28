import TopNavbar from "./components/layout/TopNavbar";
import "./style/profile.css";
import { useRef, useState } from "react";

export default function ProfilePage() {
  const [avatar, setAvatar] =
    useState<string | null>(null);
  const fileInputRef =
    useRef<HTMLInputElement>(null);
  const user = {
    name:
      localStorage.getItem("name")
      || "User",

    email:
      localStorage.getItem("email")
      || "user@gmail.com",
  };

  return (
    <div className="profile-page">
      <TopNavbar user={user} />
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar-wrapper">
            <div className="profile-avatar">
                {avatar ? (
                <img
                    src={avatar}
                    alt="Profile"
                    className="profile-avatar-img"
                />
                ) : (
                user.name.charAt(0)
                )}

            </div>

            <button
                className="edit-avatar-btn"
                onClick={() =>
                fileInputRef.current?.click()
                }
            >
                ✎
            </button>

            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={(e) => {
                const file =
                    e.target.files?.[0];

                if (file) {
                    const imageUrl =
                    URL.createObjectURL(file);

                    setAvatar(imageUrl);
                }
                }}
            />

            </div>

          <div className="profile-info">

            <h1>{user.name}</h1>

            <p>
              Tambahkan kredensial profil
            </p>

            <span>
              0 pengikut · Mengikuti 1
            </span>

          </div>

        </div>

        <div className="profile-section">

          <h2>Profil</h2>

          <div className="empty-profile">
            Anda belum membagikan apa pun.
          </div>

        </div>

      </div>

    </div>
  );
}