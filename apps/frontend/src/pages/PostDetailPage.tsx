import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, MessageCircle, Share2, Send } from "lucide-react";
import { useAuthStore } from "../stores/AuthStore";

export default function PostDetailPage() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, token } = useAuthStore();

  const [post, setPost] = useState<any | null>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentInput, setCommentInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL as string | undefined;

  useEffect(() => {
    const fetchData = async () => {
      if (!backendUrl || !id) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch(`${backendUrl}/posts/${id}`);
        if (!res.ok) return;
        const json = await res.json();
        setPost(json.data);
        setLikeCount(json.data._count?.likes || 0);
        setComments(json.data.comments || []);
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
      alert("Silakan login dahulu");
      return;
    }
    setLiked((p) => !p);
    setLikeCount((p) => (liked ? p - 1 : p + 1));

    try {
      await fetch(`${backendUrl}/posts/${id}/like`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      setLiked((p) => !p);
      setLikeCount((p) => (liked ? p + 1 : p - 1));
      console.error("Like failed:", err);
    }
  };

  const handleSubmitComment = async () => {
    if (!isAuthenticated) {
      alert("Login untuk komentar");
      return;
    }
    if (!commentInput.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res = await fetch(`${backendUrl}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ content: commentInput, post_id: Number(id) }),
      });
      if (!res.ok) return;
      const json = await res.json();
      setComments((prev) => [...prev, json.data]);
      setCommentInput("");
    } catch (err) {
      console.error("Komentar gagal:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard?.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Gagal menyalin link:", err);
    }
  };

  if (isLoading) return <div>Memuat...</div>;
  if (!post) return <div>Post tidak ditemukan</div>;

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "16px", color: "#eee" }}>
      <button type="button" onClick={() => navigate(-1)} style={{ background: "none", border: "none", color: "#aaa", cursor: "pointer" }}>
        <ArrowLeft size={18} /> Kembali
      </button>

      <div style={{ background: "#1a1a1a", padding: "20px", borderRadius: "12px", marginTop: "16px" }}>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#7c3aed", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>
            {post.user?.avatarUrl ? (
              <img src={post.user.avatarUrl} alt={`${post.user?.name || "user"} avatar`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              post.user?.name?.charAt(0).toUpperCase()
            )}
          </div>

          <div>
            <b>{post.user?.name}</b>
            <div style={{ fontSize: "12px", color: "#888" }}>{new Date(post.created_at).toLocaleString("id-ID")}</div>
          </div>
        </div>

        <p>{post.content}</p>

        {post.image_url && <img src={post.image_url} alt="post" style={{ width: "100%", borderRadius: "10px" }} />}

        <hr />

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button type="button" onClick={handleLike} aria-pressed={liked}>
            <Heart /> {likeCount}
          </button>

          <button type="button">
            <MessageCircle /> {comments.length}
          </button>

          <button type="button" onClick={handleShare}>
            <Share2 /> {copied ? "Disalin!" : "Bagikan"}
          </button>
        </div>

        <textarea value={commentInput} onChange={(e) => setCommentInput(e.target.value)} placeholder="Komentar..." style={{ width: "100%", marginTop: "20px" }} />

        <button type="button" onClick={handleSubmitComment} disabled={isSubmitting} style={{ marginTop: 8 }}>
          <Send size={14} /> Kirim
        </button>

        {comments.map((c) => (
          <div key={c.id} style={{ background: "#1a1a1a", padding: "15px", borderRadius: "10px", marginTop: "15px" }}>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#0ea5a4", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {c.user?.avatarUrl ? (
                  <img src={c.user.avatarUrl} alt={`${c.user?.name || "user"} avatar`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  c.user?.name?.charAt(0).toUpperCase()
                )}
              </div>

              <b>{c.user?.name}</b>
            </div>

            <p>{c.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
 