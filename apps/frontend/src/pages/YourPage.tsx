export default function YourPage() {
  return (
    <div style={{ 
      minHeight: "100vh", 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center", 
      color: "white",
      padding: "20px"
    }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "10px", color: "#e6403b" }}>
        ✨ Halaman Fitur Arjun
      </h1>
      <p style={{ color: "#aaa" }}>
        Ini adalah template halaman baru untuk tugas fitur personal saya.
      </p>
      <a 
        href="/home" 
        style={{ marginTop: "20px", color: "#4a90d9", textDecoration: "none" }}
      >
        ⬅ Kembali ke Beranda
      </a>
    </div>
  );
}