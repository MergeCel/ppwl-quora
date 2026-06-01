import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, MessageCircle, Share2, Send } from "lucide-react";
import { useAuthStore } from "../stores/AuthStore";

export default function PostDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, token } = useAuthStore();

  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentInput, setCommentInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchData = async () => {
      if (!backendUrl || !id) {
        setIsLoading(false);
        return;
      }
      try {
        const postRes = await fetch(`${backendUrl}/posts/${id}`);
        if (postRes.ok) {
          const postJson = await postRes.json();
          setPost(postJson.data);
          setLikeCount(postJson.data._count?.likes || 0);
          setComments(postJson.data.comments || []);
        }
      } catch (err) {
        console.error("Gagal fetch:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id, backendUrl]);

  const handleLike = async () => {
    if (!isAuthenticated) {
      alert("Silakan login terlebih dahulu");
      return;
    }
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
    try {
      await fetch(`${backendUrl}/posts/${id}/like`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {
      setLiked((prev) => !prev);
      setLikeCount((prev) => (liked ? prev + 1 : prev - 1));
    }
  };

  const handleSubmitComment = async () => {
    if (!isAuthenticated) {
      alert("Silakan login terlebih dahulu untuk berkomentar");
      return;
    }
    if (!commentInput.trim() || isSubmitting) return;
    setIsSubmitting(true);
    try {
      // Ganti baris fetch tersebut menjadi:
      const res = await fetch(`${backendUrl}/posts/${id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        // Perhatikan: post_id tidak perlu dikirim di body karena sudah ada di URL (:id)
        body: JSON.stringify({ content: commentInput }),
      });
      if (res.ok) {
        const json = await res.json();
        setComments((prev) => [...prev, json.data]);
        setCommentInput("");
      }
    } catch (err) {
      console.error("Gagal kirim komentar:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "60px",
          color: "#aaa",
        }}
      >
        Memuat...
      </div>
    );

  if (!post)
    return (
      <div style={{ textAlign: "center", padding: "40px", color: "#aaa" }}>
        <p>Postingan tidak ditemukan.</p>
        <button
          onClick={() => navigate("/home")}
          style={{
            marginTop: "12px",
            color: "#e6403b",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          Kembali ke beranda
        </button>
      </div>
    );

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "0 auto",
        padding: "16px",
        color: "#e5e5e5",
      }}
    >
      <button
        onClick={() => navigate(-1)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          background: "none",
          border: "none",
          color: "#aaa",
          cursor: "pointer",
          marginBottom: "16px",
          fontSize: "14px",
        }}
      >
        <ArrowLeft size={18} /> Kembali
      </button>

      {/* Post */}
      <div
        style={{
          background: "#1a1a1a",
          borderRadius: "12px",
          padding: "20px",
          marginBottom: "16px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "12px",
          }}
        >
          {post.user?.avatar_url ? (
            <img
              src={post.user.avatar_url}
              alt={post.user?.name || "avatar"}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          ) : (
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "#7c3aed",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              {post.user?.name?.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <div style={{ fontWeight: "600", fontSize: "15px" }}>
              {post.user?.name}
            </div>
            <div style={{ fontSize: "12px", color: "#888" }}>
              {new Date(post.created_at).toLocaleString("id-ID")}
            </div>
          </div>
        </div>

        <p
          style={{ fontSize: "16px", lineHeight: "1.6", marginBottom: "16px" }}
        >
          {post.content}
        </p>

        {post.image_url && (
          <img
            src={post.image_url}
            alt="Post"
            style={{ width: "100%", borderRadius: "8px", marginBottom: "16px" }}
          />
        )}

        <div
          style={{
            display: "flex",
            gap: "12px",
            borderTop: "1px solid #2a2a2a",
            paddingTop: "12px",
          }}
        >
          <button
            onClick={handleLike}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "none",
              border: "none",
              color: liked ? "#e6403b" : "#aaa",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            <Heart size={18} fill={liked ? "#e6403b" : "none"} />
            <span>{likeCount}</span>
          </button>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "none",
              border: "none",
              color: "#aaa",
              fontSize: "14px",
            }}
          >
            <MessageCircle size={18} />
            <span>{comments.length}</span>
          </button>
          <button
            onClick={handleShare}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "none",
              border: "none",
              color: "#aaa",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            <Share2 size={18} />
            <span>{copied ? "Disalin!" : "Bagikan"}</span>
          </button>
        </div>
      </div>

      {/* Comment input */}
      <div
        style={{
          background: "#1a1a1a",
          borderRadius: "12px",
          padding: "16px",
          marginBottom: "16px",
        }}
      >
        <textarea
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          placeholder={
            isAuthenticated ? "Tulis komentar..." : "Login untuk berkomentar"
          }
          disabled={!isAuthenticated}
          rows={3}
          style={{
            width: "100%",
            background: "#262626",
            border: "1px solid #333",
            borderRadius: "8px",
            color: "#e5e5e5",
            padding: "10px",
            fontSize: "14px",
            resize: "none",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "8px",
          }}
        >
          <button
            onClick={handleSubmitComment}
            disabled={isSubmitting || !commentInput.trim()}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "#e6403b",
              border: "none",
              color: "white",
              padding: "8px 18px",
              borderRadius: "999px",
              fontSize: "13px",
              fontWeight: "600",
              cursor: "pointer",
              opacity: isSubmitting || !commentInput.trim() ? 0.5 : 1,
            }}
          >
            <Send size={14} />
            {isSubmitting ? "Mengirim..." : "Kirim"}
          </button>
        </div>
      </div>

      {/* Comments */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {comments.length === 0 ? (
          <p style={{ textAlign: "center", color: "#666", fontSize: "14px" }}>
            Belum ada komentar.
          </p>
        ) : (
          comments.map((c) => (
            <div
              key={c.id}
              style={{
                background: "#1a1a1a",
                borderRadius: "12px",
                padding: "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "8px",
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    background: "#0ea5a4",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    fontSize: "13px",
                  }}
                >
                  {c.user?.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div style={{ fontWeight: "600", fontSize: "14px" }}>
                    {c.user?.name}
                  </div>
                  <div style={{ fontSize: "11px", color: "#888" }}>
                    {new Date(c.created_at).toLocaleString("id-ID")}
                  </div>
                </div>
              </div>
              <p style={{ fontSize: "14px", lineHeight: "1.5", color: "#ccc" }}>
                {c.content}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}