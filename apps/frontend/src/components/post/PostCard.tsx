import { useState, useRef, useEffect } from "react";
import {
  ThumbsUp,
  MessageSquare,
  Share2,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import { useAuthStore } from "../../stores/AuthStore";
import { useNavigate } from "react-router-dom";
import PostImage from "./PostImage";

interface PostCardProps {
  postId?: number;
  authorId?: number;
  author: string;
  role: string;
  time: string;
  question: string;
  content: string;
  image?: string;
  originSpace?: string;
  likes?: number;
  comments?: number;
  avatarColor?: string;
  avatarUrl?: string;
}

export default function PostCard({
  postId,
  authorId,
  author,
  role,
  time,
  question,
  content,
  image,
  originSpace,
  likes = 0,
  comments = 0,
  avatarColor = "#0ea5a4",
  avatarUrl,
}: PostCardProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [visible, setVisible] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);
  const { token, isAuthenticated, user } = useAuthStore();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  const isOwner =
    isAuthenticated && user && authorId && Number(user.id) === authorId;

  // Tutup menu kalau klik di luar
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!visible) return null;

  const PREVIEW_LEN = 160;
  const isLong = content.length > PREVIEW_LEN;
  const displayText =
    expanded || !isLong ? content : content.slice(0, PREVIEW_LEN);

  const handleLike = async () => {
    if (!isAuthenticated) {
      alert("Silakan login terlebih dahulu");
      return;
    }
    setLiked((l) => !l);
    setLikeCount((c) => (liked ? c - 1 : c + 1));
    if (!postId) return;
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts/${postId}/like`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {
      setLiked((l) => !l);
      setLikeCount((c) => (liked ? c + 1 : c - 1));
    }
  };

  const handleComment = () => {
    if (postId) navigate(`/post/${postId}`);
  };

  const handleDelete = async () => {
    if (!confirm("Hapus postingan ini?")) return;
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts/${postId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setVisible(false);
    } catch (err) {
      console.error("Gagal hapus:", err);
    }
    setShowMenu(false);
  };

  const handleEdit = async () => {
    if (!editContent.trim()) return;
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts/${postId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: editContent }),
      });
      setIsEditing(false);
    } catch (err) {
      console.error("Gagal edit:", err);
    }
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="post-header-left">
          <div className="post-avatar" style={{ background: avatarColor, overflow: 'hidden' }}>
            {avatarUrl ? (
              <img src={avatarUrl} alt={author} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              author.charAt(0).toUpperCase()
            )}
          </div>
          <div className="post-user-info">
            <div className="post-author-row">
              <span className="post-author">{author}</span>
              <button className="follow-btn">· Ikuti</button>
            </div>
            <div className="post-role">
              {role} · {time}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          {/* Tombol X — sembunyikan post */}
          {!isOwner && (
            <button
              className="post-close-btn"
              onClick={() => setVisible(false)}
            >
              ✕
            </button>
          )}

          {/* Tombol titik 3 — hanya untuk pemilik post */}
          {isOwner && (
            <div ref={menuRef} style={{ position: "relative" }}>
              <button
                className="post-close-btn"
                onClick={() => setShowMenu((v) => !v)}
              >
                <MoreHorizontal size={18} />
              </button>
              {showMenu && (
                <div
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "100%",
                    background: "#2a2a2a",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    overflow: "hidden",
                    zIndex: 100,
                    minWidth: "140px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                  }}
                >
                  <button
                    onClick={() => {
                      setIsEditing(true);
                      setShowMenu(false);
                    }}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "10px 14px",
                      background: "none",
                      border: "none",
                      color: "#e5e5e5",
                      cursor: "pointer",
                      fontSize: "13px",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#333")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "none")
                    }
                  >
                    <Pencil size={14} /> Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "10px 14px",
                      background: "none",
                      border: "none",
                      color: "#e6403b",
                      cursor: "pointer",
                      fontSize: "13px",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#333")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "none")
                    }
                  >
                    <Trash2 size={14} /> Hapus
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="post-content">
        {originSpace && (
          <div className="post-origin">
            <div className="post-origin-avatar">T</div>
            <span>{originSpace}</span>
          </div>
        )}
        <div className="post-question">{question}</div>

        {isEditing ? (
          <div style={{ marginTop: "8px" }}>
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              rows={4}
              style={{
                width: "100%",
                background: "#333",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "8px",
                color: "#e5e5e5",
                padding: "10px",
                fontSize: "13px",
                resize: "none",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "8px",
                marginTop: "8px",
              }}
            >
              <button
                onClick={() => setIsEditing(false)}
                style={{
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#ccc",
                  padding: "6px 16px",
                  borderRadius: "999px",
                  fontSize: "13px",
                  cursor: "pointer",
                }}
              >
                Batal
              </button>
              <button
                onClick={handleEdit}
                style={{
                  background: "#2e69ff",
                  border: "none",
                  color: "white",
                  padding: "6px 16px",
                  borderRadius: "999px",
                  fontSize: "13px",
                  cursor: "pointer",
                }}
              >
                Simpan
              </button>
            </div>
          </div>
        ) : (
          <div className="post-text">
            {displayText}
            {isLong && !expanded && (
              <>
                {"... "}
                <span className="more-link" onClick={() => setExpanded(true)}>
                  (lanjut)
                </span>
              </>
            )}
          </div>
        )}
      </div>

      {image && !isEditing && <PostImage image={image} />}

      <div className="post-actions">
        <button
          className={`action-btn ${liked ? "liked" : ""}`}
          onClick={handleLike}
        >
          <ThumbsUp size={17} />
          {likeCount > 0 && <span>{likeCount}</span>}
        </button>
        <button className="action-btn" onClick={handleComment}>
          <MessageSquare size={17} />
          {comments > 0 && <span>{comments}</span>}
        </button>
        <button className="action-btn">
          <Share2 size={17} />
          <span>Bagikan</span>
        </button>
        <button className="action-btn" style={{ marginLeft: "auto" }}>
          <MoreHorizontal size={17} />
        </button>
      </div>
    </div>
  );
}