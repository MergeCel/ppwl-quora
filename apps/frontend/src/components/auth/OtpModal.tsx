import { useState } from "react";

export default function OtpModal({
  email,
  onClose,
  onVerified,
}: {
  email: string;
  onClose: () => void;
  onVerified: () => void;
}) {
  const [code, setCode] = useState("");

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Tutup"
        >
          ✕
        </button>

        <h2 className="modal-title">
          Konfirmasikan surel Anda
        </h2>

        <p className="modal-desc">
          Masukkan kode yang kami kirimkan ke{" "}
          <strong>{email}</strong>
        </p>

        <input
          className="form-input"
          type="text"
          maxLength={6}
          value={code}
          onChange={(e) =>
            setCode(e.target.value)
          }
          style={{
            letterSpacing: "0.3em",
            fontSize: "1.25rem",
            textAlign: "center",
          }}
        />

        <p className="resend-link">
          Tidak menerima surel atau ada yang salah?{" "}
          <button
            className="link-btn"
            type="button"
          >
            Kirim ulang kode
          </button>
        </p>

        <div className="modal-footer">
          <button
            className="btn-primary"
            onClick={onVerified}
          >
            Selanjutnya
          </button>
        </div>
      </div>
    </div>
  );
}