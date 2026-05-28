import { useNavigate } from "react-router-dom";

/**
 * GuestBanner — tampil di beranda kalau user belum login.
 * Taruh di atas <CreatePostBox> di HomePage.tsx, kondisional:
 *
 *   const isLoggedIn = !!authStore.user; // sesuaikan dengan auth store tim
 *   {!isLoggedIn && <GuestBanner />}
 *   {isLoggedIn && <CreatePostBox ... />}
 */
export default function GuestBanner() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #E5E0D8",
        borderRadius: "8px",
        padding: "24px 20px",
        marginBottom: "16px",
        textAlign: "center",
      }}
    >
      {/* Logo/brand accent */}
      <div
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "999px",
          background: "#B92B27",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 14px",
          color: "white",
          fontWeight: 700,
          fontSize: "22px",
          letterSpacing: "-1px",
        }}
      >
        Q
      </div>

      <h2
        style={{
          margin: "0 0 8px",
          fontSize: "18px",
          fontWeight: 700,
          color: "#282829",
        }}
      >
        Selamat datang di Qarou
      </h2>
      <p
        style={{
          margin: "0 0 20px",
          fontSize: "14px",
          color: "#636466",
          lineHeight: 1.6,
        }}
      >
        Masuk atau daftar untuk membuat postingan, memberikan komentar,
        dan berinteraksi dengan komunitas.
      </p>

      {/* CTA buttons */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => navigate("/login")}
          style={{
            background: "#B92B27",
            color: "white",
            border: "none",
            borderRadius: "4px",
            padding: "9px 28px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: 600,
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) =>
            ((e.target as HTMLButtonElement).style.background = "#9A1F1B")
          }
          onMouseLeave={(e) =>
            ((e.target as HTMLButtonElement).style.background = "#B92B27")
          }
        >
          Masuk
        </button>
        <button
          onClick={() => navigate("/register")}
          style={{
            background: "white",
            color: "#B92B27",
            border: "1px solid #B92B27",
            borderRadius: "4px",
            padding: "9px 28px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: 600,
          }}
        >
          Daftar
        </button>
      </div>

      {/* Info tambahan */}
      <p style={{ marginTop: "16px", fontSize: "12px", color: "#636466" }}>
        Tetap bisa membaca postingan tanpa login.
      </p>
    </div>
  );
}