import { useState } from "react";
import { moreByNikiData } from "../lib/spotify-data"; // Import data lengkapnya


import coverMain from "../assets/youll-be-in-my-heart.jpg";
import coverLowkey from "../assets/niki-lowkey.jpg";

const albumTracks = [
  { id: 1, title: "Before – Acoustic Version", artist: "NIKI", duration: "4:38" },
  { id: 2, title: "You'll Be in My Heart", artist: "NIKI", duration: "4:03" },
];

function PlayIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M8 5.14v14l11-7-11-7z" />
    </svg>
  );
}

export default function Page2() {
  const [hoveredTrack, setHoveredTrack] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);

  return (
    <div className="flex flex-col">
      {/* 1. Header Album */}
      <div className="flex flex-col sm:flex-row items-end gap-6 pb-8 -mx-6 -mt-4 p-6 bg-gradient-to-b from-[#2a2a3a] to-[#121212]">
        <div className="w-[190px] h-[190px] min-w-[190px] shadow-[0_8px_40px_rgba(0,0,0,0.5)] rounded overflow-hidden">
          <img src={coverMain} alt="Cover" className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold uppercase">Single</span>
          <h1 className="text-5xl lg:text-7xl font-black leading-tight tracking-tight">You'll Be In My Heart</h1>
          <div className="flex items-center gap-2 mt-4 text-sm font-bold">
            <div className="w-6 h-6 rounded-full bg-zinc-600 overflow-hidden">
                <img src={coverLowkey} className="w-full h-full object-cover" alt="NIKI" />
            </div>
            <span className="hover:underline cursor-pointer">NIKI</span>
            <span className="text-white/60">• 2022 • 2 songs, <span className="font-normal text-white/50">8 min 40 sec</span></span>
          </div>
        </div>
      </div>

      {/* 2. Controls Section */}
      <div className="flex items-center gap-8 py-6">
        <button
          onClick={() => setPlaying(!playing)}
          className="w-14 h-14 bg-[#1DB954] rounded-full flex items-center justify-center hover:scale-105 hover:bg-[#1ed760] transition-all shadow-lg"
        >
          {playing ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="black">
              <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <PlayIcon size={22} className="text-black ml-0.5" />
          )}
        </button>
        <button className="text-[#a7a7a7] hover:text-white transition">
           <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
             <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" />
           </svg>
        </button>
      </div>

      {/* 3. Tracklist Section */}
      <div className="mb-8">
        <div className="grid grid-cols-[16px_1fr_40px] gap-4 px-4 pb-2 border-b border-white/10 text-[#a7a7a7] text-sm font-medium uppercase tracking-widest">
          <span>#</span>
          <span>Title</span>
          <div className="flex justify-end pr-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
          </div>
        </div>
        <div className="mt-4">
          {albumTracks.map((track, index) => (
            <div
              key={track.id}
              className="grid grid-cols-[16px_1fr_40px] gap-4 px-4 py-2 rounded-md hover:bg-white/10 transition group cursor-pointer items-center"
              onMouseEnter={() => setHoveredTrack(track.id)}
              onMouseLeave={() => setHoveredTrack(null)}
            >
              <span className="text-[#a7a7a7] text-sm">
                {hoveredTrack === track.id ? <PlayIcon size={12} className="text-white" /> : index + 1}
              </span>
              <div className="flex flex-col">
                <span className="text-white text-base font-medium truncate">{track.title}</span>
                <span className="text-[#a7a7a7] text-sm hover:underline cursor-pointer w-fit">{track.artist}</span>
              </div>
              <span className="text-[#a7a7a7] text-sm text-right pr-2">{track.duration}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Copyright */}
      <div className="text-[#a7a7a7] text-[10px] space-y-1 mb-12">
        <p>September 14, 2022</p>
        <p>© 2022 88rising Records LLC</p>
        <p>℗ 2022 88rising Records LLC</p>
      </div>

      {/* 5. More by NIKI Section (MENGGUNAKAN DATA LIB) */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white hover:underline cursor-pointer">More by NIKI</h2>
          <span className="text-xs font-bold text-[#a7a7a7] hover:text-white cursor-pointer uppercase tracking-tighter">See discography</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {moreByNikiData.map((item) => (
            <div key={item.id} className="group bg-[#181818] hover:bg-[#282828] p-4 rounded-lg transition-all duration-300 cursor-pointer">
              <div className="relative mb-4 shadow-lg">
                <div className="aspect-square rounded-md overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <button className="absolute bottom-2 right-2 w-10 h-10 bg-[#1DB954] rounded-full flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all shadow-xl">
                   <PlayIcon size={16} className="text-black ml-0.5" />
                </button>
              </div>
              <h3 className="text-white font-bold text-sm truncate mb-1">{item.title}</h3>
              <p className="text-[#a7a7a7] text-sm">{item.year}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}