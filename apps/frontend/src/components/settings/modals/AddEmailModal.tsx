export default function AddEmailModal({
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

        <div className="modal-content">

          <h2 className="modal-title">
            Tambah Surel
          </h2>

          <div className="form-group">
            <input
              type="email"
              placeholder="nama@contoh.id"
              className="form-input"
            />
          </div>

        </div>

        <div className="modal-footer">

          <button
            className="modal-submit"
          >
            Tambah Surel
          </button>

        </div>
      </div>
    </div>
  );
}