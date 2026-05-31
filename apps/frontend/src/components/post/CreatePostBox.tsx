import { useState, useRef } from "react";
import { HelpCircle, PenLine, Send, Image, X } from "lucide-react";
import { useAuthStore } from "../../stores/AuthStore";

type Tab = "pertanyaan" | "kiriman";

export default function CreatePostBox({
  userName = "User",
}: {
  userName?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("pertanyaan");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { token, isAuthenticated } = useAuthStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleOpen = (tab: Tab = "kiriman") => {
    if (!isAuthenticated) {
      alert("Silakan login terlebih dahulu untuk membuat postingan");
      return;
    }
    setActiveTab(tab);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setContent("");
    setImageFile(null);
    setImagePreview(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!content.trim()) return;
    setLoading(true);
    try {
      let image_url = null;
      if (imageFile) image_url = imagePreview;
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content, image_url }),
      });
      const data = await res.json();
      console.log(data);
      handleClose();
    } catch (err) {
      console.error("Gagal kirim post:", err);
    } finally {
      setLoading(false);
    }
  };

  const Avatar = () => (
    <div
      style={{
        width: "36px",
        height: "36px",
        borderRadius: "50%",
        background: "#7c3aed",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "700",
        color: "white",
        flexShrink: 0,
        fontSize: "15px",
      }}
    >
      {userName.charAt(0).toUpperCase()}
    </div>
  );

  return (
    <>
      <div className="create-post-box">
        <div className="create-post-top">
          <div className="create-post-avatar">
            {userName.charAt(0).toUpperCase()}
          </div>
          <button
            className="create-post-input"
            onClick={() => handleOpen("kiriman")}
          >
            Apa yang ingin Anda tanyakan atau bagikan?
          </button>
        </div>
        <div className="create-post-actions">
          <button
            className="create-action-btn"
            onClick={() => handleOpen("pertanyaan")}
          >
            <HelpCircle size={18} />
            <span>Tanya</span>
          </button>
          <button className="create-action-btn">
            <PenLine size={18} />
            <span>Jawab</span>
          </button>
          <button
            className="create-action-btn"
            onClick={() => handleOpen("kiriman")}
          >
            <Send size={18} />
            <span>Kiriman</span>
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.75)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "0 12px",
          }}
          onClick={handleClose}
        >
          <div
            style={{
              background: "#1f1f1f",
              borderRadius: "12px",
              width: "100%",
              maxWidth: "580px",
              overflow: "hidden",
              color: "#e5e5e5",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 16px",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <button
                onClick={handleClose}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#888",
                }}
              >
                <X size={20} />
              </button>
              <div style={{ display: "flex" }}>
                <button
                  onClick={() => setActiveTab("pertanyaan")}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "8px 16px",
                    fontWeight: "600",
                    fontSize: "13px",
                    color: activeTab === "pertanyaan" ? "#fff" : "#888",
                    borderBottom:
                      activeTab === "pertanyaan"
                        ? "2px solid #fff"
                        : "2px solid transparent",
                    whiteSpace: "nowrap",
                  }}
                >
                  Tambah Pertanyaan
                </button>
                <button
                  onClick={() => setActiveTab("kiriman")}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "8px 16px",
                    fontWeight: "600",
                    fontSize: "13px",
                    color: activeTab === "kiriman" ? "#2e69ff" : "#888",
                    borderBottom:
                      activeTab === "kiriman"
                        ? "2px solid #2e69ff"
                        : "2px solid transparent",
                    whiteSpace: "nowrap",
                  }}
                >
                  Buat Kiriman Informasi
                </button>
              </div>
              <div style={{ width: "20px" }} />
            </div>

            {/* Konten */}
            <div style={{ padding: "16px 20px", minHeight: "180px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "14px",
                }}
              >
                <Avatar />
                <span
                  style={{
                    fontWeight: "600",
                    fontSize: "14px",
                    color: "#e5e5e5",
                  }}
                >
                  {userName}
                </span>
              </div>

              {activeTab === "pertanyaan" ? (
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder='Awali pertanyaan Anda dengan "Apa", "Bagaimana", "Mengapa", dll.'
                  rows={5}
                  style={{
                    width: "100%",
                    border: "none",
                    outline: "none",
                    fontSize: "15px",
                    resize: "none",
                    color: "#e5e5e5",
                    fontFamily: "inherit",
                    background: "transparent",
                    boxSizing: "border-box",
                  }}
                />
              ) : (
                <div>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Katakan sesuatu..."
                    rows={4}
                    style={{
                      width: "100%",
                      border: "none",
                      outline: "none",
                      fontSize: "15px",
                      resize: "none",
                      color: "#e5e5e5",
                      fontFamily: "inherit",
                      background: "transparent",
                      boxSizing: "border-box",
                    }}
                  />
                  {imagePreview && (
                    <div style={{ position: "relative", marginTop: "12px" }}>
                      <img
                        src={imagePreview}
                        alt="preview"
                        style={{
                          width: "100%",
                          borderRadius: "8px",
                          maxHeight: "260px",
                          objectFit: "cover",
                        }}
                      />
                      <button
                        onClick={() => {
                          setImageFile(null);
                          setImagePreview(null);
                        }}
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "8px",
                          background: "rgba(0,0,0,0.6)",
                          border: "none",
                          borderRadius: "50%",
                          width: "28px",
                          height: "28px",
                          color: "white",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 16px",
                borderTop: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div>
                {activeTab === "kiriman" && (
                  <>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleImageChange}
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#aaa",
                        display: "flex",
                        alignItems: "center",
                        padding: "6px 10px",
                        borderRadius: "6px",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background =
                          "rgba(255,255,255,0.06)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "none")
                      }
                    >
                      <Image size={20} />
                    </button>
                  </>
                )}
              </div>
              <button
                onClick={handleSubmit}
                disabled={loading || !content.trim()}
                style={{
                  background: content.trim() ? "#2e69ff" : "#444",
                  border: "none",
                  color: "white",
                  padding: "8px 20px",
                  borderRadius: "999px",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: content.trim() ? "pointer" : "not-allowed",
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading
                  ? "Mengirim..."
                  : activeTab === "pertanyaan"
                    ? "Tambah pertanyaan"
                    : "Kiriman"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
