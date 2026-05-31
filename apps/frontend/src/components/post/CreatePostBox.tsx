import { useState } from "react";
import { HelpCircle, PenLine, Send } from "lucide-react";
import { useAuthStore } from "../../stores/AuthStore";

export default function CreatePostBox({
  userName = "User",
}: {
  userName?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { token, isAuthenticated, user } = useAuthStore();  // 👈 tambah user

  const handleOpen = () => {
    if (!isAuthenticated) {
      alert("Silakan login terlebih dahulu untuk membuat postingan");
      return;
    }
    setIsOpen(true);
  };

  const handleSubmit = async () => {
    if (!content.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      });
      const data = await res.json();
      console.log(data);
      setContent("");
      setIsOpen(false);
    } catch (err) {
      console.error("Gagal kirim post:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-post-box">
      <div className="create-post-top">
        <div className="create-post-avatar" style={{ overflow: "hidden", padding: 0 }}>
          {user?.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={userName}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            userName.charAt(0).toUpperCase()
          )}
        </div>
        <button className="create-post-input" onClick={handleOpen}>
          Apa yang ingin Anda tanyakan atau bagikan?
        </button>
      </div>

      {isOpen && (
        <div className="create-post-form">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Tulis postingan..."
            rows={4}
          />
          <div className="create-post-form-actions">
            <button className="btn-cancel" onClick={() => setIsOpen(false)}>
              Batal
            </button>
            <button
              className="btn-submit"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Mengirim..." : "Kirim"}
            </button>
          </div>
        </div>
      )}

      <div className="create-post-actions">
        <button className="create-action-btn">
          <HelpCircle size={18} />
          <span>Tanya</span>
        </button>
        <button className="create-action-btn">
          <PenLine size={18} />
          <span>Jawab</span>
        </button>
        <button className="create-action-btn" onClick={handleOpen}>
          <Send size={18} />
          <span>Kiriman</span>
        </button>
      </div>
    </div>
  );
}