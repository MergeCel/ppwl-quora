import "./style/settings.css";

import SettingsSidebar from "./components/settings/SettingsSidebar.tsx";
import AccountSettings from "./components/settings/AccountSettings.tsx";
import ConnectedAccounts from "./components/settings/ConnectedAccounts.tsx";
import TopNavbar from "./components/layout/TopNavbar.tsx";

export default function SettingsPage() {
  return (
    <div className="settings-root">
      <TopNavbar />

      <div className="settings-container">

        <SettingsSidebar />

        <div className="settings-content">

          <h1 className="settings-title">
            Setelan Akun
          </h1>

          <AccountSettings />

          <ConnectedAccounts />

        </div>

      </div>
    </div>
  );
}