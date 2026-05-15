import { useState, useEffect } from "react";

const PlusIcon = () => (
  <svg viewBox="0 0 16 16" className="w-4 h-4 fill-current">
    <path d="M15.25 8a.75.75 0 0 1-.75.75H8.75v5.75a.75.75 0 0 1-1.5 0V8.75H1.5a.75.75 0 0 1 0-1.5h5.75V1.5a.75.75 0 0 1 1.5 0v5.75h5.75a.75.75 0 0 1 .75.75z" />
  </svg>
);

const GlobeIcon = () => (
  <svg viewBox="0 0 16 16" className="w-4 h-4 fill-current">
    <path d="M8.152 16H8a8 8 0 1 1 .152 0zm-.41-14.861c-.272.064-.455.17-.586.3-.206.206-.4.526-.563.905-.226.525-.39 1.163-.5 1.876h4.02a7.624 7.624 0 0 0-.5-1.876c-.164-.379-.358-.699-.564-.905-.13-.13-.313-.236-.586-.3A2.173 2.173 0 0 0 8 1c-.377 0-.629.053-.743.088a2.03 2.03 0 0 0-.515.051zm-2.2.443A6.992 6.992 0 0 0 2.122 5.22h2.516c.14-.958.368-1.835.685-2.587.13-.31.28-.6.454-.866a5.027 5.027 0 0 1-.234-.185zm5.918 0-.233.185c.173.266.323.556.454.866.317.752.544 1.629.685 2.587h2.516a6.993 6.993 0 0 0-3.422-3.638zM1.636 6.22A7.015 7.015 0 0 0 1 8c0 .628.083 1.236.237 1.816l.045-.016H4.08a16.163 16.163 0 0 1 0-3.58H1.636zm.486 4.78A6.992 6.992 0 0 0 5.54 14.64a5.123 5.123 0 0 1-.454-.866c-.317-.752-.545-1.629-.685-2.587H1.885v-.187h.237zm4.212 0c.11.713.274 1.35.5 1.876.163.379.357.699.563.905.256.256.607.388 1.086.388.48 0 .83-.132 1.086-.388.206-.206.4-.526.564-.905.225-.526.39-1.163.5-1.876h-4.3zm6.048 0c-.14.958-.368 1.835-.685 2.587-.13.31-.28.6-.454.866a6.993 6.993 0 0 0 3.422-3.638h-.001l-2.282.185zm2.982-1.78l-.046.016H12.52a16.163 16.163 0 0 0 0-3.58h2.844A7.014 7.014 0 0 1 15.6 8c0 .628-.083 1.236-.237 1.22zM5.08 8c0 .593.03 1.173.088 1.735h5.664A14.4 14.4 0 0 0 10.92 8c0-.593-.03-1.173-.088-1.735H5.168A14.4 14.4 0 0 0 5.08 8z" />
  </svg>
);

interface SidebarProps {
  onCreatePlaylist: () => void;
}

export function Sidebar({ onCreatePlaylist }: SidebarProps) {
  const [width, setWidth] = useState(320);
  const [isDragging, setIsDragging] = useState(false);
  const isWide = width >= 340; // tombol create muncul di atas 340px

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      let newWidth = e.clientX;
      if (newWidth < 300) newWidth = 300;
      if (newWidth > 375) newWidth = 375;
      setWidth(newWidth);
    };
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="flex h-full">
      <aside className="bg-black flex-shrink-0" style={{ width: `${width}px` }}>
        <div className="h-full flex flex-col gap-2 p-2">
          <div className="bg-[#121212] rounded-lg flex-1 flex flex-col overflow-hidden h-full">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 flex-shrink-0">
              <span className="font-bold text-[#b3b3b3] hover:text-white cursor-pointer">
                Your Library
              </span>
              {isWide ? (
                <button
                  onClick={onCreatePlaylist}
                  className="flex items-center gap-2 rounded-full bg-[#1a1a1a] px-3 py-1.5 text-[#b3b3b3] hover:text-white hover:bg-[#2a2a2a] transition-all text-sm font-bold"
                >
                  <PlusIcon />
                  <span>Create</span>
                </button>
              ) : (
                <button
                  onClick={onCreatePlaylist}
                  className="w-8 h-8 rounded-full bg-[#1a1a1a] flex items-center justify-center text-[#b3b3b3] hover:text-white hover:bg-[#2a2a2a] transition-all"
                  title="Create playlist"
                >
                  <PlusIcon />
                </button>
              )}
            </div>

            {/* Scroll area */}
            <div className="flex-1 overflow-y-auto px-1 pb-10 sidebar-scroll">
              {/* Create Playlist Card */}
              <div className="bg-[#242424] rounded-lg p-4 mb-4">
                <h3 className="font-bold text-white mb-1">Create your first playlist</h3>
                <p className="text-sm text-[#b3b3b3] mb-4">It's easy, we'll help you</p>
                <button
                  onClick={onCreatePlaylist}
                  className="bg-white text-black font-bold text-sm px-4 py-2 rounded-full hover:scale-105 transition-transform"
                >
                  Create playlist
                </button>
              </div>

              {/* Podcast Card */}
              <div className="bg-[#242424] rounded-lg p-4 mb-6">
                <p className="font-bold text-white mb-1">Let's find some podcasts to follow</p>
                <p className="text-sm text-[#b3b3b3] mb-4">We'll keep you updated on new episodes</p>
                <button className="bg-white text-black font-bold text-sm px-4 py-2 rounded-full hover:scale-105 transition-transform">
                  Browse podcasts
                </button>
              </div>

              {/* Footer STATIS (tidak berubah saat lebar berubah) */}
              <div className="flex flex-col px-2 text-[11px] mb-6">
                <div className="flex flex-wrap gap-x-3 mb-1">
                  <span className="cursor-pointer text-[#b3b3b3] hover:no-underline">Legal</span>
                  <span className="cursor-pointer text-[#b3b3b3] hover:no-underline">Safety & Privacy Center</span>
                </div>
                <div className="flex flex-wrap gap-x-3 mb-1">
                  <span className="cursor-pointer text-[#b3b3b3] hover:no-underline">Privacy Policy</span>
                  <span className="cursor-pointer text-[#b3b3b3] hover:no-underline">Cookies</span>
                  <span className="cursor-pointer text-[#b3b3b3] hover:no-underline">About Ads</span>
                </div>
                <div className="flex flex-wrap gap-x-3 mb-1">
                  <span className="cursor-pointer text-[#b3b3b3] hover:no-underline">Accessibility</span>
                </div>
                <div className="mt-3">
                  <span className="cursor-pointer text-white hover:underline">Cookies</span>
                </div>
              </div>

              <button className="mt-2 mx-2 flex items-center gap-2 border border-[#7c7c7c] rounded-[18px] px-4 py-2 text-sm text-white font-bold hover:scale-105 transition-transform hover:border-white">
                <GlobeIcon />
                English
              </button>
            </div>
          </div>
        </div>
      </aside>

      <div
        className="w-1 bg-black hover:bg-gray-600 cursor-ew-resize transition-colors duration-150"
        onMouseDown={handleMouseDown}
      />
    </div>
  );
}