// components/Navbar.tsx
import { Link, useLocation } from "react-router-dom";
import { Search, Home, Download } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="h-16 bg-black flex items-center justify-between px-4 z-50">
      {/* Logo & Navigasi Halaman */}
      <div className="flex items-center gap-4">
        <Link to="/" className="text-white p-2 hover:scale-105 transition">
          <svg viewBox="0 0 167.5 167.5" className="w-8 h-8 fill-current">
            <path d="M83.7 0C37.5 0 0 37.5 0 83.7c0 46.3 37.5 83.7 83.7 83.7 46.3 0 83.7-37.5 83.7-83.7C167.5 37.5 130 0 83.7 0zm38.4 120.6c-1.5 2.5-4.8 3.3-7.3 1.8-19.4-11.9-43.8-14.6-72.6-8-2.8.7-5.6-1.2-6.3-3.9-.7-2.8 1.2-5.6 3.9-6.3 31.5-7.2 58.4-4.1 80 9.1 2.5 1.5 3.3 4.8 2.3 7.3zm10.3-22.7c-1.9 3.1-6 4.1-9.1 2.2-22.3-13.7-56.1-17.7-82.3-9.8-3.5 1.1-7.1-1-8.2-4.5-1.1-3.5 1-7.1 4.5-8.2 30-9.1 67.4-4.7 93 11 3.1 1.8 4.1 5.9 2.1 9.3zm.8-23.9C105.7 57.3 60 55.8 33.5 63.8c-4.2 1.3-8.6-1.1-9.9-5.3-1.3-4.2 1.1-8.6 5.3-9.9 30.2-9.1 80.7-7.4 112.5 11.5 3.8 2.3 5 7.2 2.7 11-2.3 3.8-7.2 5-11 2.7z" />
          </svg>
        </Link>
        <div className="flex gap-2">
          <Link to="/" className={`px-4 py-2 rounded-full text-sm font-bold transition ${isActive("/") ? "bg-white text-black" : "text-[#b3b3b3] hover:text-white hover:bg-white/10"}`}>
            Page 1
          </Link>
          <Link to="/album" className={`px-4 py-2 rounded-full text-sm font-bold transition ${isActive("/album") ? "bg-white text-black" : "text-[#b3b3b3] hover:text-white hover:bg-white/10"}`}>
            Page 2
          </Link>
        </div>
      </div>

      {/*Search Bar */}
      <div className="flex-1 max-w-[400px] mx-4 relative group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#b3b3b3] group-focus-within:text-white" size={20} />
        <input type="text" placeholder="What do you want to play?" className="bg-[#242424] hover:bg-[#2a2a2a] border-none text-white text-sm rounded-full py-3 px-10 w-full focus:ring-2 ring-white outline-none transition-all" />
      </div>

      {/* Teks Navigasi Asli Spotify */}
      <div className="flex items-center gap-6">
        <div className="hidden lg:flex items-center gap-5 text-sm font-bold text-[#b3b3b3]">
          <span className="hover:text-white cursor-pointer hover:scale-105 transition">Premium</span>
          <span className="hover:text-white cursor-pointer hover:scale-105 transition">Support</span>
          <span className="hover:text-white cursor-pointer hover:scale-105 transition">Download</span>
          <div className="h-6 w-[1px] bg-white/20"></div>
          <div className="flex items-center gap-2 hover:text-white cursor-pointer hover:scale-105 transition">
             <Download size={18} />
             <span>Install App</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-[#b3b3b3] font-bold text-sm hover:text-white hover:scale-105 transition">Sign up</button>
          <button className="bg-white text-black font-bold py-3 px-8 rounded-full hover:scale-105 transition">Log in</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;