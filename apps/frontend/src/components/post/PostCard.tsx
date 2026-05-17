import { ArrowUp, MessageSquare, Repeat2, Share2, MoreHorizontal } from "lucide-react";

interface PostCardProps {
  author: string;
  role: string;
  time?: string;
  question: string;
  content: string;
  image?: string;
  originSpace?: string;
  avatarColor?: string;
  likes: number;
  comments: number;
}

export default function PostCard({
  author,
  role,
  question,
  content,
  image,
  avatarColor = "#3b82f6", // Default warna biru kalau ngga ada
  likes,
  comments,
}: PostCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl mt-4 overflow-hidden hover:border-gray-300 transition-colors">
      
      {/* --- HEADER: Info User --- */}
      <div className="p-4 pb-2 flex items-start gap-3">
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
          style={{ backgroundColor: avatarColor }}
        >
          {author.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-[15px] hover:underline cursor-pointer text-gray-900 leading-tight">
              {author}
            </h3>
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <MoreHorizontal size={20} />
            </button>
          </div>
          <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{role}</p>
        </div>
      </div>

      {/* --- CONTENT: Pertanyaan & Teks --- */}
      <div className="p-4 pt-1">
        <h2 className="font-bold text-lg text-gray-900 mb-2 leading-snug cursor-pointer hover:underline">
          {question}
        </h2>
        <p className="text-gray-700 text-[15px] leading-relaxed line-clamp-3">
          {content}
        </p>
      </div>

      {/* --- IMAGE: Gambar Postingan (Kalau Ada) --- */}
      {image && (
        <div className="w-full max-h-[400px] bg-gray-50 border-y border-gray-100 overflow-hidden mt-2">
          <img 
            src={image} 
            alt="Post cover" 
            className="w-full h-full object-cover" 
          />
        </div>
      )}

      {/* --- ACTIONS: Tombol Interaksi --- */}
      <div className="px-4 py-2.5 flex items-center gap-2 border-t border-gray-100 mt-2">
        
        {/* Grup Tombol Upvote & Downvote */}
        <div className="flex items-center bg-gray-50 hover:bg-gray-100 transition-colors rounded-full border border-gray-200 shadow-sm">
          <button className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-gray-200/50 transition-colors rounded-l-full text-gray-600 text-sm font-semibold">
            <ArrowUp size={18} strokeWidth={2.5} className="text-blue-600" />
            <span>Dukung naik · {likes}</span>
          </button>
          <div className="w-[1px] h-5 bg-gray-300"></div>
          <button className="px-3 py-1.5 hover:bg-gray-200/50 transition-colors rounded-r-full text-gray-600">
            <ArrowUp size={18} strokeWidth={2.5} className="rotate-180" />
          </button>
        </div>

        {/* Tombol Komen */}
        <button className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-gray-100 transition-colors rounded-full text-gray-500 text-sm font-semibold">
          <MessageSquare size={18} />
          <span>{comments}</span>
        </button>

        {/* Tombol Repost */}
        <button className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-gray-100 transition-colors rounded-full text-gray-500 text-sm font-semibold">
          <Repeat2 size={18} />
        </button>

        {/* Tombol Share */}
        <button className="flex items-center gap-1.5 px-3 py-1.5 ml-auto hover:bg-gray-100 transition-colors rounded-full text-gray-500 text-sm font-semibold">
          <Share2 size={18} />
        </button>
      </div>
      
    </div>
  );
}