import { useState } from "react";

interface RegisterForm {
  name: string;
  email: string;
  birthMonth: string;
  birthDay: string;
  birthYear: string;
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];

const DAYS = Array.from(
  { length: 31 },
  (_, i) => String(i + 1)
);

const YEARS = Array.from(
  { length: 100 },
  (_, i) => String(2025 - i)
);

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
      birthMonth: "",
      birthDay: "",
      birthYear: "",
    });

  const handleSubmit = () => {
    if (!form.name || !form.email) {
      return;
    }

    onSuccess(form.email);
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
            className="form-input"
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
        </div>

        <div className="form-group">
          <label className="form-label">
            Surel
          </label>

          <input
            className="form-input"
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
        </div>

        <div className="form-group">
          <label className="form-label">
            Ulang tahun
          </label>

          <div className="birthday-row">
            <select
              className="form-select"
              value={form.birthMonth}
              onChange={(e) =>
                setForm({
                  ...form,
                  birthMonth:
                    e.target.value,
                })
              }
            >
              <option value="">
                Bulan
              </option>

              {MONTHS.map((m) => (
                <option
                  key={m}
                  value={m}
                >
                  {m}
                </option>
              ))}
            </select>

            <select
              className="form-select"
              value={form.birthDay}
              onChange={(e) =>
                setForm({
                  ...form,
                  birthDay:
                    e.target.value,
                })
              }
            >
              <option value="">
                Hari
              </option>

              {DAYS.map((d) => (
                <option
                  key={d}
                  value={d}
                >
                  {d}
                </option>
              ))}
            </select>

            <select
              className="form-select form-select--year"
              value={form.birthYear}
              onChange={(e) =>
                setForm({
                  ...form,
                  birthYear:
                    e.target.value,
                })
              }
            >
              <option value="">
                Tahun
              </option>

              {YEARS.map((y) => (
                <option
                  key={y}
                  value={y}
                >
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="modal-footer">
          <button
            className="btn-primary"
            onClick={handleSubmit}
          >
            Selanjutnya
          </button>
        </div>
      </div>
    </div>
  );
}