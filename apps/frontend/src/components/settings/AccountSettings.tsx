import { useState } from "react";

import ChangePasswordModal from "./modals/ChangePasswordModal.tsx";
import LogoutDevicesModal from "./modals/LogoutDevicesModal.tsx";

export default function AccountSettings({
  user,
}: {
  user: {
    name: string;
    email: string;
  };
}) {

  const [
    showPasswordModal,
    setShowPasswordModal,
  ] = useState(false);

  const [
    showEmailModal,
    setShowEmailModal,
  ] = useState(false);
  const [
  showLogoutModal,
  setShowLogoutModal,
] = useState(false);

  const [
  emailVerification,
  setEmailVerification,
] = useState(false);

  return (
    <section className="settings-section">

      <div className="settings-row">
        <div className="settings-label">
          Surel
        </div>

        <div className="settings-value">
          <p>
            {user.email}

            <span className="primary-email">
              Surel Utama
            </span>
          </p>
          <button
            className="settings-link"
            onClick={() =>
              setShowEmailModal(
                !showEmailModal
              )
            }
          >
            Tambah Surel
          </button>
          {showEmailModal && (
            <div className="add-email-inline">

              <input
                type="email"
                placeholder="nama@contoh.id"
                className="form-input"
              />

              <button className="add-email-btn">
                Tambah Surel
              </button>

            </div>
          )}
        </div>
      </div>

      <div className="settings-row">
        <div className="settings-label">
          Sandi
        </div>

        <div className="settings-value">
          <button
            className="settings-link"
            onClick={() =>
              setShowPasswordModal(true)
            }
          >
            Ubah Sandi
          </button>
        </div>
      </div>

      <div className="settings-row">
        <div className="settings-label">
          Keluar
        </div>

        <div className="settings-value">
          <button
            className="settings-link"
            onClick={() =>
              setShowLogoutModal(true)
            }
          >
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

            <button
              className={`toggle-switch ${
                emailVerification
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setEmailVerification(
                  !emailVerification
                )
              }
            >
              <div className="toggle-circle" />
            </button>
          </div>
        </div>
      </div>

      {showPasswordModal && (
        <ChangePasswordModal
          onClose={() =>
            setShowPasswordModal(false)
          }
        />
      )}

      {showLogoutModal && (
        <LogoutDevicesModal
          onClose={() =>
            setShowLogoutModal(false)
          }
        />
      )}

    </section>
  );
}