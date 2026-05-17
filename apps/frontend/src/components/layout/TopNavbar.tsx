import {
  Home,
  ClipboardList,
  PenSquare,
  Users,
  Bell,
  Search,
  Globe,
  ChevronDown,
} from "lucide-react";

export default function TopNavbar({
  user,
}: {
  user: { name: string; email: string };
}) {
  return (
    <header className="topnav">
      <div className="topnav-inner">

        {/* Logo */}
        <div className="topnav-logo">Quora</div>

        {/* Nav icons */}
        <div className="topnav-nav">
          <button className="topnav-icon" title="Beranda">
            <Home size={22} />
          </button>
          <button className="topnav-icon" title="Jawabanku">
            <ClipboardList size={22} />
            <div className="notif-dot" />
          </button>
          <button className="topnav-icon" title="Tulis">
            <PenSquare size={22} />
          </button>
          <button className="topnav-icon" title="Komunitas">
            <Users size={22} />
          </button>
          <button className="topnav-icon" title="Notifikasi">
            <Bell size={22} />
            <div className="notif-badge"></div>
          </button>
        </div>

        {/* Search */}
        <div className="topnav-search">
          <Search size={15} className="search-icon" />
          <input type="text" placeholder="Cari Quora" />
        </div>

        {/* Right */}
        <div className="topnav-right">
          <button className="topnav-avatar">
            {user.name.charAt(0).toUpperCase()}
          </button>
          <button className="topnav-globe">
            <Globe size={18} />
          </button>
          <button className="topnav-question-btn">Tambah pertanyaan </button>
        </div>

      </div>
    </header>
  );
}