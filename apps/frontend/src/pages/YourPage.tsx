import { useEffect, useState } from "react";
import TopNavbar from "../components/layout/TopNavbar";
import LeftSidebar from "../components/layout/LeftSidebar";
import { Bell, Heart, MessageCircle, AlertCircle, Loader2 } from "lucide-react";

type NotificationItem = {
  id: number;
  type: string;
  content: string;
  is_read: boolean;
  created_at: string;
};

export default function YourPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true); // 👈 State untuk animasi loading

  useEffect(() => {
    // 🚀 Simulasi ambil data pakai setTimeout (Sesuai instruksi asdos)
    const timer = setTimeout(() => {
      setNotifications([
        { id: 1, type: "like", content: "Sheren menyukai postingan Anda tentang MVC", is_read: false, created_at: new Date().toISOString() },
        { id: 2, type: "comment", content: "Cello mengomentari tugas Frontend Anda", is_read: true, created_at: new Date().toISOString() },
        { id: 3, type: "system", content: "Selamat datang di TanyaYuk!", is_read: false, created_at: new Date().toISOString() }
      ]);
      setIsLoading(false); // Matikan loading setelah 1.5 detik
    }, 1500);

    return () => clearTimeout(timer); // Cleanup timeout
  }, []);

  const renderIcon = (type: string) => {
    switch (type) {
      case "like": return <Heart size={20} color="#e6403b" fill="#e6403b" />;
      case "comment": return <MessageCircle size={20} color="#2e69ff" fill="#2e69ff" />;
      default: return <AlertCircle size={20} color="#d97706" />;
    }
  };

  return (
    <div className="home-page" style={{ background: "#111", minHeight: "100vh" }}>
      <TopNavbar />
      <div className="home-layout">
        <LeftSidebar />
        
        <main className="feed-section" style={{ background: "#1b1b1b", borderRadius: "8px", padding: "20px", marginTop: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <Bell size={24} color="#e6403b" />
            <h2 style={{ color: "white" }}>Notifikasi Anda</h2>
          </div>

          {/* 🚀 LOGIKA UI/UX LOADING */}
          {isLoading ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 0", color: "#888" }}>
              <Loader2 className="animate-spin" size={32} style={{ marginBottom: "10px", color: "#e6403b" }} />
              <p>Memuat notifikasi...</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {notifications.map((notif) => (
                <div 
                  key={notif.id} 
                  style={{ 
                    display: "flex", alignItems: "center", gap: "16px", padding: "16px", 
                    background: notif.is_read ? "#222" : "#2a2a2a", 
                    borderRadius: "6px",
                    borderLeft: notif.is_read ? "4px solid transparent" : "4px solid #e6403b",
                  }}
                >
                  <div style={{ flexShrink: 0 }}>{renderIcon(notif.type)}</div>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontSize: "14px", color: "#fff", fontWeight: notif.is_read ? "normal" : "bold" }}>
                      {notif.content}
                    </p>
                    <span style={{ fontSize: "11px", color: "#888" }}>Baru saja</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}