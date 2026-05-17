import {
  MessageCircle,
  Share2,
  ArrowBigUp,
} from "lucide-react";

import { useState } from "react";

export default function PostActions() {

  const [liked, setLiked] =
    useState(false);

  return (
    <div className="post-actions">

      <button
        className={`action-btn ${
          liked ? "liked" : ""
        }`}
        onClick={() =>
          setLiked(!liked)
        }
      >
        <ArrowBigUp size={18} />

        <span>
          Upvote
        </span>
      </button>

      <button className="action-btn">
        <MessageCircle size={18} />

        <span>
          Komentar
        </span>
      </button>

      <button className="action-btn">
        <Share2 size={18} />

        <span>
          Bagikan
        </span>
      </button>

    </div>
  );
}