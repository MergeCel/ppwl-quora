import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Share2,
  Loader2,
  Send,
  MoreHorizontal,
} from "lucide-react";

type Post = {
  id: string | number;
  author: string;
  role?: string;
  content: string;
  image_url?: string | null;
  created_at?: string;
  likes?: number;
  user?: { name: string };
};

type Comment = {
  id: number;
  author: string;
  content: string;
  created_at: string;
};

// Dummy data fallback
const DUMMY_POST: Post = {
  id: "dummy-1",
  author: "Alpraditia Malik",
  role: "Author di Lawangsinau · Diperbarui 20 Apr",
  content:
    "Saya sebelum baca buku, tapi setelah baca buku jadi lebih terarah. Apa pendapat kalian soal membaca di tahun 2026 ini? Menurut saya membaca buku fisik masih relevan, bahkan di tengah arus digital. Ada rasa puas tersendiri ketika membalik halaman terakhir dari sebuah buku yang bagus.",
  image_url:
    "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=700&q=80",
  created_at: new Date().toISOString(),
  likes: 24,
};

const DUMMY_COMMENTS: Comment[] = [
  {
    id: 1,
    author: "Arjun Maheswara",
    content:
      "Setuju banget! Membaca buku fisik punya feel yang berbeda dibanding e-book.",
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    author: "Regisha Sheren",
    content: "Aku justru lebih suka audiobook sekarang, lebih fleksibel.",
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    author: "Febrianti K.",
    content: "Buku fisik masih juara untuk konsentrasi membaca panjang!",
    created_at: new Date().toISOString(),
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function timeAgo(dateStr?: string) {
  if (!dateStr) return "Baru saja";
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 60000);
  if (diff < 1) return "Baru saja";
  if (diff < 60) return `${diff} menit lalu`;
  if (diff < 1440) return `${Math.floor(diff / 60)} jam lalu`;
  return `${Math.floor(diff / 1440)} hari lalu`;
}

export default function PostDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentInput, setCommentInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  // Ambil data post & komentar
  useEffect(() => {
    const fetchData = async () => {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const useBackend =
        backendUrl && backendUrl !== "http://localhost:3000" && id && !id.startsWith("dummy");

      if (!useBackend) {
        setTimeout(() => {
          setPost(DUMMY_POST);
          setLikeCount(DUMMY_POST.likes || 0);
          setComments(DUMMY_COMMENTS);
          setIsLoading(false);
        }, 800);
        return;
      }

      try {
        const [postRes, commentRes] = await Promise.all([
          fetch(`${backendUrl}/posts/${id}`),
          fetch(`${backendUrl}/posts/${id}/comments`),
        ]);

        if (!postRes.ok) throw new Error("Post tidak ditemukan");
        const postJson = await postRes.json();
        setPost(postJson.data || postJson);
        setLikeCount(postJson.data?.likes || postJson.likes || 0);

        if (commentRes.ok) {
          const commentJson = await commentRes.json();
          setComments(commentJson.data || commentJson || []);
        }
      } catch (err) {
        console.error("Gagal fetch, pakai dummy:", err);
        setPost(DUMMY_POST);
        setLikeCount(DUMMY_POST.likes || 0);
        setComments(DUMMY_COMMENTS);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleLike = async () => {
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    if (!backendUrl || backendUrl === "http://localhost:3000") return;

    try {
      await fetch(`${backendUrl}/posts/${id}/like`, { method: "POST" });
    } catch (err) {
      // Revert jika gagal
      setLiked((prev) => !prev);
      setLikeCount((prev) => (liked ? prev + 1 : prev - 1));
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmitComment = async () => {
    if (!commentInput.trim() || isSubmitting) return;

    // Validasi batas 5 komentar/user (sesuai spec)
    const userCommentCount = comments.filter(
      (c) => c.author === "User Saat Ini"
    ).length;
    if (userCommentCount >= 5) {
      alert("Kamu sudah mencapai batas 5 komentar.");
      return;
    }

    setIsSubmitting(true);

    const newComment: Comment = {
      id: Date.now(),
      author: "User Saat Ini",
      content: commentInput.trim(),
      created_at: new Date().toISOString(),
    };

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    if (backendUrl && backendUrl !== "http://localhost:3000") {
      try {
        const res = await fetch(`${backendUrl}/posts/${id}/comments`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: commentInput.trim() }),
        });
        if (!res.ok) throw new Error("Gagal kirim komentar");
        const json = await res.json();
        setComments((prev) => [json.data || newComment, ...prev]);
      } catch (err) {
        console.error("Gagal kirim ke API, tambah lokal:", err);
        setComments((prev) => [newComment, ...prev]);
      }
    } else {
      setComments((prev) => [newComment, ...prev]);
    }

    setCommentInput("");
    setIsSubmitting(false);
  };

  if (isLoading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#F7F2EB",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "12px",
          color: "#636466",
        }}
      >
        <Loader2
          size={32}
          className="animate-spin"
          style={{ color: "#B92B27" }}
        />
        <p style={{ fontSize: "14px" }}>Memuat postingan...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#F7F2EB",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <p style={{ color: "#282829", fontSize: "16px", fontWeight: 600 }}>
          Postingan tidak ditemukan.
        </p>
        <button
          onClick={() => navigate("/home")}
          style={{
            background: "#B92B27",
            color: "white",
            border: "none",
            borderRadius: "4px",
            padding: "8px 20px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  const authorName = post.user?.name || post.author || "Anonim";

  return (
    <div style={{ minHeight: "100vh", background: "#F7F2EB" }}>
      {/* Top bar */}
      <div
        style={{
          background: "#fff",
          borderBottom: "1px solid #E5E0D8",
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#636466",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "14px",
            padding: "4px",
          }}
        >
          <ArrowLeft size={18} />
          Kembali
        </button>
        <span style={{ color: "#E5E0D8" }}>|</span>
        <span style={{ color: "#B92B27", fontWeight: 600, fontSize: "14px" }}>
          Detail Postingan
        </span>
      </div>

      <div style={{ maxWidth: "740px", margin: "0 auto", padding: "20px 16px" }}>
        {/* Post Card */}
        <div
          style={{
            background: "#fff",
            borderRadius: "8px",
            border: "1px solid #E5E0D8",
            padding: "20px",
            marginBottom: "16px",
          }}
        >
          {/* Author header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "999px",
                background: "#B92B27",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: 700,
                fontSize: "14px",
                flexShrink: 0,
              }}
            >
              {getInitials(authorName)}
            </div>
            <div style={{ flex: 1 }}>
              <p
                style={{
                  margin: 0,
                  fontWeight: 600,
                  fontSize: "15px",
                  color: "#282829",
                }}
              >
                {authorName}
              </p>
              <p
                style={{ margin: 0, fontSize: "12px", color: "#636466" }}
              >
                {post.role || "User Qarou"} ·{" "}
                {timeAgo(post.created_at)}
              </p>
            </div>
            <button
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#636466",
                padding: "4px",
              }}
            >
              <MoreHorizontal size={18} />
            </button>
          </div>

          {/* Konten */}
          <p
            style={{
              fontSize: "16px",
              color: "#282829",
              lineHeight: 1.7,
              margin: "0 0 16px",
            }}
          >
            {post.content}
          </p>

          {/* Gambar */}
          {post.image_url && (
            <div
              style={{
                marginBottom: "16px",
                borderRadius: "8px",
                overflow: "hidden",
                border: "1px solid #E5E0D8",
              }}
            >
              <img
                src={post.image_url}
                alt="Gambar postingan"
                style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", display: "block" }}
              />
            </div>
          )}

          {/* Action bar */}
          <div
            style={{
              borderTop: "1px solid #E5E0D8",
              paddingTop: "12px",
              display: "flex",
              gap: "8px",
            }}
          >
            {/* Like */}
            <button
              onClick={handleLike}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 14px",
                borderRadius: "999px",
                border: `1px solid ${liked ? "#B92B27" : "#E5E0D8"}`,
                background: liked ? "#fff0f0" : "white",
                cursor: "pointer",
                color: liked ? "#B92B27" : "#636466",
                fontSize: "13px",
                fontWeight: liked ? 600 : 400,
                transition: "all 0.15s",
              }}
            >
              <Heart
                size={16}
                fill={liked ? "#B92B27" : "none"}
                color={liked ? "#B92B27" : "#636466"}
              />
              {likeCount}
            </button>

            {/* Komentar */}
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 14px",
                borderRadius: "999px",
                border: "1px solid #E5E0D8",
                background: "white",
                cursor: "pointer",
                color: "#636466",
                fontSize: "13px",
              }}
            >
              <MessageCircle size={16} />
              {comments.length}
            </button>

            {/* Share */}
            <button
              onClick={handleShare}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 14px",
                borderRadius: "999px",
                border: `1px solid ${copied ? "#2E7D32" : "#E5E0D8"}`,
                background: copied ? "#f0fff0" : "white",
                cursor: "pointer",
                color: copied ? "#2E7D32" : "#636466",
                fontSize: "13px",
                transition: "all 0.15s",
                marginLeft: "auto",
              }}
            >
              <Share2 size={16} />
              {copied ? "Disalin!" : "Bagikan"}
            </button>
          </div>
        </div>

        {/* Komentar Section */}
        <div
          style={{
            background: "#fff",
            borderRadius: "8px",
            border: "1px solid #E5E0D8",
            padding: "20px",
          }}
        >
          <h3
            style={{
              margin: "0 0 16px",
              fontSize: "15px",
              color: "#282829",
              fontWeight: 600,
            }}
          >
            Komentar ({comments.length})
          </h3>

          {/* Input komentar */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              marginBottom: "20px",
              alignItems: "flex-end",
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "999px",
                background: "#636466",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "12px",
                fontWeight: 700,
              }}
            >
              U
            </div>
            <div style={{ flex: 1 }}>
              <textarea
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmitComment();
                  }
                }}
                placeholder="Tulis komentar... (Enter untuk kirim)"
                rows={2}
                style={{
                  width: "100%",
                  border: "1px solid #E5E0D8",
                  borderRadius: "8px",
                  padding: "10px 12px",
                  fontSize: "14px",
                  color: "#282829",
                  resize: "none",
                  outline: "none",
                  fontFamily: "inherit",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <button
              onClick={handleSubmitComment}
              disabled={!commentInput.trim() || isSubmitting}
              style={{
                background: commentInput.trim() ? "#B92B27" : "#E5E0D8",
                color: commentInput.trim() ? "white" : "#636466",
                border: "none",
                borderRadius: "8px",
                padding: "10px 12px",
                cursor: commentInput.trim() ? "pointer" : "not-allowed",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {isSubmitting ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Send size={16} />
              )}
            </button>
          </div>

          {/* List komentar */}
          {comments.length === 0 ? (
            <p
              style={{
                textAlign: "center",
                color: "#636466",
                fontSize: "14px",
                padding: "20px 0",
              }}
            >
              Belum ada komentar. Jadilah yang pertama!
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {comments.map((c) => (
                <div key={c.id} style={{ display: "flex", gap: "10px" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "999px",
                      background: "#B92B27",
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontSize: "11px",
                      fontWeight: 700,
                    }}
                  >
                    {getInitials(c.author)}
                  </div>
                  <div
                    style={{
                      flex: 1,
                      background: "#F7F2EB",
                      borderRadius: "8px",
                      padding: "10px 14px",
                    }}
                  >
                    <p
                      style={{
                        margin: "0 0 4px",
                        fontWeight: 600,
                        fontSize: "13px",
                        color: "#282829",
                      }}
                    >
                      {c.author}
                      <span
                        style={{
                          fontWeight: 400,
                          color: "#636466",
                          marginLeft: "8px",
                          fontSize: "11px",
                        }}
                      >
                        {timeAgo(c.created_at)}
                      </span>
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "14px",
                        color: "#282829",
                        lineHeight: 1.5,
                      }}
                    >
                      {c.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
