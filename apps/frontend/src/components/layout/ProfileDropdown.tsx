import React from "react";

type ProfileDropdownProps = {
  user: {
    name: string;
    email: string;
  };
  onClose: () => void;
};

export default function ProfileDropdown({ user, onClose }: ProfileDropdownProps) {
  return (
    <>
      {/* Overlay tak terlihat untuk menutup dropdown jika klik di luar */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      {/* Container Menu Dropdown */}
      <div className="absolute right-0 mt-2 w-64 rounded-xl bg-zinc-900 border border-zinc-800 p-3 shadow-2xl z-50 flex flex-col gap-1.5 text-zinc-200 text-left animate-in fade-in slide-in-from-top-2 duration-150">
        
        {/* Detail Pengguna */}
        <div className="flex flex-col border-b border-zinc-800 pb-2.5 mb-1 px-2">
          <span className="font-semibold text-white text-sm truncate">{user.name}</span>
          <span className="text-xs text-zinc-400 truncate">{user.email}</span>
        </div>

        {/* Menu Navigasi (Berbaris rapi ke bawah karena flex-col) */}
        <button className="w-full text-left px-2.5 py-2 text-sm hover:bg-zinc-800 rounded-lg transition-colors flex items-center">
          💬 Pesan
        </button>
        <button className="w-full text-left px-2.5 py-2 text-sm hover:bg-zinc-800 rounded-lg transition-colors flex items-center">
          🔖 Daftar Bacaan
        </button>
        <button className="w-full text-left px-2.5 py-2 text-sm hover:bg-zinc-800 rounded-lg transition-colors flex items-center">
          📝 Draf
        </button>
        <button className="w-full text-left px-2.5 py-2 text-sm hover:bg-zinc-800 rounded-lg transition-colors flex items-center">
          📊 Konten & Statistik Anda
        </button>
        
        <div className="border-t border-zinc-800 my-1" />

        <button className="w-full text-left px-2.5 py-2 text-sm hover:bg-zinc-800 rounded-lg transition-colors flex items-center justify-between">
          <span>🌙 Mode Gelap</span>
          <span className="text-xs bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-400">Otomatis</span>
        </button>
        
        <button className="w-full text-left px-2.5 py-2 text-sm hover:bg-zinc-800 rounded-lg transition-colors flex items-center">
          ⚙️ Setelan
        </button>
        <button className="w-full text-left px-2.5 py-2 text-sm hover:bg-zinc-800 rounded-lg transition-colors flex items-center">
          🌐 Bahasa
        </button>

        <div className="border-t border-zinc-800 my-1" />

        <button className="w-full text-left px-2.5 py-2 text-sm text-red-400 hover:bg-red-950/30 rounded-lg transition-colors flex items-center">
          🚪 Bantuan & Keluar
        </button>
      </div>
    </>
  );
}