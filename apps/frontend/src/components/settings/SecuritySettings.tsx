interface ProfileFooterProps {
  saving: boolean;
  handleSave: () => void;
}

export default function ProfileFooter({
  saving,
  handleSave,
}: ProfileFooterProps) {
  return (
    <div className="ep-footer">

      <button
        className="btn-cancel"
        onClick={() =>
          window.history.back()
        }
      >
        Batal
      </button>

      <button
        className="btn-save"
        onClick={handleSave}
        disabled={saving}
      >
        {saving
          ? "Menyimpan..."
          : "Simpan Perubahan"}
      </button>

    </div>
  );
}