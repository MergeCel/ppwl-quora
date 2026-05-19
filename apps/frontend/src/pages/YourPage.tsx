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

  useEffect(() => {
    // Gunakan URL yang sudah kamu pasang di .env
    const backendUrl = "https://zn5qcppmk2j6kbxsckfmk72qvq0pravj.lambda-url.us-east-1.on.aws";
    
    fetch(`${backendUrl}/notifications`)
      .then((res) => res.json())
      .then((resData) => {
        if (resData && resData.data) {
          setNotifications(resData.data);
        }
      })
      .catch(() => {
        setNotifications([
          { id: 1, type: "like", content: "Sheren menyukai postingan Anda", is_read: false, created_at: new Date().toISOString() },
          { id: 2, type: "comment", content: "Cello mengomentari tugas Anda", is_read: true, created_at: new Date().toISOString() }
        ]);
      });
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
          {notifications.map((notif) => (
            <div key={notif.id} style={{ padding: "16px", borderBottom: "1px solid #333", color: "white" }}>
              {notif.content}
            </div>
          ))}
        </main>
      </div>
    </div>
  );
}