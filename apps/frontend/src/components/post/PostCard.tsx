import { useState } from "react";
import { ThumbsUp, MessageSquare, Share2, MoreHorizontal } from "lucide-react";

interface PostCardProps {
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
}

export default function PostCard({
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
}: PostCardProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [visible, setVisible] = useState(true);
  const [expanded, setExpanded] = useState(false);

  if (!visible) return null;

  const PREVIEW_LEN = 160;
  const isLong = content.length > PREVIEW_LEN;
  const displayText = expanded || !isLong ? content : content.slice(0, PREVIEW_LEN);

  const handleLike = () => {
    setLiked((l) => !l);
    setLikeCount((c) => (liked ? c - 1 : c + 1));
  };

  return (
    <div className="post-card">
      {/* Header */}
      <div className="post-header">
        <div className="post-header-left">
          <div className="post-avatar" style={{ background: avatarColor }}>
            {author.charAt(0).toUpperCase()}
          </div>
          <div className="post-user-info">
            <div className="post-author-row">
              <span className="post-author">{author}</span>
              <button className="follow-btn">· Ikuti</button>
            </div>
            <div className="post-role">{role} · {time}</div>
          </div>
        </div>
        <button className="post-close-btn" onClick={() => setVisible(false)}>✕</button>
      </div>

      {/* Content */}
      <div className="post-content">
        {originSpace && (
          <div className="post-origin">
            <div className="post-origin-avatar">T</div>
            <span>{originSpace}</span>
          </div>
        )}
        <div className="post-question">{question}</div>
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
      </div>

      {image && (
        <img className="post-image" src={image} alt="Post visual" loading="lazy" />
      )}

      {/* Actions */}
      <div className="post-actions">
        <button
          className={`action-btn ${liked ? "liked" : ""}`}
          onClick={handleLike}
        >
          <ThumbsUp size={17} />
          {likeCount > 0 && <span>{likeCount}</span>}
        </button>
        <button className="action-btn">
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