import { useState } from "react";

export default function EditNameModal({
  currentName,
  onClose,
  onSave,
}: {
  currentName: string;

  onClose: () => void;

  onSave: (name: string) => void;
}) {

  const [name, setName] =
    useState(currentName);

  return (
    <div className="modal-overlay">

      <div className="edit-name-modal">

        <button
          className="modal-close"
          onClick={onClose}
        >
          ✕
        </button>

        <h2>Edit Nama</h2>

        <p>
          Anda bisa mengubah nama Anda
          hingga 10 kali.
        </p>

        <label>Nama</label>

        <input
          type="text"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <div className="modal-actions">

          <button
            className="save-btn"
            onClick={() => {
              onSave(name);
              onClose();
            }}
          >
            Selesai
          </button>

        </div>

      </div>

    </div>
  );
}