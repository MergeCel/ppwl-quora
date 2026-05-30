import { useState, useEffect } from "react";
import TopNavbar from "./components/layout/TopNavbar";
import LeftSidebar from "./components/layout/LeftSidebar";
import CreatePostBox from "./components/post/CreatePostBox";
import PostCard from "./components/post/PostCard";
import "./style/home.css";

const backupDummyPosts = [
  {
    id: "dummy-1",
    author: "Alpraditia Malik",
    role: "Author di Lawangsinau · Diperbarui 20 Apr",
    content: "Saya sebelum baca buku, tapi setelah baca buku jadi lebih terarah. Apa pendapat kalian soal membaca di tahun 2026 ini?",
    image_url: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=700&q=80",
    user: { name: "Alpraditia Malik" },
  },
  {
    id: "dummy-2",
    author: "Arjun Maheswara",
    role: "Staff KWU HMSI UNTAN",
    content: "Guys, jangan lupa besok kumpul buat bahas progress tugas besar PPWL Qarou ya. Semangat tim A2!",
    image_url: null,
    user: { name: "Arjun Maheswara" },
  },
];

export default function HomePage() {
  const [posts, setPosts] = useState<any[]>(backupDummyPosts);
  const [isLoading, setIsLoading] = useState(true);

  const [user, setUser] = useState({
    name: "User Qarou",
    email: "",
    avatarUrl: "",
  });

  useEffect(() => {
    const handleGoogleToken = async () => {
      const params = new URLSearchParams(window.location.search);
      const tokenFromUrl = params.get("token");

      if (tokenFromUrl) {
        localStorage.setItem("token", tokenFromUrl);
        window.history.replaceState({}, document.title, "/home");
      }

      const token = tokenFromUrl || localStorage.getItem("token");

      if (!token) return;

      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const json = await res.json();

        if (json.loggedIn && json.user) {
          setUser({
            name: json.user.name || "User Qarou",
            email: json.user.email || "",
            avatarUrl: json.user.avatarUrl || "",
          });
        }
      } catch (err) {
        console.error("Gagal mengambil user login:", err);
      }
    };

    handleGoogleToken();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      if (
        !import.meta.env.VITE_BACKEND_URL ||
        import.meta.env.VITE_BACKEND_URL === "http://localhost:3000"
      ) {
        console.log("Menggunakan data dummy lokal");
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts`);
        if (!res.ok) throw new Error("Gagal mengambil data");
        const json = await res.json();

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
      <TopNavbar user={user} />

      <div className="home-layout">
        <LeftSidebar />

        <main className="feed-section">
          <CreatePostBox userName={user.name} />

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