import { useEffect, useState } from "react";
import {
  Bell,
  Heart,
  MessageCircle,
  AlertCircle,
  Loader2,
  ArrowLeft,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/AuthStore";

type NotificationItem = {
  id: number;
  type: string;
  actor?: { name: string; avatar_url?: string };
  post?: { id: number; content: string };
  content?: string;
  is_read: boolean;
  created_at: string;
};

export default function YourPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // MENGAMBIL DATA 'user' YANG SEDANG LOGIN DARI STORE
  const { token, isAuthenticated, user } = useAuthStore();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!isAuthenticated || !token) {
        setIsLoading(false);
        return;
      }
      try {
        const res = await fetch(`${backendUrl}/notifications`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const json = await res.json();
          setNotifications(json.data);
        } else {
          console.error("Gagal mengambil notifikasi, status:", res.status);
        }
      } catch (error) {
        console.error("Gagal fetch notifikasi:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, [token, isAuthenticated, backendUrl]);

  const getNotificationText = (notif: NotificationItem) => {
    if (notif.content) return notif.content;

    const actorName = notif.actor?.name || "Seseorang";
    const postSnippet = notif.post?.content
      ? `"${notif.post.content.substring(0, 20)}..."`
      : "postingan Anda";

    if (notif.type === "like") return `${actorName} menyukai ${postSnippet}`;
    if (notif.type === "comment")
      return `${actorName} mengomentari ${postSnippet}`;
    return "Ada pemberitahuan baru";
  };

  const handleDeleteNotif = async (id: number) => {
    try {
      const res = await fetch(`${backendUrl}/notifications/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkAsRead = async (id: number) => {
    try {
      await fetch(`${backendUrl}/notifications/${id}/read`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, is_read: true } : n)),
      );
    } catch (err) {
      console.error(err);
    }
  };

  const renderAvatarOrIcon = (notif: NotificationItem) => {
    const renderInitial = () => (
      <div
        style={{
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          background: "#7c3aed",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: "bold",
          fontSize: "14px",
        }}
      >
        {notif.actor?.name ? notif.actor.name.charAt(0).toUpperCase() : "U"}
      </div>
    );

    if (!notif.actor) {
      return (
        <div
          style={{
            width: "36px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {notif.type === "like" ? (
            <Heart size={20} color="#e6403b" fill="#e6403b" />
          ) : notif.type === "comment" ? (
            <MessageCircle size={20} color="#2e69ff" fill="#2e69ff" />
          ) : (
            <AlertCircle size={20} color="#d97706" />
          )}
        </div>
      );
    }

    if (notif.actor.avatar_url) {
      return (
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <img
            src={notif.actor.avatar_url}
            alt={notif.actor.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={(e) => {
              e.currentTarget.style.display = "none";
              if (e.currentTarget.nextElementSibling) {
                (
                  e.currentTarget.nextElementSibling as HTMLElement
                ).style.display = "flex";
              }
            }}
          />
          <div style={{ display: "none", width: "100%", height: "100%" }}>
            {renderInitial()}
          </div>
        </div>
      );
    }

    return renderInitial();
  };

  return (
    <div
      className="home-page"
      style={{ background: "#111", minHeight: "100vh", padding: "20px" }}
    >
      <button
        onClick={() => navigate("/home")}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          background: "none",
          border: "none",
          color: "#888",
          cursor: "pointer",
          marginBottom: "20px",
          fontSize: "14px",
        }}
      >
        <ArrowLeft size={16} /> Kembali ke Beranda
      </button>

      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <main
          className="feed-section"
          style={{
            background: "#1b1b1b",
            borderRadius: "8px",
            padding: "20px",
          }}
        >
          {/* HEADER DENGAN FOTO PROFIL USER */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Bell size={24} color="#e6403b" />
              <h2 style={{ color: "white", margin: 0 }}>Notifikasi Anda</h2>
            </div>

            {/* FOTO PROFIL LOGIN MUNCUL DI SINI */}
            {user && (
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <span style={{ color: "#888", fontSize: "14px" }}>
                  {user.name}
                </span>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "2px solid #2e69ff",
                  }}
                >
                  <img
                    // Gunakan avatarUrl, atau picture dari Google, atau fallback UI Avatars
                    src={
                      user.avatarUrl ||
                      (user as any).picture ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=2e69ff&color=fff`
                    }
                    alt="Profil Saya"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    onError={(e) => {
                      // Fallback jika foto profil gagal dimuat
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=2e69ff&color=fff`;
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {isLoading ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "40px 0",
                color: "#888",
              }}
            >
              <Loader2
                className="animate-spin"
                size={32}
                style={{ marginBottom: "10px", color: "#e6403b" }}
              />
              <p>Memuat notifikasi...</p>
            </div>
          ) : (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {notifications.length === 0 ? (
                <p style={{ textAlign: "center", color: "#888" }}>
                  Belum ada notifikasi.
                </p>
              ) : (
                notifications.map((notif) => (
                  <div
                    key={notif.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      padding: "16px",
                      background: notif.is_read ? "#222" : "#2a2a2a",
                      borderRadius: "6px",
                      borderLeft: notif.is_read
                        ? "4px solid transparent"
                        : "4px solid #e6403b",
                    }}
                  >
                    <div style={{ flexShrink: 0 }}>
                      {renderAvatarOrIcon(notif)}
                    </div>

                    <div
                      style={{ flex: 1, cursor: "pointer" }}
                      onClick={() => handleMarkAsRead(notif.id)}
                    >
                      <p
                        style={{
                          margin: 0,
                          fontSize: "14px",
                          color: "#fff",
                          fontWeight: notif.is_read ? "normal" : "bold",
                        }}
                      >
                        {getNotificationText(notif)}
                      </p>
                      <span style={{ fontSize: "11px", color: "#888" }}>
                        {new Date(notif.created_at).toLocaleString("id-ID")}
                      </span>
                    </div>

                    <button
                      onClick={() => handleDeleteNotif(notif.id)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#666",
                        cursor: "pointer",
                      }}
                      title="Hapus notifikasi"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
