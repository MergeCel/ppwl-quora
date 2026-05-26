import { useState, useEffect } from "react";
import TopNavbar from "./components/layout/TopNavbar";
import LeftSidebar from "./components/layout/LeftSidebar";
import CreatePostBox from "./components/post/CreatePostBox";
import PostCard from "./components/post/PostCard";
import "./style/home.css";

// Data dummy lokal biar beranda gak kosong kalau API belum siap
const backupDummyPosts = [
  {
    id: "dummy-1",
    author: "Alpraditia Malik",
    role: "Author di Lawangsinau · Diperbarui 20 Apr",
    content: "Saya sebelum baca buku: Goblog, ga pede, miskin, gampang emosian. Setelah baca buku jadi lebih terarah. Apa pendapat kalian soal membaca di tahun 2026 ini?",
    image_url: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=700&q=80",
    user: { name: "Alpraditia Malik" }
  },
  {
    id: "dummy-2",
    author: "Arjun Maheswara",
    role: "Staff KWU HMSI UNTAN",
    content: "Guys, jangan lupa besok kumpul buat bahas progress tugas besar PPWL Qarou ya. Semangat tim A2!",
    image_url: null,
    user: { name: "Arjun Maheswara" }
  }
];

export default function HomePage() {
  const [posts, setPosts] = useState<any[]>(backupDummyPosts); // Default pasang dummy dulu biar gak kosong
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      // Cek kalau URL backend belum disetting di .env, gak usah maksa fetch
      if (!import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_BACKEND_URL === "http://localhost:3000") {
        console.log("Menggunakan data dummy lokal (URL Backend belum dikonfigurasi ke AWS)");
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts`);
        if (!res.ok) throw new Error("Gagal mengambil data");
        const json = await res.json();
        
        // Kalau backend sukses balikin data dan ada isinya, pakai data dari backend
        if (json.data && json.data.length > 0) {
          setPosts(json.data);
        }
      } catch (err) {
        console.error("Gagal nembak API Lambda, balik ke data dummy:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="home-page">
      {/* Navbar atas */}
      <TopNavbar user={{ name: "Arjun Maheswara", email: "arjun@hmsi.untan.ac.id" }} />

      <div className="home-layout">
        {/* Sidebar kiri */}
        <LeftSidebar />

        {/* Feed Tengah */}
        <main className="feed-section">
          {/* CreatePostBox dipaksa muncul dulu biar gak sepi */}
          <CreatePostBox userName="Arjun Maheswara" />
          
          {isLoading ? (
            <p className="text-center p-4 text-gray-500">Memuat postingan...</p>
          ) : (
            posts.map((post) => (
              <PostCard
                key={post.id}
                author={post.user?.name || post.author || "Anonim"}
                role={post.role || "User Qarou"}
                time={post.created_at || "Baru saja"}
                question=""
                content={post.content}
                image={post.image_url}
                avatarColor="#7c3aed"
                likes={post.likes || 12}
                comments={post.comments || 3}
              />
            ))
          )}
        </main>
      </div>
    </div>
  );
}