import "./style/settings.css";

import SettingsSidebar from "./components/settings/SettingsSidebar.tsx";
import AccountSettings from "./components/settings/AccountSettings.tsx";
import ConnectedAccounts from "./components/settings/ConnectedAccounts.tsx";
import TopNavbar from "./components/layout/TopNavbar.tsx";

export default function SettingsPage() {
  const user = {
    name: localStorage.getItem("name") || "User",

    email:
      localStorage.getItem("email") ||
      "user@gmail.com",
  };
  return (
    <div className="settings-root">
      <TopNavbar user={user} />
      <div className="settings-container">

        <SettingsSidebar />

        <div className="settings-content">

          <h1 className="settings-title">
            Setelan Akun
          </h1>

          <AccountSettings user={user} />

          <ConnectedAccounts user={user} />

        </div>

      </div>
    </div>
  );
}
