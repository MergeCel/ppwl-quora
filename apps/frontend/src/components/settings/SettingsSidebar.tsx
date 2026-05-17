const items = [
  "Akun",
  "Privasi",
  "Tampilan",
  "Surel & Notifikasi",
  "Bahasa",
];

export default function SettingsSidebar() {
  return (
    <aside className="settings-sidebar">

      <h2 className="sidebar-title">
        Setelan
      </h2>

      <div className="sidebar-menu">
        {items.map((item, index) => (
          <button
            key={item}
            className={`sidebar-item ${
              index === 0
                ? "sidebar-item-active"
                : ""
            }`}
          >
            {item}
          </button>
        ))}
      </div>

    </aside>
  );
}