import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { Sidebar } from "./Sidebar";
import SpotifyFooter from "./SpotifyFooter";

export default function MainLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-black overflow-hidden font-sans">
      <Navbar />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          onCreatePlaylist={() => console.log("Create playlist")}
        />

        <main className="flex-1 overflow-y-auto bg-[#121212] rounded-lg m-2 ml-0 scroll-smooth flex flex-col">
          <div className="flex-1 px-6 py-4">
            <Outlet /> {/* Di sinilah Page1 atau Page2 akan muncul */}
          </div>
          <SpotifyFooter />
        </main>
      </div>
    </div>
  );
}