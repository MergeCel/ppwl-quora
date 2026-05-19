import { useEffect, useState } from "react";
import TopNavbar from "../components/layout/TopNavbar";
import LeftSidebar from "../components/layout/LeftSidebar";
import { Bell, Heart, MessageCircle, AlertCircle } from "lucide-react";

type NotificationItem = {
  id: number;
  type: string;
  content: string;
  is_read: boolean;
  created_at: string;
};

export default function YourPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const dummyUser = { name: "Arjun Maheswara", email: "arjun@mail.com" };

  useEffect(() => {
    // Jalankan fetching data langsung ke Lambda URL Production / API lokal kelompokmu
    fetch("https://zn5qcppmk2j6kbxsckfmk72qvq0pravj.lambda-url.us-east-1.on.aws/notifications")
      .then((res) => res.json())
      .then((resData) => {
        if (resData && resData.data) {
          setNotifications(resData.data);
        }
      })
      .catch(() => {
        // Fallback data jika server offline saat development offline
        setNotifications([
          { id: 1, type: "like", content: "Sheren menyukai postingan Anda tentang AWS RDS", is_read: false, created_at: new Date().toISOString() },
          { id: 2, type: "comment", content: "Cello mengomentari draf MVC Docker Anda", is_read: true, created_at: new Date().toISOString() },
          { id: 3, type: "system", content: "Selamat! Akun Quora Anda berhasil dimigrasi ke Postgres", is_read: false, created_at: new Date().toISOString() }
        ]);
      });
  }, []);

  // Fungsi helper untuk merender ikon notifikasi fungsional berdasarkan tipenya
  const renderIcon = (type: string) => {
    switch (type) {
      case "like": return <Heart size={20} color="#e6403b" fill="#e6403b" />;
      case "comment": return <MessageCircle size={20} color="#2e69ff" fill="#2e69ff" />;
      default: return <AlertCircle size={20} color="#d97706" />;
    }
  };

  return (
    <div className="home-layout" style={{ background: "#111", minHeight: "100vh", color: "white" }}>
      {/* Navbar Atas */}
      <TopNavbar user={dummyUser} />

      <div className="home-main" style={{ maxWidth: "1000px", margin: "52px auto 0 auto", display: "flex", gap: "24px", padding: "20px" }}>
        {/* Sidebar Kiri */}
        <LeftSidebar />

        {/* Konten Utama Fitur Notifikasi */}
        <main className="feed" style={{ flex: 1, background: "#1b1b1b", borderRadius: "8px", padding: "20px", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "10px" }}>
            <Bell size={24} color="#e6403b" />
            <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>Notifikasi Anda</h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {notifications.length === 0 ? (
              <p style={{ color: "#aaa", textAlign: "center", padding: "20px" }}>Tidak ada notifikasi baru.</p>
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
                    borderLeft: notif.is_read ? "4px solid transparent" : "4px solid #e6403b",
                    transition: "background 0.2s"
                  }}
                >
                  <div style={{ flexShrink: 0 }}>
                    {renderIcon(notif.type)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontSize: "14px", color: "#fff", fontWeight: notif.is_read ? "normal" : "bold" }}>
                      {notif.content}
                    </p>
                    <span style={{ fontSize: "11px", color: "#888" }}>
                      {new Date(notif.created_at).toLocaleDateString("id-ID")}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}