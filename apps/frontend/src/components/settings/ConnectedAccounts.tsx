import GoogleIcon from "../auth/GoogleButton.tsx";
export default function ConnectedAccounts({
  user,
}: {
  user: {
    name: string;
    email: string;
  };
}) {
  return (
    <section className="settings-section">

      <div className="settings-section-header">

        <h2>
          Akun & Kontak yang Terhubung
        </h2>

        <button className="settings-link">
          Pelajari lebih lanjut
        </button>

      </div>

      <div className="settings-row">

        <div className="connected-platform">
          <GoogleIcon />

          <span>Google</span>
        </div>

        <div className="settings-value">
          <p>
            {user.email}
          </p>

          <button className="settings-link">
            Putuskan
          </button>
        </div>

      </div>

    </section>
  );
}