// components/MusicCard.tsx
import { Play } from "lucide-react";

interface MusicCardProps {
  title: string;
  subtitle: string;
  image: string;
  isRound?: boolean;
  label?: string;
  isChart?: boolean;
}

export default function MusicCard({
  title,
  subtitle,
  image,
  isRound = false,
  label,
  isChart = false,
}: MusicCardProps) {

  const renderImage = () => (
    <div className="relative mb-4">
      <img
        src={image}
        alt={title}
        className={`w-full aspect-square object-cover shadow-lg ${isRound ? "rounded-full" : "rounded-md"}`}
        // Fallback jika gambar tetap tidak load
        onError={(e) => {
          (e.target as HTMLImageElement).src = "https://via.placeholder.com/300?text=No+Image";
        }}
      />
      <button className="absolute bottom-2 right-2 w-10 h-10 bg-[#1DB954] rounded-full flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-xl hover:scale-105 hover:bg-[#1ed760]">
        <Play className="w-4 h-4 text-black fill-black ml-0.5" />
      </button>
    </div>
  );

  return (
    <div className="group relative bg-[#121212] hover:bg-[#282828] rounded-md p-1 transition-all duration-300 cursor-pointer min-w-[180px] w-[180px] flex-shrink-0">
      {renderImage()}
      <h3 className="font-bold text-white text-sm truncate mb-1">{title}</h3>
      <p className="text-[#a7a7a7] text-xs line-clamp-2 leading-snug">
        {subtitle}
      </p>
    </div>
  );
}