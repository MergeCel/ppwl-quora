export default function ConnectedAccounts() {
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
          <span className="google-icon">
            G
          </span>

          <span>Google</span>
        </div>

        <div className="settings-value">
          <p>
            regishashrn07@gmail.com
          </p>

          <button className="settings-link">
            Putuskan
          </button>
        </div>

      </div>

      <div className="settings-row">

        <div className="connected-platform">
          <span className="facebook-icon">
            f
          </span>

          <span>Facebook</span>
        </div>

        <div className="settings-value">
          <button className="settings-link">
            Sambungkan Akun Facebook
          </button>
        </div>

      </div>

    </section>
  );
}