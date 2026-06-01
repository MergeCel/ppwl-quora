import "./style/settings.css";
import SettingsSidebar from "./components/settings/SettingsSidebar.tsx";
import AccountSettings from "./components/settings/AccountSettings.tsx";
import ConnectedAccounts from "./components/settings/ConnectedAccounts.tsx";
import TopNavbar from "./components/layout/TopNavbar.tsx";
import { useAuthStore } from "./stores/AuthStore";

export default function SettingsPage() {
  const { user } = useAuthStore();

  const safeUser = {
    name: user?.name || "User",
    email: user?.email || "user@gmail.com",
    avatarUrl: user?.avatarUrl,
  };

  return (
    <div className="settings-root">
      <TopNavbar user={safeUser} />
      <div className="settings-container">
        <SettingsSidebar />
        <div className="settings-content">
          <h1 className="settings-title">Setelan Akun</h1>
          <AccountSettings user={safeUser} />
          <ConnectedAccounts user={safeUser} />
        </div>
      </div>
    </div>
  );
}
