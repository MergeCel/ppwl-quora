import { useState } from "react";

interface RegisterForm {
  name: string;
  email: string;
}

export default function RegisterModal({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: (email: string) => void;
}) {
  const [form, setForm] =
    useState<RegisterForm>({
      name: "",
      email: "",
    });

  const isNameValid =
    form.name.trim().length >= 2;

  const isEmailValid =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      .test(form.email);

  const isFormValid =
    isNameValid && isEmailValid;

  const handleSubmit = async () => {

    if (!isFormValid) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/register`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            name: form.name,
            email: form.email,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Register gagal"
        );
      }

      onSuccess(form.email);

    } catch (err: any) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="modal"
        onClick={(e) =>
          e.stopPropagation()
        }
      >
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Tutup"
        >
          ✕
        </button>

        <h2 className="modal-title">
          Daftar
        </h2>

        <div className="form-group">
          <label className="form-label">
            Nama
          </label>

          <input
            className={`form-input ${
              form.name &&
              !isNameValid
                ? "form-input-error"
                : ""
            }`}
            type="text"
            placeholder="Nama panggilan Anda"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

          {form.name &&
           !isNameValid && (
            <p className="form-error">
              ⓘ Panjang nama Anda harus terdiri dari setidaknya 2 karakter.
            </p>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">
            Surel
          </label>

          <input
            className={`form-input ${
              form.email &&
              !isEmailValid
                ? "form-input-error"
                : ""
            }`}
            type="email"
            placeholder="Surel Anda"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
          />

          {form.email &&
           !isEmailValid && (
            <p className="form-error">
              ⓘ Alamat surel yang Anda masukkan tidak valid.
            </p>
          )}
        </div>

        <div className="modal-footer">
          <button
            className="btn-primary"
            onClick={handleSubmit}
            disabled={!isFormValid}
          >
            Selanjutnya
          </button>
        </div>
      </div>
    </div>
  );
}