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

export default function TopNavbar() {
  return (
    <header className="topnav">

      <div className="topnav-inner">

        {/* logo */}
        <div className="topnav-logo">
          Quora
        </div>

        {/* nav */}
        <div className="topnav-nav">

          <button className="topnav-icon active">
            <Home size={22} />
          </button>

          <button className="topnav-icon">
            <ClipboardList size={22} />
            <div className="notif-dot" />
          </button>

          <button className="topnav-icon">
            <PenSquare size={22} />
          </button>

          <button className="topnav-icon">
            <Users size={22} />
          </button>

          <button className="topnav-icon">
            <Bell size={22} />
            <div className="notif-badge">
              
            </div>
          </button>

        </div>

        {/* search */}
        <div className="topnav-search">

          <Search
            size={16}
            className="search-icon"
          />

          <input
            type="text"
            placeholder="Cari Quora"
          />

        </div>

        {/* right */}
        <div className="topnav-right">

          <button className="topnav-avatar">
            R
          </button>

          <button className="topnav-globe">
            <Globe size={18} />
          </button>

          <button className="topnav-question-btn">
            Tambah pertanyaan
          </button>

          <button className="topnav-dropdown">
            <ChevronDown size={16} />
          </button>

        </div>

      </div>

    </header>
  );
}