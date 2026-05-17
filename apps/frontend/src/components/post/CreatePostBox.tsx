import { HelpCircle, PenLine, Send } from "lucide-react";

export default function CreatePostBox({ userName = "User" }: { userName?: string }) {
  return (
    <div className="create-post-box">
      <div className="create-post-top">
        <div className="create-post-avatar">
          {userName.charAt(0).toUpperCase()}
        </div>
        <button className="create-post-input">
          Apa yang ingin Anda tanyakan atau bagikan?
        </button>
      </div>

      <div className="create-post-actions">
        <button className="create-action-btn">
          <HelpCircle size={18} />
          <span>Tanya</span>
        </button>
        <button className="create-action-btn">
          <PenLine size={18} />
          <span>Jawab</span>
        </button>
        <button className="create-action-btn">
          <Send size={18} />
          <span>Kiriman</span>
        </button>
      </div>
    </div>
  );
}