export default function AccountSettings() {
  return (
    <section className="settings-section">

      <div className="settings-row">
        <div className="settings-label">
          Surel
        </div>

        <div className="settings-value">
          <p>
            regishashrn07@gmail.com
            <span className="primary-email">
              Surel Utama
            </span>
          </p>

          <button className="settings-link">
            Tambah Alamat Surel Lain
          </button>
        </div>
      </div>

      <div className="settings-row">
        <div className="settings-label">
          Sandi
        </div>

        <div className="settings-value">
          <button className="settings-link">
            Ubah Sandi
          </button>
        </div>
      </div>

      <div className="settings-row">
        <div className="settings-label">
          Keluar
        </div>

        <div className="settings-value">
          <button className="settings-link">
            Keluar dari semua peramban lain
          </button>
        </div>
      </div>

      <div className="settings-row">
        <div className="settings-label">
          Keamanan masuk
        </div>

        <div className="settings-value">
          <div className="toggle-wrap">
            <span>
              Verifikasi surel diperlukan
            </span>

            <div className="toggle-switch" />
          </div>
        </div>
      </div>

    </section>
  );
}