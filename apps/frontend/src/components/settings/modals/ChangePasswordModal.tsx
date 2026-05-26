export default function ChangePasswordModal({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="settings-modal"
        onClick={(e) =>
          e.stopPropagation()
        }
      >
        <button
          className="modal-close"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="modal-title">
          Masukkan Sandi
        </h2>

        <p className="modal-description">
          Untuk alasan keamanan, silakan masukkan sandi Anda untuk melanjutkan. Jika Anda mendaftar Qarou menggunakan Google, silakan 
          buat sandi akun.
        </p>

        <div className="form-group">
          <label>Sandi</label>

          <input
            type="password"
            className="form-input"
          />
        </div>

        <div className="modal-footer">
          <button
            className="modal-cancel"
            onClick={onClose}
          >
            Batal
          </button>

          <button className="modal-submit">
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
}