import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const spaces = [
  { name: "Siswa ambis",       color: "#e53e3e", label: "S" },
  { name: "RuangDev",          color: "#2e69ff", label: "R" },
  { name: "Ilmu baru hari ini✨", color: "#d97706", label: "I" },
  { name: "Penghasilan dari...", color: "#7c3aed", label: "P" },
  { name: "English Education",  color: "#059669", label: "E" },
  { name: "Merakit Komputer",   color: "#0891b2", label: "M" },
  { name: "HTI (Himpuna...",    color: "#dc2626", label: "H" },
  { name: "Kuliah di Luar...",  color: "#2e69ff", label: "K" },
];

// truncate to ~14 chars for sidebar display
function truncate(s: string, n = 14) {
  return s.length > n ? s.slice(0, n - 2) + ".." : s;
}

export default function LeftSidebar() {
  const navigate = useNavigate();

  return (
    <aside className="left-sidebar">
      {/* TOMBOL INI SEKARANG MENGARAH KE HALAMAN FITURMU */}
      <button 
        className="create-space-btn" 
        onClick={() => navigate('/your-feature')}
      >
        <Plus size={15} />
        <span>Fitur Qarou</span>
      </button>

      <div className="sidebar-space-list">
        {spaces.map((space) => (
          <button 
            key={space.name} 
            className="sidebar-space-item"
            onClick={() => navigate('/home')}
          >
            <div
              className="space-avatar"
              style={{ background: space.color }}
            >
              {space.label}
            </div>
            <span>{truncate(space.name)}</span>
          </button>
        ))}
      </div>

      <div className="sidebar-footer">
        <span>Tentang Qarou</span>
        <span>Ketentuan</span>
        <span>Privasi</span>
        <span>Penggunaan</span>
      </div>
    </aside>
  );
}