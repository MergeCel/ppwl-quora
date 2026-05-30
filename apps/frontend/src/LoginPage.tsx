import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style/login.css";
import { useGoogleLogin } from "@react-oauth/google"
import { useAuthStore } from "./stores/AuthStore"
import GoogleButton from "./components/auth/GoogleButton.tsx";
import RegisterModal from "./components/auth/RegisterModal.tsx";
import OtpModal from "./components/auth/OtpModal.tsx";

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth)

  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const [showRegister, setShowRegister] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [pendingEmail, setPendingEmail] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!loginForm.email || !loginForm.password) {
      setError("Surel dan kata sandi wajib diisi.");
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loginForm),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login gagal");

      setAuth(data.user, data.accessToken)
      navigate("/home");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleOAuth = useGoogleLogin({
    flow: "implicit",
    onSuccess: async (tokenResponse) => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/google`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ access_token: tokenResponse.access_token }),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message || "Login Google gagal")

        setAuth(data.user, data.accessToken)

        // Tutup popup yang masih terbuka
        window.opener = null
        window.open("", "_self")

        navigate("/home")
      } catch (err: any) {
        setError(err.message)
      }
    },
    onError: () => setError("Login Google gagal"),
  })

  const handleRegisterSuccess = (email: string) => {
    setPendingEmail(email);
    setShowRegister(false);
    setShowOtp(true);
  };

  return (
    <>
      <div className="lp-root">
        <main className="lp-card">
          <div className="lp-logo">Qarou</div>
          <div className="lp-lang">Bahasa Indonesia</div>
          <div className="lp-tagline">
            Tempat berbagi pengetahuan dan memahami dunia lebih baik
          </div>

          <div className="lp-inner">
            <div className="lp-left">
              <p className="lp-tos">
                Dengan melanjutkan, Anda menunjukkan bahwa Anda menyetujui{" "}
                <a href="#">Persyaratan Layanan</a> dan{" "}
                <a href="#">Kebijakan Privasi</a> Qarou.
              </p>
              <GoogleButton
                label="Lanjutkan dengan Google"
                onClick={handleGoogleOAuth}
              />
              <button
                className="email-register-btn"
                onClick={() => setShowRegister(true)}
              >
                Daftar dengan surel
              </button>
            </div>

            <div className="lp-divider" />

            <div className="lp-right">
              <h3>Masuk</h3>
              <div className="form-group">
                <label className="form-label">Surel</label>
                <input
                  className="form-input"
                  type="email"
                  placeholder="Surel Anda"
                  value={loginForm.email}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, email: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label className="form-label">Sandi</label>
                <input
                  className="form-input"
                  type="password"
                  placeholder="Kata sandi Anda"
                  value={loginForm.password}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, password: e.target.value })
                  }
                />
              </div>
              {error && <p className="error-msg">{error}</p>}
              <div className="login-bottom">
                <button className="btn-primary" onClick={handleLogin}>
                  Masuk
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {showRegister && (
        <RegisterModal
          onClose={() => setShowRegister(false)}
          onSuccess={handleRegisterSuccess}
        />
      )}

      {showOtp && (
        <OtpModal
          email={pendingEmail}
          onClose={() => setShowOtp(false)}
          onVerified={() => {
            setShowOtp(false);
            navigate("/home");
          }}
        />
      )}
    </>
  );
}